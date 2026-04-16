# Skill: Search Architecture & Discovery

Trigger this skill when implementing or modifying the site-wide search feature.

## 1. Indexing Strategy
AvenirCore uses a client-side search index generated from local data sources.
- **Data Sources**: `src/data/stories/` (JSON) and `src/posts/` (MDX).
- **Mapping**: Fields to index include `title`, `description`, `category`, and `keywords`.

## 2. Search UI Components
The search interface is a high-accessibility modal:
- **Trigger**: Search icon in Header or `Cmd+K` keyboard shortcut.
- **Results**: Real-time filtering with highlighted match segments.
- **Categorization**: Group results by "Stories", "Guides", and "Help Articles".

## 3. Keyboard Interaction
Search must be fully navigable via keyboard:
- `ArrowUp` / `ArrowDown`: Navigate through results.
- `Enter`: Select result.
- `Esc`: Close search modal.

## 4. Performance Optimization
- **Memoization**: Search results should be memoized using `useMemo` to prevent UI lag during typing.
- **Lazy Loading**: The search modal and indexing logic should be lazily loaded to avoid blocking the initial page paint.
