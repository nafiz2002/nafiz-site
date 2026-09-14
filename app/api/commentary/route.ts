import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import {
  deletePost,
  getPost,
  listPosts,
  savePost,
  storageMode,
  uniqueSlug,
  type Post,
} from '@/lib/commentary';

// Commentary admin API, used by /commentary/write.
//
//   GET                       list posts (public)
//   POST   { key, title, subtitle, body, slug? }   create, or update if slug given
//   DELETE { key, slug }
//
// Writes require `key` to equal COMMENTARY_ADMIN_KEY. If that env var is not
// set, writes are allowed in development only.

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function authorised(key: unknown): { ok: true } | { ok: false; error: string; status: number } {
  const expected = process.env.COMMENTARY_ADMIN_KEY;
  if (!expected) {
    if (process.env.NODE_ENV !== 'production') return { ok: true };
    return {
      ok: false,
      status: 503,
      error: 'COMMENTARY_ADMIN_KEY is not set on the server, so publishing is disabled.',
    };
  }
  if (typeof key !== 'string' || key !== expected) {
    return { ok: false, status: 401, error: 'Wrong passphrase.' };
  }
  return { ok: true };
}

function revalidate(slug?: string) {
  revalidatePath('/commentary');
  revalidatePath('/commentary/write');
  if (slug) revalidatePath(`/commentary/${slug}`);
}

async function readJson(req: Request): Promise<Record<string, unknown> | null> {
  try {
    return await req.json();
  } catch {
    return null;
  }
}

export async function GET() {
  const posts = await listPosts();
  return NextResponse.json({ posts, storage: storageMode() });
}

export async function POST(req: Request) {
  const body = await readJson(req);
  if (!body) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });

  const auth = authorised(body.key);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const title = String(body.title ?? '').trim().slice(0, 200);
  const subtitle = String(body.subtitle ?? '').trim().slice(0, 300);
  const text = String(body.body ?? '').trim().slice(0, 100000);
  const existingSlug = body.slug ? String(body.slug).trim() : '';

  if (!title) return NextResponse.json({ error: 'A title is required.' }, { status: 400 });
  if (!text) return NextResponse.json({ error: 'The post is empty.' }, { status: 400 });

  const now = new Date().toISOString();
  let post: Post;

  if (existingSlug) {
    const prev = await getPost(existingSlug);
    if (!prev) return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
    post = { ...prev, title, subtitle, body: text, updatedAt: now };
  } else {
    post = {
      slug: await uniqueSlug(title),
      title,
      subtitle,
      body: text,
      publishedAt: now,
    };
  }

  try {
    await savePost(post);
  } catch (err) {
    console.error('commentary save failed', err);
    const hint =
      storageMode() === 'file'
        ? ' No database is configured and the file store is read-only here. Add Upstash Redis (see .env.example), or write posts locally and commit data/commentary.json.'
        : '';
    return NextResponse.json({ error: `Could not save the post.${hint}` }, { status: 500 });
  }

  revalidate(post.slug);
  return NextResponse.json({ ok: true, post });
}

export async function DELETE(req: Request) {
  const body = await readJson(req);
  if (!body) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });

  const auth = authorised(body.key);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const slug = String(body.slug ?? '').trim();
  if (!slug) return NextResponse.json({ error: 'Missing slug.' }, { status: 400 });

  try {
    await deletePost(slug);
  } catch (err) {
    console.error('commentary delete failed', err);
    return NextResponse.json({ error: 'Could not delete the post.' }, { status: 500 });
  }

  revalidate(slug);
  return NextResponse.json({ ok: true });
}
