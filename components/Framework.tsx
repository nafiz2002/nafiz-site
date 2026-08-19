'use client';

import { useState } from 'react';
import { framework } from '@/lib/site';

const POS: Record<string, { x: number; y: number }> = {
  institutions: { x: 50, y: 16 },
  actors: { x: 16, y: 46 },
  incentives: { x: 84, y: 46 },
  implementation: { x: 30, y: 82 },
  outcomes: { x: 74, y: 82 },
};

const EDGES: [string, string][] = [
  ['institutions', 'actors'],
  ['institutions', 'incentives'],
  ['actors', 'incentives'],
  ['actors', 'implementation'],
  ['incentives', 'implementation'],
  ['implementation', 'outcomes'],
  ['incentives', 'outcomes'],
];

export default function Framework() {
  const [on, setOn] = useState(framework[0].id);
  const active = framework.find((f) => f.id === on)!;

  return (
    <div className="fw">
      <div className="fw-list">
        {framework.map((f) => (
          <button
            key={f.id}
            className={`fw-item ${on === f.id ? 'on' : ''}`}
            onClick={() => setOn(f.id)}
            onMouseEnter={() => setOn(f.id)}
            aria-pressed={on === f.id}
          >
            <span className="fw-label">{f.label}</span>
          </button>
        ))}
      </div>

      <div className="fw-panel">
        <div className="fw-panel-label">{active.label}</div>
        <p className="fw-panel-body">{active.body}</p>

        <div className="fw-diagram">
          <svg
            viewBox="0 0 100 100"
            style={{ width: '100%', height: 'auto', maxHeight: 260 }}
            role="img"
            aria-label="Diagram showing how institutions, actors, incentives, implementation, and outcomes relate"
          >
            {EDGES.map(([a, b]) => {
              const isOn = a === on || b === on;
              return (
                <line
                  key={`${a}-${b}`}
                  x1={POS[a].x}
                  y1={POS[a].y}
                  x2={POS[b].x}
                  y2={POS[b].y}
                  stroke={isOn ? 'var(--accent)' : 'var(--rule-strong)'}
                  strokeWidth={isOn ? 0.7 : 0.35}
                  style={{ transition: 'all 380ms cubic-bezier(0.23,1,0.32,1)' }}
                />
              );
            })}

            {framework.map((f) => {
              const p = POS[f.id];
              const isOn = f.id === on;

              return (
                <g
                  key={f.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setOn(f.id)}
                >
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isOn ? 3.6 : 2.4}
                    fill={isOn ? 'var(--accent)' : 'var(--paper)'}
                    stroke={isOn ? 'var(--accent)' : 'var(--ink-3)'}
                    strokeWidth="0.5"
                    style={{
                      transition:
                        'all 380ms cubic-bezier(0.23,1,0.32,1)',
                    }}
                  />

                  <text
                    x={
                      f.id === 'actors'
                        ? p.x - 12
                        : f.id === 'incentives'
                          ? p.x + 12
                          : p.x
                    }
                    y={
                      f.id === 'institutions'
                        ? p.y - 8
                        : f.id === 'implementation' || f.id === 'outcomes'
                          ? p.y + 12
                          : p.y
                    }
                    textAnchor={
                      f.id === 'actors'
                        ? 'end'
                        : f.id === 'incentives'
                          ? 'start'
                          : 'middle'
                    }
                    dominantBaseline={
                      f.id === 'institutions'
                        ? 'auto'
                        : 'middle'
                    }
                    fontSize="4"
                    fill={isOn ? 'var(--accent)' : 'var(--ink-3)'}
                    style={{
                      fontFamily: 'var(--sans)',
                      transition: 'fill 380ms',
                      pointerEvents: 'none',
                    }}
                  >
                    {f.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
