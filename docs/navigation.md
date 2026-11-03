# Navigation guide (humans + coding agents)

Use this document to move through the **Startup Tools Hub** codebase and the **live site** without guessing paths.

**Related:** [PRD](prd.md) · [LINKAGE](LINKAGE.md) · [WIRING](WIRING.md) · [README](../README.md) · [AGENTS](../AGENTS.md)

---

## 1. Local URLs (default dev)

| URL | Purpose |
|-----|---------|
| http://localhost:3016/ | Marketing home (`MarketingHero3D`, search, categories) |
| http://localhost:3016/tools | All tools index |
| http://localhost:3016/tools/finance | Startup finance hub |
| http://localhost:3016/tools/finance/runway-calculator | Runway tool |
| http://localhost:3016/tools/finance/safe-calculator | SAFE tool |
| http://localhost:3016/tools/finance/cap-table-lite | Cap table tool |
| http://localhost:3016/tools/pdf/merge-pdf | Example Pickrack PDF tool |
| http://localhost:3016/tools/dev/json-formatter | Example dev tool |
| http://localhost:3016/blog | MDX blog |
| http://localhost:3016/api/pdf/compress | Example server PDF route (Pickrack) |
| http://localhost:3001/api/docs | NestJS Swagger (when `apps/api` running) |

**Env:** [apps/web/.env.local.example](../apps/web/.env.local.example) — copy to `.env.local`.

---

## 2. Site map (user-facing)

```text
/                          Home (startup positioning + Pickrack catalog)
/tools/                    All categories
/tools/{category}/         Category hub (7 categories)
/tools/{category}/{slug}/  Individual tool
/blog/                     Content marketing
/about, /privacy, /terms  Policy pages (Pickrack)
```

### Categories (`CategoryId` → URL slug)

| ID | Slug | Hub URL | Tool count (registry) |
|----|------|---------|------------------------|
| finance | finance | `/tools/finance/` | 9 (Hub-native + OSS ports) |
| pdf | pdf | `/tools/pdf/` | 17 |
| image | image | `/tools/image/` | 12 |
| ai | ai | `/tools/ai/` | 9 |
| dev | dev | `/tools/dev/` | 14 |
| text | text | `/tools/text/` | 10 |
| calc | calc | `/tools/calc/` | 16 |

**Registry total:** ~90 entries in [apps/web/lib/tools.ts](../apps/web/lib/tools.ts) (includes finance + OSS ports).

### Finance tools (first-class Startup Hub)

| Slug | Route | Component | Logic file |
|------|-------|-----------|------------|
| runway-calculator | `/tools/finance/runway-calculator/` | [FinanceRunwayTool.tsx](../apps/web/components/tools/FinanceRunwayTool.tsx) | (inline sim; see runway vendor) |
| safe-calculator | `/tools/finance/safe-calculator/` | [FinanceSafeTool.tsx](../apps/web/components/tools/FinanceSafeTool.tsx) | [safe-math.ts](../apps/web/lib/finance/safe-math.ts) |
| cap-table-lite | `/tools/finance/cap-table-lite/` | [FinanceCapTableTool.tsx](../apps/web/components/tools/FinanceCapTableTool.tsx) | [cap-table.ts](../apps/web/lib/finance/cap-table.ts) |
| tam-sam-som-calculator | `/tools/finance/tam-sam-som-calculator/` | [FinanceTamSamSomTool.tsx](../apps/web/components/tools/FinanceTamSamSomTool.tsx) | [tam-sam-som.ts](../apps/web/lib/finance/tam-sam-som.ts) |
| ltv-cac-calculator | `/tools/finance/ltv-cac-calculator/` | [FinanceLtvCacTool.tsx](../apps/web/components/tools/FinanceLtvCacTool.tsx) | [unit-economics.ts](../apps/web/lib/finance/unit-economics.ts) |
| break-even-calculator | `/tools/finance/break-even-calculator/` | [FinanceBreakEvenTool.tsx](../apps/web/components/tools/FinanceBreakEvenTool.tsx) | [break-even.ts](../apps/web/lib/finance/break-even.ts) |
| employee-equity-calculator | `/tools/finance/employee-equity-calculator/` | [FinanceEquityTool.tsx](../apps/web/components/tools/FinanceEquityTool.tsx) | [lib/finance/equity/](../apps/web/lib/finance/equity/) ← `_vendor/startup-equity-calculator` |
| safe-dilution-simulator | `/tools/finance/safe-dilution-simulator/` | [FinanceSafeDilutionTool.tsx](../apps/web/components/tools/FinanceSafeDilutionTool.tsx) | [safe-simulator/](../apps/web/lib/finance/safe-simulator/) ← `_vendor/safe-cap-table-simulator` |
| cap-table-pro | `/tools/finance/cap-table-pro/` | [FinanceCapTableProTool.tsx](../apps/web/components/tools/FinanceCapTableProTool.tsx) | [cap-table-pro.ts](../apps/web/lib/finance/cap-table-pro.ts) + `@1984vc/cap-table` |

---

## 3. Code map (where to edit)

### 3.1 Single sources of truth

| Concern | File | Notes |
|---------|------|--------|
| Site name, URLs, API URL | [apps/web/lib/site-config.ts](../apps/web/lib/site-config.ts) | `SITE_NAME`, `SITE_URL`, `API_URL` |
| Categories | [apps/web/lib/categories.ts](../apps/web/lib/categories.ts) | Add `CategoryId` + `CATEGORIES` + `CATEGORY_ORDER` |
| Tool list | [apps/web/lib/tools.ts](../apps/web/lib/tools.ts) | `slug`, `category`, `available` |
| SEO metadata per tool | [apps/web/lib/tool-seo.ts](../apps/web/lib/tool-seo.ts) | Pickrack tools; finance tools use page `metadata` |
| Long-form tool copy | [apps/web/lib/tool-content.ts](../apps/web/lib/tool-content.ts) | FAQ/HowTo JSON-LD for Pickrack slugs |
| Blog posts | [apps/web/posts/*.mdx](../apps/web/posts/) + [posts.ts](../apps/web/lib/posts.ts) | |

### 3.2 Layout & chrome

| UI | File |
|----|------|
| Global layout, GA, JSON-LD org | [apps/web/app/layout.tsx](../apps/web/app/layout.tsx) |
| Home page | [apps/web/app/page.tsx](../apps/web/app/page.tsx) |
| Header nav (categories) | [apps/web/components/Header.tsx](../apps/web/components/Header.tsx) |
| Footer | [apps/web/components/Footer.tsx](../apps/web/components/Footer.tsx) |
| Category hub template | [apps/web/components/CategoryHub.tsx](../apps/web/components/CategoryHub.tsx) |
| Pickrack tool shell | [apps/web/components/ToolLayoutWrapper.tsx](../apps/web/components/ToolLayoutWrapper.tsx) |
| Landing hero | [apps/web/components/landing/MarketingHero3D.tsx](../apps/web/components/landing/MarketingHero3D.tsx) |
| SaaS landing sections | [apps/web/components/landing/LandingTemplateSections.tsx](../apps/web/components/landing/LandingTemplateSections.tsx) |
| Landing copy (non-brand) | [apps/web/lib/landing-content.ts](../apps/web/lib/landing-content.ts) |
| Tool search | [apps/web/components/ToolSearchBar.tsx](../apps/web/components/ToolSearchBar.tsx) |

### 3.3 Tool route pattern (Pickrack)

```text
apps/web/app/tools/{category}/{slug}/page.tsx    # tool UI
apps/web/app/tools/{category}/{slug}/layout.tsx # optional: ToolLayoutWrapper + metadata
apps/web/app/tools/{category}/page.tsx           # CategoryHub
```

Example: [merge-pdf/layout.tsx](../apps/web/app/tools/pdf/merge-pdf/layout.tsx) + [page.tsx](../apps/web/app/tools/pdf/merge-pdf/page.tsx).

Finance tools use **page-only** routes under [apps/web/app/tools/finance/](../apps/web/app/tools/finance/) without `ToolLayoutWrapper` (SEO content not in `tool-content.ts` yet).

### 3.4 Server routes (Tier B — Pickrack)

```text
apps/web/app/api/pdf/*     Ghostscript, qpdf, LibreOffice, etc.
apps/web/app/api/ai/*      Anthropic-backed (requires keys)
apps/web/app/api/currency/*
```

Future consolidation: [apps/api](../apps/api/) (pdf-everything NestJS) via `NEXT_PUBLIC_API_URL`.

### 3.5 Backend monorepo slice

| Path | Role |
|------|------|
| [apps/api/src/main.ts](../apps/api/src/main.ts) | Nest bootstrap, `/api` prefix, Swagger |
| [apps/api/src/health.controller.ts](../apps/api/src/health.controller.ts) | Health check |
| [packages/types](../packages/types/) | Zod schemas shared with API |

### 3.6 Vendor reference (read-only)

| Path | When to open |
|------|----------------|
| [_vendor/app-template](../_vendor/app-template/) | Copy landing sections / Magic UI |
| [_vendor/awwwards-adidas](../_vendor/awwwards-adidas/) | GSAP + R3F patterns |
| [_vendor/startup-equity-calculator](../_vendor/startup-equity-calculator/) | Employee equity UI + lib (shipped) |
| [_vendor/toolstrek](../_vendor/toolstrek/) | Port calculators (e.g. savings) |
| [_vendor/gawe](../_vendor/gawe/) | PWA, `config/tools.ts` |
| [_vendor/1984vc-cap-table](../_vendor/1984vc-cap-table/) | Pro cap table / SAFE stack math |
| [_vendor/startup-equity-calculator](../_vendor/startup-equity-calculator/) | Employee equity UI port |
| [_vendor/omni-tools](../_vendor/omni-tools/) | Vite tool modules (dedupe Pickrack) |
| [_vendor/bytefork-tools](../_vendor/bytefork-tools/) | Astro dev/data utilities |
| [_vendor/devyantra-ui](../_vendor/devyantra-ui/) | Vue dev tools → port to `dev/` |
| [_vendor/safe-cap-table-simulator](../_vendor/safe-cap-table-simulator/) | Dilution charts |
| [_vendor/browserytools](../_vendor/browserytools/) | AGPL — UX reference only |
| [_vendor/sopkit](../_vendor/sopkit/) | Non-commercial — registry/SEO reference |
| [_vendor/safe-calculator](../_vendor/safe-calculator/) | Diff SAFE math |
| [_vendor/cap-table](../_vendor/cap-table/) | Diff cap table UI |

---

## 4. Agent workflows

### Add a new tool (standard)

1. Add entry to [tools.ts](../apps/web/lib/tools.ts) with correct `category` and `slug`.
2. Create `app/tools/{category}/{slug}/page.tsx` (+ `layout.tsx` with `buildToolMetadata` if using SEO registry).
3. Add SEO block in [tool-seo.ts](../apps/web/lib/tool-seo.ts) and content in [tool-content.ts](../apps/web/lib/tool-content.ts) when possible.
4. Verify category hub lists the tool ([CategoryHub](../apps/web/components/CategoryHub.tsx) reads registry).
5. Run `npm run build` in `apps/web`.

### Add a finance / startup tool (fast path)

1. Implement UI in [apps/web/components/tools/](../apps/web/components/tools/).
2. Add logic under [apps/web/lib/finance/](../apps/web/lib/finance/) or new `lib/startup/`.
3. Register in [tools.ts](../apps/web/lib/tools.ts); ensure [categories.ts](../apps/web/lib/categories.ts) has `finance`.
4. Add `app/tools/finance/{slug}/page.tsx` with `metadata` export.

### Reskin landing

1. Edit [MarketingHero3D.tsx](../apps/web/components/landing/MarketingHero3D.tsx) and [page.tsx](../apps/web/app/page.tsx).
2. Pull sections from [_vendor/saas-landing-template/components](../_vendor/saas-landing-template/components/) or [_vendor/saas-landingpage/src](../_vendor/saas-landingpage/src/) — copy into `apps/web/components/landing/` (do not import across repo boundary).
3. Keep site name/URLs in [site-config.ts](../apps/web/lib/site-config.ts); section copy in [landing-content.ts](../apps/web/lib/landing-content.ts).
4. Keep heavy 3D out of [app/layout.tsx](../apps/web/app/layout.tsx) used by tools.

### Sync from upstream Pickrack

```powershell
git remote add pickrack https://github.com/pickrack/pickrack.git  # once
git fetch pickrack
# merge selectively into apps/web — preserve site-config, finance, landing
```

See [LINKAGE.md](LINKAGE.md).

---

## 5. Commands

```powershell
# Web (primary)
cd "E:\startup tools\apps\web"
npm install
npm run dev          # http://localhost:3016
npm run build

# API (optional)
cd "E:\startup tools\apps\api"
npm install
npm run dev          # http://localhost:3001

# From monorepo root
cd "E:\startup tools"
npm run dev          # delegates to apps/web
node scripts/verify-vendor-linkage.mjs   # clone → wired path audit
node scripts/clone-phase1-vendors.mjs    # shallow-clone Phase 1 batch
pnpm install         # links apps/api ↔ packages/types
pnpm run build:types
```

---

## 6. Decision tree (where do I look?)

```text
User sees wrong title/brand     → site-config.ts, layout.tsx metadata
Tool missing from nav/search      → tools.ts (available: true), categories.ts
Tool 404                          → app/tools/.../page.tsx exists? slug matches URL?
Finance math wrong                → lib/finance/*.ts, compare _vendor/batkotron/*
PDF server error                  → app/api/pdf/*, lib/libreoffice.ts, env binaries
Want iLovePDF-style new PDF tool  → copy pattern from app/tools/pdf/merge-pdf
Want PRD scope                    → prd.md
Which GitHub repo did this come from? → LINKAGE.md
```

---

## 7. Document index

| Document | Audience | Content |
|----------|----------|---------|
| [README.md](../README.md) | Everyone | Quick start |
| [AGENTS.md](../AGENTS.md) | AI agents | Read order + rules |
| **navigation.md** (this file) | AI + devs | Site + code map |
| [prd.md](prd.md) | PM + agents | Requirements, roadmap |
| [LINKAGE.md](LINKAGE.md) | Legal + sync | Upstream repos |
| [WIRING.md](WIRING.md) | Implementers | Merge history CW1–CW8 |
