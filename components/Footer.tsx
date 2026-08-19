import Link from 'next/link';
import { site } from '@/lib/site';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="f-grid">

          <div>
            <div className="f-name">{site.name}</div>

            <div className="footer-socials">
              <a href="https://www.facebook.com/nafizbasheraleef" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M13.5 21v-8h2.75l.4-3h-3.15V8.08c0-.87.24-1.46 1.5-1.46h1.8V3.94c-.31-.04-1.37-.14-2.61-.14-2.58 0-4.35 1.58-4.35 4.48V10H7v3h2.84v8h3.66Z"/>
                </svg>
              </a>

              <a href="https://www.linkedin.com/in/nafiz-basher/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M6.5 8.25A2.25 2.25 0 1 0 6.5 3.75a2.25 2.25 0 0 0 0 4.5ZM4.5 20.25h4V10h-4v10.25ZM11 10v10.25h4v-5.08c0-1.34.25-2.65 1.92-2.65 1.65 0 1.67 1.55 1.67 2.75v4.98h4v-5.63c0-2.77-.6-4.9-3.85-4.9-1.56 0-2.61.86-3.04 1.68h-.05V10H11Z"/>
                </svg>
              </a>

              <a href="https://www.instagram.com/nafiz.basher" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M7.2 3h9.6A4.2 4.2 0 0 1 21 7.2v9.6a4.2 4.2 0 0 1-4.2 4.2H7.2A4.2 4.2 0 0 1 3 16.8V7.2A4.2 4.2 0 0 1 7.2 3Zm-.1 1.9A2.3 2.3 0 0 0 4.9 7.2v9.6a2.3 2.3 0 0 0 2.3 2.3h9.6a2.3 2.3 0 0 0 2.3-2.3V7.2a2.3 2.3 0 0 0-2.3-2.3H7.1Zm9.9 1.45a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 1.9a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2Z"/>
                </svg>
              </a>

              <a href="https://x.com/nafiz_basher" target="_blank" rel="noopener noreferrer" aria-label="X">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M4.2 3h4.7l3.6 5.1L17 3h2.8l-6 7 6.1 11h-4.7l-4-5.8L6.1 21H3.3l6.2-7.6L4.2 3Zm3.5 1.9H6.8l8.9 14.2h.9L7.7 4.9Z"/>
                </svg>
              </a>
            </div>

            <a href="mailto:nafizbalif@gmail.com" className="footer-email-btn">
              Email me
            </a>
          </div>

          <div className="f-col">
            <h4>Research</h4>
            <Link href="/research">Research</Link>
            <Link href="/publications">Publications</Link>
            <Link href="/publications/when-the-state-falters">Thesis</Link>
            <Link href="/writing">Writing</Link>
          </div>

          <div className="f-col">
            <h4>IDRG</h4>
            <Link href="/idrg">Research group</Link>
            <Link href="/idrg">Programme</Link>
            <Link href="/idrg">Projects</Link>
            <Link href="/idrg/apply">Apply</Link>
          </div>

          <div className="f-col">
            <h4>Elsewhere</h4>
            {site.links?.cv && (
              <a href={site.links.cv} target="_blank" rel="noopener noreferrer">
                CV ↗
              </a>
            )}
            {site.links?.substack && (
              <a href={site.links.substack} target="_blank" rel="noopener noreferrer">
                Substack ↗
              </a>
            )}
            <Link href="/contact">Contact</Link>
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
