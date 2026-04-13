# AvenirCore — Agent Root Configuration

Welcome completely to the AvenirCore context ecosystem. This workspace specifically limits overlapping contexts using modular logic triggered exclusively by context loading scenarios to enforce efficient and deterministic token handling. 

Instead of searching broad files, load ONLY the precise specific `skills/` or `rules/` applicable to individual tasks. 

## 1. Unified Modular Logic Hierarchy

The entirety of AI direction exists efficiently centralized under the `.agents/` parameter block mapping logically:

### Core Enforcements (`.agents/rules/`)
*Load these guidelines aggressively for universal application patterns.*
- **`.agents/rules/core-conventions.md`** - Architectural hygiene, testing commands, issue workflows, APIs, build standards, environment security limiters.
- **`.agents/rules/ui-guidelines.md`** - Baseline layout, dynamic Vanilla CSS handling, spacing, anchoring logic. 

### Triggered Skills (`.agents/skills/`)
*Load these instruction modules only when context explicitly requires them.*
- **`.agents/skills/seo-excellence.md`** - Instructions for defining metadata boundaries, Helmet hooks, Sitemap rules, and precise E-E-A-T JSON-LD schemas mapping out a best in class core web vital integration.
- **`.agents/skills/cta-conversion.md`** - Marketing focus logic, UI sizing limits, interactive trigger bounds, honeypot filters.

### Automated Workflows (`.agents/workflows/`)
*Run specific workflows executing repetitive procedural patterns directly.*
- **`.agents/workflows/publish-blog-post.md`** - Structured automation specifically configuring the generation of routing/metadata variables for MDX articles.

--- 
## 2. Basic Repository Controls
```bash
npm ci          # clean install
npm run lint    # strict configuration checks mapping out API node vs UI environments
npm run build   # payload validation verification
npm run dev     # interactive debug test site
```
