---
description: Ensure all new content is properly syndicated, labeled, and optimized for conversion.
---
# Skill: Content Syndication

When adding new blog articles or interactive stories, ALWAYS follow these syndication requirements to ensure seamless user navigation and conversion:

## 1. Pillar and Hub Syndication
- If the new content is for parents, add it to the `PILLAR_ARTICLES` array in `src/pages/PillarPage.jsx`.
- If the new content is for teachers, add it to the `TEACHER_ARTICLES` array in `src/pages/TeacherHub.jsx`.
- If the new content is a story, ensure it appears in `src/pages/StoriesIndex.jsx`.

## 2. 'New' Content Labeling
- For all new articles, ensure the MDX frontmatter includes `export const isNew = true`.
- The `isNew` flag automatically renders a visual "NEW" badge on the Blog Index, Pillar Page, and Teacher Hub.
- Once a feature has been out for > 1 month, this flag can be removed by the maintainer.

## 3. Inline Newsletter Injection
- DO NOT rely solely on the page layout to capture subscribers.
- Inject the `NewsletterCTA` directly into the MDX content so readers can subscribe inline while they are highly engaged.
- Inject `<NewsletterCTA variant="mid" role="[parent|teacher|general]" />` roughly halfway through the article.
- Inject `<NewsletterCTA variant="end" role="[parent|teacher|general]" />` at the very end of the article, just before the author bio.

## 4. Seamless Navigation
- Ensure that any index components (like `TeacherHub` or `PillarPage`) provide clear links to read the article.
- `BlogPost.jsx` automatically handles previous/next navigation via `getAdjacentPosts`. Ensure the new content has a valid date so it correctly inserts itself into the chronological array.
