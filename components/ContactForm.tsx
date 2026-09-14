'use client';

import { useState } from 'react';
import { site } from '@/lib/site';

type Status = 'idle' | 'sending' | 'sent' | 'failed';

export default function ContactForm() {
  const [v, setV] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [failMsg, setFailMsg] = useState('');

  const up = (f: string, val: string) => {
    setV((s) => ({ ...s, [f]: val }));
    setErrors((e) => {
      const n = { ...e };
      delete n[f];
      return n;
    });
  };

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    v.subject || 'Website enquiry'
  )}&body=${encodeURIComponent(`${v.message}\n\n— ${v.name}\n${v.email}`)}`;

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
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

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(v),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFailMsg(data.error || 'The message could not be sent.');
        setStatus('failed');
        return;
      }
      setStatus('sent');
    } catch {
      setFailMsg('The message could not be sent. Check your connection and try again.');
      setStatus('failed');
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-status" role="status">
        <p style={{ fontWeight: 500, marginBottom: 10 }}>Message sent.</p>
        <p style={{ fontSize: 14.5, color: 'var(--ink-2)', lineHeight: 1.75 }}>
          Thank you, {v.name.trim()}. Your message has been delivered and a
          reply will go to {v.email.trim()}.
        </p>
        <div className="btn-row" style={{ marginTop: 22 }}>
          <button
            className="btn"
            onClick={() => {
              setV({ name: '', email: '', subject: '', message: '' });
              setStatus('idle');
            }}
          >
            Send another
          </button>
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="form-status" role="alert">
        <p style={{ fontWeight: 500, marginBottom: 10 }}>Not sent.</p>
        <p style={{ fontSize: 14.5, color: 'var(--ink-2)', lineHeight: 1.75 }}>
          {failMsg} You can also send it from your own email client.
        </p>
        <div className="btn-row" style={{ marginTop: 22 }}>
          <button className="btn btn-primary" onClick={() => setStatus('idle')}>
            Try again
          </button>
          <a className="btn" href={mailto}>
            Open in email <span className="arw">→</span>
          </a>
        </div>
      </div>
    );
  }

  const sending = status === 'sending';

  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className="field">
        <label htmlFor="c-name">Name</label>
        <input
          id="c-name"
          name="name"
          autoComplete="name"
          value={v.name}
          onChange={(e) => up('name', e.target.value)}
          placeholder="Your name"
          disabled={sending}
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
          name="email"
          type="email"
          autoComplete="email"
          value={v.email}
          onChange={(e) => up('email', e.target.value)}
          placeholder="name@example.com"
          disabled={sending}
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
          name="subject"
          value={v.subject}
          onChange={(e) => up('subject', e.target.value)}
          placeholder="What this is about"
          disabled={sending}
        />
      </div>

      <div className="field">
        <label htmlFor="c-message">Message</label>
        <textarea
          id="c-message"
          name="message"
          value={v.message}
          onChange={(e) => up('message', e.target.value)}
          placeholder="Your message"
          disabled={sending}
        />
        {errors.message && (
          <div className="field-error" role="alert">
            {errors.message}
          </div>
        )}
      </div>

      <button className="btn btn-primary" type="submit" disabled={sending}>
        {sending ? 'Sending…' : 'Send message'}
        {!sending && (
          <>
            {' '}
            <span className="arw">→</span>
          </>
        )}
      </button>
    </form>
  );
}
