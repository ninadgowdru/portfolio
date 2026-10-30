import React, { useState, useEffect } from 'react';
import { profile } from '../data/profile';

export default function Footer() {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const ist = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).format(new Date());
        setTimeStr(`${ist} IST`);
      } catch (e) {
        setTimeStr('Bengaluru, IST');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="terminal-footer" style={{ borderTop: '1px solid var(--term-line-soft)', marginTop: 80, padding: '24px 0 36px' }}>
      <div className="terminal-shell" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, fontSize: 12, color: 'var(--term-muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontVariantNumeric: 'tabular-nums', color: 'var(--term-text-strong)' }}>
            {timeStr}
          </span>
          <span style={{ color: 'var(--term-dim)' }}>·</span>
          <span>Bengaluru, IN</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            style={{ transition: 'color 0.15s' }}
          >
            github
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            style={{ transition: 'color 0.15s' }}
          >
            linkedin
          </a>
          <a
            href={`mailto:${profile.email}`}
            style={{ transition: 'color 0.15s' }}
          >
            email
          </a>
          <a
            href={profile.resumePdf}
            download="Ninad_S_P_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'var(--term-green)', transition: 'color 0.15s' }}
          >
            resume
          </a>
          <button
            type="button"
            onClick={scrollToTop}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--term-text)', padding: 0 }}
            aria-label="Scroll to top"
          >
            top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
