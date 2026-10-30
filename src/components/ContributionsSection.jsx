import React, { useState } from 'react';

const contributionsData = {
  'hall-of-fame': [
    {
      id: 'nasa',
      target: 'NASA',
      title: 'Critical vulnerability disclosure & official Letter of Recognition',
      badge: 'hall of fame',
      url: 'https://bugcrowd.com'
    },
    {
      id: 'microsoft',
      target: 'Microsoft',
      title: 'Responsible disclosure of security flaw & MSRC Hall of Fame listing',
      badge: 'hall of fame',
      url: 'https://msrc.microsoft.com'
    },
    {
      id: 'jpmorgan',
      target: 'J.P. Morgan',
      title: 'Responsible disclosure of financial service API vulnerability',
      badge: 'hall of fame',
      url: 'https://www.jpmorgan.com'
    },
    {
      id: 'ferrari',
      target: 'Ferrari',
      title: 'Security finding reported and listed in security researchers Hall of Fame',
      badge: 'hall of fame',
      url: 'https://www.ferrari.com'
    },
    {
      id: 'nokia',
      target: 'Nokia',
      title: 'Responsible disclosure of telecom infrastructure vulnerability',
      badge: 'hall of fame',
      url: 'https://www.nokia.com'
    },
    {
      id: 'ibm',
      target: 'IBM',
      title: 'Enterprise infrastructure security vulnerability acknowledgment',
      badge: 'hall of fame',
      url: 'https://www.ibm.com'
    },
    {
      id: 'philips',
      target: 'Philips',
      title: 'Healthcare tech vulnerability disclosure & Hall of Fame acknowledgment',
      badge: 'hall of fame',
      url: 'https://www.philips.com'
    },
    {
      id: 'gea',
      target: 'GEA',
      title: 'Industrial automation security vulnerability discovery & acknowledgment',
      badge: 'hall of fame',
      url: 'https://www.gea.com'
    }
  ],
  disclosures: [
    {
      id: 'lg',
      target: 'LG Electronics',
      title: 'Official Letter of Appreciation for responsible security vulnerability reporting',
      badge: 'letter',
      url: 'https://www.lg.com'
    },
    {
      id: 'paytm',
      target: 'Paytm',
      title: 'Fintech platform security finding and Letter of Appreciation',
      badge: 'letter',
      url: 'https://paytm.com'
    },
    {
      id: 'ideagen',
      target: 'Ideagen',
      title: 'Enterprise compliance software security issue reported and recognized',
      badge: 'letter',
      url: 'https://www.ideagen.com'
    },
    {
      id: 'bugcrowd-multi',
      target: 'Bugcrowd 20+ Orgs',
      title: 'Disclosed XSS, IDOR/BOLA, SSRF, and sensitive data exposures',
      badge: 'verified',
      url: 'https://bugcrowd.com'
    }
  ],
  'open-source': [
    {
      id: 'cortexshield',
      target: 'ninadgowdru/cortexshield-ai',
      title: 'Enterprise AI immune system against prompt injection (BERT 50K+ samples)',
      badge: 'open source',
      url: 'https://github.com/ninadgowdru/cortexshield-ai'
    },
    {
      id: 'claude-bug-bounty',
      target: 'ninadgowdru/claude-bug-bounty',
      title: 'AI-powered bug bounty hunting terminal with 20 vulnerability classes',
      badge: 'open source',
      url: 'https://github.com/ninadgowdru/claude-bug-bounty'
    },
    {
      id: 'vegapunk',
      target: 'ninadgowdru/vegapunkAI_poc',
      title: 'Autonomous AI security proof-of-concept testing environment',
      badge: 'open source',
      url: 'https://github.com/ninadgowdru/vegapunkAI_poc'
    },
    {
      id: 'darkguard',
      target: 'ninadgowdru/DarkGuard_SOC_Simulator',
      title: 'Python SOC security event simulator and alert correlation engine',
      badge: 'open source',
      url: 'https://github.com/ninadgowdru/DarkGuard_SOC_Simulator'
    },
    {
      id: 'portscanner',
      target: 'ninadgowdru/Portscanner',
      title: 'High-speed multithreaded network reconnaissance and port scanner',
      badge: 'open source',
      url: 'https://github.com/ninadgowdru/Portscanner'
    },
    {
      id: 'xss-automation',
      target: 'ninadgowdru/XSS-Automation',
      title: 'Automated cross-site scripting payload generator and vulnerability tester',
      badge: 'open source',
      url: 'https://github.com/ninadgowdru/XSS-Automation'
    }
  ]
};

export default function ContributionsSection({ onNavigateToProjects, onNavigateToExperience }) {
  const [activeTab, setActiveTab] = useState('hall-of-fame');

  const items = contributionsData[activeTab] || [];

  return (
    <section className="terminal-section" aria-label="Security disclosures and open source">
      <div className="contribution-list">
        <div className="contribution-list__heading">
          <p className="command-title">
            <span>$</span> cat contributions.md
          </p>

          <div className="terminal-tabs" role="group" aria-label="Pull request status">
            <span>
              <button
                type="button"
                aria-pressed={activeTab === 'hall-of-fame'}
                onClick={() => setActiveTab('hall-of-fame')}
              >
                hall of fame {contributionsData['hall-of-fame'].length}
              </button>
              <i>/</i>
            </span>
            <span>
              <button
                type="button"
                aria-pressed={activeTab === 'disclosures'}
                onClick={() => setActiveTab('disclosures')}
              >
                disclosures {contributionsData['disclosures'].length}
              </button>
              <i>/</i>
            </span>
            <span>
              <button
                type="button"
                aria-pressed={activeTab === 'open-source'}
                onClick={() => setActiveTab('open-source')}
              >
                open source {contributionsData['open-source'].length}
              </button>
            </span>
          </div>
        </div>

        <div className="contribution-list__rows" aria-live="polite">
          {items.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noreferrer"
            >
              <span>›</span>
              <b>⑂</b>
              <strong>{item.target}</strong>
              <small>{item.title}</small>
              <em>{item.badge}</em>
            </a>
          ))}
        </div>

        <button
          type="button"
          className="more-terminal-link"
          onClick={() => {
            if (activeTab === 'open-source') {
              onNavigateToProjects();
            } else {
              onNavigateToExperience();
            }
          }}
        >
          {activeTab === 'open-source'
            ? '⌄ view all 23 repositories & projects'
            : '⌄ read detailed experience log & letters of recognition'}
        </button>
      </div>
    </section>
  );
}

