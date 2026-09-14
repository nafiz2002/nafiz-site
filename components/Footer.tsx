import Link from 'next/link';
import { site } from '@/lib/site';

// Icons render only when the matching URL in lib/site.ts is set.
const SOCIALS = [
  {
    label: 'LinkedIn',
    href: site.linkedinUrl,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.5 8.5A2.5 2.5 0 1 0 6.5 3a2.5 2.5 0 0 0 0 5.5ZM4 10h5v11H4V10Zm8 0h4.8v1.5h.1c.7-1.1 2-2.2 4.1-2.2 4.4 0 5.2 2.9 5.2 6.7V21h-5v-4.4c0-1 0-2.4-1.5-2.4s-1.7 1.2-1.7 2.3V21h-5V10Z" transform="translate(-2.5 0)" />
      </svg>
    ),
  },
  {
    label: 'Google Scholar',
    href: site.googleScholarUrl,
    className: 'scholar-icon',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3 2 8.5 12 14l8-4.4V16h2V8.5L12 3Z" />
        <path d="M6 12.5v4.2c0 2.1 2.7 4.3 6 4.3s6-2.2 6-4.3v-4.2l-6 3.3-6-3.3Z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: site.xUrl,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 4h4.2l3.3 4.7L16.5 4H19l-5.3 6 5.8 10h-4.2l-3.8-5.3L6.8 20H4.3l5.5-6.6L5 4Zm3.5 2 7.4 12h1.6L10.1 6H8.5Z" />
      </svg>
    ),
  },
  {
    label: 'ORCID',
    href: site.orcidUrl,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="8.3" cy="7.2" r="1.15" />
        <rect x="7.4" y="9.6" width="1.8" height="7.6" />
        <path d="M11.4 9.6h3.2c2.5 0 4 1.5 4 3.8s-1.5 3.8-4 3.8h-3.2V9.6Zm1.8 1.6v4.4h1.3c1.5 0 2.3-.8 2.3-2.2s-.8-2.2-2.3-2.2h-1.3Z" />
      </svg>
    ),
  },
].filter((s) => s.href);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="f-grid">

          <div className="footer-identity">
            <div className="f-name">{site.name}</div>

            <div className="footer-socials">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={s.className}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="f-col">
            <h4>ACADEMIC</h4>
            <Link href="/research">Research</Link>
            <Link href="/publications">Publications</Link>
            <Link href="/publications/when-the-state-falters">Thesis</Link>
            <Link href="/writing">Writing</Link>
          </div>

          <div className="f-col">
            <h4>MORE</h4>
            <Link href="/commentary">Commentary</Link>
            <Link href="/contact">Contact</Link>
            <a href={site.cvPath} target="_blank" rel="noopener noreferrer">
              CV
            </a>
          </div>

          <div className="f-col footer-elsewhere">
            <h4>ELSEWHERE</h4>

            <img
              src="/images/nafiz2website.png"
              alt="Nafiz Basher Alif"
              className="elsewhere-photo"
            />

            <a href={`mailto:${site.email}`} className="elsewhere-email">
              Email
            </a>
          </div>

        </div>

        <div className="f-bottom">
          <span>© {year} {site.name}</span>
          <span className="footer-legal">
            <Link href="/privacy">Privacy</Link>
            <Link href="/research-notice">Research Notice</Link>
          </span>
          <span>{site.question}</span>
        </div>
      </div>
    </footer>
  );
}
