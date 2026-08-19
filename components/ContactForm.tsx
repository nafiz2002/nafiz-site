'use client';

import { useState } from 'react';
import { site } from '@/lib/site';

export default function ContactForm() {
  const [v, setV] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const up = (f: string, val: string) => {
    setV((s) => ({ ...s, [f]: val }));
    setErrors((e) => {
      const n = { ...e };
      delete n[f];
      return n;
    });
  };

  function submit() {
    const e: Record<string, string> = {};
    if (!v.name.trim()) e.name = 'Enter your name';
    if (!v.email.trim()) e.email = 'Enter your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email))
      e.email = 'Enter a valid email address';
    if (!v.message.trim()) e.message = 'Enter a message';
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="form-status">
        <p style={{ fontWeight: 500, marginBottom: 10 }}>
          Your message is ready to send.
        </p>
        <p style={{ fontSize: 14.5, color: 'var(--ink-2)', lineHeight: 1.75 }}>
          Sending is not connected yet, so nothing has been transmitted. Use the
          button below to send it directly.
        </p>
        <div className="btn-row" style={{ marginTop: 22 }}>
          <a
            className="btn btn-primary"
            href={`mailto:${site.email}?subject=${encodeURIComponent(
              v.subject || 'Website enquiry'
            )}&body=${encodeURIComponent(`${v.message}\n\n— ${v.name}\n${v.email}`)}`}
          >
            Open in email <span className="arw">→</span>
          </a>
          <button className="btn" onClick={() => setDone(false)}>
            Edit message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form">
      <div className="field">
        <label htmlFor="c-name">Name</label>
        <input
          id="c-name"
          value={v.name}
          onChange={(e) => up('name', e.target.value)}
          placeholder="Your name"
        />
        {errors.name && (
          <div className="field-error" role="alert">
            {errors.name}
          </div>
        )}
      </div>

      <div className="field">
        <label htmlFor="c-email">Email</label>
        <input
          id="c-email"
          type="email"
          value={v.email}
          onChange={(e) => up('email', e.target.value)}
          placeholder="name@example.com"
        />
        {errors.email && (
          <div className="field-error" role="alert">
            {errors.email}
          </div>
        )}
      </div>

      <div className="field">
        <label htmlFor="c-subject">
          Subject <span className="req">(optional)</span>
        </label>
        <input
          id="c-subject"
          value={v.subject}
          onChange={(e) => up('subject', e.target.value)}
          placeholder="What this is about"
        />
      </div>

      <div className="field">
        <label htmlFor="c-message">Message</label>
        <textarea
          id="c-message"
          value={v.message}
          onChange={(e) => up('message', e.target.value)}
          placeholder="Your message"
        />
        {errors.message && (
          <div className="field-error" role="alert">
            {errors.message}
          </div>
        )}
      </div>

      <button className="btn btn-primary" onClick={submit}>
        Send message <span className="arw">→</span>
      </button>
    </div>
  );
}
