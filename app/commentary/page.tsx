import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { site } from '@/lib/site';
import { listPosts, formatDate, readingTime } from '@/lib/commentary';

export const metadata: Metadata = {
  title: 'Commentary',
  description:
    'Short pieces on institutions, incentives, and governance, published as they are written.',
};

// Posts are read at request time so a new one appears immediately.
export const dynamic = 'force-dynamic';

export default async function CommentaryPage() {
  const posts = await listPosts();

  return (
    <div className="pub">
      {/* Publication header — Substack-style masthead */}
      <section className="pub-head">
        <div className="pub-wrap">
          <Reveal>
            <img
              src="/images/nafiz2website.png"
              alt=""
              className="pub-logo"
            />
            <h1 className="pub-name">Commentary</h1>
            <p className="pub-tagline">
              Short pieces on institutions, incentives, and why arrangements
              that work badly are so hard to change. By {site.name}.
            </p>
            <div className="pub-actions">
              <Link href="/contact" className="pub-btn pub-btn-primary">
                Get in touch
              </Link>
              {site.substackUrl && (
                <a
                  href={site.substackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pub-btn"
                >
                  Also on Substack ↗
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Post list */}
      <section className="pub-list">
        <div className="pub-wrap">
          {posts.length === 0 ? (
            <Reveal>
              <div className="pub-empty">
                <p>Nothing published yet.</p>
                <p className="pub-empty-sub">
                  New pieces will appear here as they are written.
                </p>
              </div>
            </Reveal>
          ) : (
            posts.map((p, i) => (
              <Reveal key={p.slug} delay={Math.min(i, 6) * 60} variant="fade">
                <article className="pub-item">
                  <Link href={`/commentary/${p.slug}`} className="pub-item-link">
                    <h2 className="pub-item-title">{p.title}</h2>
                    {p.subtitle && (
                      <p className="pub-item-sub">{p.subtitle}</p>
                    )}
                    <div className="pub-item-meta">
                      <img
                        src="/images/nafiz2website.png"
                        alt=""
                        className="pub-avatar-xs"
                      />
                      <span>{site.name}</span>
                      <span className="pub-dot">·</span>
                      <time dateTime={p.publishedAt}>{formatDate(p.publishedAt)}</time>
                      <span className="pub-dot">·</span>
                      <span>{readingTime(p.body)}</span>
                    </div>
                  </Link>
                </article>
              </Reveal>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
