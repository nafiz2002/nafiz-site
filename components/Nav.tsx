'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { site } from '@/lib/site';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/research', label: 'Research' },
  { href: '/publications', label: 'Publications' },
  { href: '/writing', label: 'Writing' },
  { href: '/idrg', label: 'IDRG' },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header>
      <div className="nav-inner">
        <Link href="/" className="logo" onClick={() => setOpen(false)}>
          <span className="logo-name">{site.name}</span>
        </Link>

        <nav className="nav-desktop">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`${isActive(l.href) ? 'nav-link active' : 'nav-link'} ${l.label === 'Get in touch' ? 'nav-get-touch' : ''}`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="nav-contact-btn">
            Get in touch
          </Link>
          <a
            href={site.cvPath}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            CV ↗
          </a>
        </nav>

        <button
          className="nav-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={open ? 'bar bar-1 open' : 'bar bar-1'} />
          <span className={open ? 'bar bar-2 open' : 'bar bar-2'} />
        </button>
      </div>

      {open && (
        <nav className="nav-mobile">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`${isActive(l.href) ? 'nav-link active' : 'nav-link'} ${l.label === 'Get in touch' ? 'nav-get-touch' : ''}`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={site.cvPath}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            onClick={() => setOpen(false)}
          >
            CV ↗
          </a>
        </nav>
      )}
    </header>
  );
}
