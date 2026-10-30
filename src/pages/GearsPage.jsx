import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { skills } from '../data/skills';
import { profile } from '../data/profile';

export default function GearsPage({ onNavigate }) {
  return (
    <main id="main-content" className="terminal-shell gears-route" style={{ padding: '48px 0 92px' }}>
      <div style={{ marginBottom: 20 }}>
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="detail-hero__back"
          style={{ background: 'none', border: 'none', padding: 0 }}
        >
          <ArrowLeft size={14} /> portfolio index
        </button>
      </div>

      <p className="command-title">
        <span>$</span> cat {skills.stackFile}
      </p>

      <div className="route-toolbar gears-intro">
        <span>## working setup</span>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
        >
          ⑂ github profile
        </a>
      </div>

      <div className="gear-groups">
        {skills.sections.map((section) => (
          <section key={section.id} className={`gear-group gear-group--${section.tone}`}>
            <h1>{section.title}</h1>
            <dl>
              {section.items.map((item, idx) => (
                <div key={idx}>
                  <dt>{item.label}</dt>
                  <dd>{item.detail}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>

      <div style={{ marginTop: 40, color: 'var(--term-dim)', fontSize: 12 }}>
        this page changes as the security attack surface changes. <span style={{ color: 'var(--term-green)' }}>▊</span> end of file
      </div>
    </main>
  );
}
