import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import JoinForm from '@/components/JoinForm';
import { site, idrg } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Apply to IDRG',
  description:
    'Join the Institutional Dysfunction Research Group as a contributor to ongoing and proposed research.',
};

const WHO = [
  'Students working on comparative politics, political economy, or public administration',
  'Early-career researchers developing a project on institutions or governance',
  'Independent researchers without a current institutional home',
  'Researchers working on adjacent questions who want a reading and discussion group',
];

const INVOLVES = [
  'Contributing to research discussions',
  'Developing case studies',
  'Assisting with literature reviews',
  'Collaborating on working papers',
  'Methodological discussion',
  'Feedback on ongoing research',
];

export default function ApplyPage() {
  return (
    <>
      <section className="section" style={{ borderTop: 'none' }}>
        <div className="wrap">
          <Reveal>
            <p className="eyebrow-plain" style={{ marginBottom: 24 }}>
              {idrg.short} · Apply
            </p>
            <h1 className="q-display" style={{ maxWidth: '14ch' }}>
              Work on the problem with us.
            </h1>
            <p className="lede" style={{ marginTop: 28 }}>
              IDRG is forming as a collaborative research group around a single
              question: why institutions that fail continue to exist in the form
              they do. Contributors work on cases, papers, and discussion rather
              than on administration.
            </p>
            <div className="btn-row" style={{ marginTop: 28 }}>
              <Link href="/idrg" className="btn">
                About the group
              </Link>
              <Link href="/idrg#projects" className="btn">
                Project areas
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <div className="grid-2">
            <Reveal className="cell" variant="fade">
              <div className="cell-n">Who this is for</div>
              <ul style={{ listStyle: 'none', marginTop: 6 }}>
                {WHO.map((w) => (
                  <li
                    key={w}
                    style={{
                      fontSize: 14,
                      lineHeight: 1.7,
                      color: 'var(--ink-2)',
                      padding: '10px 0',
                      borderBottom: '1px solid var(--rule)',
                    }}
                  >
                    {w}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="cell" variant="fade" delay={90}>
              <div className="cell-n">What participation involves</div>
              <div className="chip-row" style={{ marginTop: 10 }}>
                {INVOLVES.map((x) => (
                  <span className="chip" key={x}>
                    {x}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: 22 }}>
              Application
            </p>
            <h2 className="q-mid" style={{ marginBottom: 30 }}>
              Tell us what you work on.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <JoinForm />
          </Reveal>
          <Reveal delay={160}>
            <p className="form-note" style={{ marginTop: 28 }}>
              You can also write directly to{' '}
              <a href={`mailto:${site.email}`} className="link-u">
                {site.email}
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
