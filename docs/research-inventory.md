# Open-source research inventory

**Product:** Startup Tools Hub  
**Purpose:** Phase 1 discovery — evaluate mature OSS for integration (not greenfield rebuild).  
**Last updated:** 2026-11-03 (Phase 1 batch cloned — **19** `_vendor/` trees + `apps/web`)

**Phase 1 status:** Deep research complete; **8** new shallow clones added via [phase1-clones.json](phase1-clones.json). Re-run clones: `node scripts/clone-phase1-vendors.mjs`. **No new hub-native tools** in this phase — integration is Phase 2–3.

---

## Selection criteria

| Criterion | Weight |
|-----------|--------|
| License compatible with composition (MIT/Apache preferred; AGPL noted) | Required |
| Production-quality UI or reusable logic | High |
| Active maintenance or stable snapshot | Medium |
| Client-side or self-hostable (no mandatory paid SaaS) | High |
| Fits Next.js 16 / React 19 monorepo | Medium |

---

## A. Already cloned and wired (this repo)

| Repository | URL | Category | License | Stack | Maturity | Integration |
|------------|-----|----------|---------|-------|----------|-------------|
| pickrack/pickrack | https://github.com/pickrack/pickrack | Platform (PDF, dev, image, AI, text, calc) | MIT | Next.js, Tailwind | Production | **App root** `apps/web/` (~76 tools) |
| batkotron/safe-calculator | https://github.com/batkotron/safe-calculator | Startup finance | MIT | TS | Stable | `lib/finance/safe-math.ts` + UI |
| batkotron/cap-table | https://github.com/batkotron/cap-table | Cap table | MIT | TS | Stable | `lib/finance/cap-table.ts` + UI |
| fozankhana/startup-runway-calculator | https://github.com/fozankhana/startup-runway-calculator | Runway | Check repo | Next/React | Active | Runway lib + UI wired |
| piyush-gambhir/pdf-everything | https://github.com/piyush-gambhir/pdf-everything | PDF API | MIT | NestJS, Zod | Skeleton | `apps/api/` + `packages/types/` |
| tasnimultas67/toolstrek | https://github.com/tasnimultas67/toolstrek | Multi-category (129 tools) | MIT | Next 16, React 19 | Active | `_vendor/toolstrek` — **port candidates** |
| kalabaru-apps/gawe | https://github.com/kalabaru-apps/gawe | PWA toolbox | MIT | Vite/React | Active | `_vendor/gawe` — PWA + registry patterns |
| magicuidesign/app-template | https://github.com/magicuidesign/app-template | Landing | Check repo | Next | Reference | Hero patterns |
| gonzalochale/saas-landing-template | https://github.com/gonzalochale/saas-landing-template | Landing | MIT | shadcn | Reference | Landing sections |
| AtotheY/saas-landingpage | https://github.com/AtotheY/saas-landingpage | Landing | MIT | Next | Reference | Feature blocks |
| **Phase 1 batch (2026-11-03)** | | | | | | |
| 1984vc/cap-table | https://github.com/1984vc/cap-table | Cap table / SAFE stacks | MIT | Node TS, CLI | Production lib | `_vendor/1984vc-cap-table` — pro finance upgrade |
| qbzenker/startupequitycalculator | https://github.com/qbzenker/startupequitycalculator | Employee equity | MIT | Next 16, React 19 | Active | `_vendor/startup-equity-calculator` |
| iib0011/omni-tools | https://github.com/iib0011/omni-tools | PDF, image, text, math, data | MIT | Vite, React | **10k+ stars** | `_vendor/omni-tools` — cherry-pick tools |
| fl0wo/safe-cap-table-simulator | https://github.com/fl0wo/safe-cap-table-simulator | SAFE dilution viz | Apache-2.0 | TypeScript | Stable | `_vendor/safe-cap-table-simulator` |
| sg-open/devyantra-ui | https://github.com/sg-open/devyantra-ui | Developer utilities | MIT | Vue 3, TS | New | `_vendor/devyantra-ui` |
| AndonyEmmanuelVelazquez/bytefork-tools | https://github.com/AndonyEmmanuelVelazquez/bytefork-tools | Developer + data tools | MIT | Astro, Preact | Active | `_vendor/bytefork-tools` |
| aghyad97/browserytools | https://github.com/aghyad97/browserytools | 152 tools, on-device AI | **AGPL-3.0** | Next, TS | Active | `_vendor/browserytools` — **reference only** |
| SopKit/sopkit.github.io | https://github.com/SopKit/sopkit.github.io | 600+ utilities | **Non-commercial** | Next 16 | Active | `_vendor/sopkit` — **IA reference only** |

Verify wiring: `node scripts/verify-vendor-linkage.mjs`

**Related:** [LINKAGE.md](LINKAGE.md) · [MASTER-DELIVERY-REPORT.md](MASTER-DELIVERY-REPORT.md) · [prd.md](prd.md) · [phase1-clones.json](phase1-clones.json)

---

## B. Master prompt category map (Phase 1 research)

Each row: evaluated OSS, clone status, and **integration strategy** (port into `apps/web`, never greenfield rewrite).

### 1. General-purpose online tools

| Repository | License | Clone | Strategy |
|------------|---------|-------|----------|
| pickrack/pickrack | MIT | `apps/web` | **Primary shell** (~76 tools) |
| tasnimultas67/toolstrek | MIT | `_vendor/toolstrek` | Batch-port Next 16 tools; dedupe slugs vs Pickrack |
| iib0011/omni-tools | MIT | `_vendor/omni-tools` | Port Vite tool modules; skip duplicate PDF/image |
| kalabaru-apps/gawe | MIT | `_vendor/gawe` | PWA + registry patterns |
| SopKit/sopkit.github.io | Non-commercial | `_vendor/sopkit` | SEO/registry patterns only — rewrite logic from MIT sources |
| SH20RAJ/30tools | MIT (claimed) | **Not cloned** | Upstream 404; use toolstrek/sopkit instead |

### 2. Startup lifecycle

| Repository | License | Clone | Strategy |
|------------|---------|-------|----------|
| batkotron/* + runway vendor | MIT | wired | Shipped: runway, SAFE, cap table lite |
| 1984vc/cap-table | MIT | `_vendor/1984vc-cap-table` | Wire `@1984vc/cap-table` for stacked SAFE + pool refresh |
| qbzenker/startupequitycalculator | MIT | `_vendor/startup-equity-calculator` | Port employee equity UI |
| fl0wo/safe-cap-table-simulator | Apache-2.0 | `_vendor/safe-cap-table-simulator` | Charts + simulator alongside SAFE page |
| aavedissian/dilution-lab | (check repo) | — | Python/Streamlit — reimplement waterfall from spec or microservice |

### 3. PDF tools

| Repository | License | Clone | Strategy |
|------------|---------|-------|----------|
| pickrack/pickrack | MIT | `apps/web` | Client + Next API routes (Ghostscript, qpdf, LibreOffice) |
| pdf-everything | MIT | `_vendor/pdf-everything` | Nest workers → `apps/api` when workers env ready |
| omni-tools PDF suite | MIT | `_vendor/omni-tools` | Port only gaps vs Pickrack `pdf/` |

### 4. Financial calculators (loan, tax, ROI, etc.)

| Repository | License | Clone | Strategy |
|------------|---------|-------|----------|
| pickrack `calc/` | MIT | `apps/web` | EMI, mortgage, CAGR, etc. |
| toolstrek finance slugs | MIT | `_vendor/toolstrek` | Diff registry; port missing startup calculators |
| omni-tools math tools | MIT | `_vendor/omni-tools` | Port unit/electrical/math utilities |

### 5. Developer tools

| Repository | License | Clone | Strategy |
|------------|---------|-------|----------|
| pickrack `dev/` | MIT | `apps/web` | JSON, JWT, regex, hash, etc. |
| sg-open/devyantra-ui | MIT | `_vendor/devyantra-ui` | Port diff, cron, UUID from Vue → React pages |
| bytefork-tools | MIT | `_vendor/bytefork-tools` | Port Astro tool scripts into Next client components |
| browserytools | AGPL-3.0 | `_vendor/browserytools` | **Do not merge** — study UX only |

### 6. Productivity (text, date, generators)

| Repository | License | Clone | Strategy |
|------------|---------|-------|----------|
| pickrack `text/` | MIT | `apps/web` | Case, lorem, counters |
| omni-tools text/list | MIT | `_vendor/omni-tools` | Port list shufflers, formatters |
| gawe | MIT | `_vendor/gawe` | Generator registry patterns |

### 7. Marketing and SEO

| Repository | License | Clone | Strategy |
|------------|---------|-------|----------|
| pickrack SEO tools | MIT | `apps/web` | Meta tags, sitemap helpers |
| sopkit SEO category | Non-commercial | `_vendor/sopkit` | Page structure reference |
| saas landing vendors | MIT | wired | Landing conversion blocks |

### 8. AI-powered browser tools

| Repository | License | Clone | Strategy |
|------------|---------|-------|----------|
| pickrack `ai/` | MIT | `apps/web` | Key-gated Anthropic routes |
| toolstrek (Transformers.js) | MIT | `_vendor/toolstrek` | On-device models where Pickrack lacks parity |
| browserytools | AGPL-3.0 | `_vendor/browserytools` | Reference only |

### 9. Image, video, audio, document

| Repository | License | Clone | Strategy |
|------------|---------|-------|----------|
| pickrack `image/` | MIT | `apps/web` | Client-side image tools |
| omni-tools media | MIT | `_vendor/omni-tools` | Video trim, audio tools — port selectively |
| toolstrek media | MIT | `_vendor/toolstrek` | Overlap audit before port |

### 10. Business, SaaS, e-commerce, creator

| Repository | License | Clone | Strategy |
|------------|---------|-------|----------|
| pickrack calc + text | MIT | `apps/web` | UTM, QR, invoice helpers |
| sopkit business slugs | Non-commercial | `_vendor/sopkit` | Category IA only |
| Phase 4 infra | MIT | not cloned | better-auth, supabase — accounts/payments later |

---

## C. Deferred clones (research only — Phase 2+)

| Repository | URL | Notes |
|------------|-----|-------|
| aavedissian/dilution-lab | https://github.com/aavedissian/dilution-lab | Streamlit/Python — waterfall math; optional `_vendor/dilution-lab` |
| better-auth/better-auth | https://github.com/better-auth/better-auth | Phase 4 auth |
| supabase/supabase | https://github.com/supabase/supabase | Phase 4 DB/auth |
| SH20RAJ/30tools | https://github.com/SH20RAJ/30tools | Clone failed (404); use toolstrek |

Items in **§A** and **§B** that are already under `_vendor/` are not repeated here.

### Auth, payments, admin (Phase 4 — optional premium)

| Project | URL | Role | Notes |
|---------|-----|------|-------|
| better-auth/better-auth | https://github.com/better-auth/better-auth | Auth | Self-hostable; fits Next.js |
| supabase/supabase | https://github.com/supabase/supabase | Auth + DB | Hosted or self-host; MCP available in env |
| stripe/stripe-node + Pickrack patterns | — | Payments | Tier C only; test mode keys in `.env` |

**Current product stance (PRD):** No mandatory accounts; auth/payments are **future Phase 4**, not blocking Tier A tools.

---

## D. Hub-native Tier A (avoid for new work)

When no dedicated OSS UI exists, prefer **cloning** toolstrek/omni-tools/bytefork before adding formulas in `apps/web/lib/finance/`. Existing hub-native worksheets (TAM/LTV/break-even) should be **replaced by OSS ports** in Phase 2.

| Tool | Rationale |
|------|-----------|
| TAM / SAM / SOM | Replace with toolstrek or sopkit port when slug available |
| LTV / CAC / payback | Port from toolstrek finance catalog |
| Break-even | Port from pickrack `calc/` or toolstrek equivalent |

---

## E. Jellykit / competitor UX (reference only)

Use public marketing sites for **layout and IA**, not assets or branding:

- Tool category grid, global search, tool detail hero, “runs in browser” trust badges
- REA MCP (`user-rea`) can inspect live pages when researching UX; no proprietary code import

---

## F. MCP servers used in this program

| Namespace | Use |
|-----------|-----|
| `cursor` / WebSearch | GitHub discovery, license checks |
| `user-context7` | Next.js / Nest / library docs when wiring |
| `user-rea` | Optional reference-site structure analysis |
| `user-supabase` | Future auth/DB if Phase 4 activated |
| `user-vercel` | Deploy/runbook validation |
| `cursor-ide-browser` | Local smoke tests on `:3016` |

---

## G. Clone batch (automated)

```powershell
cd "E:\startup tools"
node scripts/clone-phase1-vendors.mjs
node scripts/verify-vendor-linkage.mjs
```

Manifest: [phase1-clones.json](phase1-clones.json). Manual extras (optional):

```powershell
cd "E:\startup tools\_vendor"
git clone --depth 1 https://github.com/aavedissian/dilution-lab.git dilution-lab
```

Add entries to [vendor-wiring.json](vendor-wiring.json) when a file-level port is committed.

---

## H. Skills applied to design and execution

| Skill | Application |
|-------|-------------|
| **Ponytail** | Minimize scope; port OSS before writing apps |
| **Karpathy guidelines** | Clear naming, explicit data flow in finance libs |
| **Design taste** | SaaS landing: restrained emerald/cyan founder palette, avoid AI-slop gradients |
| **UI UX Pro Max** | Accessibility, touch targets, loading states on tool pages |
| **Caveman / investigate-first** | Read LINKAGE + verify script before edits |

External skill repos listed in the master prompt should be installed via `npx skills add …` on a dev machine; local copies under `~/.claude/skills` and `~/.agents/skills` were consulted where present.
