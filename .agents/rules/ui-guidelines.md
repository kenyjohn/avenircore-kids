---
description: Design tokens and UI standards.
globs: "**/*.{jsx,css}"
alwaysApply: false
---

# Rule: UI Guidelines

## 1. Stack & CSS
- **Stack**: SPA (React 19, Vite).
- **Styling**: **Vanilla CSS** only. 
- **Constraint**: No atomic/Tailwind classes (e.g., `flex`). Use `src/index.css` global/scoped styles.

## 2. Design Tokens (`src/index.css`)
- **Colors**: `var(--color-emerald)`, `var(--color-navy)`, `var(--color-amber)`, `var(--color-teacher)`.
- **Text/BG**: `var(--color-text)`, `var(--color-bg)`, `var(--color-white)`, `var(--color-border)`.
- **Radii**: `var(--radius-pill)`, `var(--radius-xl)`, `var(--radius-lg)`, `var(--radius-md)`.
- **Shadows**: `var(--shadow-sm)`, `var(--shadow-md)`, `var(--shadow-lg)`.

## 3. Layout Patterns
- **Containers**: Use `.container` (max-width).
- **Grids**: Vanilla `display: grid`. Handle media queries at the END of CSS blocks.
- **Anchors**: Cross-page links must start with `/` (e.g., `href="/#id"`).
- **Mobile**: Touch targets >= 44px.

## 4. Components
- **Buttons**: `.btn` with variants `.btn-primary`, `.btn-outline`, `.btn-white`.
- **Labels**: Use `.section-label`.
- **Animations**: Entrance: `.animate-fade-up`. Interaction: `transform: translateY(-2px)` on hover.

Always check `src/index.css` before adding new classes.
