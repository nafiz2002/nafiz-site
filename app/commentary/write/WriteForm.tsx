'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PostBody from '@/components/PostBody';
import type { Post } from '@/lib/commentary';

const KEY_STORAGE = 'commentary-key';

function loadKey() {
  try {
    return sessionStorage.getItem(KEY_STORAGE) || '';
  } catch {
    return '';
  }
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function WriteForm({
  initialPosts,
  storage,
  keyRequired,
}: {
  initialPosts: Post[];
  storage: 'redis' | 'file';
  keyRequired: boolean;
}) {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);
  const [key, setKey] = useState(loadKey);
  const [editing, setEditing] = useState<string | null>(null); // slug
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [body, setBody] = useState('');
  const [preview, setPreview] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  function remember(k: string) {
    setKey(k);
    try {
      sessionStorage.setItem(KEY_STORAGE, k);
    } catch {}
  }

  function reset() {
    setEditing(null);
    setTitle('');
    setSubtitle('');
    setBody('');
    setPreview(false);
    setError('');
  }

  function startEdit(p: Post) {
    setEditing(p.slug);
    setTitle(p.title);
    setSubtitle(p.subtitle);
    setBody(p.body);
    setPreview(false);
    setError('');
    setNotice('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function publish(ev: React.FormEvent) {
    ev.preventDefault();
    setError('');
    setNotice('');
    if (keyRequired && !key.trim()) return setError('Enter the passphrase.');
    if (!title.trim()) return setError('Give the post a title.');
    if (!body.trim()) return setError('The post is empty.');

    setBusy(true);
    try {
      const res = await fetch('/api/commentary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, title, subtitle, body, slug: editing || undefined }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Could not publish.');
        return;
      }
      const saved: Post = data.post;
      setPosts((list) => {
        const rest = list.filter((p) => p.slug !== saved.slug);
        return [saved, ...rest].sort((a, b) =>
          b.publishedAt.localeCompare(a.publishedAt)
        );
      });
      setNotice(
        editing ? `Updated “${saved.title}”.` : `Published “${saved.title}”.`
      );
      reset();
      router.refresh();
    } catch {
      setError('Could not reach the server.');
    } finally {
      setBusy(false);
    }
  }

  async function remove(p: Post) {
    if (!window.confirm(`Delete “${p.title}”? This cannot be undone.`)) return;
    setError('');
    setNotice('');
    setBusy(true);
    try {
      const res = await fetch('/api/commentary', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, slug: p.slug }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Could not delete.');
        return;
      }
      setPosts((list) => list.filter((x) => x.slug !== p.slug));
      if (editing === p.slug) reset();
      setNotice(`Deleted “${p.title}”.`);
      router.refresh();
    } catch {
      setError('Could not reach the server.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="write-grid">
      <form className="form write-form" onSubmit={publish}>
        {keyRequired && (
          <div className="field">
            <label htmlFor="w-key">Passphrase</label>
            <input
              id="w-key"
              type="password"
              autoComplete="current-password"
              value={key}
              onChange={(e) => remember(e.target.value)}
              placeholder="Required to publish"
              disabled={busy}
            />
          </div>
        )}

        <div className="field">
          <label htmlFor="w-title">Title</label>
          <input
            id="w-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            disabled={busy}
            className="write-title"
          />
        </div>

        <div className="field">
          <label htmlFor="w-sub">
            Subtitle <span className="req">(optional)</span>
          </label>
          <input
            id="w-sub"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="One line under the title"
            disabled={busy}
          />
        </div>

        <div className="field">
          <div className="write-tabs">
            <label htmlFor="w-body">Text</label>
            <button
              type="button"
              className={preview ? 'write-tab on' : 'write-tab'}
              onClick={() => setPreview((v) => !v)}
            >
              {preview ? 'Back to editing' : 'Preview'}
            </button>
          </div>
          {preview ? (
            <div className="write-preview">
              {body.trim() ? (
                <PostBody body={body} />
              ) : (
                <p className="form-note">Nothing to preview yet.</p>
              )}
            </div>
          ) : (
            <textarea
              id="w-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={
                'Write here. Leave a blank line between paragraphs.\n\nOptional formatting: ## Heading, > quote, - list, **bold**, *italic*, [link text](https://…)'
              }
              disabled={busy}
              className="write-body"
            />
          )}
        </div>

        {error && (
          <div className="field-error" role="alert" style={{ marginBottom: 16 }}>
            {error}
          </div>
        )}
        {notice && (
          <div className="write-notice" role="status">
            {notice}
          </div>
        )}

        <div className="btn-row">
          <button className="btn btn-primary" type="submit" disabled={busy}>
            {busy ? 'Working…' : editing ? 'Save changes' : 'Publish'}
            {!busy && (
              <>
                {' '}
                <span className="arw">→</span>
              </>
            )}
          </button>
          {editing && (
            <button className="btn" type="button" onClick={reset} disabled={busy}>
              Cancel edit
            </button>
          )}
          <Link href="/commentary" className="btn">
            View Commentary
          </Link>
        </div>

        <p className="form-note">
          {storage === 'redis'
            ? 'Posts are stored in the site database and go live immediately.'
            : 'No database connected: posts are saved to data/commentary.json. Locally that works right away; commit and deploy the file to publish it on the live site, or add Upstash Redis (see .env.example) to publish from anywhere.'}
        </p>
      </form>

      <aside className="write-list">
        <p className="eyebrow" style={{ marginBottom: 18 }}>
          Published ({posts.length})
        </p>
        {posts.length === 0 ? (
          <p className="form-note" style={{ marginTop: 0 }}>
            Nothing yet.
          </p>
        ) : (
          posts.map((p) => (
            <div className="write-item" key={p.slug}>
              <Link href={`/commentary/${p.slug}`} className="write-item-title">
                {p.title}
              </Link>
              <div className="write-item-meta">{fmt(p.publishedAt)}</div>
              <div className="write-item-actions">
                <button type="button" onClick={() => startEdit(p)} disabled={busy}>
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => remove(p)}
                  disabled={busy}
                  className="danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </aside>
    </div>
  );
}
