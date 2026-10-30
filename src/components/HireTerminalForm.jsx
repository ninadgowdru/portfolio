import React, { useState } from 'react';
import { profile } from '../data/profile';

export default function HireTerminalForm({ onShowToast }) {
  const [fromEmail, setFromEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fromEmail || !subject || !message) return;

    setStatus('sending');

    setTimeout(() => {
      setStatus('sent');

      const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
        `[AppSec] ${subject}`
      )}&body=${encodeURIComponent(
        `From: ${fromEmail}\n\n${message}`
      )}`;

      window.open(mailtoUrl, '_blank');

      if (navigator.clipboard) {
        navigator.clipboard.writeText(profile.email);
      }

      if (onShowToast) {
        onShowToast(`Transmission prepared. Copied ${profile.email} to clipboard!`);
      }

      setTimeout(() => {
        setFromEmail('');
        setSubject('');
        setMessage('');
        setStatus('idle');
      }, 4000);
    }, 600);
  };

  return (
    <section className="terminal-section" id="hire" aria-labelledby="hire-title">
      <p className="command-title" id="hire-title">
        <span>$</span> cat hire.me
      </p>

      <form className="hire-terminal" onSubmit={handleSubmit}>
        <div>
          <label>to:</label>
          <span>{profile.email}</span>
        </div>

        <div>
          <label htmlFor="hire-from">from:</label>
          <input
            id="hire-from"
            type="email"
            placeholder="you@company.com"
            value={fromEmail}
            onChange={(e) => setFromEmail(e.target.value)}
            required
            disabled={status === 'sending'}
          />
        </div>

        <div>
          <label htmlFor="hire-subject">subject:</label>
          <input
            id="hire-subject"
            type="text"
            placeholder="AppSec Role / Security Audit / Bug Bounty"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            disabled={status === 'sending'}
          />
        </div>

        <textarea
          aria-label="Message"
          placeholder="Share the project, team, and why this could be a good fit..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          disabled={status === 'sending'}
        />

        <button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'transmitting...' : status === 'sent' ? '✓ transmitted' : 'send'}
        </button>
      </form>
    </section>
  );
}
