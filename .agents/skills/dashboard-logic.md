# Skill: Dashboard Logic & State Management

Trigger this skill when building or modifying the Teacher or Parent dashboards.

## 1. Dashboard UI Hierarchy
Dashboards in AvenirCore follow a structured management layout:
- **Sidebar**: Persistent navigation for quick context switching.
- **Metric Strip**: High-level stats (e.g., "Stories Completed", "Class Progress").
- **View Area**: Dynamic content based on routing.

## 2. State & Persistence
The dashboard relies on session-based state and potential local storage caching.
- **User Context**: Load `user` and `preferences` objects from `src/utils/auth.js` (forthcoming).
- **Progress Tracking**: Interface with `src/utils/progress.js` to fetch and update student activity.

## 3. Interaction Patterns
- **Empty States**: Always provide a "Get Started" CTA when a view has no data.
- **Loading Skeletons**: Use `Suspense` and dedicated skeleton loaders to maintain layout stability during data fetch.
- **Modals**: For administrative tasks (adding students, changing settings), use the `.modal` overlay pattern with `Escape` key close listeners.

## 4. Accessibility
- Dashboard tables must use semantic `<thead>` and `<tbody>`.
- Interactive cards must have `aria-label` descriptions for screen readers.
