import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Terminal } from 'lucide-react';
import { terminalAudio } from '../utils/audio';

export default function Footer({ onOpenCommandPalette, onShowToast }) {
  const [timeStr, setTimeStr] = useState('');
  const [soundOn, setSoundOn] = useState(terminalAudio.isEnabled());

  useEffect(() => {
    const updateTime = () => {
      try {
        const ist = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }).format(new Date());
        setTimeStr(`${ist} IST`);
      } catch (e) {
        setTimeStr('IST');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleSound = () => {
    const next = terminalAudio.toggle();
    setSoundOn(next);
    if (onShowToast) {
      onShowToast(next ? 'Terminal sound FX enabled' : 'Terminal sound FX muted');
    }
  };

  const scrollToTop = () => {
    terminalAudio.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="terminal-footer terminal-shell">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: 'var(--term-green)', fontSize: 9 }}>●</span> {timeStr}
        </span>
        <span style={{ color: 'var(--term-dim)' }}>|</span>
        <span style={{ color: 'var(--term-muted)' }}>bengaluru, in</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button
          type="button"
          onClick={onOpenCommandPalette}
          title="Open interactive terminal command palette (shortcut: ? or Cmd+K)"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--term-muted)',
            cursor: 'pointer',
            fontSize: 10.5,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5
          }}
        >
          <Terminal size={11} style={{ color: 'var(--term-green)' }} />
          <span>cmd palette <kbd style={{ border: '1px solid var(--term-line)', padding: '0 3px', borderRadius: 2 }}>⌘K</kbd></span>
        </button>

        <span style={{ color: 'var(--term-dim)' }}>|</span>

        <button
          type="button"
          onClick={handleToggleSound}
          title="Toggle terminal sound feedback"
          style={{
            background: 'none',
            border: 'none',
            color: soundOn ? 'var(--term-green)' : 'var(--term-muted)',
            cursor: 'pointer',
            fontSize: 10.5,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4
          }}
        >
          {soundOn ? <Volume2 size={11} /> : <VolumeX size={11} />}
          <span>sound: {soundOn ? 'on' : 'off'}</span>
        </button>

        <span style={{ color: 'var(--term-dim)' }}>|</span>

        <button type="button" aria-label="Back to top" onClick={scrollToTop}>
          top ↑
        </button>
      </div>
    </footer>
  );
}
