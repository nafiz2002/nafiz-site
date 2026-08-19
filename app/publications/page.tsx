import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import SectionHead from '@/components/SectionHead';
import ProjectCard from '@/components/ProjectCard';
import { projects, education, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Publications',
  description:
    'Research archive: working papers and thesis work on institutions, incentives, and governance.',
};

export default function PublicationsPage() {
  return (
    <>
      <section className="section" style={{ borderTop: 'none' }}>
        <div className="wrap">
          <Reveal>
            <p className="eyebrow-plain" style={{ marginBottom: 24 }}>
              Publications
            </p>
            <h1 className="q-large" style={{ maxWidth: '18ch' }}>
              A research archive, not a list.
            </h1>
            <p className="lede" style={{ marginTop: 24 }}>
              Each entry is an investigation with a question behind it. Status is
              stated plainly; work in progress is marked as such.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <div className="proj-stack">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 90}>
                <ProjectCard p={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Academic record" title="Education." />
          <Reveal>
            <div className="proj">
              <div className="proj-top">
                <span className="tag">{education.degree.split(',')[0]}</span>
                <span className="small">{education.date}</span>
              </div>
              <h3 className="q-mid" style={{ marginBottom: 12 }}>
                {education.institution}
              </h3>
              <p className="body-text" style={{ marginBottom: 8 }}>
                {education.degree}
              </p>
              <p className="small">
                Thesis: {education.thesis} · Supervised by {education.supervisor}
              </p>
              <div className="proj-foot">
                <a
                  href={site.cvPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-primary"
                >
                  Full CV <span className="arw">↗</span>
                </a>
                <Link href="/research" className="btn btn-sm">
                  Research agenda
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
