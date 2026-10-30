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
    // Read route from window.location pathname or hash
    const syncRouteFromUrl = () => {
      const path = window.location.pathname.replace(/^\//, '').toLowerCase();
      const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();

      const target = hash || path;
      if (['projects', 'experience', 'blog', 'gears'].includes(target)) {
        setRoute(target);
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
    const targetUrl = newRoute === 'home' ? '/' : `/${newRoute}`;
    window.history.pushState(null, '', targetUrl);
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
