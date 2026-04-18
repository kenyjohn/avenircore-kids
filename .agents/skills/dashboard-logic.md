# Skill: Dashboard Logic & State

Trigger for: Teacher/Parent dashboards.

## 1. Hierarchy
- **Sidebar**: Persistent Nav.
- **Metric Strip**: Stats (Class Progress, Completion).
- **View Area**: Dynamic routing area.

## 2. State & Data
- **Auth/User**: Context from `src/utils/auth.js`.
- **Progress**: API hooks in `src/utils/progress.js`.
- **UI States**: Skeletons for loading; `.modal` for admin tasks (Esc to close).

## 3. Accessibility
- **Tables**: Use `<thead>`, `<tbody>`.
- **Cards**: Descriptive `aria-label` required.
