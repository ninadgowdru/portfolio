import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ExperiencePage from './pages/ExperiencePage';
import BlogPage from './pages/BlogPage';
import GearsPage from './pages/GearsPage';
import CommandPaletteModal from './components/CommandPaletteModal';
import { terminalAudio } from './utils/audio';

export default function App() {
  const [route, setRoute] = useState('home');
  const [toastMessage, setToastMessage] = useState(null);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  useEffect(() => {
    const syncRouteFromUrl = () => {
      // Check hash first (e.g., #projects, #experience)
      const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
      if (['projects', 'experience', 'blog', 'gears'].includes(hash)) {
        setRoute(hash);
        return;
      }

      // Check pathname (e.g. /projects or /portfolio/projects)
      const segments = window.location.pathname.split('/').filter(Boolean);
      const last = segments[segments.length - 1]?.toLowerCase();
      if (['projects', 'experience', 'blog', 'gears'].includes(last)) {
        setRoute(last);
      } else {
        setRoute('home');
      }
    };

    syncRouteFromUrl();
    window.addEventListener('popstate', syncRouteFromUrl);
    window.addEventListener('hashchange', syncRouteFromUrl);

    return () => {
      window.removeEventListener('popstate', syncRouteFromUrl);
      window.removeEventListener('hashchange', syncRouteFromUrl);
    };
  }, []);

  const navigateTo = (newRoute) => {
    terminalAudio.playClick();
    setRoute(newRoute);

    // Compute base path (supports GitHub Pages /portfolio repo path)
    const isGhPages = window.location.pathname.startsWith('/portfolio');
    const prefix = isGhPages ? '/portfolio' : '';
    const targetUrl = newRoute === 'home' ? `${prefix}/` : `${prefix}/${newRoute}`;

    try {
      window.history.pushState(null, '', targetUrl);
    } catch (e) {
      // Fallback to hash navigation if pushState is restricted
      window.location.hash = newRoute === 'home' ? '' : `#${newRoute}`;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Global Terminal Keyboard Shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      // Check if user is typing in an input, textarea, or contentEditable
      const target = e.target;
      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      // Cmd+K or Ctrl+K or ? toggles command palette
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
        terminalAudio.playClick();
        return;
      }

      if (isInput) return;

      if (e.key === '?') {
        e.preventDefault();
        setIsPaletteOpen(true);
        terminalAudio.playClick();
        return;
      }

      // Single-key routing shortcuts
      if (e.key === '1' || e.key === 'h') {
        navigateTo('home');
      } else if (e.key === '2' || e.key === 'p') {
        navigateTo('projects');
      } else if (e.key === '3' || e.key === 'e') {
        navigateTo('experience');
      } else if (e.key === '4' || e.key === 'b') {
        navigateTo('blog');
      } else if (e.key === '5' || e.key === 'g') {
        navigateTo('gears');
      } else if (e.key === 't') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  return (
    <div className="terminal-app-container">
      {/* Persistent Navigation */}
      <Navbar
        currentRoute={route}
        onNavigate={navigateTo}
        onOpenCommandPalette={() => setIsPaletteOpen(true)}
      />

      {/* Active Page View */}
      {route === 'home' && <HomePage onNavigate={navigateTo} onShowToast={showToast} />}
      {route === 'projects' && <ProjectsPage onNavigate={navigateTo} />}
      {route === 'experience' && <ExperiencePage onNavigate={navigateTo} />}
      {route === 'blog' && <BlogPage onNavigate={navigateTo} />}
      {route === 'gears' && <GearsPage onNavigate={navigateTo} />}

      {/* Persistent Footer */}
      <Footer
        onOpenCommandPalette={() => setIsPaletteOpen(true)}
        onShowToast={showToast}
      />

      {/* Terminal Command Palette Modal */}
      <CommandPaletteModal
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onNavigate={navigateTo}
        onShowToast={showToast}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="terminal-toast" role="status" aria-live="polite">
          <span>●</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
