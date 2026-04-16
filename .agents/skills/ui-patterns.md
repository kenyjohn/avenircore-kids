# Skill: UI Pattern Library & Component Standards

Trigger this skill when building new components, styling layouts, or adding animations in AvenirCore.

## 1. Design Tokens (Vanilla CSS)
Rely on `src/index.css` variables. **Never hardcode hex values.**

- **Colors**: `var(--color-emerald)` (Primary), `var(--color-teacher)` (Educator Accent), `var(--color-amber)` (Highlight).
- **Rounding**: `var(--radius-xl)` (Large cards), `var(--radius-pill)` (Buttons).
- **Shadows**: `var(--shadow-md)` (Standard), `var(--shadow-lg)` (Interactive/Hover).

## 2. Component Scaffolding
### Section Template
```jsx
<section className="section">
  <div className="container">
    <span className="section-label">Label</span>
    <h2 className="section-title">Headline</h2>
    <div className="custom-grid">
      {/* Cards here */}
    </div>
  </div>
</section>
```

### Actionable Buttons
- Primary: `.btn .btn-primary`
- Outline: `.btn .btn-outline`
- Responsive: Add `.btn-lg` for hero contexts.

## 3. Brand Animations
Use native CSS keyframes defined in `index.css`:
- **Entrance**: `.animate-fade-up` (standard content reveal).
- **Attention**: `.animate-float` (soft hover or hero background).
- **Feedback**: `.animate-shake` (errors), `.animate-pop` (success).

## 4. CTA Rules
- Hover states must include `transform: translateY(-2px);` for depth.
- Click targets on mobile must be >= 44px.
