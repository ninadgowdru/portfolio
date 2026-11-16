import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal,
  FolderGit2,
  FileCode2,
  ShieldAlert,
  Cpu,
  FileText,
  Mail,
  Volume2,
  VolumeX,
  ExternalLink,
  CornerDownLeft,
  X
} from 'lucide-react';
import { terminalAudio } from '../utils/audio';

export default function CommandPaletteModal({
  isOpen,
  onClose,
  onNavigate,
  onShowToast
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const commands = [
    {
      id: 'home',
      label: 'goto home',
      shortcut: '1',
      description: 'Navigate to hero profile & status console',
      icon: <Terminal size={14} />,
      action: () => onNavigate('home')
    },
    {
      id: 'projects',
      label: 'goto projects',
      shortcut: '2',
      description: 'Inspect CortexShield, ZoroWAF & security tools',
      icon: <FolderGit2 size={14} />,
      action: () => onNavigate('projects')
    },
    {
      id: 'experience',
      label: 'goto experience',
      shortcut: '3',
      description: 'Detailed log of disclosures & internships',
      icon: <ShieldAlert size={14} />,
      action: () => onNavigate('experience')
    },
    {
      id: 'blog',
      label: 'goto blog & advisories',
      shortcut: '4',
      description: 'Technical writeups on IDOR, RAG injection, WAFs',
      icon: <FileCode2 size={14} />,
      action: () => onNavigate('blog')
    },
    {
      id: 'gears',
      label: 'goto gears & stack',
      shortcut: '5',
      description: 'Offensive security & defensive toolstack',
      icon: <Cpu size={14} />,
      action: () => onNavigate('gears')
    },
    {
      id: 'resume',
      label: 'download resume.pdf',
      shortcut: 'r',
      description: 'Open & download official Ninad S P resume',
      icon: <FileText size={14} />,
      action: () => {
        window.open('./Ninad_S_P_Resume.pdf', '_blank');
        if (onShowToast) onShowToast('Opening resume PDF...');
      }
    },
    {
      id: 'contact',
      label: 'dispatch message / contact',
      shortcut: 'c',
      description: 'Scroll to terminal message transmission form',
      icon: <Mail size={14} />,
      action: () => {
        onNavigate('home');
        setTimeout(() => {
          const el = document.getElementById('hire');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    },
    {
      id: 'audio',
      label: terminalAudio.isEnabled() ? 'disable terminal audio' : 'enable terminal audio',
      shortcut: 'a',
      description: 'Toggle synthetic mechanical click sound FX',
      icon: terminalAudio.isEnabled() ? <VolumeX size={14} /> : <Volume2 size={14} />,
      action: () => {
        const newState = terminalAudio.toggle();
        if (onShowToast) {
          onShowToast(newState ? 'Terminal audio FX enabled' : 'Terminal audio FX muted');
        }
      }
    },
    {
      id: 'github',
      label: 'open github profile',
      shortcut: 'g',
      description: 'External link to github.com/ninadgowdru',
      icon: <ExternalLink size={14} />,
      action: () => window.open('https://github.com/ninadgowdru', '_blank')
    },
    {
      id: 'linkedin',
      label: 'open linkedin profile',
      shortcut: 'l',
      description: 'External link to linkedin.com/in/ninad-gowda-0446522a6/',
      icon: <ExternalLink size={14} />,
      action: () => window.open('https://www.linkedin.com/in/ninad-gowda-0446522a6/', '_blank')
    }
  ];

  const q = query.trim().toLowerCase();
  const filtered = commands.filter(
    (c) =>
      c.label.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.shortcut.toLowerCase() === q
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      document.body.classList.add('has-terminal-modal');
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.classList.remove('has-terminal-modal');
    }
    return () => {
      document.body.classList.remove('has-terminal-modal');
    };
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
      terminalAudio.playClick();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
      terminalAudio.playClick();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        terminalAudio.playChirp();
        filtered[selectedIndex].action();
        onClose();
      }
    }
  };

  if (!isOpen) return null;

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
        style={{
          maxWidth: 620,
          width: '94%',
          padding: 0,
          background: 'var(--term-surface)',
          border: '1px solid var(--term-line)'
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Terminal Command Palette"
        onKeyDown={handleKeyDown}
      >
        {/* Palette Search Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '12px 16px',
            borderBottom: '1px solid var(--term-line)',
            background: 'var(--term-bg)'
          }}
        >
          <span style={{ color: 'var(--term-green)', fontWeight: 700, fontSize: 13 }}>$</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
              terminalAudio.playClick();
            }}
            placeholder="Type a command or jump to page (e.g. projects, resume, gears)..."
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              color: 'var(--term-text-strong)',
              fontSize: 12.5,
              width: '100%',
              fontFamily: 'var(--term-mono)'
            }}
            aria-label="Command search"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close command palette"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--term-muted)',
              cursor: 'pointer',
              padding: 2
            }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Command List */}
        <div
          style={{
            maxHeight: 330,
            overflowY: 'auto',
            padding: '6px 0'
          }}
        >
          {filtered.length === 0 ? (
            <div style={{ padding: '24px 16px', textAlign: 'center', color: 'var(--term-muted)', fontSize: 12 }}>
              No terminal command found for "{query}". Try "home", "projects", or "resume".
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    terminalAudio.playChirp();
                    item.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '8px 16px',
                    background: isSelected ? 'var(--term-surface-2)' : 'transparent',
                    border: 'none',
                    borderLeft: isSelected ? '2px solid var(--term-green)' : '2px solid transparent',
                    color: isSelected ? 'var(--term-text-strong)' : 'var(--term-text)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'var(--term-mono)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                    <span style={{ color: isSelected ? 'var(--term-green)' : 'var(--term-muted)', flexShrink: 0 }}>
                      {item.icon}
                    </span>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 500, color: isSelected ? 'var(--term-text-strong)' : 'var(--term-text)' }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: 10, color: 'var(--term-muted)', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                        {item.description}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0, marginLeft: 12 }}>
                    <kbd
                      style={{
                        background: 'var(--term-bg)',
                        border: '1px solid var(--term-line)',
                        padding: '1px 5px',
                        fontSize: 9.5,
                        color: 'var(--term-muted)',
                        borderRadius: 2
                      }}
                    >
                      {item.shortcut}
                    </kbd>
                    {isSelected && (
                      <span style={{ color: 'var(--term-green)' }}>
                        <CornerDownLeft size={11} />
                      </span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Palette Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '7px 16px',
            borderTop: '1px solid var(--term-line-soft)',
            fontSize: 10,
            color: 'var(--term-muted)',
            background: 'var(--term-bg)'
          }}
        >
          <span>Use ↑ / ↓ to navigate, ↵ to run</span>
          <span>esc to close</span>
        </div>
      </section>
    </div>
  );
}

