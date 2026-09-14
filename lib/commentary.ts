import { promises as fs } from 'fs';
import path from 'path';
import { Redis } from '@upstash/redis';

// ---------------------------------------------------------------------------
// Commentary storage.
//
// Two backends, chosen automatically:
//
//   1. Upstash Redis — when KV_REST_API_URL + KV_REST_API_TOKEN (the names the
//      Vercel marketplace integration injects) or UPSTASH_REDIS_REST_URL +
//      UPSTASH_REDIS_REST_TOKEN are set. Posts written from the live site
//      appear immediately.
//
//   2. data/commentary.json — otherwise. Writes work in `npm run dev`; commit
//      the file and deploy to publish. On a read-only host (Vercel) writes
//      fail with a clear error, reads still work.
// ---------------------------------------------------------------------------

export type Post = {
  slug: string;
  title: string;
  subtitle: string;
  body: string;
  publishedAt: string; // ISO timestamp
  updatedAt?: string;
};

const INDEX = 'commentary:index';
const KEY = (slug: string) => `commentary:post:${slug}`;
const FILE = path.join(process.cwd(), 'data', 'commentary.json');

function redis(): Redis | null {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export function storageMode(): 'redis' | 'file' {
  return redis() ? 'redis' : 'file';
}

// ---- file backend ---------------------------------------------------------

async function readFile(): Promise<Post[]> {
  try {
    const raw = await fs.readFile(FILE, 'utf8');
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function writeFile(posts: Post[]) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(posts, null, 2) + '\n', 'utf8');
}

// ---- public API -----------------------------------------------------------

function byDateDesc(a: Post, b: Post) {
  return b.publishedAt.localeCompare(a.publishedAt);
}

export async function listPosts(): Promise<Post[]> {
  const r = redis();
  if (!r) return (await readFile()).sort(byDateDesc);

  const slugs = await r.zrange<string[]>(INDEX, 0, -1, { rev: true });
  if (!slugs.length) return [];
  const rows = await r.mget<(Post | null)[]>(...slugs.map(KEY));
  return rows.filter((p): p is Post => !!p);
}

export async function getPost(slug: string): Promise<Post | null> {
  const r = redis();
  if (!r) return (await readFile()).find((p) => p.slug === slug) ?? null;
  return (await r.get<Post>(KEY(slug))) ?? null;
}

export async function savePost(post: Post): Promise<void> {
  const r = redis();
  if (!r) {
    const posts = await readFile();
    const i = posts.findIndex((p) => p.slug === post.slug);
    if (i >= 0) posts[i] = post;
    else posts.push(post);
    await writeFile(posts.sort(byDateDesc));
    return;
  }
  await r.set(KEY(post.slug), post);
  await r.zadd(INDEX, {
    score: new Date(post.publishedAt).getTime(),
    member: post.slug,
  });
}

export async function deletePost(slug: string): Promise<void> {
  const r = redis();
  if (!r) {
    const posts = await readFile();
    await writeFile(posts.filter((p) => p.slug !== slug));
    return;
  }
  await r.del(KEY(slug));
  await r.zrem(INDEX, slug);
}

// ---- helpers --------------------------------------------------------------

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export async function uniqueSlug(base: string): Promise<string> {
  const root = slugify(base) || 'post';
  let slug = root;
  for (let n = 2; await getPost(slug); n++) slug = `${root}-${n}`;
  return slug;
}

export function readingTime(body: string): string {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
