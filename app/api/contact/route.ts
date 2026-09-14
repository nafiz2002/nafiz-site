import { NextResponse } from 'next/server';
import { site } from '@/lib/site';

// Sends the contact form by email through Resend (https://resend.com).
//
// Required env:  RESEND_API_KEY
// Optional env:  CONTACT_TO    (defaults to site.email)
//                CONTACT_FROM  (defaults to Resend's onboarding sender, which
//                               can only deliver to the Resend account's own
//                               address; set a verified-domain address for
//                               anything else)

export const runtime = 'nodejs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function esc(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const name = String(body.name ?? '').trim().slice(0, 200);
  const email = String(body.email ?? '').trim().slice(0, 200);
  const subject = String(body.subject ?? '').trim().slice(0, 200);
  const message = String(body.message ?? '').trim().slice(0, 10000);

  if (!name || !email || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: 'Name, a valid email, and a message are required.' },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Email sending is not configured on the server.' },
      { status: 503 }
    );
  }

  const to = process.env.CONTACT_TO || site.email;
  const from = process.env.CONTACT_FROM || 'Website <onboarding@resend.dev>';
  const subj = subject ? `[Website] ${subject}` : `[Website] Message from ${name}`;

  const text = `${message}\n\n— ${name}\n${email}`;
  const html = `<p style="white-space:pre-wrap">${esc(message)}</p><hr><p>${esc(
    name
  )}<br><a href="mailto:${esc(email)}">${esc(email)}</a></p>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: subj,
      text,
      html,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    console.error('Resend error', res.status, detail);
    return NextResponse.json(
      { error: 'The message could not be sent. Please try again or email directly.' },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
