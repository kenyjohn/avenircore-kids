# Skill: Site Engineering

Trigger for: routing, APIs, environment config.

## 1. Routing (`src/App.jsx`)
`react-router-dom` v7 SPA.
- Routes: `/`, `/blog`, `/blog/:slug`, `/stories`, `/stories/:id`, `/contact`.

## 2. API & Security
- **Endpoints**: `/api/subscribe` (Beehiiv), `/api/contact` (Resend).
- **Security**: Method validation, environment key checks, input sanitization via `src/utils/security.js`.

## 3. Environment
- **Client**: Must prefix with `VITE_`.
- **Server**: No `VITE_` prefix (e.g., `RESEND_API_KEY`) to prevent client leakage.
