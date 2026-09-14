import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PostBody from '@/components/PostBody';
import { site } from '@/lib/site';
import { getPost, listPosts, formatDate, readingTime } from '@/lib/commentary';

export const dynamic = 'force-dynamic';

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: 'Commentary' };
  return {
    title: post.title,
    description: post.subtitle || post.body.slice(0, 160),
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const all = await listPosts();
  const idx = all.findIndex((p) => p.slug === post.slug);
  const newer = idx > 0 ? all[idx - 1] : null;
  const older = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;

  return (
    <div className="pub">
      <article className="post">
        <div className="pub-wrap">
          <div className="post-head">
            <Link href="/commentary" className="post-crumb">
              ← Commentary
            </Link>
            <h1 className="post-title">{post.title}</h1>
            {post.subtitle && <p className="post-sub">{post.subtitle}</p>}

            <div className="post-byline">
              <img
                src="/images/nafiz2website.png"
                alt=""
                className="pub-avatar"
              />
              <div>
                <div className="post-author">{site.name}</div>
                <div className="post-date">
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                  <span className="pub-dot">·</span>
                  <span>{readingTime(post.body)}</span>
                </div>
              </div>
            </div>
          </div>

          <PostBody body={post.body} />

          <footer className="post-foot">
            <div className="post-foot-card">
              <img
                src="/images/nafiz2website.png"
                alt=""
                className="pub-avatar"
              />
              <div>
                <div className="post-author">{site.name}</div>
                <p>
                  Researcher working on institutions, political incentives,
                  and governance in the Global South.
                </p>
                <div className="pub-actions" style={{ marginTop: 14 }}>
                  <Link href="/research" className="pub-btn pub-btn-primary">
                    The research
                  </Link>
                  <Link href="/contact" className="pub-btn">
                    Get in touch
                  </Link>
                </div>
              </div>
            </div>

            {(newer || older) && (
              <nav className="post-nav" aria-label="More commentary">
                {older ? (
                  <Link href={`/commentary/${older.slug}`} className="post-nav-link">
                    <span className="post-nav-label">← Previous</span>
                    <span className="post-nav-title">{older.title}</span>
                  </Link>
                ) : (
                  <span />
                )}
                {newer && (
                  <Link
                    href={`/commentary/${newer.slug}`}
                    className="post-nav-link post-nav-next"
                  >
                    <span className="post-nav-label">Next →</span>
                    <span className="post-nav-title">{newer.title}</span>
                  </Link>
                )}
              </nav>
            )}
          </footer>
        </div>
      </article>
    </div>
  );
}
