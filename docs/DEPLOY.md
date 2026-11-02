# Deploy (GitHub + Vercel)

## GitHub

**Repository:** https://github.com/Procoder1234556/startup-tools-hub

Push from local:

```powershell
cd "E:\startup tools"
git push origin master
```

`_vendor/` is gitignored; re-clone vendors locally with [LINKAGE.md](LINKAGE.md).

## Vercel

**Project:** `startup-tools-hub` (Next.js, **Root Directory:** `apps/web`)

1. Open [Vercel Dashboard](https://vercel.com/dashboard) → **startup-tools-hub** → confirm Git repo `Procoder1234556/startup-tools-hub` is connected.
2. If no deploy ran, click **Deploy** on the `master` branch (or redeploy from **Deployments**).
3. **Environment variables** (Production + Preview):

   | Key | Example |
   |-----|---------|
   | `NEXT_PUBLIC_SITE_URL` | `https://startup-tools-hub.vercel.app` (your production URL) |

   Optional: `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_ADSENSE_CLIENT`, API keys for server AI/PDF routes.

4. If the site asks for Vercel login, disable **Deployment Protection / Vercel Authentication** for this project (Project → Settings → Deployment Protection) so the marketing site is public.

## CLI (alternative)

```powershell
cd "E:\startup tools\apps\web"
npx vercel login
npx vercel link
npx vercel deploy --prod
```
