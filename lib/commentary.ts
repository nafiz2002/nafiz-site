import { promises as fs } from 'fs';
import path from 'path';
import { createClient, type RedisClientType } from 'redis';
import { Redis as Upstash } from '@upstash/redis';

// ---------------------------------------------------------------------------
// Commentary storage.
//
// Three backends, chosen automatically:
//
//   1. Redis over a connection string — any env var named REDIS_URL or ending
//      in _REDIS_URL (Vercel's Redis integration adds one with the database's
//      prefix, e.g. nafiz_commentary_REDIS_URL). Uses the `redis` package.
//
//   2. Upstash Redis over REST — KV_REST_API_URL + KV_REST_API_TOKEN or
//      UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN.
//
//   3. data/commentary.json — otherwise. Writes work in `npm run dev`; commit
//      the file and deploy to publish. On a read-only host (Vercel) writes
//      fail with a clear error, reads still work.
//
// With either Redis backend, posts written from the live site appear
// immediately.
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

// Minimal store interface shared by the two Redis backends.
type Store = {
  get(key: string): Promise<Post | null>;
  mget(keys: string[]): Promise<(Post | null)[]>;
  set(key: string, post: Post): Promise<void>;
  del(key: string): Promise<void>;
  zadd(key: string, score: number, member: string): Promise<void>;
  zrem(key: string, member: string): Promise<void>;
  zrevrange(key: string): Promise<string[]>;
};

function redisUrl(): string | undefined {
  if (process.env.REDIS_URL) return process.env.REDIS_URL;
  const k = Object.keys(process.env).find((k) => k.endsWith('_REDIS_URL'));
  return k ? process.env[k] : undefined;
}

// node-redis keeps a TCP connection; reuse it across invocations.
const g = globalThis as unknown as { __commentaryRedis?: Promise<RedisClientType> };

function nodeRedis(url: string): Store {
  const client = () => {
    if (!g.__commentaryRedis) {
      const c = createClient({ url }) as RedisClientType;
      c.on('error', (err) => console.error('redis error', err));
      g.__commentaryRedis = c.connect().then(() => c);
      g.__commentaryRedis.catch(() => {
        g.__commentaryRedis = undefined;
      });
    }
    return g.__commentaryRedis;
  };
  const parse = (v: string | null) => (v ? (JSON.parse(v) as Post) : null);
  return {
    get: async (k) => parse(await (await client()).get(k)),
    mget: async (ks) => (await (await client()).mGet(ks)).map(parse),
    set: async (k, p) => {
      await (await client()).set(k, JSON.stringify(p));
    },
    del: async (k) => {
      await (await client()).del(k);
    },
    zadd: async (k, score, value) => {
      await (await client()).zAdd(k, { score, value });
    },
    zrem: async (k, m) => {
      await (await client()).zRem(k, m);
    },
    zrevrange: async (k) => (await client()).zRange(k, 0, -1, { REV: true }),
  };
}

function upstash(url: string, token: string): Store {
  const r = new Upstash({ url, token });
  return {
    get: (k) => r.get<Post>(k).then((v) => v ?? null),
    mget: (ks) => r.mget<(Post | null)[]>(...ks),
    set: async (k, p) => {
      await r.set(k, p);
    },
    del: async (k) => {
      await r.del(k);
    },
    zadd: async (k, score, member) => {
      await r.zadd(k, { score, member });
    },
    zrem: async (k, m) => {
      await r.zrem(k, m);
    },
    zrevrange: (k) => r.zrange<string[]>(k, 0, -1, { rev: true }),
  };
}

function store(): Store | null {
  const url = redisUrl();
  if (url) return nodeRedis(url);

  const restUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (restUrl && token) return upstash(restUrl, token);

  return null;
}

export function storageMode(): 'redis' | 'file' {
  return store() ? 'redis' : 'file';
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
  const r = store();
  if (!r) return (await readFile()).sort(byDateDesc);

  const slugs = await r.zrevrange(INDEX);
  if (!slugs.length) return [];
  const rows = await r.mget(slugs.map(KEY));
  return rows.filter((p): p is Post => !!p);
}

export async function getPost(slug: string): Promise<Post | null> {
  const r = store();
  if (!r) return (await readFile()).find((p) => p.slug === slug) ?? null;
  return r.get(KEY(slug));
}

export async function savePost(post: Post): Promise<void> {
  const r = store();
  if (!r) {
    const posts = await readFile();
    const i = posts.findIndex((p) => p.slug === post.slug);
    if (i >= 0) posts[i] = post;
    else posts.push(post);
    await writeFile(posts.sort(byDateDesc));
    return;
  }
  await r.set(KEY(post.slug), post);
  await r.zadd(INDEX, new Date(post.publishedAt).getTime(), post.slug);
}

export async function deletePost(slug: string): Promise<void> {
  const r = store();
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
