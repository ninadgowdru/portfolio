import React, { useState, useEffect } from 'react';

export default function Footer() {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const ist = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }).format(new Date());
        setTimeStr(`${ist} IST`);
      } catch (e) {
        setTimeStr('IST');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="terminal-footer terminal-shell">
      <span>{timeStr}</span>
      <button type="button" aria-label="Back to top" onClick={scrollToTop}>
        top ↑
      </button>
    </footer>
  );
}
