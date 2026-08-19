import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import SectionHead from '@/components/SectionHead';
import { thesis, projects, openQuestions } from '@/lib/site';

export function generateStaticParams() {
  return projects.filter((p) => p.detail).map((p) => ({ slug: p.slug }));
}

export const metadata: Metadata = {
  title: 'When the State Falters',
  description:
    'A mixed-methods study of why formally capable institutions persistently underperform in migration governance.',
};

export default function ProjectDetail({
  params,
}: {
  params: { slug: string };
}) {
  const project = projects.find((p) => p.slug === params.slug && p.detail);
  if (!project) notFound();

  return (
    <>
      <section className="section" style={{ borderTop: 'none' }}>
        <div className="wrap">
          <Reveal>
            <div className="proj-top" style={{ marginBottom: 24 }}>
              <span className="tag">{thesis.type}</span>
              <span className="tag tag-open">{thesis.year}</span>
            </div>
            <h1 className="q-large" style={{ maxWidth: '20ch' }}>
              {project.question}
            </h1>
            <p className="lede" style={{ marginTop: 26 }}>
              {thesis.title}
            </p>
            <p className="small" style={{ marginTop: 14 }}>
              {thesis.institution} · Supervised by {thesis.supervisor} · DOI:{' '}
              {thesis.doi}
            </p>
            <div className="btn-row" style={{ marginTop: 30 }}>
              <a
                href={thesis.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                Read the paper <span className="arw">↗</span>
              </a>
              <Link href="/publications" className="btn btn-lg">
                All publications
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <SectionHead eyebrow="The study" title="How it was built." />
          <div>
            {thesis.sections.map((s, i) => (
              <Reveal key={s.label} delay={i * 70} variant="left" className="th-row">
                <div className="th-label">{s.label}</div>
                <div className="th-body">{s.body}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-ink">
        <div className="wrap">
          <SectionHead
            eyebrow="What follows"
            title="The questions this opened."
          />
          <div className="ql">
            {openQuestions.slice(0, 4).map((q, i) => (
              <Reveal key={q} delay={i * 60} variant="left" className="ql-item">
                <span className="ql-n">{String(i + 1).padStart(2, '0')}</span>
                <span className="ql-t">{q}</span>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div className="btn-row" style={{ marginTop: 44 }}>
              <Link
                href="/research"
                className="btn btn-lg"
                style={{
                  background: 'var(--paper)',
                  color: 'var(--ink)',
                  borderColor: 'var(--paper)',
                  fontWeight: 600,
                }}
              >
                The wider research <span className="arw">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
