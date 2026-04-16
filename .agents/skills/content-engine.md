# Skill: Content Architecture (Stories & MDX)

Trigger this skill when creating, modifying, or migrating interactive story content or blog posts.

## 1. Interactive Story Engine (`src/data/stories/`)
Stories are fully data-driven. **Never modify `StoryPlayer.jsx` to add content.**

### JSON Schema
New stories must be added to `src/data/stories/` as JSON and registered in `src/data/stories/index.js`.

```json
{
  "id": "slug-id",
  "title": "Story Title",
  "description": "Short summary",
  "ageRange": "6–8",
  "difficulty": "Beginner",
  "aiConcept": "Concept Name",
  "character": { "name": "Name", "emoji": "🤖", "color": "#hex" },
  "steps": [
    { "type": "story", "content": "Narrative text" },
    { "type": "question", "question": "Q?", "options": ["A","B","C","D"], "correct": 0 },
    { "type": "activity", "instruction": "Do X", "options": ["X","Y"], "correct": 0 }
  ]
}
```

## 2. Blogging Pipeline (`src/posts/`)
Articles are stored as `.mdx` files. The frontmatter is automatically parsed by `src/utils/posts.js`.

### Required Frontmatter
```mdx
export const title = "Article Title"
export const date = "2024-03-20"
export const category = "Guides"
export const readingTime = "5 min read"
export const description = "SEO description"
export const keywords = ["AI", "Kids"]
```

### Advanced Schema Blocks
- **FAQs**: Export a `faqs` array for automatic JSON-LD injection.
- **Reading Time**: Defaults to "4 min read" if omitted.

## 3. Registration Logic
- **Stories**: Must be imported and added to the `stories` array in `src/data/stories/index.js`.
- **Posts**: Automatically discovered via `import.meta.glob` in `src/utils/posts.js`.
