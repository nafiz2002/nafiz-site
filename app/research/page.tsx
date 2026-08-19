import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import SectionHead from '@/components/SectionHead';
import Stepper from '@/components/Stepper';
import Framework from '@/components/Framework';
import ResearchMap from '@/components/ResearchMap';
import ProjectCard from '@/components/ProjectCard';
import {
  site,
  puzzle,
  mechanisms,
  projects,
  openQuestions,
  idrgMethods,
} from '@/lib/site';

export const metadata: Metadata = {
  title: 'Research',
  description:
    'Institutions, political incentives, institutional dysfunction, and governance in the Global South.',
};

export default function ResearchPage() {
  return (
    <>
      <section className="section" style={{ borderTop: 'none' }}>
        <div className="wrap">
          <Reveal>
            <p className="eyebrow-plain" style={{ marginBottom: 24 }}>
              Research
            </p>
            <h1 className="q-display" style={{ maxWidth: '15ch' }}>
              Why do institutions persist when they fail?
            </h1>
            <p className="lede" style={{ marginTop: 30 }}>
              Institutional failure is usually read as a shortfall in capacity.
              That account struggles with a particular pattern: institutions
              that remain formally capable, retain staff and mandate, and still
              underdeliver in the same way across long periods and across
              changes of government.
            </p>
            <p className="lede" style={{ marginTop: 18 }}>
              The work starts from a different possibility. Delay, opacity, and
              discretion are not only failures of administration. They can also
              be resources, and resources are defended. The question becomes who
              an arrangement serves, and what would have to change politically
              before it gave way.
            </p>
            <div className="chip-row" style={{ marginTop: 32 }}>
              {site.areas.map((a) => (
                <span className="chip" key={a}>
                  {a}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Cases" title="Where the evidence comes from." />
          <Reveal delay={80}>
            <ResearchMap />
          </Reveal>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <SectionHead
            eyebrow="The mechanism"
            title="How failure becomes durable."
          />
          <Reveal delay={80}>
            <Stepper items={puzzle} />
          </Reveal>

          <div className="grid-2" style={{ marginTop: 48 }}>
            {mechanisms.map((m, i) => (
              <Reveal key={m.num} delay={i * 60} variant="fade" className="cell">
                <div className="cell-n">{m.num}</div>
                <h3>{m.title}</h3>
                <p>{m.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Framework"
            title="How the pieces relate."
            lede="Five moving parts, examined together rather than in isolation."
          />
          <Reveal delay={80}>
            <Framework />
          </Reveal>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <SectionHead eyebrow="Projects" title="Current investigations." />
          <div className="proj-stack">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 90}>
                <ProjectCard p={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <SectionHead
            eyebrow="Approach"
            title="How the questions are worked on."
          />
          <div className="grid-3">
            {idrgMethods.map((m, i) => (
              <Reveal key={m.name} delay={i * 55} variant="fade" className="cell">
                <h3>{m.name}</h3>
                <p>{m.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-ink">
        <div className="wrap">
          <SectionHead
            eyebrow="Unresolved"
            title="Questions I haven't answered yet."
          />
          <div className="ql">
            {openQuestions.map((q, i) => (
              <Reveal key={q} delay={i * 55} variant="left" className="ql-item">
                <span className="ql-n">{String(i + 1).padStart(2, '0')}</span>
                <span className="ql-t">{q}</span>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div className="btn-row" style={{ marginTop: 44 }}>
              <Link
                href="/idrg"
                className="btn btn-primary btn-lg"
                style={{ background: 'var(--paper)', color: 'var(--ink)', borderColor: 'var(--paper)' }}
              >
                These questions drive IDRG <span className="arw">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
