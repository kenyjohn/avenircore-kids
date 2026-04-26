# Skill: Site Engineering

Trigger for: routing, APIs, environment config.

## 1. Routing (`src/App.jsx`)
`react-router-dom` v7 SPA.
- Routes: `/`, `/blog`, `/blog/:slug`, `/stories`, `/stories/:id`, `/contact`.

## 2. API & Security
- **Endpoints**: `/api/subscribe` (Beehiiv), `/api/contact` (Resend).
- **Security**: Method validation, environment key checks, input sanitization via `src/utils/security.js`.

## 4. Build Automation
- **Sitemap**: Automated via `vite-plugin-sitemap`. `vite.config.js` dynamically scans `src/posts/` and `src/data/stories/` to generate `public/sitemap.xml` on every build.
- **Search Pings**: `scripts/ping-search-engines.js` notifies Google/Bing. Triggered automatically by GitHub Actions (`.github/workflows/submit-sitemap.yml`) on push to `main`.
