# Skill: SEO & Schema Authority

Trigger for: routing, meta headers, blog migrations.

## 1. Meta Injection (`react-helmet-async`)
Inject metadata overrides to replace `index.html` defaults:
- **Tags**: `<title>`, `<meta name="description">`.
- **OpenGraph**: `og:title`, `og:type`, `og:url`.
- **Canonical**: Always inject canonical URL to prevent duplication.

## 2. JSON-LD Schema
Use `src/utils/security.js` with `safeJsonLd()` for injection.
- **Article**: For `src/posts/*.mdx`.
- **BreadcrumbList**: For navigation hierarchy.
- **Author**: Use `Person` mapping to external authority sources.
- **FAQPage**: For MDX articles with `faqs` arrays.

## 3. Sitemap & Routing
- **Sitemap**: Vite-managed at `/sitemap.xml`.
- **Routing**: Major site sections must be added to `dynamicRoutes` block in `vite.config.js`.
