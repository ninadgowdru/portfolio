import React, { useEffect } from 'react';

export default function ArticleReaderModal({ article, onClose }) {
  useEffect(() => {
    if (!article) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.classList.add('has-terminal-modal');
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('has-terminal-modal');
    };
  }, [article, onClose]);

  if (!article) return null;

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
        style={{ maxWidth: 740, width: '92%', maxHeight: '86vh', overflowY: 'auto' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="article-reader-title"
      >
        <button
          className="terminal-modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
        >
          ×
        </button>

        <p className="command-label">$ cat writeups/{article.slug}.md</p>
        <span style={{ fontSize: 11, color: 'var(--term-muted)' }}>
          {article.date} · {article.readTime} · category: {article.category}
        </span>

        <h2 id="article-reader-title" style={{ fontSize: 24, margin: '12px 0 16px', color: 'var(--term-text-strong)', lineHeight: 1.25 }}>
          {article.title}
        </h2>

        <div style={{ color: 'var(--term-text)', fontSize: 13.5, lineHeight: 1.75, borderTop: '1px solid var(--term-line-soft)', paddingTop: 16 }}>
          {article.content.trim().split('\n\n').map((para, idx) => {
            if (para.startsWith('### ')) {
              return (
                <h3 key={idx} style={{ color: 'var(--term-green)', margin: '20px 0 8px', fontSize: 16 }}>
                  {para.replace('### ', '')}
                </h3>
              );
            }
            if (para.startsWith('- ')) {
              const items = para.split('\n').map(l => l.replace(/^[-\*]\s+/, ''));
              return (
                <ul key={idx} style={{ margin: '8px 0 16px', paddingLeft: 20, color: 'var(--term-text)' }}>
                  {items.map((it, i) => (
                    <li key={i} style={{ marginBottom: 6 }}>{it}</li>
                  ))}
                </ul>
              );
            }
            if (/^\d+\.\s+/.test(para)) {
              const items = para.split('\n').map(l => l.replace(/^\d+\.\s+/, ''));
              return (
                <ol key={idx} style={{ margin: '8px 0 16px', paddingLeft: 20, color: 'var(--term-text)' }}>
                  {items.map((it, i) => (
                    <li key={i} style={{ marginBottom: 6 }}>{it}</li>
                  ))}
                </ol>
              );
            }
            return <p key={idx} style={{ margin: '0 0 14px' }}>{para}</p>;
          })}
        </div>

        <div style={{ borderTop: '1px solid var(--term-line-soft)', marginTop: 24, paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: 'var(--term-dim)' }}>▊ end of article</span>
          <button
            type="button"
            onClick={onClose}
            style={{ background: 'none', border: '1px solid var(--term-line)', color: 'var(--term-muted)', padding: '4px 10px', fontSize: 11, cursor: 'pointer' }}
          >
            close
          </button>
        </div>
      </section>
    </div>
  );
}
