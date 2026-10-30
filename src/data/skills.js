export const skills = {
  stackFile: "stack.yml",
  sections: [
    {
      id: "offensive-security",
      title: "offensive security & recon",
      tone: "green",
      items: [
        { label: "web & api vuln testing", detail: "XSS, IDOR/BOLA, SSRF, SQLi, RCE, Auth Bypass" },
        { label: "reconnaissance & mapping", detail: "Subfinder, Amass, httpx, ffuf, Nmap, Shodan" },
        { label: "proxy & intercept", detail: "Burp Suite Professional, OWASP ZAP" },
        { label: "vulnerability scanning", detail: "Nuclei (custom templates), Semgrep, Snyk" },
        { label: "fuzzing & discovery", detail: "ffuf, gobuster, custom Python mutators" }
      ]
    },
    {
      id: "ai-defensive-systems",
      title: "ai & defensive security",
      tone: "amber",
      items: [
        { label: "llm security & guardrails", detail: "Prompt Injection detection, RAG guardrails, canary tokens" },
        { label: "ai threat detection", detail: "BERT semantic classifier, PyTorch, Hugging Face" },
        { label: "web application firewalls", detail: "ML-based payload classification, CSIC evaluation" },
        { label: "soc & telemetry", detail: "DarkGuard simulator, MITRE ATT&CK mapping, Syslog triage" }
      ]
    },
    {
      id: "languages-automation",
      title: "languages & automation",
      tone: "coral",
      items: [
        { label: "core languages", detail: "Python (advanced), Bash / Shell, JavaScript, TypeScript" },
        { label: "frameworks & backends", detail: "FastAPI, Node.js, Express, REST APIs" },
        { label: "security automation", detail: "Custom PoC generators, Scapy, BeautifulSoup, Requests" },
        { label: "version control & ci/cd", detail: "Git, GitHub Actions, Semgrep pre-commit gates" }
      ]
    },
    {
      id: "standards-governance",
      title: "standards & compliance",
      tone: "mint",
      items: [
        { label: "industry frameworks", detail: "OWASP Top 10, OWASP API Security Top 10, MITRE ATT&CK" },
        { label: "security sdlc", detail: "SAST / DAST integration, threat modeling, code review" },
        { label: "vulnerability disclosure", detail: "CVSS 3.1 scoring, Coordinated Vulnerability Disclosure (CVD)" },
        { label: "certifications", detail: "Google Cybersecurity Professional, IBM Cybersecurity Analyst" }
      ]
    }
  ]
};

