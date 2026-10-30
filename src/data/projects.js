export const projects = [
  {
    id: "cortexshield-ai",
    name: "CortexShield AI",
    category: "ai",
    featured: true,
    tagline: "Enterprise AI Immune System",
    description: "Built an AI threat detection system using a fine-tuned BERT classifier trained on 50K+ real-world attacks. Achieved a 99.9% detection rate against prompt injection, RAG injection, and malicious code execution.",
    fullDescription: "CortexShield AI acts as an inline defensive barrier for enterprise Large Language Model (LLM) pipelines. It inspects inbound user prompts, system prompts, and retrieved context chunks in real-time, preventing jailbreaks, indirect prompt injection, sensitive data exfiltration, and malicious code generation before inference completes.",
    architecture: [
      "Inbound Prompt Triage: Sub-millisecond tokenizer and heuristic screener.",
      "BERT-Powered Classifier: Deep semantic embeddings evaluated against 50,000+ adversarial samples.",
      "RAG Injection Filter: Contextual validation of retrieved documents to detect trojan payloads.",
      "Adaptive Rate & Jailbreak Mitigation: Dynamic threshold adaptation based on user interaction history."
    ],
    tech: ["Python", "FastAPI", "BERT", "PyTorch", "Docker", "Hugging Face"],
    githubUrl: "https://github.com/ninadgowdru/cortexshield-ai",
    demoUrl: null,
    metrics: "99.9% detection accuracy · <15ms average latency",
    stars: 0
  },
  {
    id: "zorowaf",
    name: "ZoroWAF",
    category: "security",
    featured: true,
    tagline: "AI Web Application Firewall",
    description: "Engineered a machine learning-based WAF that automatically detects and mitigates modern web attack vectors including XSS, SQLi, and SSRF without rigid regex rules.",
    fullDescription: "Traditional regex-based web application firewalls suffer from high false-positive rates and struggle against obfuscated bypasses. ZoroWAF utilizes anomaly detection and tree-based classification to evaluate HTTP request payloads, header structures, and query parameters, blocking malicious payloads while allowing legitimate user traffic.",
    architecture: [
      "HTTP Payload Normalization & Decoding (URL, Unicode, Base64).",
      "Feature Extraction Engine: Token entropy, special character frequencies, and lexical tokens.",
      "Classifier Pipeline: Machine learning model trained on CSIC, CIC-IDS, and OWASP fuzzing datasets.",
      "Automated IP & Session Reputation Tracking."
    ],
    tech: ["Python", "Machine Learning", "FastAPI", "Scikit-Learn", "Redis"],
    githubUrl: "https://github.com/ninadgowdru",
    demoUrl: null,
    metrics: "Automated mitigation for XSS, SQLi, and SSRF",
    stars: 0
  },
  {
    id: "threathawk",
    name: "ThreatHawk",
    category: "security",
    featured: true,
    tagline: "Automated Security Operations Suite",
    description: "Comprehensive security suite featuring automated phishing detection, real-time DoS alerts, and custom endpoint telemetry monitoring.",
    fullDescription: "ThreatHawk centralizes endpoint and network monitoring into an automated response suite. It continuously tracks network connection anomalies, detects incoming phishing attempts using heuristic email and URL reputation parsers, and raises instantaneous alerts during denial-of-service volumetric spikes.",
    architecture: [
      "Packet Sniffer & Flow Analyzer: Real-time network telemetry via raw sockets.",
      "Phishing Detection Engine: Lexical URL inspection, domain age lookups, and visual similarity triggers.",
      "DoS Early-Warning System: Threshold-based sliding window request counters."
    ],
    tech: ["Python", "Network Sockets", "Security Telemetry", "AsyncIO"],
    githubUrl: "https://github.com/ninadgowdru",
    demoUrl: null,
    metrics: "Sub-second DoS alert trigger · 98% phishing domain catch rate",
    stars: 0
  },
  {
    id: "claude-bug-bounty",
    name: "Claude Bug Bounty",
    category: "tools",
    featured: true,
    tagline: "AI-Powered Terminal Recon & Hunting",
    description: "AI-powered bug bounty hunting from your terminal — automated recon, 20 vulnerability classes, autonomous triage, and report generation inside Claude Code.",
    fullDescription: "A specialized terminal agent integration designed to conduct autonomous offensive security workflows. Given a target scope, it orchestrates reconnaissance tools, categorizes attack surfaces across 20 vulnerability classes, and produces standardized bug bounty submission drafts ready for Bugcrowd and HackerOne.",
    architecture: [
      "Scope Boundary Enforcement: Ensures testing strictly adheres to defined CIDR/domain scope.",
      "Multi-Tool Recon Orchestration: Coordinates Subfinder, httpx, and Nuclei output pipelines.",
      "Report Synthesizer: Generates reproduction steps, impact ratings (CVSS 3.1), and remediation recommendations."
    ],
    tech: ["Python", "Shell / Bash", "Claude Code CLI", "Nuclei", "Recon APIs"],
    githubUrl: "https://github.com/ninadgowdru/claude-bug-bounty",
    demoUrl: null,
    metrics: "Covers 20 vulnerability classes autonomously",
    stars: 0
  },
  {
    id: "darkguard-soc",
    name: "DarkGuard SOC Simulator",
    category: "security",
    featured: false,
    tagline: "Threat Telemetry & Incident Response Sandbox",
    description: "Interactive SOC simulation environment for practicing threat detection, telemetry analysis, and incident response under simulated adversarial attacks.",
    fullDescription: "DarkGuard creates a safe laboratory for testing SIEM rules and incident response playbooks. It generates realistic attack telemetry (privilege escalation, credential dumping, lateral movement) and provides an interactive operator console to investigate and contain simulated intrusions.",
    architecture: [
      "Adversary Emulation Engine: Generates realistic MITRE ATT&CK technique logs.",
      "Log Stream Pipeline: Formats alerts into Syslog and JSON schemas.",
      "Operator Investigation Console: Command-line interface for alert triage and remediation verification."
    ],
    tech: ["Python", "SIEM Telemetry", "MITRE ATT&CK", "CLI"],
    githubUrl: "https://github.com/ninadgowdru/DarkGuard_SOC_Simulator",
    demoUrl: null,
    metrics: "Simulates 15+ MITRE ATT&CK techniques",
    stars: 1
  },
  {
    id: "xss-automation",
    name: "XSS-Automation",
    category: "tools",
    featured: false,
    tagline: "High-Speed XSS Scanner & Fuzzer",
    description: "Automated vulnerability scanner that discovers reflected and DOM-based Cross-Site Scripting vulnerabilities with context-aware payload mutation.",
    fullDescription: "Built to accelerate bug bounty recon, XSS-Automation systematically crawls web endpoints, extracts URL parameters and hidden form inputs, and injects context-specific polyglots to uncover filtering bypasses and sanitization defects.",
    architecture: [
      "Crawler & Parameter Extractor: Discovers dynamic input vectors across web applications.",
      "Context-Aware Mutation: Adapts payloads based on HTML attribute, tag body, or script context.",
      "Response Reflection Verifier: Analyzes DOM responses to confirm non-escaped payload execution."
    ],
    tech: ["Python", "BeautifulSoup", "Async HTTP", "Payload Mutation"],
    githubUrl: "https://github.com/ninadgowdru/XSS-Automation",
    demoUrl: null,
    metrics: "Detects reflected & DOM XSS in seconds",
    stars: 1
  },
  {
    id: "portscanner",
    name: "Portscanner",
    category: "tools",
    featured: false,
    tagline: "Concurrent Network Recon Utility",
    description: "Multi-threaded high-speed TCP/UDP port scanner with banner grabbing and basic service identification for rapid surface reconnaissance.",
    fullDescription: "A lightweight, robust port scanning utility engineered in Python. Built with concurrent threading pools to scan thousands of ports across target ranges without triggering aggressive packet drops.",
    architecture: [
      "Non-blocking Socket Connection Handshake.",
      "Thread Pool Worker Queue with configurable concurrency and timeouts.",
      "Service Banner Identification: Probes open ports to determine protocol and server version."
    ],
    tech: ["Python", "Sockets", "Threading", "Network Recon"],
    githubUrl: "https://github.com/ninadgowdru/Portscanner",
    demoUrl: null,
    metrics: "Scans 1000 ports in under 3 seconds",
    stars: 1
  },
  {
    id: "securelayer",
    name: "SecureLayer",
    category: "security",
    featured: false,
    tagline: "Web Application Defense Architecture",
    description: "Demonstration suite of defense-in-depth web architecture implementing strict Content Security Policy (CSP), subresource integrity, and anti-CSRF token lifecycle.",
    fullDescription: "A reference implementation of hardened client-side and transport-layer security patterns for modern web apps.",
    architecture: [
      "Strict Content Security Policy (nonce-based).",
      "Subresource Integrity (SRI) Hash Verification.",
      "Secure Cookie Directives & Anti-Clickjacking headers."
    ],
    tech: ["HTML5", "JavaScript", "Security Headers", "CSP"],
    githubUrl: "https://github.com/ninadgowdru/SecureLayer",
    demoUrl: null,
    metrics: "A+ SSL Labs & SecurityHeaders score",
    stars: 0
  }
];

