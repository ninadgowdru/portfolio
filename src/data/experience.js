export const experiences = [
  {
    id: "bugcrowd",
    role: "Freelance AppSec Researcher / Bug Bounty Hunter",
    organization: "Bugcrowd",
    location: "Remote",
    period: "2024 — Present",
    tag: "active",
    tone: "green",
    summary: "Identified and responsibly disclosed vulnerabilities to Microsoft, NASA, JP Morgan, Ferrari, Nokia, IBM, and more.",
    description: "Conducting in-depth offensive security research across complex enterprise attack surfaces, API endpoints, and cloud deployments.",
    responsibilities: [
      "Discovered critical and high-severity XSS, IDOR/BOLA, SSRF, SQLi, and sensitive data exposure issues across web and API architectures.",
      "Conducted extensive attack-surface mapping and continuous automated reconnaissance using Subfinder, Amass, httpx, ffuf, Nmap, and Nuclei.",
      "Authored detailed proof-of-concept (PoC) vulnerability reports with clear remediation guidelines, earning induction into NASA, Microsoft, and J.P. Morgan Halls of Fame.",
      "Triaged cloud misconfigurations and broken access controls (BAC) in multi-tenant environments."
    ],
    skills: ["Burp Suite", "Nuclei", "OWASP Top 10", "API Security", "Subfinder", "ffuf", "Python"]
  },
  {
    id: "prodigy",
    role: "Cybersecurity Intern",
    organization: "Prodigy InfoTech",
    location: "Bengaluru, India (Remote)",
    period: "Nov 2024 — Dec 2024",
    tag: "completed",
    tone: "amber",
    summary: "Automated vulnerability assessments using Python and drafted technical documentation.",
    description: "Built automated Python-based scanning and assessment utilities to streamline detection of common misconfigurations and injection flaws.",
    responsibilities: [
      "Engineered automated vulnerability scanning scripts to evaluate network services, port exposures, and encryption protocols.",
      "Conducted structured code reviews and SAST audits on Python and web applications.",
      "Produced comprehensive remediation reports outlining step-by-step mitigation paths for identified security flaws."
    ],
    skills: ["Python Automation", "Vulnerability Assessment", "SAST", "Technical Documentation"]
  },
  {
    id: "redusers",
    role: "Cybersecurity Intern",
    organization: "The Red Users",
    location: "Bengaluru, India",
    period: "Nov 2024 — Dec 2024",
    tag: "completed",
    tone: "coral",
    summary: "Executed web security testing and reconnaissance to identify structural vulnerabilities.",
    description: "Performed rigorous black-box and grey-box security assessments against targeted web environments and web applications.",
    responsibilities: [
      "Conducted structural penetration testing identifying authentication bypasses, insecure direct object references, and CSRF vulnerabilities.",
      "Utilized custom Burp Suite extensions and wordlists for tailored endpoint fuzzing.",
      "Collaborated with developers to verify patch integrity and conduct regression testing."
    ],
    skills: ["Web App Pentesting", "Burp Suite", "Auth Bypass", "Reconnaissance"]
  }
];

export const education = [
  {
    degree: "B.E. Computer Science & Engineering (IoT, Cybersecurity incl. Blockchain)",
    institution: "Dayananda Sagar College of Engineering",
    location: "Bengaluru, Karnataka",
    period: "2026 — 2029",
    details: "Specializing in cybersecurity architectures, secure IoT systems, blockchain integrity, and defensive network engineering."
  },
  {
    degree: "Diploma in Computer Science",
    institution: "SDM Polytechnic, Ujire",
    location: "Karnataka, India",
    period: "2023 — 2026",
    details: "Graduated with exceptional academic standing (CGPA 9.03/10.0). Core coursework in operating systems, algorithms, computer networks, and software engineering."
  }
];

export const certifications = [
  {
    title: "Google Cybersecurity Professional Certificate",
    issuer: "Google",
    date: "Certified",
    focus: "SIEM tools, incident response, network security, Python for cybersecurity, Linux environments"
  },
  {
    title: "IBM Cybersecurity Analyst",
    issuer: "IBM",
    date: "Certified",
    focus: "Threat intelligence, penetration testing fundamentals, endpoint security, vulnerability assessment"
  }
];
