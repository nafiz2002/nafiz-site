import Link from 'next/link';

export type Project = {
  slug: string;
  title: string;
  type: string;
  status: string;
  year?: string;
  question: string;
  summary: string;
  themes: string[];
  href?: string;
  doi?: string;
  detail?: boolean;
};

export default function ProjectCard({ p }: { p: Project }) {
  const detailHref = p.detail ? `/publications/${p.slug}` : null;

  return (
    <article className="proj">
      <div className="proj-top">
        <span className="tag">{p.type}</span>
        <span className="tag tag-open">{p.status}</span>
        {p.year && <span className="small">{p.year}</span>}
      </div>

      <h3 className="proj-q">{p.question}</h3>
      <p className="proj-title">{p.title}</p>
      <p className="proj-sum">{p.summary}</p>

      <div className="proj-foot">
        {detailHref && (
          <Link href={detailHref} className="btn btn-sm btn-primary">
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
        <span className="small" style={{ marginLeft: 'auto' }}>
          {p.themes.join(' · ')}
        </span>
      </div>
    </article>
  );
}
