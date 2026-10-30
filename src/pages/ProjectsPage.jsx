import React, { useState } from 'react';
import { SiGithub } from 'react-icons/si';
import { Star, ShieldAlert, Cpu, Wrench, ExternalLink, ArrowLeft } from 'lucide-react';
import { projects } from '../data/projects';
import ProjectDetailModal from '../components/ProjectDetailModal';

export default function ProjectsPage({ onNavigate }) {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = projects.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'security') return p.category === 'security';
    if (filter === 'ai') return p.category === 'ai';
    if (filter === 'tools') return p.category === 'tools';
    return true;
  });

  const featuredList = filteredProjects.filter((p) => p.featured);
  const otherList = filteredProjects.filter((p) => !p.featured);

  return (
    <main id="main-content" className="terminal-shell projects-route" style={{ padding: '48px 0 92px' }}>
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
        projects
      </h1>

      <div className="route-toolbar">
        <div className="terminal-tabs" role="group" aria-label="Filter projects">
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
              aria-pressed={filter === 'security'}
              onClick={() => setFilter('security')}
            >
              security & waf
            </button>
            <i>/</i>
          </span>
          <span>
            <button
              type="button"
              aria-pressed={filter === 'ai'}
              onClick={() => setFilter('ai')}
            >
              ai & llm safety
            </button>
            <i>/</i>
          </span>
          <span>
            <button
              type="button"
              aria-pressed={filter === 'tools'}
              onClick={() => setFilter('tools')}
            >
              recon & tools
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

      {/* Featured Projects */}
      {featuredList.length > 0 && (
        <section className="project-group" aria-labelledby="featured-heading">
          <header style={{ borderBottom: '1px solid var(--term-line-soft)', paddingBottom: 8, marginBottom: 20 }}>
            <h2 id="featured-heading" style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--term-green)', margin: 0 }}>
              featured systems
            </h2>
          </header>

          <div className="project-terminal-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 20 }}>
            {featuredList.map((p) => (
              <article
                key={p.id}
                className="project-terminal-card"
                onClick={() => setSelectedProject(p)}
                style={{
                  border: '1px solid var(--term-line)',
                  background: 'var(--term-surface)',
                  padding: 20,
                  cursor: 'pointer',
                  transition: 'border-color 0.18s, transform 0.18s, background 0.18s',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                    <h3 style={{ margin: 0, fontSize: 16, color: 'var(--term-text-strong)' }}>
                      {p.name}
                    </h3>
                    <span style={{ fontSize: 11, color: 'var(--term-amber)', letterSpacing: '0.04em' }}>
                      {p.category.toUpperCase()}
                    </span>
                  </div>

                  <p style={{ margin: '0 0 12px', fontSize: 12, color: 'var(--term-dim)' }}>
                    {p.tagline}
                  </p>

                  <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--term-text)', lineHeight: 1.6 }}>
                    {p.description}
                  </p>
                </div>

                <div>
                  {p.metrics && (
                    <div style={{ fontSize: 11.5, color: 'var(--term-mint)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span>●</span> {p.metrics}
                    </div>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                    {p.tech.slice(0, 4).map((t, idx) => (
                      <span
                        key={idx}
                        style={{
                          background: 'var(--term-bg)',
                          border: '1px solid var(--term-line-soft)',
                          padding: '2px 7px',
                          fontSize: 11,
                          color: 'var(--term-muted)'
                        }}
                      >
                        {t}
                      </span>
                    ))}
                    {p.tech.length > 4 && (
                      <span style={{ fontSize: 11, color: 'var(--term-dim)', alignSelf: 'center' }}>
                        +{p.tech.length - 4} more
                      </span>
                    )}
                  </div>

                  <div style={{ borderTop: '1px dashed var(--term-line-soft)', paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11.5, color: 'var(--term-muted)' }}>
                    <span style={{ color: 'var(--term-green)' }}>inspect details →</span>
                    {p.githubUrl && (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(p.githubUrl, '_blank');
                        }}
                        style={{ textDecoration: 'underline', color: 'var(--term-dim)' }}
                      >
                        github
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Additional Repos & Tools */}
      {otherList.length > 0 && (
        <section className="project-group" aria-labelledby="other-heading" style={{ marginTop: 44 }}>
          <header style={{ borderBottom: '1px solid var(--term-line-soft)', paddingBottom: 8, marginBottom: 20 }}>
            <h2 id="other-heading" style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--term-dim)', margin: 0 }}>
              offensive tools & repositories
            </h2>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {otherList.map((p) => (
              <article
                key={p.id}
                onClick={() => setSelectedProject(p)}
                style={{
                  border: '1px solid var(--term-line)',
                  background: 'var(--term-surface)',
                  padding: 16,
                  cursor: 'pointer',
                  transition: 'border-color 0.18s',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                    <h3 style={{ margin: 0, fontSize: 14.5, color: 'var(--term-text-strong)' }}>
                      {p.name}
                    </h3>
                    {p.stars > 0 && (
                      <span style={{ fontSize: 11, color: 'var(--term-amber)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <Star size={12} fill="currentColor" /> {p.stars}
                      </span>
                    )}
                  </div>
                  <p style={{ margin: '0 0 12px', fontSize: 12.5, color: 'var(--term-muted)', lineHeight: 1.5 }}>
                    {p.description}
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--term-line-soft)', paddingTop: 8, fontSize: 11 }}>
                  <span style={{ color: 'var(--term-dim)' }}>{p.tech.join(' · ')}</span>
                  <span style={{ color: 'var(--term-green)' }}>open →</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
}
