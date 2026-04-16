# Skill: Site Engineering & Infrastructure

Trigger this skill when modifying app routing, interacting with serverless APIs, or configuring environment variables.

## 1. Routing Topology
The SPA uses `react-router-dom` v7. Main routing is defined in `src/App.jsx`.

| Route | Component | Purpose |
|---|---|---|
| `/` | `HomePage` | Core landing experience |
| `/blog` | `BlogIndex` | MDX article listing |
| `/blog/:slug` | `BlogPost` | Dynamic article renderer |
| `/stories` | `StoriesIndex` | Interactive story gallery |
| `/stories/:id` | `StoryPlayer` | Story engine context |
| `/contact` | `Contact` | Lead generation form |

## 2. API Boundaries (`api/`)
Serverless functions are standard Node.js environments.

- **`/api/subscribe`**: Handles Beehiiv newsletter signups.
- **`/api/contact`**: Handles Resend transactional emails.

### Security Hygiene
- **Pre-flight**: API routes should check for required environment keys and valid request method.
- **Sanitization**: Use `src/utils/security.js` for JSON-LD and input sanitization.

## 3. Environment Context
- **Vite Prefix**: Client-side vars must use `VITE_` (e.g., `VITE_BEEHIIV_PUB_ID`).
- **Server-Only**: Sensitive keys (e.g., `RESEND_API_KEY`) must NOT use the `VITE_` prefix to avoid leaking to the client bundle.
