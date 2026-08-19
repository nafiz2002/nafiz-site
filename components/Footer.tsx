import Link from 'next/link';
import { site } from '@/lib/site';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="f-grid">

          <div className="footer-identity">
            <div className="f-name">{site.name}</div>

            <div className="footer-socials">

              <a
                href="https://www.facebook.com/nafizbasheraleef"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.67.33-1 1-1z" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/in/nafizbasher/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.5 8.5A2.5 2.5 0 1 0 6.5 3a2.5 2.5 0 0 0 0 5.5ZM4 10h5v11H4V10Zm8 0h4.8v1.5h.1c.7-1.1 2-2.2 4.1-2.2 4.4 0 5.2 2.9 5.2 6.7V21h-5v-4.4c0-1 0-2.4-1.5-2.4s-1.7 1.2-1.7 2.3V21h-5V10Z" transform="translate(-2.5 0)" />
                </svg>
              </a>

              <a
                href="https://www.instagram.com/nafiz.basher/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="17.5" cy="6.5" r="1" />
                </svg>
              </a>

              <a
                href="https://x.com/nafiz_basher"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 4h4.2l3.3 4.7L16.5 4H19l-5.3 6 5.8 10h-4.2l-3.8-5.3L6.8 20H4.3l5.5-6.6L5 4Zm3.5 2 7.4 12h1.6L10.1 6H8.5Z" />
                </svg>
              </a>

              <a
                href="https://scholar.google.com/citations?user=mKv2JBAAAAAJ&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Scholar"
                className="scholar-icon"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 3 2 8.5 12 14l8-4.4V16h2V8.5L12 3Z" />
                  <path d="M6 12.5v4.2c0 2.1 2.7 4.3 6 4.3s6-2.2 6-4.3v-4.2l-6 3.3-6-3.3Z" />
                </svg>
              </a>

            </div>
          </div>

          <div className="f-col">
            <h4>RESEARCH</h4>
            <Link href="/research">Research</Link>
            <Link href="/publications">Publications</Link>
            <Link href="/publications/when-the-state-falters">Thesis</Link>
            <Link href="/writing">Writing</Link>
          </div>

          <div className="f-col">
            <h4>IDRG</h4>
            <Link href="/idrg">Research group</Link>
            <Link href="/idrg#programme">Programme</Link>
            <Link href="/idrg#projects">Projects</Link>
            <Link href="/idrg/apply">Apply</Link>
          </div>

          <div className="f-col footer-elsewhere">
            <h4>ELSEWHERE</h4>

            <img
              src="/images/nafiz2website.png"
              alt="Nafiz Basher Alif"
              className="elsewhere-photo"
            />

            <a
              href="mailto:nafizbalif@gmail.com"
              className="elsewhere-email"
            >
              Email
            </a>
          </div>

        </div>

        <div className="f-bottom">
          <span>© {year} {site.name}</span>
          <span>{site.question}</span>
        </div>
      </div>
    </footer>
  );
}
