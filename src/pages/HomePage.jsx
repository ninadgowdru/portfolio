import React, { useState } from 'react';
import {
  SiPython,
  SiFastapi,
  SiLinux,
  SiGit,
  SiGithub,
  SiPytorch,
  SiDocker
} from 'react-icons/si';
import { FaLinkedinIn, FaShieldAlt, FaTerminal, FaSearch, FaCheckCircle, FaLock } from 'react-icons/fa';
import { Mail, MessageSquareText, FileText } from 'lucide-react';

import ParticlePortrait from '../components/ParticlePortrait';
import RecruiterSummaryModal from '../components/RecruiterSummaryModal';
import CodingStatusModal from '../components/CodingStatusModal';
import GithubActivityGrid from '../components/GithubActivityGrid';
import HallOfFameSection from '../components/HallOfFameSection';
import ExperienceSection from '../components/ExperienceSection';
import WhyHireMeSection from '../components/WhyHireMeSection';
import HireTerminalForm from '../components/HireTerminalForm';
import { profile } from '../data/profile';

export default function HomePage({ onNavigate, onShowToast }) {
  const [activeModal, setActiveModal] = useState(null); // 'summary' | 'coding' | null

  const getTechIcon = (iconName) => {
    switch (iconName) {
      case 'python':
        return <SiPython size={12} aria-hidden={true} />;
      case 'fastapi':
        return <SiFastapi size={12} aria-hidden={true} />;
      case 'linux':
        return <SiLinux size={12} aria-hidden={true} />;
      case 'git':
        return <SiGit size={12} aria-hidden={true} />;
      case 'shield':
        return <FaShieldAlt size={12} aria-hidden={true} />;
      case 'terminal':
        return <FaTerminal size={12} aria-hidden={true} />;
      case 'search':
        return <FaSearch size={12} aria-hidden={true} />;
      case 'lock':
        return <FaLock size={12} aria-hidden={true} />;
      default:
        return <FaCheckCircle size={12} aria-hidden={true} />;
    }
  };

  const nameChars = profile.name.split('');

  const handleStartConversation = (e) => {
    e.preventDefault();
    const hireElem = document.getElementById('hire');
    if (hireElem) {
      hireElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main id="main-content" className="terminal-shell terminal-home">
      <section className="profile-console" aria-labelledby="profile-name">
        {/* Visual / Canvas Column */}
        <ParticlePortrait
          onOpenSummary={() => setActiveModal('summary')}
          onOpenCoding={() => setActiveModal('coding')}
        />

        {/* Copy Column */}
        <div className="profile-console__copy">
          <span
            className="availability-stamp"
            title={profile.availabilityTitle}
          >
            {profile.availability}
          </span>

          <p className="command-label">~ whoami</p>

          <h1 id="profile-name" aria-label={profile.displayName}>
            {nameChars.map((ch, idx) => (
              <span
                key={idx}
                style={{ '--letter': idx }}
                aria-hidden="true"
              >
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            ))}
          </h1>

          <p className="profile-console__lead">
            {profile.lead}
          </p>

          <p className="currently-building">
            <span>{profile.currentlyBuilding.label}</span>{' '}
            <a
              href="/projects"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('projects');
              }}
            >
              {profile.currentlyBuilding.name}
            </a>{' '}
            — {profile.currentlyBuilding.description}
          </p>

          <ul className="tech-tags" aria-label="Primary security technologies">
            {profile.techTags.map((tech, idx) => (
              <li key={tech.label} className={`tone-${(idx % 4) + 1}`}>
                {getTechIcon(tech.icon)}
                {tech.label}
              </li>
            ))}
          </ul>

          <div className="social-row" aria-label="Social and security links">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
            >
              <SiGithub />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedinIn />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email Ninad"
            >
              <Mail size={16} />
            </a>
          </div>

          <div className="profile-actions">
            <a
              href={profile.resumePdf}
              download="Ninad_S_P_Resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              <FileText size={14} /> resume
            </a>
            <a
              href="#hire"
              onClick={handleStartConversation}
            >
              <MessageSquareText size={14} /> start a conversation
            </a>
          </div>
        </div>
      </section>

      {/* Interactive Modals */}
      <RecruiterSummaryModal
        isOpen={activeModal === 'summary'}
        onClose={() => setActiveModal(null)}
      />
      <CodingStatusModal
        isOpen={activeModal === 'coding'}
        onClose={() => setActiveModal(null)}
      />

      {/* GitHub Activity Grid */}
      <GithubActivityGrid username="ninadgowdru" />

      {/* Hall of Fame & Achievements */}
      <HallOfFameSection />

      {/* Experience Section */}
      <ExperienceSection onNavigateToExperience={() => onNavigate('experience')} />

      {/* Why Hire Me Philosophy */}
      <WhyHireMeSection />

      {/* Interactive Terminal Contact */}
      <HireTerminalForm onShowToast={onShowToast} />
    </main>
  );
}
