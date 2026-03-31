# GitHub Copilot Instructions for AvenirCore

These instructions inform Copilot about the technical stack, constraints, and aesthetic guidelines used throughout the AvenirCore repository.

## 1. Technology Stack
- **Framework**: React 19 + Vite.
- **Routing**: `react-router-dom` v7.
- **Styling**: Vanilla CSS (CSS Variables) - **DO NOT USE TailwindCSS or any predefined CSS framework.**
- **Blogging**: MDX via `@mdx-js` rendering.
- **SEO/Meta**: `react-helmet-async`.
- **Hosting**: Vercel.

## 2. Coding Guidelines
- **Modern React**: Use Functional Components and React Hooks exclusively. Never use class components.
- **Dependencies**: Do not introduce new heavy dependencies without explicit user consent. Do not hallucinate imports. Use native web APIs whenever possible.
- **Routing Rules**: Keep in mind we use a Single Page Application configuration on Vercel (`vercel.json` rewrite to `/index.html`).

## 3. Aesthetic & UI Guidelines
- Rely on defined CSS variables found in `src/index.css` (e.g., `--color-emerald`, `--color-navy`, `--color-text-muted`, `--radius-xl`).
- Maintain a highly dynamic, "glassmorphism", modern aesthetic. Avoid generic, plain rectangular designs.
- Ensure all interactive elements have hover effects, transitions, and accessibility attributes.
- Use explicit classes like `.btn`, `.btn-primary`, and `.btn-outline`.

## 4. Operational Directives
- If creating new UI features, first check `src/index.css` to see if a component style already exists to prevent duplicate code.
- Provide concise, self-contained functional modifications. Do not perform "dry run" descriptions if the request expects an exact implementation output.
