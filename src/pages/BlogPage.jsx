import React, { useState } from 'react';
import { blogPosts } from '../data/blogPosts';
import ArticleReaderModal from '../components/ArticleReaderModal';

export default function BlogPage() {
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
    <main id="main-content" className="terminal-shell route-page blog-route">
      <h1>blog</h1>

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

      <ArticleReaderModal
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </main>
  );
}
