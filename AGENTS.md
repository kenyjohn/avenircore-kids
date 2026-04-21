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
- **`.agents/skills/seo-excellence.md`** - Best-in-class core web vital and E-E-A-T integration.
- **`.agents/skills/cta-conversion.md`** - Marketing focus logic and interaction trigger bounds.
- **`.agents/skills/content-engine.md`** - Story JSON schemas and MDX blog pipeline.
- **`.agents/skills/site-engineering.md`** - Routing topology and API boundary definitions.
- **`.agents/skills/ui-patterns.md`** - Component scaffolding, animations, and design tokens.
- **`.agents/skills/dashboard-logic.md`** - Layout and state guidelines for Teacher/Parent portals.
- **`.agents/skills/search-architecture.md`** - Search indexing, keyboard navigation, and UI patterns.
- **`.agents/skills/pre-merge-validation.md`** - Final checklist for sitemaps, llms.txt, and security before merging features to main.

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
