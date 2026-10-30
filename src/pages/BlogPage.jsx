import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import ArticleReaderModal from '../components/ArticleReaderModal';

export default function BlogPage({ onNavigate }) {
  const [filter, setFilter] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const filteredPosts = blogPosts.filter((post) => {
    if (filter === 'all') return true;
    if (filter === 'research') return post.category === 'research';
    if (filter === 'advisories') return post.category === 'advisories';
    if (filter === 'notes') return post.category === 'notes';
    return true;
  });

  return (
    <main id="main-content" className="terminal-shell" style={{ padding: '48px 0 92px' }}>
      <div style={{ marginBottom: 20 }}>
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="detail-hero__back"
          style={{ background: 'none', border: 'none', padding: 0 }}
        >
          <ArrowLeft size={14} /> portfolio index
        </button>
      </div>

      <h1 style={{ fontSize: 28, margin: '0 0 16px', color: 'var(--term-text-strong)', letterSpacing: '-0.02em' }}>
        blog & security research
      </h1>

      <div className="route-toolbar">
        <div className="terminal-tabs" role="group" aria-label="Filter articles">
          <span>
            <button
              type="button"
              aria-pressed={filter === 'all'}
              onClick={() => setFilter('all')}
            >
              all
            </button>
            <i>/</i>
          </span>
          <span>
            <button
              type="button"
              aria-pressed={filter === 'research'}
              onClick={() => setFilter('research')}
            >
              research
            </button>
            <i>/</i>
          </span>
          <span>
            <button
              type="button"
              aria-pressed={filter === 'advisories'}
              onClick={() => setFilter('advisories')}
            >
              advisories
            </button>
            <i>/</i>
          </span>
          <span>
            <button
              type="button"
              aria-pressed={filter === 'notes'}
              onClick={() => setFilter('notes')}
            >
              notes
            </button>
          </span>
        </div>

        <span className="route-toolbar__meta">
          {filteredPosts.length} entries
        </span>
      </div>

      <ul className="blog-terminal-list">
        {filteredPosts.map((post) => (
          <li key={post.id}>
            <a
              href={`#${post.slug}`}
              onClick={(e) => {
                e.preventDefault();
                setSelectedArticle(post);
              }}
            >
              <time dateTime={post.date}>{post.date}</time>
              <span>{post.title}</span>
              <small>{post.categoryLabel} · {post.readTime}</small>
            </a>
          </li>
        ))}
      </ul>

      {/* Article Reader Modal */}
      <ArticleReaderModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </main>
  );
}
