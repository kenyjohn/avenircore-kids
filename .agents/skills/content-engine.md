# Skill: Content Architecture (Stories & MDX)

Trigger for: stories, blog posts.

## 1. Story Engine (`src/data/stories/`)
Data-driven. **No UI changes for content.**
- **Schema**: Add JSON to `src/data/stories/` and register in `index.js`.
- **Fields**: `id`, `title`, `description`, `ageRange`, `difficulty`, `aiConcept`, `character`, `steps`.
- **Steps**: Types: `story`, `question`, `activity`.

## 2. Blogging Pipeline (`src/posts/`)
MDX-based. Parsed via `src/utils/posts.js`.
- **Frontmatter**: `title`, `date`, `category`, `readingTime`, `description`, `keywords`, `faqs`.
- **FAQs**: Exports a `faqs` array for JSON-LD.
- **H1**: Do not use `<h1>` in MDX; handled by `<BlogPost />`.

## 3. Registration
- **Stories**: Manual import/export in `src/data/stories/index.js`.
- **Posts**: Auto-globbed via `import.meta.glob`.
