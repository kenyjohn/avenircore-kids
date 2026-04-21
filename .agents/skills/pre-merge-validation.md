# Skill: Pre-Merge Validation

Trigger for: feature completion, pre-merge reviews, finalising pull requests.

## 1. SEO & Discoverability Validation
Before declaring a feature ready to merge, ensure that all new pages or routes are indexed:
- **Sitemap**: Verify `vite.config.js` or the relevant sitemap generator includes the new routes.
- **LLMs.txt**: Ensure any new public content (stories, workbooks, blogs) is referenced in `/public/llms.txt` for AI crawlers.
- **Robots.txt**: Confirm `/public/robots.txt` is not inadvertently blocking the new routes.

## 2. Security Validation
Verify that new endpoints and components are hardened:
- **API Endpoints**: Ensure any new serverless functions (e.g., `/api/*.js`) have origin checks, method validation (e.g., `POST` only), and payload size limits.
- **Form Inputs**: Verify that new forms have honeypot fields and sanitise inputs before processing.
- **Environment Variables**: Confirm no sensitive keys are leaked to the client (use `VITE_` prefix strictly for public keys).

## 3. Build & Formatting
- Run `npm run build` to confirm there are no compilation errors or missing dependencies.
- Run `npm run lint` to enforce architectural boundaries and code quality.
