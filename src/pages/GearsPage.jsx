import React from 'react';
import { skills } from '../data/skills';
import { profile } from '../data/profile';

export default function GearsPage() {
  return (
    <main id="main-content" className="terminal-shell route-page gears-route">
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

      <p className="gear-eof">
        this page changes as the security attack surface changes.
        <br />
        ▊ end of file
      </p>
    </main>
  );
}
