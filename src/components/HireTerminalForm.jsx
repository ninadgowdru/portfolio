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

      // Create mailto fallback link
      const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
        `[AppSec Inquiry] ${subject}`
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
    }, 800);
  };

  const isFormValid = fromEmail.trim().length > 0 && subject.trim().length > 0 && message.trim().length > 0;

  return (
    <section className="terminal-section" id="hire" aria-labelledby="hire-title">
      <p className="command-title" id="hire-title">
        <span>$</span> cat hire.me
      </p>

      <form className="hire-terminal" onSubmit={handleSubmit}>
        <div>
          <label>to:</label>
          <span style={{ color: 'var(--term-green)' }}>{profile.email}</span>
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
            disabled={status !== 'idle'}
          />
        </div>

        <div>
          <label htmlFor="hire-subject">subject:</label>
          <input
            id="hire-subject"
            type="text"
            placeholder="AppSec role / security audit / bug bounty"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            disabled={status !== 'idle'}
          />
        </div>

        <textarea
          aria-label="Message"
          placeholder="Share project details, team scope, or the role you are hiring for..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          disabled={status !== 'idle'}
        />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <button type="submit" disabled={!isFormValid || status !== 'idle'}>
            {status === 'sending' ? 'encrypting...' : status === 'sent' ? '✓ transmitted' : 'send'}
          </button>

          {status === 'sent' && (
            <span style={{ fontSize: 12, color: 'var(--term-green)' }}>
              [✓] Packet dispatched! Copied email to clipboard.
            </span>
          )}
        </div>
      </form>
    </section>
  );
}
