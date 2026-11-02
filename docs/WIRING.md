# Startup Tools Hub — wiring map

**Docs:** [navigation.md](navigation.md) · [prd.md](prd.md) · [LINKAGE.md](LINKAGE.md) · [README](../README.md) · [AGENTS.md](../AGENTS.md)

Monorepo root: `E:\startup tools`

## Cloned repositories

| Source | Path | Wired into |
|--------|------|------------|
| [pickrack/pickrack](https://github.com/pickrack/pickrack) | `apps/web/` | Main Next.js app — all `/tools/*` except new finance pages |
| [magicuidesign/app-template](https://github.com/magicuidesign/app-template) | `_vendor/app-template/` | Landing patterns → `components/landing/MarketingHero3D.tsx` |
| [Ali-Sanati/awwwards-adidas](https://github.com/Ali-Sanati/awwwards-adidas) | `_vendor/awwwards-adidas/` | Reference for future GSAP/R3F (hero uses CSS gradient for CW8) |
| [rr3s1/portfolio-v2](https://github.com/rr3s1/portfolio-v2) | `_vendor/portfolio-v2/` | Optional Spline hero fallback |
| [piyush-gambhir/pdf-everything](https://github.com/piyush-gambhir/pdf-everything) | `_vendor/pdf-everything/`, `apps/api/`, `packages/types/` | NestJS API skeleton |
| [batkotron/safe-calculator](https://github.com/batkotron/safe-calculator) | `_vendor/safe-calculator/` | `apps/web/lib/finance/safe-math.ts` → `FinanceSafeTool` |
| [batkotron/cap-table](https://github.com/batkotron/cap-table) | `_vendor/cap-table/` | `apps/web/lib/finance/cap-table.ts` → `FinanceCapTableTool` |
| [fozankhana/startup-runway-calculator](https://github.com/fozankhana/startup-runway-calculator) | `_vendor/startup-runway-calculator/` | `FinanceRunwayTool` (simplified scenarios) |
| [tasnimultas67/toolstrek](https://github.com/tasnimultas67/toolstrek) | `_vendor/toolstrek/` | Reference for future tool ports |
| [kalabaru-apps/gawe](https://github.com/kalabaru-apps/gawe) | `_vendor/gawe/` | Reference for PWA/registry |
| [AtotheY/saas-landingpage](https://github.com/AtotheY/saas-landingpage) | `_vendor/saas-landingpage/` | Feature row + typography patterns → `components/landing/LandingQuickFeatures.tsx` |
| [gonzalochale/saas-landing-template](https://github.com/gonzalochale/saas-landing-template) | `_vendor/saas-landing-template/` | Stats, tiers, FAQ, testimonials → `components/landing/LandingTemplateSections.tsx`, `components/ui/*` |

## Routes

| URL | Origin |
|-----|--------|
| `/` | Pickrack homepage + `MarketingHero3D` + categories |
| `/tools/pdf/*` etc. | Pickrack unchanged |
| `/tools/finance/*` | New hub + 3 ported finance tools |
| API `http://localhost:3001/api` | `apps/api` (pdf-everything backend copy) |

## Run locally

```powershell
cd "E:\startup tools\apps\web"
copy .env.local.example .env.local
npm install
npm run dev
```

Web: http://localhost:3016

Optional API:

```powershell
cd "E:\startup tools\apps\api"
npm install
npm run dev
```

Set `NEXT_PUBLIC_API_URL=http://localhost:3001` in `apps/web/.env.local`.

## Next (deferred)

- Full Magic UI section copy from `_vendor/app-template`
- GSAP/R3F from `_vendor/awwwards-adidas` with route-split bundles
- Wire Pickrack server PDF tools to `apps/api`
- MVP 50 new startup generators
