'use client';

import { useState } from 'react';
import { mapCases } from '@/lib/site';

export default function ResearchMap() {
  const [on, setOn] = useState(mapCases[0].id);
  const active = mapCases.find((c) => c.id === on)!;

  return (
    <div className="map-wrap">
      <div className="map-stage">
        <svg
          viewBox="0 0 100 75"
          style={{ position: 'absolute', inset: 26, width: 'calc(100% - 52px)' }}
          aria-hidden="true"
        >
          {/* abstract connective lines between cases */}
          {mapCases.map((c, i) =>
            mapCases.slice(i + 1).map((d) => (
              <line
                key={`${c.id}-${d.id}`}
                x1={c.x * 0.75}
                y1={d.y * 0.75}
                x2={d.x * 0.75}
                y2={c.y * 0.75}
                stroke="var(--rule-strong)"
                strokeWidth="0.25"
                strokeDasharray="1.5 1.5"
              />
            ))
          )}
          {/* graticule */}
          {[15, 30, 45, 60].map((y) => (
            <line
              key={y}
              x1="4"
              y1={y}
              x2="96"
              y2={y}
              stroke="var(--rule)"
              strokeWidth="0.2"
            />
          ))}
          {[20, 40, 60, 80].map((x) => (
            <line
              key={x}
              x1={x}
              y1="4"
              x2={x}
              y2="71"
              stroke="var(--rule)"
              strokeWidth="0.2"
            />
          ))}
        </svg>

        {mapCases.map((c) => (
          <button
            key={c.id}
            className={`map-pin ${on === c.id ? 'on' : ''} ${
              c.role === 'Primary case' ? 'primary' : ''
            }`}
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
            onClick={() => setOn(c.id)}
            onMouseEnter={() => setOn(c.id)}
            aria-pressed={on === c.id}
            aria-label={`${c.name}, ${c.role}`}
          >
            <span style={{ position: 'relative', display: 'block' }}>
              <span className="map-dot" />
              {c.role === 'Primary case' && <span className="map-halo" />}
            </span>
            <span className="map-name">{c.name}</span>
          </button>
        ))}
      </div>

      <div>
        <div className="tag tag-open" style={{ marginBottom: 16 }}>
          {active.role}
        </div>
        <h3 className="q-mid" style={{ marginBottom: 14 }}>
          {active.name}
        </h3>
        <p className="body-text">{active.body}</p>
        <div className="map-panel" style={{ marginTop: 28 }}>
          <p className="small">
            Cases shown are those represented in current research. Comparative
            work across the wider Global South is a research interest rather
            than a completed case set.
          </p>
        </div>
      </div>
    </div>
  );
}
