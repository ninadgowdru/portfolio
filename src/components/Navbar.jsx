import React from 'react';
import { Terminal } from 'lucide-react';
import { terminalAudio } from '../utils/audio';

export default function Navbar({ currentRoute, onNavigate, onOpenCommandPalette }) {
  const navItems = [
    { id: 'projects', label: 'projects', path: '/projects' },
    { id: 'blog', label: 'blog', path: '/blog' },
    { id: 'gears', label: 'gears', path: '/gears' }
  ];

  const handleNavClick = (id) => {
    terminalAudio.playClick();
    onNavigate(id);
  };

  return (
    <header className="terminal-header">
      <nav className="terminal-shell terminal-nav" aria-label="Main Navigation">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="terminal-wordmark"
          aria-label="Ninad S P Home"
        >
          ninad
        </a>

        <div className="terminal-nav__links">
          {navItems.map((item) => {
            const isActive = currentRoute === item.id;
            return (
              <a
                key={item.id}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={isActive ? 'is-active' : ''}
              >
                {item.label}
              </a>
            );
          })}

          <button
            type="button"
            onClick={() => {
              terminalAudio.playClick();
              if (onOpenCommandPalette) onOpenCommandPalette();
            }}
            title="Open command palette (Press ⌘K or ?)"
            aria-label="Open command palette"
            style={{
              background: 'none',
              border: '1px solid var(--term-line)',
              color: 'var(--term-muted)',
              cursor: 'pointer',
              padding: '2px 7px',
              fontSize: 10,
              fontFamily: 'var(--term-mono)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              borderRadius: 2,
              marginLeft: 4,
              transition: 'border-color 0.18s, color 0.18s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--term-dim)';
              e.currentTarget.style.color = 'var(--term-green)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--term-line)';
              e.currentTarget.style.color = 'var(--term-muted)';
            }}
          >
            <Terminal size={10} />
            <span>⌘K</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
