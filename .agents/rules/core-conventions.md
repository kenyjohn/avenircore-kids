---
description: AvenirCore stack, validation, security — always active.
alwaysApply: true
---

# Rule: Core Conventions

## 1. Stack & Routing
- **Tech**: React 19, Vite 7, React Router 7.
- **Routing**: Client-side SPA in `src/App.jsx`.
- **API**: Node.js serverless in `api/` (ESLint: `globals.node`). No browser logic in `api/`.
- **Blog**: `.mdx` in `src/posts/`. Parsed via `src/utils/posts.js`.

## 2. Dev Workflow
- **Issue**: Extract **Acceptance Criteria** only; link to URL.
- **Git**: `feature/ID-slug` or `fix/ID-slug`. 
- **PRs**: Use "Closes #ID".
- **Validation**: `npm ci` -> `npm run lint` -> `npm run build` -> `npm run dev`.

## 3. Security
- **Auth**: Beehiiv keys in `api/subscribe.js`.
- **Env**: No `VITE_` prefix for server-only keys (e.g., Beehiiv/Resend) to prevent client leaks.
- **Data**: Sanitize LD-JSON/input via `src/utils/security.js`.
