import type { Metadata } from 'next';
import WriteForm from './WriteForm';
import { listPosts, storageMode } from '@/lib/commentary';

export const metadata: Metadata = {
  title: 'Write · Commentary',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function WritePage() {
  const posts = await listPosts();
  const keyRequired =
    !!process.env.COMMENTARY_ADMIN_KEY || process.env.NODE_ENV === 'production';

  return (
    <section className="section" style={{ borderTop: 'none' }}>
      <div className="wrap">
        <p className="eyebrow-plain" style={{ marginBottom: 24 }}>
          Commentary
        </p>
        <h1 className="q-large" style={{ maxWidth: '16ch' }}>
          Write a post.
        </h1>
        <p className="lede" style={{ marginTop: 24, marginBottom: 48 }}>
          What you publish here appears on the Commentary page straight away.
        </p>

        <WriteForm
          initialPosts={posts}
          storage={storageMode()}
          keyRequired={keyRequired}
        />
      </div>
    </section>
  );
}
