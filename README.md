# Startup Tools Hub

Free tools for founders—**runway, SAFE, cap table**, PDF, dev utilities, and more—wired from open-source projects into one Next.js app.

| Doc | Purpose |
|-----|---------|
| **[docs/navigation.md](docs/navigation.md)** | **Start here (agents):** site map, code map, edit workflows |
| [docs/prd.md](docs/prd.md) | Product requirements, phases, tiers |
| [docs/LINKAGE.md](docs/LINKAGE.md) | Upstream GitHub repos and file lineage |
| [docs/WIRING.md](docs/WIRING.md) | How Pickrack + vendors were merged |
| [AGENTS.md](AGENTS.md) | AI agent read order and rules |

## Quick start

```powershell
cd "E:\startup tools\apps\web"
copy .env.local.example .env.local
npm install
npm run dev
```

Open **http://localhost:3016**

Optional PDF API (NestJS skeleton from [pdf-everything](https://github.com/piyush-gambhir/pdf-everything)) — use **pnpm** at repo root so `apps/api` links to `packages/types`:

```powershell
cd "E:\startup tools"
pnpm install
pnpm run dev:api
```

Set `NEXT_PUBLIC_API_URL=http://localhost:3001` in `apps/web/.env.local`.

From repo root: `npm run dev` runs the web app.

## Repository layout

```text
startup-tools-hub/
├── apps/
│   ├── web/          # Next.js — ship this (fork of pickrack/pickrack)
│   └── api/          # NestJS — pdf-everything backend copy
├── packages/
│   └── types/        # PDF Zod types (from pdf-everything)
├── _vendor/          # Read-only upstream clones (see LINKAGE.md)
├── docs/             # navigation, PRD, linkage, wiring
├── AGENTS.md
└── pnpm-workspace.yaml
```

## Key URLs (local)

| Path | Description |
|------|-------------|
| `/` | Startup landing + tool search |
| `/tools` | All tools |
| `/tools/finance/` | Runway, SAFE, cap table |
| `/tools/pdf/merge-pdf` | Example PDF tool |

## Upstream projects

Built by composing:

- [pickrack/pickrack](https://github.com/pickrack/pickrack) → `apps/web`
- [batkotron/safe-calculator](https://github.com/batkotron/safe-calculator) + [cap-table](https://github.com/batkotron/cap-table) → finance tools
- [magicuidesign/app-template](https://github.com/magicuidesign/app-template) + [awwwards-adidas](https://github.com/Ali-Sanati/awwwards-adidas) → landing reference
- [piyush-gambhir/pdf-everything](https://github.com/piyush-gambhir/pdf-everything) → `apps/api`

Full table: [docs/LINKAGE.md](docs/LINKAGE.md).

## Git

Initialize and attach your remote:

```powershell
cd "E:\startup tools"
git init
git remote add origin https://github.com/YOUR_ORG/startup-tools-hub.git
```

Upstream remotes are documented in [docs/LINKAGE.md](docs/LINKAGE.md); they are not required for local dev.

## License

`apps/web` inherits [Pickrack MIT](apps/web/LICENSE). Finance ports follow batkotron MIT. Check each `_vendor` repo before redistributing merged code.
