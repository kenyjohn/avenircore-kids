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

## 3. Sitemap & Search Console
- **Sitemap**: Automated via `vite-plugin-sitemap`. Routes are dynamically discovered by scanning content folders in `vite.config.js`.
- **Search Console**: Automated submission via GitHub Actions to Google and Bing after every deploy to `main`.

## 4. Social Metadata Standards
To ensure rich previews on WhatsApp and LinkedIn:
- **Dimensions**: Always specify `og:image:width` and `og:image:height`.
- **Article Data**: For `og:type="article"`, include `article:author`, `article:published_time`, and `article:section`.
- **Optimization**: Keep OG images under 300KB and use `.jpg` for maximum compatibility.
