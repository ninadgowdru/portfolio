import React, { useState } from 'react';
import { SiGithub } from 'react-icons/si';
import { projects } from '../data/projects';
import { getProjectCover } from '../data/projectCovers';
import ProjectDetailModal from '../components/ProjectDetailModal';

export default function ProjectsPage() {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = projects.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'ai') return p.category === 'ai';
    if (filter === 'security') return p.category === 'security';
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
