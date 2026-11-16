import React, { useState } from 'react';
import { SiGithub } from 'react-icons/si';
import { projects } from '../data/projects';
import { getProjectCover } from '../data/projectCovers';
import ProjectDetailModal from '../components/ProjectDetailModal';

export default function ProjectsPage() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const q = searchQuery.trim().toLowerCase();

  const filteredProjects = projects.filter((p) => {
    const matchesCategory =
      filter === 'all' ||
      (filter === 'ai' && p.category === 'ai') ||
      (filter === 'security' && p.category === 'security') ||
      (filter === 'tools' && p.category === 'tools');

    if (!matchesCategory) return false;
    if (!q) return true;

    return (
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tech.some((t) => t.toLowerCase().includes(q)) ||
      (p.metrics && p.metrics.toLowerCase().includes(q))
    );
  });

  const featuredList = filteredProjects.filter((p) => p.featured);
  const otherList = filteredProjects.filter((p) => !p.featured);

  const countAll = projects.length;
  const countAi = projects.filter((p) => p.category === 'ai').length;
  const countSec = projects.filter((p) => p.category === 'security').length;
  const countTools = projects.filter((p) => p.category === 'tools').length;

  return (
    <main id="main-content" className="terminal-shell route-page projects-route">
      <h1>projects</h1>

      <div className="route-toolbar">
        <div className="terminal-tabs" role="group" aria-label="Filter projects">
          <span>
            <button
              type="button"
              aria-pressed={filter === 'all'}
              onClick={() => setFilter('all')}
            >
              all {countAll}
            </button>
            <i>/</i>
          </span>
          <span>
            <button
              type="button"
              aria-pressed={filter === 'ai'}
              onClick={() => setFilter('ai')}
            >
              ai &amp; llm safety {countAi}
            </button>
            <i>/</i>
          </span>
          <span>
            <button
              type="button"
              aria-pressed={filter === 'security'}
              onClick={() => setFilter('security')}
            >
              security &amp; waf {countSec}
            </button>
            <i>/</i>
          </span>
          <span>
            <button
              type="button"
              aria-pressed={filter === 'tools'}
              onClick={() => setFilter('tools')}
            >
              recon &amp; tools {countTools}
            </button>
          </span>
        </div>

        <a
          href="https://github.com/ninadgowdru"
          target="_blank"
          rel="noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
        >
          <SiGithub /> all repos
        </a>
      </div>

      {/* Terminal grep search bar */}
      <div
        className="terminal-grep-bar"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'var(--term-surface)',
          border: '1px solid var(--term-line)',
          padding: '6px 12px',
          marginBottom: 20
        }}
      >
        <span style={{ color: 'var(--term-green)', fontSize: 11, fontFamily: 'var(--term-mono)' }}>$ grep -i</span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="filter by keyword, tech, or vulnerability (e.g. BERT, XSS, WAF, FastAPI)..."
          style={{
            background: 'none',
            border: 'none',
            outline: 'none',
            color: 'var(--term-text-strong)',
            width: '100%',
            fontSize: 11.5,
            fontFamily: 'var(--term-mono)'
          }}
          aria-label="Filter projects by search query"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--term-muted)',
              cursor: 'pointer',
              fontSize: 11,
              fontFamily: 'var(--term-mono)'
            }}
          >
            clear [esc]
          </button>
        )}
      </div>

      {filteredProjects.length === 0 && (
        <div className="empty-terminal-state" style={{ padding: '36px 14px', textAlign: 'center' }}>
          <p style={{ color: 'var(--term-amber)', margin: '0 0 6px', fontSize: 13 }}>
            $ grep: no matching systems found for "{searchQuery}"
          </p>
          <p style={{ color: 'var(--term-muted)', fontSize: 11, margin: 0 }}>
            Try searching for "BERT", "XSS", "WAF", "Python", or switch back to the "all" filter tab.
          </p>
        </div>
      )}

      {/* Featured Projects Group */}
      {featuredList.length > 0 && (
        <section className="project-group" aria-labelledby="featured-heading">
          <header>
            <h2 id="featured-heading">featured systems</h2>
            <span aria-hidden="true" />
          </header>

          <div className="project-terminal-grid">
            {featuredList.map((project) => (
              <button
                key={project.id}
                type="button"
                className="project-terminal-card"
                onClick={() => setSelectedProject(project)}
                aria-label={`Open details for ${project.name}`}
              >
                <span className="project-terminal-card__media">
                  <img src={getProjectCover(project.id)} alt="" loading="lazy" />
                  <i aria-hidden="true" />
                </span>

                <span className="project-terminal-card__copy">
                  <strong>{project.name}</strong>
                  <em>featured</em>
                  <small>{project.description}</small>
                  <b>{project.tech.join(' · ')}</b>
                  <span aria-hidden="true">inspect system →</span>
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Additional Projects Group */}
      {otherList.length > 0 && (
        <section className="project-group" aria-labelledby="other-heading" style={{ marginTop: 28 }}>
          <header>
            <h2 id="other-heading">security &amp; automation tooling</h2>
            <span aria-hidden="true" />
          </header>

          <div className="project-terminal-grid">
            {otherList.map((project) => (
              <button
                key={project.id}
                type="button"
                className="project-terminal-card"
                onClick={() => setSelectedProject(project)}
                aria-label={`Open details for ${project.name}`}
              >
                <span className="project-terminal-card__media">
                  <img src={getProjectCover(project.id)} alt="" loading="lazy" />
                  <i aria-hidden="true" />
                </span>

                <span className="project-terminal-card__copy">
                  <strong>{project.name}</strong>
                  <em>{project.category}</em>
                  <small>{project.description}</small>
                  <b>{project.tech.join(' · ')}</b>
                  <span aria-hidden="true">inspect tool →</span>
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Modal Details */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </main>
  );
}
