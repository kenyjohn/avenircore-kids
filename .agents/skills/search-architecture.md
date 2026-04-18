# Skill: Search Architecture

Trigger for: site-wide search.

## 1. Strategy
- **Index**: Client-side from `src/data/stories/` and `src/posts/`.
- **Fields**: `title`, `description`, `category`, `keywords`.

## 2. Interaction
- **Trigger**: Header icon or `Cmd+K`.
- **Navigation**: `ArrowUp`/`ArrowDown` to select; `Enter` to confirm; `Esc` to close.
- **Categorization**: Group by "Stories", "Guides", "Articles".

## 3. Performance
- **Memoization**: Result filtering via `useMemo`.
- **Lazy Loading**: Import search modal/logic on trigger.
