# TC Consultancy — Engineering & Project Management

A modern, high-performance web platform and administrative command center for **TC Consultancy FZC**, delivering architectural design, cost consultancy, project management, and FIDIC contract administration across the United Arab Emirates, Saudi Arabia, Qatar, and Oman.

---

## 🌟 Key Features

### 🏢 Public Client Portal & Storefront
- **Corporate Visual Identity**: Styled with Deep Maritime Navy (`#0B1F3A`), Architectural Gold (`#F5A623`), and modern geometric typography (**Sora** for headings, **Manrope** for body).
- **Interactive GCC Projects Map**: Vector SVG map plotting landmark developments across Sharjah, Dubai, Abu Dhabi, Riyadh, Doha, and Muscat with interactive coordinate pins.
- **Projects Showcase**: Filterable portfolio covering Government, Commercial, Hospitality, Education, and Infrastructure assignments.
- **Service Pillars**: Phased scope breakdowns for Cost Consultancy, Project Management, Design Consultancy, and FIDIC Claims Administration.
- **Frequently Asked Questions (FAQ)**: Filterable accordion component addressing statutory authority compliance, fee calculations, and milestone delivery.
- **Corporate Pages**: About Us, Board of Directors, Verified Clients, Careers Portal (with application modal), and Technical Bulletins.

### 💼 Instant RFQ / Proposal Calculator
- Real-time fee estimator factoring in project discipline, built-up area (sq. ft.), and timeline.
- Dynamic line item breakdown, automatic volume discounts, and 5% UAE VAT calculation.
- Direct synchronization with the administrative quotation pipeline.

### 💬 Live Multi-Tag Customer Support Chat
- Persistent client chat widget with priority flags and quick inquiry templates.
- Real-time conversation thread with internal state management.
- Multi-tag classification (`Urgent`, `VIP Client`, `Civil Defence`, `FIDIC Claim`, `Bulk RFQ`).

### 🛡️ Administrative Command Center
- **Executive Analytics**: Key operational telemetry, pending RFQ valuations, and inquiry queues.
- **Multi-Tag Chat Hub**: Active inquiry queues with tag filtering, canned engineering responses, and internal staff notes.
- **Tag Taxonomy Manager**: Create, edit, recolor, and monitor tag usage across threads.
- **Quotation Pipeline & Printable Proforma Invoices**: Complete proposal tracker with print-ready FIDIC Proforma Invoices featuring official corporate letterhead, banking remittance coordinates, and signature seals.
- **Projects & Editorial CMS**: Manage delivered projects and publish technical bulletin articles.
- **Cloud Container & Database Telemetry**: Hostinger Cloud Startup resource instrumentation and a **one-click MySQL database dump generator** that exports a `.sql` backup.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: [Sora](https://fonts.google.com/specimen/Sora) & [Manrope](https://fonts.google.com/specimen/Manrope) via Google Fonts
- **Animations**: [Motion](https://motion.dev/)

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- **Node.js**: `v20.0.0` or higher
- **npm**: `v10.0.0` or higher (or `pnpm` / `yarn`)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/tc-consultancy-engineering.git
   cd tc-consultancy-engineering
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Verify TypeScript & linting:**
   ```bash
   npm run lint
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```
   The compiled static assets will be output to the `dist/` directory.

---

## 🚢 Deploying to GitHub

### Option A: Automatic Deployment via GitHub Actions (Recommended)

This repository includes a pre-configured GitHub Actions workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

1. Push this repository to your GitHub account:
   ```bash
   git remote add origin https://github.com/your-username/tc-consultancy-engineering.git
   git branch -M main
   git push -u origin main
   ```
2. In your GitHub repository, navigate to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. Every push to `main` will automatically build the application and deploy it to `https://<your-username>.github.io/<repo-name>/`.

> **Note on Asset Paths**: `vite.config.ts` is configured with `base: './'`, ensuring all assets resolve properly on GitHub Pages sub-paths or custom root domains.

### Option B: Deploying to Vercel, Netlify, or Cloudflare Pages

This application is a static SPA and can be deployed to any modern static hosting provider with zero configuration:
- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Install command**: `npm install`

---

## 📂 Project Architecture

```
tc-consultancy-engineering/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages CI/CD workflow
├── public/                     # Static assets and media
├── src/
│   ├── components/
│   │   ├── admin/              # Admin Command Center views (Chat, Tags, RFQs, Telemetry)
│   │   ├── chat/               # Client-facing floating chat drawer
│   │   ├── footer/             # Corporate footer & location coordinates
│   │   ├── home/               # Hero, Map, Expertise, ISO, FAQ, CTA sections
│   │   ├── navbar/             # Sticky header with navigation and portal toggle
│   │   ├── pages/              # Routed pages (About, Services, Projects, Clients, etc.)
│   │   └── quote/              # Instant RFQ calculator modal
│   ├── context/
│   │   └── AppContext.tsx      # Global state provider & persistence
│   ├── data/
│   │   └── seedData.ts         # Preloaded projects, blogs, RFQs, and tags
│   ├── App.tsx                 # Main layout controller
│   ├── index.css               # Tailwind CSS v4 setup & typography
│   ├── main.tsx                # Application bootstrap
│   └── types.ts                # Strict TypeScript interfaces
├── index.html                  # HTML entry point with font links
├── metadata.json               # AI Studio project manifest
├── package.json                # Dependencies and npm scripts
├── tsconfig.json               # TypeScript compiler options
├── vite.config.ts              # Vite configuration with relative base path
└── README.md                   # Documentation
```

---

## 📄 License

This project is licensed under the Apache License 2.0.
