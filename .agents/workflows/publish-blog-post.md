---
description: Steps for publishing SEO blog posts.
---
# Workflow: Publish SEO Blog Post

## 1. Create File
`src/posts/[slug].mdx`.

## 2. Insert Frontmatter
```javascript
export const title = "50-60 char title + keyword"
export const description = "150-160 char meta description"
export const excerpt = "Catchy preview"
export const date = "YYYY-MM-DD"
export const category = "Safety|Tools|Parents|Teachers|Activities"
export const keywords = "k1, k2, k3"
export const featured = false
export const faqs = [{ q: "Q?", a: "A." }]
```

## 3. Writing
- Use `##`+ (no `<h1>`).
- MDX below exports.

## 4. Routing
- Add `/blog/[slug]` to `dynamicRoutes` in `vite.config.js`.

## 5. Verify & Push
- `npm run build` (check sitemap in `dist/`).
- `git add .` -> `git commit` -> `git push`.
