import React from 'react';

export default function Navbar({ currentRoute, onNavigate }) {
  const navItems = [
    { id: 'projects', label: 'projects', path: '/projects' },
    { id: 'blog', label: 'blog', path: '/blog' },
    { id: 'gears', label: 'gears', path: '/gears' }
  ];

  return (
    <header className="terminal-header">
      <nav className="terminal-shell terminal-nav" aria-label="Main Navigation">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
          className="terminal-wordmark"
          aria-label="Ninad S P Home"
        >
          ninad
        </a>

        <div className="terminal-nav__links">
          {navItems.map((item) => {
            const isActive = currentRoute === item.id;
            return (
              <a
                key={item.id}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.id);
                }}
                className={isActive ? 'is-active' : ''}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
