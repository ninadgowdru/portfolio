import React, { useState } from 'react';
import { achievements } from '../data/achievements';

export default function HallOfFameSection() {
  const [filter, setFilter] = useState('all');

  const filteredItems = achievements.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'hof') return item.category === 'hall-of-fame';
    if (filter === 'letters') return item.category === 'letters';
    return true;
  });

  return (
    <section className="terminal-section" aria-labelledby="hof-title">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
        <p className="command-title" id="hof-title" style={{ margin: 0 }}>
          <span>$</span> cat hall-of-fame.md
        </p>

        <div className="terminal-tabs" role="group" aria-label="Filter achievements">
          <span>
            <button
              type="button"
              aria-pressed={filter === 'all'}
              onClick={() => setFilter('all')}
            >
              all
            </button>
            <i>/</i>
          </span>
          <span>
            <button
              type="button"
              aria-pressed={filter === 'hof'}
              onClick={() => setFilter('hof')}
            >
              hall of fame
            </button>
            <i>/</i>
          </span>
          <span>
            <button
              type="button"
              aria-pressed={filter === 'letters'}
              onClick={() => setFilter('letters')}
            >
              letters of recognition
            </button>
          </span>
        </div>
      </div>

      <div className="hall-grid">
        {filteredItems.map((item) => {
          let badgeClass = 'hall-badge--hof';
          if (item.type === 'critical') badgeClass = 'hall-badge--critical';
          if (item.type === 'apprec') badgeClass = 'hall-badge--apprec';

          return (
            <div key={item.id} className="hall-card">
              <div>
                <div className="hall-card__header">
                  <h3 className="hall-card__name">{item.organization}</h3>
                  <span className={`hall-badge ${badgeClass}`}>{item.typeLabel}</span>
                </div>
                <p className="hall-card__detail" style={{ marginTop: 8 }}>
                  {item.description}
                </p>
              </div>

              <div style={{ borderTop: '1px dashed var(--term-line-soft)', paddingTop: 8, marginTop: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11 }}>
                <span style={{ color: 'var(--term-dim)' }}>{item.scope}</span>
                <span style={{ color: 'var(--term-green)', fontWeight: 600 }}>verified</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
