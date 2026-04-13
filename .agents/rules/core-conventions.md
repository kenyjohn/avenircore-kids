---
description: AvenirCore stack, validation, GitLab hygiene — always on
alwaysApply: true
---

# Rule: AvenirCore Core Conventions

This rule applies to all architectural modifications and foundational codebase operations within AvenirCore.

## 1. Tech Stack Boundaries
- **Pillars**: React 19, Vite 7, React Router 7.
- **Routing**: Client-side SPA routing defined in `src/App.jsx`.
- **Backend API**: Serverless definitions in `api/**/*.js` are strict standard Node environments (ESLint utilizes `globals.node` here). Prevent pushing browser-only config rules over `api/` logic boundaries.
- **Blogging Pipeline**: Stored strictly as `.mdx` files in `src/posts/`. Article frontmatter is parsed via extracted block metadata parameters, and index listings register via `src/utils/posts.js`.

## 2. GitLab & Collaboration Logic
- **Issue Handling**: Never copy/paste massive epics into context unless explicitly asked. Always extract merely the **Acceptance Criteria** and paste a cross-link reference to the issue URL.
- **Templates**: Always mandate initialising missing `.gitlab/issue_templates/Default.md`.
- **Branch Naming conventions**: Ensure new work adheres to git patterns: `feature/<issue-iid>-short-slug` or `fix/<issue-iid>-short-slug`.
- **Commit / Merge hygiene**: MR descriptions must contain explicit "Closes #<iid>" linking hooks mirroring the checklist from the respective issue.

## 3. Strict Pre-Flight Tooling
Execution workflows before approving any final branch changes:
```bash
npm ci          # Ensures dependencies correlate safely with lockfile
npm run lint    # Strictly captures programmatic flaws mapped from eslint.config.js
npm run build   # Validates memory structures and build-pipeline output
npm run dev     # Boot active local SPA for UI verification
```

## 4. Environment Keys
- **Warning**: Server-only Beehiiv keys interacting inside `api/subscribe.js` should never be prefixed using the standard Vite `VITE_` mapping parameters to block accidental injection vulnerabilities leaking into the client bundle payload.
