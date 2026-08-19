'use client';

import { chain } from '@/lib/site';

export default function ChainDiagram() {
  return (
    <div className="chain chain-animated">
      {chain.map((n, i) => (
        <div className="chain-stage" key={n.id} style={{ '--stage-index': i } as React.CSSProperties}>
          {i > 0 && <div className="chain-connector" />}

          <button
            type="button"
            className="chain-node"
            aria-expanded="true"
          >
            <span className="chain-row">
              <span className="chain-dot" />
              <span className="chain-label">{n.label}</span>
              <span className="chain-idx">
                {String(i + 1).padStart(2, '0')}
              </span>
            </span>

            <span className="chain-note">
              <p>{n.note}</p>
            </span>
          </button>
        </div>
      ))}
    </div>
  );
}
