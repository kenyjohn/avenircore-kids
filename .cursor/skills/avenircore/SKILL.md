---
name: avenircore
description: >-
  AvenirCore marketing site (React/Vite/MDX/Vercel). Use for GitLab issues,
  merge requests, blog posts, UI/CSS, API routes, SEO, or any repo change.
  Minimizes context: follow paths below instead of broad codebase search.
---

# AvenirCore — agent context (token-efficient)

## Stack (do not re-discover)

- **SPA**: React 19, Vite 7, React Router 7, MDX posts under `src/posts/*.mdx`.
- **Styles**: Vanilla CSS + variables in `src/index.css` only — **no Tailwind/Bootstrap utility classes**.
- **Deploy**: Vercel; serverless **`api/subscribe.js`** (Beehiiv). Not available in `vite preview` alone.
- **SEO**: `react-helmet-async`, `vite-plugin-sitemap` routes in `vite.config.js`, `safeJsonLd` in `src/utils/security.js`.

## Where to look first

| Task | Path |
|------|------|
| Routes / lazy pages | `src/App.jsx` |
| Posts registry | `src/utils/posts.js` (`import.meta.glob` on `src/posts/`) |
| Layout chrome | `src/components/Header.jsx`, `Footer.jsx` |
| Pillar / teacher hubs | `src/pages/PillarPage.jsx`, `TeacherHub.jsx` |
| Blog article shell + JSON-LD | `src/pages/BlogPost.jsx` |
| ESLint (Node for API) | `eslint.config.js` — `api/**` uses `globals.node`; browser block `ignores: ['api/**']` |
| Sitemap URLs | `vite.config.js` `dynamicRoutes` — keep in sync with real MDX slugs |

**UI tokens & layout**: read `.agents/skills/avenircore-frontend-guidelines.md` (do not duplicate here).

## GitLab issues & MRs (efficient workflow)

1. **Issue body**: Use the repo template (`.gitlab/issue_templates/Default.md`). Paste **acceptance criteria as a short checklist**; avoid pasting long specs twice in chat — link the issue URL instead.
2. **Branch**: `feature/<issue-iid>-short-slug` or `fix/<issue-iid>-short-slug` (match team convention).
3. **MR**: Title `type: summary (!iid)` if your team uses that; description **Closes #&lt;iid&gt;** / **Fixes** with checklist mirrored from issue.
4. **Before MR**: Run `npm run lint` and `npm run build` locally; note results in MR (avoids CI-only failures).
5. **Scope**: Touch only files required by the issue; no drive-by refactors or new docs unless the issue asks.

## Commands

```bash
npm ci          # clean install
npm run lint
npm run build
npm run dev     # local SPA
```

## Secrets / env

- Server-only keys for `api/subscribe.js` should **not** use the `VITE_` prefix (avoid accidental client exposure). Client must not import Beehiiv secrets.
