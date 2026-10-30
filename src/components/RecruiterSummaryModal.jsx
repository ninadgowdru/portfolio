import React, { useEffect } from 'react';
import { profile } from '../data/profile';

export default function RecruiterSummaryModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.classList.add('has-terminal-modal');
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('has-terminal-modal');
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const { recruiterSummary } = profile;

  return (
    <div
      className="terminal-modal-backdrop"
      role="presentation"
      onMouseDown={(e) => {
        if (e.currentTarget === e.target) onClose();
      }}
    >
      <section
        className="terminal-mini-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-overlay-title"
      >
        <button
          className="terminal-modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
        >
          ×
        </button>

        <p className="command-label">{recruiterSummary.command}</p>
        <h2 id="profile-overlay-title">{recruiterSummary.title}</h2>
        <p>{recruiterSummary.description}</p>

        <dl className="terminal-stats">
          {recruiterSummary.stats.map((s, idx) => (
            <div key={idx}>
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
