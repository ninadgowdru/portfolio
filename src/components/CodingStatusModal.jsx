import React, { useEffect } from 'react';
import { profile } from '../data/profile';

export default function CodingStatusModal({ isOpen, onClose }) {
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

  const { codingStatus } = profile;

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

        <p className="command-label">{codingStatus.command}</p>
        <h2 id="profile-overlay-title">{codingStatus.title}</h2>

        <dl className="terminal-stats terminal-stats--grid">
          {codingStatus.stats.map((s, idx) => (
            <div key={idx}>
              <dt>{s.label}</dt>
              <dd className={s.isLive ? 'status-live' : ''}>{s.value}</dd>
            </div>
          ))}
        </dl>

        <p className="modal-footnote">{codingStatus.footnote}</p>
      </section>
    </div>
  );
}

