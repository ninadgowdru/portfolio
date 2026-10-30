import React, { useEffect } from 'react';
import { ExternalLink, X, ShieldCheck } from 'lucide-react';
import { SiGithub } from 'react-icons/si';

export default function ProjectDetailModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.classList.add('has-terminal-modal');
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('has-terminal-modal');
    };
  }, [project, onClose]);

  if (!project) return null;

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
        style={{ maxWidth: 680, width: '92%' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
      >
        <button
          className="terminal-modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
        >
          ×
        </button>

        <p className="command-label">$ cat {project.id}.md</p>
        <h2 id="project-dialog-title" style={{ fontSize: 22, margin: '8px 0 4px', color: 'var(--term-text-strong)' }}>
          {project.name}
        </h2>
        <p style={{ color: 'var(--term-amber)', fontSize: 13, margin: '0 0 16px' }}>
          {project.tagline}
        </p>

        <p style={{ lineHeight: 1.7, fontSize: 13.5, color: 'var(--term-text)', marginBottom: 16 }}>
          {project.fullDescription || project.description}
        </p>

        {project.architecture && (
          <div style={{ background: 'var(--term-surface)', border: '1px solid var(--term-line-soft)', padding: 14, marginBottom: 16 }}>
            <h4 style={{ margin: '0 0 8px', fontSize: 12, color: 'var(--term-green)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Key Architecture & Capabilities
            </h4>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12.5, color: 'var(--term-muted)', lineHeight: 1.6 }}>
              {project.architecture.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {project.metrics && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--term-mint)', marginBottom: 16 }}>
            <ShieldCheck size={16} />
            <span>{project.metrics}</span>
          </div>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
          {project.tech.map((t, idx) => (
            <span
              key={idx}
              style={{
                background: 'var(--term-surface)',
                border: '1px solid var(--term-line)',
                padding: '3px 8px',
                fontSize: 11,
                color: 'var(--term-text)'
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="route-toolbar"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, border: '1px solid var(--term-green)', color: 'var(--term-green)', padding: '6px 14px', fontSize: 12 }}
            >
              <SiGithub size={14} /> view code on github
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, border: '1px solid var(--term-line)', color: 'var(--term-text)', padding: '6px 14px', fontSize: 12 }}
            >
              <ExternalLink size={14} /> live demonstration
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
