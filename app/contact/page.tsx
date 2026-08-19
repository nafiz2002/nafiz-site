import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import ContactForm from '@/components/ContactForm';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch about research, collaboration, or IDRG.',
};

export default function ContactPage() {
  const links = [
    { label: 'Email', value: site.email, href: `mailto:${site.email}` },
    site.substackUrl && {
      label: 'Substack',
      value: 'Writing ↗',
      href: site.substackUrl,
    },
    site.linkedinUrl && {
      label: 'LinkedIn',
      value: 'Profile ↗',
      href: site.linkedinUrl,
    },
    site.orcidUrl && { label: 'ORCID', value: 'Profile ↗', href: site.orcidUrl },
    { label: 'CV', value: 'PDF ↗', href: site.cvPath },
  ].filter(Boolean) as { label: string; value: string; href: string }[];

  return (
    <section className="section" style={{ borderTop: 'none' }}>
      <div className="wrap">
        <Reveal>
          <p className="eyebrow-plain" style={{ marginBottom: 24 }}>
            Contact
          </p>
          <h1 className="q-large" style={{ maxWidth: '16ch' }}>
            Get in touch.
          </h1>
          <p className="lede" style={{ marginTop: 24, marginBottom: 56 }}>
            I am glad to hear from researchers working on related questions, and
            from anyone interested in IDRG.
          </p>
        </Reveal>

        <div className="contact-grid">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: 22 }}>
              Elsewhere
            </p>
            <div>
              {links.map((l) => (
                <a
                  key={l.label}
                  className="c-row"
                  href={l.href}
                  target={l.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={
                    l.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'
                  }
                >
                  <span className="c-label">{l.label}</span>
                  <span className="c-val">{l.value}</span>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={110}>
            <p className="eyebrow" style={{ marginBottom: 22 }}>
              Send a message
            </p>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
