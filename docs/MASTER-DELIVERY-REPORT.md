# Master delivery report — Startup Tools Hub

**Date:** 2026-11-03  
**Repository:** `E:\startup tools`  
**Mission:** All-in-one free online tools platform composed from open source (integration-first).

---

## 1. GitHub repositories discovered

See [research-inventory.md](research-inventory.md) for the full table (40+ entries).

**Highlights:** pickrack/pickrack, toolstrek, gawe, omni-tools, browserytools (AGPL), SopKit, devyantra-ui, 1984vc/cap-table, dilution-lab, startup-equity-calculator, pdf-everything, batkotron finance trio, SaaS landing templates.

---

## 2. Repositories successfully cloned

| Path | Upstream |
|------|----------|
| `apps/web/` | pickrack/pickrack |
| `_vendor/app-template` | magicuidesign/app-template |
| `_vendor/awwwards-adidas` | Ali-Sanati/awwwards-adidas |
| `_vendor/portfolio-v2` | rr3s1/portfolio-v2 |
| `_vendor/pdf-everything` | piyush-gambhir/pdf-everything |
| `_vendor/safe-calculator` | batkotron/safe-calculator |
| `_vendor/cap-table` | batkotron/cap-table |
| `_vendor/startup-runway-calculator` | fozankhana/startup-runway-calculator |
| `_vendor/toolstrek` | tasnimultas67/toolstrek |
| `_vendor/gawe` | kalabaru-apps/gawe |
| `_vendor/saas-landingpage` | AtotheY/saas-landingpage |
| `_vendor/saas-landing-template` | gonzalochale/saas-landing-template |
| **Phase 1 batch** | |
| `_vendor/1984vc-cap-table` | 1984vc/cap-table |
| `_vendor/startup-equity-calculator` | qbzenker/startupequitycalculator |
| `_vendor/omni-tools` | iib0011/omni-tools |
| `_vendor/safe-cap-table-simulator` | fl0wo/safe-cap-table-simulator |
| `_vendor/devyantra-ui` | sg-open/devyantra-ui |
| `_vendor/bytefork-tools` | AndonyEmmanuelVelazquez/bytefork-tools |
| `_vendor/browserytools` | aghyad97/browserytools (AGPL — reference) |
| `_vendor/sopkit` | SopKit/sopkit.github.io (non-commercial — reference) |

**Verification:** `node scripts/verify-vendor-linkage.mjs` → 0 errors (2026-11-03, **20** clone paths checked).

---

## 3. Tools successfully integrated

| Source | Integration |
|--------|-------------|
| Pickrack | Full catalog in `apps/web/app/tools/**` |
| batkotron + runway vendor | Finance: runway, SAFE, cap table lite |
| Hub-native (this pass) | Finance: TAM/SAM/SOM, LTV/CAC, break-even |

**Functional routes:** Each registry entry with `available: true` has a matching `app/tools/{category}/{slug}/page.tsx` (Pickrack convention + finance pages).

---

## 4. Tool categories and counts

| Category | Slug | Registry count (approx.) |
|----------|------|----------------------------|
| Startup finance | `finance` | 6 |
| PDF | `pdf` | 17 |
| Image | `image` | 12 |
| AI | `ai` | 9 |
| Developer | `dev` | 13 |
| Text | `text` | 10 |
| Calculators | `calc` | 12 |
| **Total** | | **~82** |

Counts from [apps/web/lib/tools.ts](../apps/web/lib/tools.ts). Roadmap target remains 150 → 500 per [prd.md](prd.md).

---

## 5. Frontend and backend architecture

| Layer | Technology | Location |
|-------|------------|----------|
| Web | Next.js 16 App Router, React 19, Tailwind 4 | `apps/web` |
| Tool registry | TypeScript | `lib/tools.ts`, `lib/categories.ts` |
| Marketing | 3D hero + SaaS sections | `components/landing/*` |
| Server PDF / AI | Next Route Handlers | `app/api/pdf/*`, `app/api/ai/*` |
| PDF API (optional) | NestJS + OpenAPI | `apps/api` |
| Shared types | Zod package | `packages/types` |

**Tiers:** ~65% Tier A (browser), server routes for heavy PDF; Nest API not required for default dev.

---

## 6. Database and authentication

| Capability | Status |
|------------|--------|
| User accounts | **Not shipped** (by design in Phase 1 PRD) |
| Postgres / Redis | Planned Phase 3 (rate limits, PDF queue) |
| Favorites / recent | Pickrack client patterns; toolstrek/gawe reference for PWA |

Optional future stack documented in research inventory: Better Auth, Supabase self-host.

---

## 7. Payment integration

| Capability | Status |
|------------|--------|
| Stripe / subscriptions | **Not wired** — Tier C / Phase 4 |
| Premium gating | Document only |

---

## 8. MCP servers utilized (this engagement)

| Server | Used for |
|--------|----------|
| `cursor` WebSearch | OSS platform and startup finance repo discovery |
| `user-context7` | Available for Next/Nest doc lookups during wiring |
| `user-rea` | Available for reference-site UX inspection |
| `user-supabase`, `user-vercel` | Available for deploy/auth phases |

No fabricated MCP usage — only servers present in the Cursor environment were considered.

---

## 9. Skills applied

| Skill | How |
|-------|-----|
| Ponytail | Vendor-first integration; small Hub-native math only where no OSS UI |
| Karpathy-style clarity | Finance libs: pure functions, typed inputs/outputs |
| Design taste | Founder-focused finance category; consistent cyan/emerald chrome |
| UI UX Pro Max | Form labels, contrast, mobile padding on new tool pages |
| AGENTS.md workflow | README → navigation → PRD → LINKAGE before edits |

---

## 10. Remaining limitations and missing dependencies

| Item | Action required |
|------|-----------------|
| `pnpm install` at repo root | Needed to run `apps/api` locally |
| `npm install` in `apps/web` | Required on fresh clone (not run in agent session per master prompt rule) |
| Worker binaries | Ghostscript, qpdf, LibreOffice for full server PDF |
| AI tools | `ANTHROPIC_API_KEY` (optional) |
| AGPL projects | Legal review before merging browserytools code |
| Scale to 500 tools | Port from toolstrek / SopKit / gawe registries in batches |
| Auth + payments | Phase 4; see research inventory |
| Pickrack brand strings | Content pass on blog/about (some Pickrack copy remains) |

---

## 11. Run and deploy

### Local (web only)

```powershell
cd "E:\startup tools\apps\web"
copy .env.local.example .env.local
npm install
npm run dev
```

Open **http://localhost:3016**

### Optional API

```powershell
cd "E:\startup tools"
pnpm install
pnpm run dev:api
```

Set `NEXT_PUBLIC_API_URL=http://localhost:3001` in `apps/web/.env.local`.

### Production checklist

1. `npm run build` in `apps/web`
2. Configure env: `SITE_URL`, optional API URL, optional AI keys
3. Deploy Next.js to Vercel or Node host; deploy Nest separately if using pdf-everything workers
4. Run `node scripts/verify-vendor-linkage.mjs` after vendor updates

### Agent maintenance

- Add tools: [navigation.md](navigation.md) §4  
- Upstream sync: [LINKAGE.md](LINKAGE.md)  
- Research backlog: [research-inventory.md](research-inventory.md)

---

## Phase completion vs master prompt

| Phase | Status |
|-------|--------|
| 1 Research | **Done** — inventory doc |
| 2 Startup ecosystem | **Partial** — 6 finance tools; backlog in inventory |
| 3 Clone & integrate | **Done** for selected vendors; verify script green |
| 4 Website infra (auth/pay) | **Documented**, not implemented |
| 5 MCP | **Used** where available (see §8) |
| 6 Skills | **Applied** per §9 |
| 7 Design/UX | **Shipped** landing + Pickrack UI; Jellykit-inspired IA |
| 8 Unified platform | **~82 tools**, search, categories; no forced login |
| 9 Dev rules | No `npm install` in agent session |
| 10 Testing | **`npm run build` passed** (152 routes incl. 3 new finance tools); manual tool smoke recommended |
