import React from 'react';

export default function ExperienceSection({ onNavigateToExperience }) {
  return (
    <section className="terminal-section" aria-labelledby="experience-title">
      <p className="command-title" id="experience-title">
        <span>$</span> cat experience.log
      </p>

      <div className="experience-log">
        <article className="experience-log__item experience-log__item--green">
          <h2>freelance appsec researcher &amp; bug bounty hunter</h2>
          <p>
            Identified and responsibly disclosed high-impact vulnerabilities across NASA, Microsoft, J.P. Morgan, Ferrari, Nokia, and 20+ global companies. Discovered XSS, IDOR/BOLA, SSRF, and sensitive data exposure using Burp Suite, Nuclei, and custom automation.
          </p>
        </article>

        <article className="experience-log__item experience-log__item--amber">
          <h2>cybersecurity intern · prodigy infotech &amp; the red users</h2>
          <p>
            Automated vulnerability assessment pipelines using Python, executed structural penetration testing across web targets, and authored comprehensive triage and remediation documentation.
          </p>
        </article>

        <article className="experience-log__item experience-log__item--mint">
          <h2>ai security systems builder · cortexshield &amp; zorowaf</h2>
          <p>
            Engineered enterprise AI immune systems using BERT classifiers (trained on 50K+ attack samples, achieving 99.9% detection against prompt injection and RAG attacks) and ML-based web application firewalls.
          </p>
        </article>
      </div>

      <a
        className="more-terminal-link"
        href="/experience"
        onClick={(e) => {
          e.preventDefault();
          onNavigateToExperience();
        }}
      >
        read the detailed log →
      </a>
    </section>
  );
}
