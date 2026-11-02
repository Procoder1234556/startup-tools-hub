# Product requirements document (PRD)

**Product:** Startup Tools Hub  
**Repository:** `E:\startup tools`  
**Status:** Phase 1 — clone & wire complete; scale phase not started  
**Last updated:** 2026-11-02  

**Navigation for agents:** [navigation.md](navigation.md) · [LINKAGE.md](LINKAGE.md) · [README](../README.md)

---

## 1. Vision & problem

**Vision:** One trusted website (and installable app) where founders and startup teams run **hundreds of small utilities**—finance, legal helpers, PDF, dev, marketing—without juggling separate sites or paid SaaS for basic tasks.

**Problem:** Tools are fragmented (iLovePDF, random calculators, Carta for cap table). Founders waste time and leak sensitive data to many vendors.

**Positioning:** “iLovePDF for startups” — one brand, one search, privacy-forward browser tools, optional light API for checks and PDF jobs.

---

## 2. Goals & non-goals

### Goals

| ID | Goal | Success signal |
|----|------|----------------|
| G1 | Single hub with **search + categories** | User finds tool in &lt; 10s from home |
| G2 | **Privacy-first** Tier A tools | No upload for client-side tools; badge on pages |
| G3 | **Startup differentiation** | Finance + founder tools not generic calc sites |
| G4 | **SEO at scale** | One URL per tool; unique intros (later phases) |
| G5 | **OSS-composable** | Clear upstream linkage ([LINKAGE.md](LINKAGE.md)) |
| G6 | **Agent-maintainable** | navigation.md + registry-driven tools |

### Non-goals (current phase)

- Full CRM, accounting, or Carta-class cap table management  
- Legal filing services  
- Mandatory user accounts  
- Paid third-party APIs in the **core** path (Anthropic AI tools remain optional / key-gated)  
- 500 tools at launch (phased)

---

## 3. Target users

| Segment | Needs |
|---------|--------|
| Pre-seed / seed founders | Runway, SAFE, cap table lite, pitch PDFs, UTM links |
| Startup marketing / ops | PDF, image, SEO meta, docs |
| Technical cofounders | JSON/JWT, hashes, env helpers |
| Solo indie | Same as founders; lower team collaboration need |

Primary: **early-stage teams** + adjacent roles (marketing, ops, light dev).

---

## 4. Product architecture

### 4.1 Execution tiers

| Tier | Description | Target share | Examples |
|------|-------------|--------------|----------|
| **A** | Pure browser; optional localStorage | ~65% at scale | Calculators, formatters, merge PDF (client) |
| **B** | Our API; rate limits; ephemeral files | ~25% | OG fetch, DNS/MX, server PDF, Ollama proxy |
| **C** | OAuth / paid integrations | ~10% | Sheets export, Stripe webhook inspector |

**Current build:** Mostly Pickrack Tier A + server PDF in Next API routes; finance tools are Tier A; NestJS API copied but not fully wired.

### 4.2 Technical stack

| Layer | Choice | Location |
|-------|--------|----------|
| Web | Next.js 16 App Router, React 19, Tailwind 4 | `apps/web` |
| Marketing | Custom hero + Pickrack home sections | `components/landing`, `app/page.tsx` |
| API (future) | NestJS, Zod, OpenAPI | `apps/api` |
| Types | `@pdf-everything/types` fork | `packages/types` |
| Finance libs | batkotron ports | `apps/web/lib/finance` |
| Vendors | Git clones | `_vendor/*` |

### 4.3 Branding

| Field | Value | Config |
|-------|-------|--------|
| Product name | Startup Tools Hub | `SITE_NAME` |
| Default local URL | http://localhost:3016 | `SITE_URL` env |
| API URL | http://localhost:3001 | `NEXT_PUBLIC_API_URL` |

Pickrack-derived UI strings may still say “Pickrack” in blog/posts until content pass.

---

## 5. Feature scope

### 5.1 Shipped (Phase 1 — CW1–CW8)

| Feature | Status | Notes |
|---------|--------|-------|
| Pickrack tool catalog (~76 + 3 finance) | Live | `lib/tools.ts` |
| 7 category hubs | Live | includes **finance** |
| Startup marketing home | Live | `MarketingHero3D` |
| Finance: runway, SAFE, cap table lite | Live | batkotron lineage |
| Monorepo layout | Live | `apps/web`, `apps/api`, `packages/*`, `_vendor` |
| Documentation for agents | Live | navigation, PRD, LINKAGE, AGENTS |
| NestJS API tree | Copied | needs `npm install` + worker env to run |

### 5.2 Next — Phase 2 (MVP 50 startup tools)

Add ~50 curated tools (finance, naming, marketing, legal outlines, docs, dev) per original plan. Each requires registry + page + unique intro.

### 5.3 Future — Phase 3–5

| Phase | Deliverable |
|-------|-------------|
| 3 | Wire Pickrack server PDF to `apps/api`; Postgres + Redis rate limits |
| 4 | PWA offline (patterns from `_vendor/gawe`) |
| 5 | 150 → 300 → 500 tools; Pagefind search; country variants |

### 5.4 Landing / 3D roadmap

| Item | Source | Status |
|------|--------|--------|
| Conversion sections | `_vendor/app-template` | Partial (hero only) |
| GSAP scroll + R3F | `_vendor/awwwards-adidas` | Not bundled (perf) |
| Spline fallback | `_vendor/portfolio-v2` | Optional |

Requirement: 3D/WebGL **only** on `/`, not on tool routes (bundle split).

---

## 6. Information architecture

### URL convention

```text
/tools/{category}/{slug}/
```

Categories: `finance`, `pdf`, `image`, `ai`, `dev`, `text`, `calc`.

### Registry contract (`Tool` type)

```typescript
{
  slug: string;
  name: string;
  description: string;
  category: CategoryId;
  available: boolean;
  iconColor: string;
}
```

Future: `tier: 'A' | 'B' | 'C'`, `component: string`, `related: string[]`.

---

## 7. Functional requirements

### FR-1 Home

- Hero with value prop, **tool search**, CTA to `/tools` and featured finance tool  
- Category grid driven by `listCategories()` + tool counts  
- Trust: browser-private, no watermark  

### FR-2 Tool pages

- One primary action per page  
- Pickrack tools: breadcrumbs, JSON-LD via `ToolLayoutWrapper`  
- Finance tools: disclaimer (not legal/tax advice)  
- Export where applicable (CSV cap table)  

### FR-3 Search

- `ToolSearchBar` indexes `TOOLS` from `tools.ts`  
- Must include finance slugs  

### FR-4 Navigation

- Header links to all category hubs  
- Footer links (Pickrack baseline)  

### FR-5 API (when enabled)

- Health endpoint  
- CORS for web origin  
- No long-term storage of user uploads (ephemeral processing)  
- Audit log for Tier B (future)  

---

## 8. Non-functional requirements

| NFR | Target |
|-----|--------|
| Performance | Tool pages avoid loading Three.js/GSAP |
| Accessibility | `prefers-reduced-motion` on landing (static fallback) |
| Security | Secrets in env only; no keys in client bundle |
| Compliance | Template/disclaimer on legal/finance helpers |
| Maintainability | Single registry; docs in `docs/` |
| Licensing | Respect MIT/upstream licenses; document in LINKAGE |

---

## 9. Metrics (future)

| Metric | Tool |
|--------|------|
| Tool page views | Plausible/Fathom (optional) |
| Search usage | Event on ToolSearchBar submit |
| PWA installs | Web app manifest analytics |
| API latency | OpenTelemetry on Nest |

Not implemented in Phase 1.

---

## 10. Risks & mitigations

| Risk | Mitigation |
|------|------------|
| Pickrack upstream drift | Document remote; selective merges |
| AGPL contamination | Do not merge browserytools/atools code |
| Thin SEO (duplicate intros) | Phase 5 unique copy per tool |
| AI tools need paid keys | Disable or Ollama BYOK |
| Large `_vendor` repo size | Optional `.gitignore` + LINKAGE re-clone script |

---

## 11. Open questions

1. Final production domain and whether to keep Pickrack blog content  
2. Git remote for this monorepo (user-owned `origin`)  
3. Whether `_vendor` is committed or CI-cloned  
4. Brand rename pass for all Pickrack strings  

---

## 12. Appendix — category catalog (target 500)

Long-term **15 startup categories** (naming, validation, finance, fundraising, legal helpers, marketing, sales, product, engineering, HR, ops/docs, analytics, e-commerce, AI workflows, support) — see plan file `startup_tools_hub_e959c87a.plan.md` in Cursor plans for full list.

**Current implementation:** 7 categories in code; finance is Startup Hub-specific; others from Pickrack.

---

## 13. Document links

| Doc | Purpose |
|-----|---------|
| [navigation.md](navigation.md) | Routes + files for agents |
| [LINKAGE.md](LINKAGE.md) | GitHub upstream map |
| [WIRING.md](WIRING.md) | Integration steps done |
| [AGENTS.md](../AGENTS.md) | Agent read order |
