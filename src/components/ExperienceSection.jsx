import React from 'react';
import { experiences } from '../data/experience';

export default function ExperienceSection({ onNavigateToExperience }) {
  return (
    <section className="terminal-section" aria-labelledby="experience-title">
      <p className="command-title" id="experience-title">
        <span>$</span> cat experience.log
      </p>

      <div className="experience-log">
        {experiences.map((exp) => (
          <article key={exp.id} className={`experience-log__item experience-log__item--${exp.tone}`}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8 }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: 'var(--term-text-strong)' }}>
                {exp.role}
              </h3>
              <span style={{ fontSize: 12, color: 'var(--term-muted)' }}>{exp.period}</span>
            </header>

            <p style={{ margin: '4px 0 10px', fontSize: 13, color: 'var(--term-dim)' }}>
              {exp.organization} · {exp.location}
            </p>

            <p style={{ margin: '0 0 12px', fontSize: 13, color: 'var(--term-text)', lineHeight: 1.6 }}>
              {exp.summary}
            </p>

            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--term-muted)', lineHeight: 1.6 }}>
              {exp.responsibilities.slice(0, 2).map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div style={{ marginTop: 24, textAlign: 'right' }}>
        <a
          href="/experience"
          onClick={(e) => {
            e.preventDefault();
            onNavigateToExperience();
          }}
          className="command-label"
          style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13 }}
        >
          read the detailed log →
        </a>
      </div>
    </section>
  );
}
