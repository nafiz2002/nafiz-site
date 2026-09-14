'use client';

import { useState } from 'react';
import { site, idrgProjects, idrgCurrent } from '@/lib/site';

const LEVELS = [
  'Undergraduate student',
  'Master’s student',
  'Doctoral student',
  'Early-career researcher',
  'Faculty',
  'Independent researcher',
  'Other',
];

const AREAS = [
  ...idrgCurrent.map((p) => p.name),
  ...idrgProjects.map((p) => p.name),
];

export default function JoinForm() {
  const [v, setV] = useState({
    name: '',
    email: '',
    affiliation: '',
    level: '',
    interests: '',
    motivation: '',
    link: '',
  });
  const [areas, setAreas] = useState<string[]>([]);
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

  const toggleArea = (a: string) =>
    setAreas((s) => (s.includes(a) ? s.filter((x) => x !== a) : [...s, a]));

  function submit() {
    const e: Record<string, string> = {};
    if (!v.name.trim()) e.name = 'Enter your name';
    if (!v.email.trim()) e.email = 'Enter your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email))
      e.email = 'Enter a valid email address';
    if (!v.level) e.level = 'Select your academic level or role';
    if (!v.interests.trim()) e.interests = 'Describe your research interests';
    if (!v.motivation.trim()) e.motivation = 'Tell us why you would like to join';
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setDone(true);
  }

  const mailBody = [
    `Name: ${v.name}`,
    `Email: ${v.email}`,
    v.affiliation && `Affiliation: ${v.affiliation}`,
    `Level: ${v.level}`,
    areas.length && `Project areas: ${areas.join(', ')}`,
    '',
    `Research interests:`,
    v.interests,
    '',
    `Why IDRG:`,
    v.motivation,
    v.link && `\nCV / website: ${v.link}`,
  ]
    .filter(Boolean)
    .join('\n');

  if (done) {
    return (
      <div className="form-status">
        <p style={{ fontWeight: 500, marginBottom: 10 }}>
          Your application is ready to send.
        </p>
        <p style={{ fontSize: 14.5, color: 'var(--ink-2)', lineHeight: 1.75 }}>
          Submission handling is not connected yet, so nothing has been
          transmitted. Send it directly using the button below and it will be
          read.
        </p>
        <div className="btn-row" style={{ marginTop: 22 }}>
          <a
            className="btn btn-primary"
            href={`mailto:${site.email}?subject=${encodeURIComponent(
              'IDRG application'
            )}&body=${encodeURIComponent(mailBody)}`}
          >
            Open in email <span className="arw">→</span>
          </a>
          <button className="btn" onClick={() => setDone(false)}>
            Edit application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form">
      <div className="field-row">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            value={v.name}
            onChange={(e) => up('name', e.target.value)}
            placeholder="Your full name"
          />
          {errors.name && (
            <div className="field-error" role="alert">
              {errors.name}
            </div>
          )}
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={v.email}
            onChange={(e) => up('email', e.target.value)}
            placeholder="name@university.edu"
          />
          {errors.email && (
            <div className="field-error" role="alert">
              {errors.email}
            </div>
          )}
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="aff">
            Institution / affiliation <span className="req">(optional)</span>
          </label>
          <input
            id="aff"
            value={v.affiliation}
            onChange={(e) => up('affiliation', e.target.value)}
            placeholder="University or organisation"
          />
        </div>
        <div className="field">
          <label htmlFor="level">Academic level / role</label>
          <select
            id="level"
            value={v.level}
            onChange={(e) => up('level', e.target.value)}
          >
            <option value="">Select one</option>
            {LEVELS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          {errors.level && (
            <div className="field-error" role="alert">
              {errors.level}
            </div>
          )}
        </div>
      </div>

      <div className="field">
        <label>
          Project areas of interest <span className="req">(optional)</span>
        </label>
        <div className="check-grid">
          {AREAS.map((a) => (
            <label key={a} className={`check ${areas.includes(a) ? 'on' : ''}`}>
              <input
                type="checkbox"
                checked={areas.includes(a)}
                onChange={() => toggleArea(a)}
              />
              <span>{a}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="field">
        <label htmlFor="interests">Research interests</label>
        <textarea
          id="interests"
          value={v.interests}
          onChange={(e) => up('interests', e.target.value)}
          placeholder="The questions, cases, or literatures you work on."
        />
        {errors.interests && (
          <div className="field-error" role="alert">
            {errors.interests}
          </div>
        )}
      </div>

      <div className="field">
        <label htmlFor="motivation">Why would you like to join IDRG?</label>
        <textarea
          id="motivation"
          value={v.motivation}
          onChange={(e) => up('motivation', e.target.value)}
          placeholder="What you hope to contribute, and what you hope to get from the group."
        />
        {errors.motivation && (
          <div className="field-error" role="alert">
            {errors.motivation}
          </div>
        )}
      </div>

      <div className="field">
        <label htmlFor="link">
          CV / website <span className="req">(optional)</span>
        </label>
        <input
          id="link"
          value={v.link}
          onChange={(e) => up('link', e.target.value)}
          placeholder="A link to your CV, profile, or personal site"
        />
      </div>

      <button className="btn btn-primary btn-lg" onClick={submit}>
        Apply to join IDRG <span className="arw">→</span>
      </button>

      <p className="form-note">
        Applications are read individually. Participation is based on
        intellectual fit and commitment to serious research, not on seniority or
        institutional affiliation.
      </p>
    </div>
  );
}
