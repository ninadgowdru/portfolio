import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ExperiencePage from './pages/ExperiencePage';
import BlogPage from './pages/BlogPage';
import GearsPage from './pages/GearsPage';

export default function App() {
  const [route, setRoute] = useState('home');
  const [toastMessage, setToastMessage] = useState(null);

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

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  return (
    <div className="terminal-app-container">
      {/* Skip Link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      {/* Persistent Navigation */}
      <Navbar currentRoute={route} onNavigate={navigateTo} />

      {/* Active Page View */}
      {route === 'home' && <HomePage onNavigate={navigateTo} onShowToast={showToast} />}
      {route === 'projects' && <ProjectsPage onNavigate={navigateTo} />}
      {route === 'experience' && <ExperiencePage onNavigate={navigateTo} />}
      {route === 'blog' && <BlogPage onNavigate={navigateTo} />}
      {route === 'gears' && <GearsPage onNavigate={navigateTo} />}

      {/* Persistent Footer */}
      <Footer />

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
