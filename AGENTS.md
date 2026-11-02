# Agent instructions — Startup Tools Hub

Read these files **in order** before changing code:

1. [README.md](README.md) — project overview and commands  
2. [docs/navigation.md](docs/navigation.md) — **site map, code map, where to edit**  
3. [docs/prd.md](docs/prd.md) — product goals, scope, tiers, roadmap  
4. [docs/LINKAGE.md](docs/LINKAGE.md) — upstream GitHub repos and file lineage  
5. [docs/WIRING.md](docs/WIRING.md) — how clones were merged  

**Primary app:** `apps/web` (Next.js 16, port **3016**).  
**Do not edit** `_vendor/*` except to copy patterns into `apps/web`; treat vendors as read-only reference.

When adding a tool: update `apps/web/lib/tools.ts`, `apps/web/lib/categories.ts` (if new category), add `apps/web/app/tools/<category>/<slug>/page.tsx`, and prefer `ToolLayoutWrapper` + `lib/tool-seo.ts` when SEO content exists.
