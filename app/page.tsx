import Link from 'next/link';
import Reveal from '@/components/Reveal';
import SectionHead from '@/components/SectionHead';
import ChainDiagram from '@/components/ChainDiagram';
import Stepper from '@/components/Stepper';
import Framework from '@/components/Framework';
import ResearchMap from '@/components/ResearchMap';
import ProjectCard from '@/components/ProjectCard';
import {
  site,
  humanLayer,
  puzzle,
  projects,
  notebook,
  openQuestions,
  concepts,
  idrg,
  positions,
} from '@/lib/site';

export default function Home() {
  const current = positions.find((p) => p.current);

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <Reveal>
              <h1 className="q-display">
                I study how political, social, and bureaucratic forces shape the persistence, adaptation, and decline of institutions.
              </h1>
              <p className="desc">{site.description}</p>
              <div className="btn-row">
                <Link href="/research" className="btn btn-primary btn-lg">
                  Explore Research <span className="arw">→</span>
                </Link>
                <a
                  href={site.cvPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-lg"
                >
                  CV ↗
                </a>
              </div>

              <div className="hero-meta">
                <div className="hero-meta-item">
                  <span style={{ fontWeight: 400 }}>Focus</span>
                  <strong>Institutions and political incentives</strong>
                </div>

                <div className="hero-meta-item">
                  <span style={{ fontWeight: 400 }}>Region</span>
                  <strong>Global South</strong>
                </div>

                <div className="hero-interest-buttons">
                  <span>Comparative Politics</span>
                  <span>Political Institutions</span>
                  <span>Political Economy</span>
                  <span>Institutional Dysfunction</span>
                  <span>Migration Governance</span>
                </div>
</div>
            </Reveal>

            <Reveal delay={140}>
              <ChainDiagram />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- People ---------------- */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Where it starts"
            title="Before the institution is a question, it is an experience."
            lede=""
          />
          <Reveal delay={80}>
            <Stepper
              items={humanLayer.map((h) => ({
                label: h.stage,
                body: h.body,
                kind: h.kind,
              }))}
            />
          </Reveal>
        </div>
      </section>

      {/* ---------------- Puzzle ---------------- */}
      <section className="section section-alt">
        <div className="wrap">
          <SectionHead
            eyebrow="The puzzle"
            title="Why can formally existing institutions repeatedly underperform?"
            lede="A capacity account explains a shortfall. It explains a repeating pattern less well."
          />
          <Reveal delay={80}>
            <Stepper items={puzzle} />
          </Reveal>
        </div>
      </section>

      {/* ---------------- Framework ---------------- */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Research framework"
            title="How the pieces are held together."
            lede="Institutions read not as neutral machinery but as arrangements that distribute advantage."
          />
          <Reveal delay={80}>
            <Framework />
          </Reveal>
        </div>
      </section>

      {/* ---------------- Current work ---------------- */}
      <section className="section section-alt">
        <div className="wrap">
          <SectionHead
            eyebrow="What I'm working on"
            title="Investigations in progress."
          />
          <div className="proj-stack">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 90}>
                <ProjectCard p={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Map ---------------- */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Where the work sits"
            title="Cases and comparison."
          />
          <Reveal delay={80}>
            <ResearchMap />
          </Reveal>
        </div>
      </section>

      {/* ---------------- Notebook ---------------- */}
      <section className="section section-alt">
        <div className="wrap">
          <SectionHead
            eyebrow="Research notebook"
            title="Working notes."
            lede="Observations, questions, and reading that sit behind the formal output."
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

      {/* ---------------- Open questions ---------------- */}
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
        </div>
      </section>

      {/* ---------------- Concepts ---------------- */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Conceptual terrain"
            title="The vocabulary this work uses."
            lede="Ideas the research leans on, argues with, and returns to."
          />
          <div className="concepts">
            {concepts.map((c, i) => (
              <Reveal key={c.term} delay={i * 55} variant="fade" className="concept">
                <div className="concept-term">{c.term}</div>
                <p>{c.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- IDRG ---------------- */}
      <section className="apply-cta">
        <div className="wrap">
          <Reveal>
            <p
              className="eyebrow-plain"
              style={{ marginBottom: 22, color: 'rgba(246,244,238,0.55)' }}
            >
              {idrg.short}
            </p>
            <h2 className="q-large">{idrg.name}</h2>
            <p>{idrg.line}</p>
            <div className="btn-row" style={{ justifyContent: 'center' }}>
              <Link href="/idrg" className="btn btn-primary btn-lg">
                Explore IDRG <span className="arw">→</span>
              </Link>
              <Link
                href="/idrg/apply"
                className="btn btn-primary btn-lg"
                style={{
                  background: 'var(--paper)',
                  color: 'var(--ink)',
                  borderColor: 'var(--paper)',
                }}
              >
                Apply to join
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
