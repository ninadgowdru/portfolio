import React from 'react';
import { profile } from '../data/profile';

export default function WhyHireMeSection() {
  return (
    <section className="terminal-section why-hire" aria-labelledby="why-title">
      <p className="command-title" id="why-title">
        <span>$</span> cat why-hire-me.md
      </p>

      <div className="terminal-note">
        {profile.whyHireMe.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

