---
description: Design principles and UI variables specific to AvenirCore.
globs: "**/*.{jsx,css}"
alwaysApply: false
---

# Rule: AvenirCore Frontend Guidelines

Use this rule when tasked with creating or modifying UI components, layouts, or stylesheets. 

## 1. Stack Limitations
- AvenirCore is an SPA (React 19, Vite).
- It relies entirely on **Vanilla CSS**. 
- **DO NOT** use `className="flex items-center"` or equivalent Tailwind/Bootstrap atomic classes. Everything relies on global scope and scoped CSS within `src/index.css`.

## 2. Core Tokens & Colors
Use **CSS variables** from `:root` in `src/index.css`. Extend `:root` for new brand tokens instead of hardcoding hex in JSX when possible.

**Primary Colors:**
- Emerald: `var(--color-emerald)`, `var(--color-emerald-light)`, `var(--color-emerald-soft)`, `var(--color-emerald-bg)`
- Navy: `var(--color-navy)`, `var(--color-navy-mid)`
- Amber (accent): `var(--color-amber)`, `var(--color-amber-soft)`
- Teacher/Educator: `var(--color-teacher)`

**Utility Variables:**
- Backgrounds: `var(--color-bg)`, `var(--color-white)`
- Text: `var(--color-text)`, `var(--color-text-muted)`
- Border: `var(--color-border)`

**Radii & Shadows:**
- Rounded Corners: `var(--radius-pill)`, `var(--radius-xl)`, `var(--radius-lg)`, `var(--radius-md)`
- Box Shadows: `var(--shadow-sm)`, `var(--shadow-md)`, `var(--shadow-lg)`

## 3. Layout Conventions
- **Containers**: Content should map into a max-width center container `.container`.
- **Grids**: Use vanilla `display: grid; grid-template-columns: repeat(...)` with flexible gap parameters. Handle responsiveness utilizing native CSS `@media` queries exclusively (e.g. `@media (max-width: 900px) { ... }`) placed towards the END of your target CSS block. 
- **Anchors**: When creating cross-page anchor jumps, ensure anchor hrefs begin securely with a forward slash (`href="/#target-id"`).

## 4. Standard UI Elements
- **Buttons**: The existing global element for buttons is `.btn` accompanied by variants like `.btn-primary`, `.btn-outline`, or `.btn-white`.
- **Text Labels**: For visually highlighted categorization context, use `.section-label`.
- **Cross-Component Anchors**: Keep spacing and dynamic element positioning inside standard React hooks.

Always review the latest entries in `src/index.css` prior to engineering completely new utility classes.
