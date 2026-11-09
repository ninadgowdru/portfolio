# Ninad S P — Personal AppSec Portfolio

A high-performance, minimalist terminal-aesthetic personal portfolio inspired by [it-was-you-sam.vercel.app](https://it-was-you-sam.vercel.app/), crafted specifically for **Ninad S P** (Application Security Engineer & Bug Bounty Researcher).

![Portfolio Avatar](./public/ninad_avatar.png)

---

## ⚡ Features & Interactivity

- **Retro-Modern Terminal Aesthetic**: Gruvbox dark theme (`#0d0e0f`), monospace typography (`JetBrains Mono`), background matrix grid, and glowing accents.
- **Interactive Luffy Particle Portrait**: Custom HTML5 Canvas particle physics engine rendering Ninad's Luffy avatar with alpha transparency, intro laser sweep, and pointer repulsion.
- **Recruiter & AppSec Modals**:
  - `tl;dr`: `$ cat recruiter-summary.md` fast briefing modal for recruiters and engineering leads.
  - `coding`: `$ status --appsec` live focus modal highlighting current AI security research, active Bugcrowd targets, and availability.
- **52-Week GitHub Contribution Activity Calendar**: Interactive 365-day heat grid for `@ninadgowdru` with real-time hover tooltips, activity counters, and color levels.
- **Projects Showcase (`$ cat projects.md` & `/projects`)**:
  - Featured security systems: **CortexShield AI** (Enterprise AI Immune System), **ZoroWAF**, **ThreatHawk**, and **Claude Bug Bounty**.
  - In-depth modal dialogs with architectural breakdowns, metrics, and GitHub links.
  - Category filters: `all`, `ai & llm safety`, `security & waf`, and `recon & tools`.
- **NASA & Global Hall of Fame Showcase (`$ cat contributions.md`)**:
  - Filter tabs (`hall of fame / disclosures / open source`).
  - Highlights inductions from **NASA** (Critical vulnerability & Official Letter of Recognition), **Microsoft**, **J.P. Morgan**, **Ferrari**, **Nokia**, **IBM**, **Philips**, **GEA**, **LG Electronics**, **Paytm**, **Ideagen**, and 20+ global organizations.
- **Experience Timeline & Deep Inspector (`/experience`)**:
  - `$ cat experience.log` overview on the home page.
  - Dedicated `/experience` route with an interactive accordion inspecting attack surfaces, vulnerability classes, responsibilities, and methodologies for Bugcrowd, Prodigy InfoTech, and The Red Users.
  - Academic background (Dayananda Sagar College of Engineering & SDM Polytechnic, CGPA 9.03) and verified certifications (Google & IBM).
- **Technical Articles & Advisories (`/blog`)**:
  - Technical research writeups with in-terminal reader modal.
- **Technical Arsenal (`/gears`)**:
  - `$ cat stack.yml` syntax-highlighted breakdown of offensive recon tools, defensive/AI systems, scripting languages, and governance standards.
- **Terminal Contact Form (`#hire`)**:
  - `$ cat hire.me` interactive contact terminal with validation, packet dispatch feedback, clipboard copy, and direct email link.
- **Real-Time IST Clock**:
  - Dynamic live clock in Indian Standard Time (IST) in the footer.
- **Resume Integration**:
  - Embedded and downloadable PDF resume (`Ninad_S_P_Resume.pdf`).

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure **Node.js 18+** is installed on your system.

### 2. Development Server
Run the local dev server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
Build optimized production static assets:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

---

## 🌐 Hosting & Publishing

### Option A: GitHub Pages (Automated via GitHub Actions)

The repository includes a ready-to-use GitHub Actions workflow (`.github/workflows/deploy.yml`):

1. Push the code to your GitHub repository:
   ```bash
   git push -u origin main
   ```
2. In your GitHub repository, go to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. The deployment workflow will run automatically and publish your portfolio at:
   `https://ninadgowdru.github.io/portfolio/`

### Option B: Deploy to Vercel (1-Click)

1. Push this folder to your GitHub account (`https://github.com/ninadgowdru/portfolio`).
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your `portfolio` repository. Vercel automatically detects Vite with `npm run build` and `dist`.
4. Click **Deploy** — your site will be live worldwide with zero configuration.

---

## 👤 Profile Details

- **Name**: Ninad S P
- **Role**: Application Security Engineer · Bug Bounty Researcher
- **Location**: Bengaluru, Karnataka, India
- **Email**: ninadgowda777@gmail.com
- **Phone**: +91 8660187114
- **GitHub**: [github.com/ninadgowdru](https://github.com/ninadgowdru)
- **LinkedIn**: [linkedin.com/in/ninad-gowda-0446522a6](https://www.linkedin.com/in/ninad-gowda-0446522a6/)
