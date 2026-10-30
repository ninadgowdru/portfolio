import React, { useState } from 'react';
import { SiGithub } from 'react-icons/si';
import { Star, ShieldAlert, Cpu, Wrench, ExternalLink } from 'lucide-react';
import { projects } from '../data/projects';
import ProjectDetailModal from '../components/ProjectDetailModal';

export default function ProjectsPage() {
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
              security &amp; waf
            </button>
            <i>/</i>
          </span>
          <span>
            <button
              type="button"
              aria-pressed={filter === 'ai'}
              onClick={() => setFilter('ai')}
            >
              ai &amp; llm safety
            </button>
            <i>/</i>
          </span>
          <span>
            <button
              type="button"
              aria-pressed={filter === 'tools'}
              onClick={() => setFilter('tools')}
            >
              recon &amp; tools
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
          <header>
            <h2 id="featured-heading">featured systems</h2>
          </header>

          <div className="project-grid">
            {featuredList.map((project) => (
              <article
                key={project.id}
                className="project-card"
                onClick={() => setSelectedProject(project)}
                style={{ cursor: 'pointer' }}
              >
                <div className="project-card__header">
                  <h3>{project.title}</h3>
                  <span className="project-card__badge">featured</span>
                </div>

                <p className="project-card__summary">{project.summary}</p>

                <div className="project-card__meta">
                  <div className="project-card__stack">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <span key={i}>{tech}</span>
                    ))}
                  </div>

                  <div className="project-card__actions" onClick={(e) => e.stopPropagation()}>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <SiGithub size={14} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View live deployment for ${project.title}`}
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Other Projects */}
      {otherList.length > 0 && (
        <section className="project-group" aria-labelledby="other-heading" style={{ marginTop: 36 }}>
          <header>
            <h2 id="other-heading">security &amp; automation tooling</h2>
          </header>

          <div className="project-grid">
            {otherList.map((project) => (
              <article
                key={project.id}
                className="project-card"
                onClick={() => setSelectedProject(project)}
                style={{ cursor: 'pointer' }}
              >
                <div className="project-card__header">
                  <h3>{project.title}</h3>
                  {project.stars && project.stars > 0 && (
                    <span className="project-card__stars" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--term-amber)' }}>
                      <Star size={12} fill="currentColor" /> {project.stars}
                    </span>
                  )}
                </div>

                <p className="project-card__summary">{project.summary}</p>

                <div className="project-card__meta">
                  <div className="project-card__stack">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i}>{tech}</span>
                    ))}
                  </div>

                  <div className="project-card__actions" onClick={(e) => e.stopPropagation()}>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <SiGithub size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
}
