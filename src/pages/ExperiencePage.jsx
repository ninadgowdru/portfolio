import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, Shield, Award, GraduationCap, Building } from 'lucide-react';
import { experiences, education, certifications } from '../data/experience';

export default function ExperiencePage({ onNavigate }) {
  const [openIndex, setOpenIndex] = useState(0); // first item open by default

  const toggleIndex = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <div className="experience-route">
      <header className="detail-hero folio-pad">
        <div className="terminal-shell">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="detail-hero__back"
            style={{ background: 'none', border: 'none', padding: 0 }}
          >
            <ArrowLeft size={14} /> Portfolio index
          </button>
          <p className="folio-kicker">Experience / 01</p>
          <h1>Work that gets clearer when you open it.</h1>
          <p className="detail-hero__dek">
            Select an engagement or academic milestone to inspect its responsibilities, attack surfaces analyzed, and engineering impact.
          </p>
        </div>
      </header>

      <main className="detail-content folio-pad">
        <div className="terminal-shell" style={{ padding: '48px 0 92px' }}>
          <div className="experience-accordion">
            {/* Professional Roles */}
            {experiences.map((exp, idx) => {
              const isOpen = openIndex === idx;
              return (
                <article key={exp.id} className="experience-item">
                  <button
                    className="experience-item__trigger"
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggleIndex(idx)}
                  >
                    <span className="experience-item__logo experience-item__logo--github">
                      <Shield size={18} />
                    </span>

                    <span className="experience-item__title">
                      <span style={{ fontWeight: 600, color: 'var(--term-text-strong)', fontSize: 15 }}>
                        {exp.role}
                      </span>
                      <small style={{ color: 'var(--term-dim)', fontSize: 13, marginTop: 2 }}>
                        {exp.organization} · {exp.location}
                      </small>
                    </span>

                    <span style={{ fontSize: 12, color: 'var(--term-muted)', marginRight: 12 }}>
                      {exp.period}
                    </span>

                    <ChevronDown
                      className="experience-item__chevron"
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease'
                      }}
                      size={18}
                    />
                  </button>

                  {isOpen && (
                    <div className="experience-item__reveal" style={{ padding: '16px 20px 24px', borderTop: '1px solid var(--term-line-soft)' }}>
                      <p style={{ margin: '0 0 16px', fontSize: 13.5, color: 'var(--term-text)', lineHeight: 1.7 }}>
                        {exp.description}
                      </p>

                      <h4 style={{ margin: '0 0 10px', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--term-green)' }}>
                        Core Responsibilities & Findings
                      </h4>

                      <ul style={{ margin: '0 0 20px', paddingLeft: 20, fontSize: 13, color: 'var(--term-muted)', lineHeight: 1.75 }}>
                        {exp.responsibilities.map((r, i) => (
                          <li key={i} style={{ marginBottom: 6 }}>{r}</li>
                        ))}
                      </ul>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {exp.skills.map((s, i) => (
                          <span
                            key={i}
                            style={{
                              background: 'var(--term-surface-2)',
                              border: '1px solid var(--term-line)',
                              padding: '2px 8px',
                              fontSize: 11,
                              color: 'var(--term-text)'
                            }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              );
            })}

            {/* Education Accordion Item */}
            <article className="experience-item" style={{ marginTop: 24 }}>
              <button
                className="experience-item__trigger"
                type="button"
                aria-expanded={openIndex === 10}
                onClick={() => toggleIndex(10)}
              >
                <span className="experience-item__logo experience-item__logo--agent-network">
                  <GraduationCap size={18} />
                </span>

                <span className="experience-item__title">
                  <span style={{ fontWeight: 600, color: 'var(--term-text-strong)', fontSize: 15 }}>
                    Academic Background & Degrees
                  </span>
                  <small style={{ color: 'var(--term-dim)', fontSize: 13, marginTop: 2 }}>
                    Dayananda Sagar College of Engineering & SDM Polytechnic
                  </small>
                </span>

                <span style={{ fontSize: 12, color: 'var(--term-muted)', marginRight: 12 }}>
                  2023 — 2029
                </span>

                <ChevronDown
                  className="experience-item__chevron"
                  style={{
                    transform: openIndex === 10 ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease'
                  }}
                  size={18}
                />
              </button>

              {openIndex === 10 && (
                <div className="experience-item__reveal" style={{ padding: '16px 20px 24px', borderTop: '1px solid var(--term-line-soft)' }}>
                  {education.map((edu, idx) => (
                    <div key={idx} style={{ marginBottom: idx === education.length - 1 ? 0 : 20 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <h4 style={{ margin: 0, fontSize: 14, color: 'var(--term-text-strong)' }}>
                          {edu.degree}
                        </h4>
                        <span style={{ fontSize: 12, color: 'var(--term-amber)' }}>{edu.period}</span>
                      </div>
                      <p style={{ margin: '4px 0 6px', fontSize: 12.5, color: 'var(--term-green)' }}>
                        {edu.institution} · {edu.location}
                      </p>
                      <p style={{ margin: 0, fontSize: 13, color: 'var(--term-muted)', lineHeight: 1.6 }}>
                        {edu.details}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </article>

            {/* Certifications Accordion Item */}
            <article className="experience-item" style={{ marginTop: 12 }}>
              <button
                className="experience-item__trigger"
                type="button"
                aria-expanded={openIndex === 11}
                onClick={() => toggleIndex(11)}
              >
                <span className="experience-item__logo experience-item__logo--github">
                  <Award size={18} />
                </span>

                <span className="experience-item__title">
                  <span style={{ fontWeight: 600, color: 'var(--term-text-strong)', fontSize: 15 }}>
                    Industry Certifications & Credentials
                  </span>
                  <small style={{ color: 'var(--term-dim)', fontSize: 13, marginTop: 2 }}>
                    Google & IBM Professional Verifications
                  </small>
                </span>

                <span style={{ fontSize: 12, color: 'var(--term-muted)', marginRight: 12 }}>
                  Verified
                </span>

                <ChevronDown
                  className="experience-item__chevron"
                  style={{
                    transform: openIndex === 11 ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease'
                  }}
                  size={18}
                />
              </button>

              {openIndex === 11 && (
                <div className="experience-item__reveal" style={{ padding: '16px 20px 24px', borderTop: '1px solid var(--term-line-soft)' }}>
                  {certifications.map((cert, idx) => (
                    <div key={idx} style={{ marginBottom: idx === certifications.length - 1 ? 0 : 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <h4 style={{ margin: 0, fontSize: 14, color: 'var(--term-text-strong)' }}>
                          {cert.title}
                        </h4>
                        <span style={{ fontSize: 12, color: 'var(--term-green)' }}>{cert.issuer}</span>
                      </div>
                      <p style={{ margin: '4px 0 0', fontSize: 12.5, color: 'var(--term-muted)' }}>
                        Curriculum focus: {cert.focus}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </article>
          </div>
        </div>
      </main>
    </div>
  );
}

