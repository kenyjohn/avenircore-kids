# Skill: SEO Excellence & Schema Authority

AvenirCore requires best-in-class search engine authority mapped securely to E-E-A-T (Experience, Expertise, Authoritativeness, and Trustworthiness) standards. Trigger this skill whenever you are tasked with routing new pages, configuring Meta headers, or migrating blog entries.

## 1. Context Injection (`react-helmet-async`)
Every single frontend payload MUST inject metadata overrides replacing index.html baselines.
- Minimum Tags: `<title>`, `<meta name="description">`
- Essential OpenGraph Attributes: `<meta property="og:title">`, `<meta property="og:type">`, `<meta property="og:url">`
- Injecting canonical URLs guarantees identical path mappings resolve to one true SEO page.

## 2. Dynamic JSON-LD Generation
Integrate nested LD-JSON schema arrays specifically on content-rich templates. Leverage `src/utils/security.js` implementations like `safeJsonLd()` to securely pipe JSON without escaping breaks.
- Target templates: `Article` schemas for blog-posts.
- Provide `BreadcrumbList` for index/category hierarchy linking.
- Ensure Author profiles bind to `Person` mapping structures referencing authoritative external sources.
- Attach `FAQPage` configurations exclusively to `src/posts/*.mdx` objects emitting detailed FAQ array constants.

## 3. SEO Sitemap & Deployment Integrity 
Sitemaps update sequentially utilizing Vite tooling mapping to root `/sitemap.xml`.
When crafting new major site sections, bind the dynamic routing path strictly directly to the `dynamicRoutes` block configuration housed inside `vite.config.js`.
