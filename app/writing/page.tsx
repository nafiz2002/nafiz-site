import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import SectionHead from '@/components/SectionHead';
import { site, projects, notebook } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'A public research notebook: academic writing and essays on institutions and governance.',
};

export default function WritingPage() {
  return (
    <>
      <section className="section" style={{ borderTop: 'none' }}>
        <div className="wrap">
          <Reveal>
            <p className="eyebrow-plain" style={{ marginBottom: 24 }}>
              Writing
            </p>
            <h1 className="q-large" style={{ maxWidth: '19ch' }}>
              A public research notebook.
            </h1>
            <p className="lede" style={{ marginTop: 24 }}>
              Research writing and shorter essays. The concerns are the same
              across both; the register is different.
            </p>
            {site.substackUrl && (
              <div className="btn-row" style={{ marginTop: 30 }}>
                <a
                  href={site.substackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-lg"
                >
                  Read on Substack <span className="arw">↗</span>
                </a>
                <Link href="/publications" className="btn btn-lg">
                  Publications
                </Link>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <SectionHead
            eyebrow="Public writing"
            title="Essays and commentary."
            lede="Shorter pieces written outside the constraints of academic form, published on Substack as they are written."
          />
          <Reveal delay={80}>
            <div className="w-card">
              <div className="w-meta">Substack · Ongoing</div>
              <div className="w-title">Notes on institutions and governance</div>
              <p className="w-body">
                Writing on how institutions behave, who they serve, and why
                arrangements that work badly are often difficult to change. The
                archive is open and free to read.
              </p>
              <div className="btn-row">
                <a
                  href={site.substackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-primary"
                >
                  Read the archive <span className="arw">↗</span>
                </a>
                <a
                  href={site.substackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm"
                >
                  Subscribe
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Academic writing"
            title="Papers and research."
          />
          <div className="proj-stack">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <div className="w-card">
                  <div className="w-meta">
                    {p.type} · {p.status}
                  </div>
                  <div className="w-title">{p.title}</div>
                  <p className="w-body">{p.summary}</p>
                  <div className="btn-row">
                    {p.detail && (
                      <Link
                        href={`/publications/${p.slug}`}
                        className="btn btn-sm btn-primary"
                      >
                        The research <span className="arw">→</span>
                      </Link>
                    )}
                    {p.href && (
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm"
                      >
                        Read paper <span className="arw">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <SectionHead
            eyebrow="Notebook"
            title="Working notes."
            lede="Shorter observations and questions that sit behind the formal writing."
          />
          <div className="nb-grid">
            {notebook.map((n, i) => (
              <Reveal key={n.body.slice(0, 30)} delay={i * 60} variant="fade">
                <div className="nb">
                  <div className="nb-kind">{n.kind}</div>
                  <p>{n.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
