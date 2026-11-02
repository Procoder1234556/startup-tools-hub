# Repository linkage (upstream sources)

This monorepo **composes** several open-source projects. Use this table to trace code, attribute licenses, and re-clone vendors.

## Monorepo root

| Item | Path |
|------|------|
| Workspace root | `E:\startup tools\` |
| Web application (ship this) | [apps/web](../apps/web/) |
| PDF API skeleton | [apps/api](../apps/api/) |
| Shared PDF Zod types | [packages/types](../packages/types/) |
| Upstream clones (reference) | [_vendor/](../_vendor/) |

## Upstream GitHub → local path → wired into

| Upstream repository | Clone path | License | What we use |
|---------------------|------------|---------|-------------|
| [pickrack/pickrack](https://github.com/pickrack/pickrack) | `apps/web/` | MIT | Entire tool platform: routes, PDF/dev/image/AI, SEO, blog |
| [magicuidesign/app-template](https://github.com/magicuidesign/app-template) | `_vendor/app-template/` | check repo | Landing UX patterns → [MarketingHero3D](../apps/web/components/landing/MarketingHero3D.tsx) |
| [Ali-Sanati/awwwards-adidas](https://github.com/Ali-Sanati/awwwards-adidas) | `_vendor/awwwards-adidas/` | check repo | Future GSAP/R3F; not bundled in prod hero yet |
| [rr3s1/portfolio-v2](https://github.com/rr3s1/portfolio-v2) | `_vendor/portfolio-v2/` | MIT | Optional Spline hero fallback |
| [piyush-gambhir/pdf-everything](https://github.com/piyush-gambhir/pdf-everything) | `_vendor/pdf-everything/` | MIT | `backend/` → `apps/api/`; `types/` → `packages/types/` |
| [batkotron/safe-calculator](https://github.com/batkotron/safe-calculator) | `_vendor/safe-calculator/` | MIT | `lib/safe-math.ts` → [apps/web/lib/finance/safe-math.ts](../apps/web/lib/finance/safe-math.ts) |
| [batkotron/cap-table](https://github.com/batkotron/cap-table) | `_vendor/cap-table/` | MIT | `lib/cap-table.ts` → [apps/web/lib/finance/cap-table.ts](../apps/web/lib/finance/cap-table.ts) |
| [fozankhana/startup-runway-calculator](https://github.com/fozankhana/startup-runway-calculator) | `_vendor/startup-runway-calculator/` | check repo | Inspiration → [FinanceRunwayTool](../apps/web/components/tools/FinanceRunwayTool.tsx) |
| [tasnimultas67/toolstrek](https://github.com/tasnimultas67/toolstrek) | `_vendor/toolstrek/` | MIT | Future finance/PDF ports |
| [kalabaru-apps/gawe](https://github.com/kalabaru-apps/gawe) | `_vendor/gawe/` | MIT | Future PWA + `tools.ts` registry patterns |
| [AtotheY/saas-landingpage](https://github.com/AtotheY/saas-landingpage) | `_vendor/saas-landingpage/` | MIT | Feature sections → [LandingQuickFeatures](../apps/web/components/landing/LandingQuickFeatures.tsx) |
| [gonzalochale/saas-landing-template](https://github.com/gonzalochale/saas-landing-template) | `_vendor/saas-landing-template/` | MIT | shadcn landing blocks → [LandingTemplateSections](../apps/web/components/landing/LandingTemplateSections.tsx) |

## File lineage (Startup Hub additions)

| Feature | Source repo | Destination in this repo |
|---------|-------------|---------------------------|
| Brand / site name | (this project) | [apps/web/lib/site-config.ts](../apps/web/lib/site-config.ts) |
| Finance category | (this project) | [apps/web/lib/categories.ts](../apps/web/lib/categories.ts) |
| Finance tool registry | (this project) | [apps/web/lib/tools.ts](../apps/web/lib/tools.ts) |
| Cap table UI | batkotron/cap-table | [apps/web/components/tools/FinanceCapTableTool.tsx](../apps/web/components/tools/FinanceCapTableTool.tsx) |
| SAFE UI | batkotron/safe-calculator | [apps/web/components/tools/FinanceSafeTool.tsx](../apps/web/components/tools/FinanceSafeTool.tsx) |
| Runway UI + model | fozankhana/startup-runway-calculator | [apps/web/lib/finance/runway/](../apps/web/lib/finance/runway/), [apps/web/components/tools/runway/](../apps/web/components/tools/runway/), [FinanceRunwayTool.tsx](../apps/web/components/tools/FinanceRunwayTool.tsx) |
| Marketing hero | app-template + this project | [apps/web/components/landing/MarketingHero3D.tsx](../apps/web/components/landing/MarketingHero3D.tsx) |

## Re-clone vendors (fresh machine)

```powershell
cd "E:\startup tools"
New-Item -ItemType Directory -Force -Path _vendor | Out-Null

git clone --depth 1 https://github.com/magicuidesign/app-template.git _vendor/app-template
git clone --depth 1 https://github.com/Ali-Sanati/awwwards-adidas.git _vendor/awwwards-adidas
git clone --depth 1 https://github.com/rr3s1/portfolio-v2.git _vendor/portfolio-v2
git clone --depth 1 https://github.com/piyush-gambhir/pdf-everything.git _vendor/pdf-everything
git clone --depth 1 https://github.com/batkotron/safe-calculator.git _vendor/safe-calculator
git clone --depth 1 https://github.com/batkotron/cap-table.git _vendor/cap-table
git clone --depth 1 https://github.com/fozankhana/startup-runway-calculator.git _vendor/startup-runway-calculator
git clone --depth 1 https://github.com/tasnimultas67/toolstrek.git _vendor/toolstrek
git clone --depth 1 https://github.com/kalabaru-apps/gawe.git _vendor/gawe
git clone --depth 1 https://github.com/AtotheY/saas-landingpage.git _vendor/saas-landingpage
git clone --depth 1 https://github.com/gonzalochale/saas-landing-template.git _vendor/saas-landing-template
```

Verify wired paths (clone present, finance/API mirrors, routes):

```powershell
cd "E:\startup tools"
node scripts/verify-vendor-linkage.mjs
```

Machine-readable wiring map: [vendor-wiring.json](vendor-wiring.json).

Pickrack lives in `apps/web/` (already the app root). To reset web from upstream:

```powershell
# destructive — backup first
git clone --depth 1 https://github.com/pickrack/pickrack.git apps/web-fresh
```

## Remote for **this** repository

After `git init`, add your own remote (example):

```powershell
cd "E:\startup tools"
git init
git remote add origin https://github.com/YOUR_ORG/startup-tools-hub.git
```

Do **not** confuse `origin` with upstream Pickrack; upstreams stay documented in this file only unless you add `git remote add pickrack https://github.com/pickrack/pickrack.git` for sync.

## Related docs

- [navigation.md](navigation.md) — routes and code entry points  
- [WIRING.md](WIRING.md) — merge steps completed in CW1–CW8  
- [prd.md](prd.md) — product requirements  
