# AvenirCore — agent quick reference

Use this file + **`.cursor/skills/avenircore/SKILL.md`** so chats stay short.

## Commands

```bash
npm ci && npm run lint && npm run build
npm run dev
```

## Layout

- `src/App.jsx` — routes
- `src/posts/*.mdx` — blog content (exports: `title`, `description`, `excerpt`, `date`, `category`, `keywords`, `faqs`, etc.)
- `src/utils/posts.js` — post index
- `api/subscribe.js` — Vercel serverless (Beehiiv)

## GitLab

- New issues: **Create from template** → Default (`.gitlab/issue_templates/Default.md`).
- In Cursor: paste the **issue URL** + checklist, not the entire epic, to save tokens.

## UI rules

See `.cursor/rules/avenircore-ui.mdc` and `.agents/skills/avenircore-frontend-guidelines.md`.
