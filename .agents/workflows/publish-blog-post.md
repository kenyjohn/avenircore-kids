---
description: This workflow provides exact steps to create and publish a new SEO blog post in the AvenirCore repository.
---
# Workflow: Publish an SEO Blog Post

Follow these exact steps when the user asks to add or publish a new article/blog post. 

## 1. Create the MDX File
Create a new file in `src/posts/` named precisely after the target keyword slug.
- Example: `src/posts/what-is-artificial-intelligence-for-kids.mdx`

## 2. Insert Required Frontmatter
The top of the file must strictly export the required properties. Do not deviate from this schema:

```javascript
export const title = "Your 50-60 char title including primary keyword"
export const description = "Your 150-160 char meta description naturally including the keyword."
export const excerpt = "A catchy 1-2 sentence preview for the blog index."
export const date = "YYYY-MM-DD"
export const category = "Safety" // Choose from: Safety, Tools, Parents, Teachers, Activities
export const keywords = "keyword 1, keyword 2, keyword 3"
export const featured = false // true if requested
export const faqs = [
  { q: "Question 1?", a: "Answer 1." },
  { q: "Question 2?", a: "Answer 2." }
]
```

## 3. Write the Blog Content
Content must follow standard Markdown below the exports.
- **Important**: Must contain high-quality headers starting from `##` (H2).
- Do not use `<h1>` tag inside the markdown body, as the `<BlogPost />` layer natively handles the page title.

## 4. Update the Vite Configuration for Sitemap
The new route needs to be known at build-time for the sitemap generator.
- Open `vite.config.js`.
- Locate the `sitemap` plugin's `dynamicRoutes` array.
- Append `/blog/[your-slug]` to that array.

// turbo
## 5. Build Verification
Run `npm run build` using your terminal tool to verify that the MDX compiles without errors and the `dist/sitemap.xml` generated successfully.

// turbo
## 6. Commit and Push
Stage changes via `git add .`, commit them mentioning the new post slug, and `git push` them to the remote branch so Vercel can deploy it.
