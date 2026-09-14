import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import SectionHead from '@/components/SectionHead';
import {
  idrg,
  idrgAreas,
  idrgProjects,
  idrgCurrent,
  idrgMethods,
  idrgActivities,
  idrgPeople,
  openQuestions,
} from '@/lib/site';

export const metadata: Metadata = {
  title: 'IDRG',
  description:
    'Institutional Dysfunction Research Group. Researching why institutions persist, adapt, and underperform.',
};

export default function IdrgPage() {
  return (
    <>
      {/* Hero */}
      <section className="idrg-hero">
        <div className="wrap">
          <Reveal>
            <p className="idrg-mark">{idrg.short}</p>
            <h1 className="q-display">{idrg.name}</h1>
            <p className="lede" style={{ marginTop: 26 }}>
              {idrg.line}
            </p>
            <div className="btn-row" style={{ marginTop: 36 }}>
              <Link href="/idrg/apply" className="btn btn-primary btn-lg">
                Apply to join <span className="arw">→</span>
              </Link>
              <Link href="#programme" className="btn btn-lg">
                Research programme
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Core question */}
      <section className="section">
        <div className="wrap-narrow" style={{ textAlign: 'center' }}>
          <Reveal>
            <p className="eyebrow-plain" style={{ marginBottom: 26 }}>
              The core question
            </p>
            <p className="q-large">{idrg.question}</p>
          </Reveal>
        </div>
      </section>

      {/* Mission + Vision */}
      <section className="section section-alt">
        <div className="wrap">
          <div className="grid-2">
            <Reveal className="cell" variant="fade">
              <div className="cell-n">01</div>
              <h3 style={{ fontSize: 22 }}>Mission</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.8 }}>{idrg.mission}</p>
            </Reveal>
            <Reveal className="cell" variant="fade" delay={90}>
              <div className="cell-n">02</div>
              <h3 style={{ fontSize: 22 }}>Vision</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.8 }}>{idrg.vision}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Research programme */}
      <section className="section" id="programme">
        <div className="wrap">
          <SectionHead
            eyebrow="Research programme"
            title="What the group studies."
          />
          <div className="grid-3">
            {idrgAreas.map((a, i) => (
              <Reveal key={a.title} delay={i * 55} variant="fade" className="cell">
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="section section-alt" id="projects">
        <div className="wrap">
          <SectionHead
            eyebrow="Projects"
            title="Current work and proposed directions."
            lede="Current work is research already underway. Proposed projects are directions the group intends to develop; they do not yet exist."
          />

          <Reveal>
            <p className="eyebrow-plain" style={{ marginBottom: 20 }}>
              Current work
            </p>
          </Reveal>
          <div className="grid-2" style={{ marginBottom: 56 }}>
            {idrgCurrent.map((p, i) => (
              <Reveal key={p.name} delay={i * 70} variant="fade" className="cell">
                <span className="tag tag-accent">{p.status}</span>
                <h3 style={{ marginTop: 16 }}>{p.name}</h3>
                <p>{p.line}</p>
                <div style={{ marginTop: 18 }}>
                  <Link href={p.href} className="link-u">
                    View <span className="arw">→</span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="eyebrow-plain" style={{ marginBottom: 20 }}>
              Proposed projects
            </p>
          </Reveal>
          <div className="grid-2">
            {idrgProjects.map((p, i) => (
              <Reveal key={p.name} delay={i * 60} variant="fade">
                <div className="idrg-proj">
                  <span className="tag tag-open">{p.status}</span>
                  <div className="idrg-proj-name">{p.name}</div>
                  <p className="idrg-proj-line">{p.line}</p>
                  {p.dimensions.length > 0 && (
                    <div className="dims">
                      {p.dimensions.map((d) => (
                        <span className="dim" key={d}>
                          {d}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Methods */}
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Methods" title="How the work is done." />
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

      {/* Questions */}
      <section className="section section-ink">
        <div className="wrap">
          <SectionHead
            eyebrow="Questions"
            title="What the group is trying to answer."
          />
          <div className="ql">
            {openQuestions.map((q, i) => (
              <Reveal key={q} delay={i * 50} variant="left" className="ql-item">
                <span className="ql-n">{String(i + 1).padStart(2, '0')}</span>
                <span className="ql-t">{q}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="How the group works"
            title="Intended activities."
            lede="IDRG is at an early stage. This describes how it is designed to operate as it forms, not a schedule of events that has already run."
          />
          <div className="grid-3">
            {idrgActivities.map((a, i) => (
              <Reveal key={a.title} delay={i * 55} variant="fade" className="cell">
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* People */}

      {/* Apply */}
      <section className="apply-cta">
        <div className="wrap">
          <Reveal>
            <h2 className="q-large">Work on the problem with us.</h2>
            <p>
              If these questions are close to what you already think about, the
              group is open to you.
            </p>
            <div className="btn-row" style={{ justifyContent: 'center' }}>
              <Link href="/idrg/apply" className="btn btn-primary btn-lg">
                Apply now <span className="arw">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
