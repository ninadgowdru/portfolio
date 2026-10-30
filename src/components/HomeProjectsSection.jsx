import React, { useState } from 'react';
import { projects } from '../data/projects';
import { getProjectCover } from '../data/projectCovers';
import ProjectDetailModal from './ProjectDetailModal';

export default function HomeProjectsSection({ onNavigateToProjects }) {
  const [selectedProject, setSelectedProject] = useState(null);

  const featured = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="terminal-section" aria-labelledby="home-projects-title">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <p className="command-title" id="home-projects-title" style={{ margin: 0 }}>
          <span>$</span> cat projects.md
        </p>

        <button
          type="button"
          className="more-terminal-link"
          onClick={onNavigateToProjects}
          style={{ padding: 0 }}
        >
          view all 23 projects →
        </button>
      </div>

      <div className="project-terminal-grid">
        {featured.map((project) => (
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
              <span aria-hidden="true" style={{ fontSize: 10, color: 'var(--term-green)', marginTop: 4 }}>
                inspect system architecture →
              </span>
            </span>
          </button>
        ))}
      </div>

      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
