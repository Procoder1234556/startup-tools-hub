#!/usr/bin/env node
/**
 * Verifies _vendor clones are present and wired destinations exist (see docs/vendor-wiring.json).
 * Run from repo root: node scripts/verify-vendor-linkage.mjs
 */
import { createHash } from "node:crypto";
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const wiringPath = join(ROOT, "docs", "vendor-wiring.json");

function rel(p) {
  return relative(ROOT, p).replace(/\\/g, "/");
}

function sha256File(abs) {
  return createHash("sha256").update(readFileSync(abs)).digest("hex");
}

function listFilesRecursive(dir, base = dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const abs = join(dir, name);
    if (statSync(abs).isDirectory()) out.push(...listFilesRecursive(abs, base));
    else out.push(relative(base, abs).replace(/\\/g, "/"));
  }
  return out.sort();
}

/** @type {import('../docs/vendor-wiring.json')} */
const wiring = JSON.parse(readFileSync(wiringPath, "utf8"));

let errors = 0;
let warnings = 0;

function fail(msg) {
  console.error(`ERROR: ${msg}`);
  errors++;
}

function warn(msg) {
  console.warn(`WARN: ${msg}`);
  warnings++;
}

function ok(msg) {
  console.log(`OK: ${msg}`);
}

console.log(`Vendor linkage check — ${ROOT}\n`);

for (const clone of wiring.clones) {
  const abs = join(ROOT, clone.path);
  if (!existsSync(abs)) fail(`Missing clone ${clone.repo} at ${clone.path}`);
  else ok(`Clone present: ${clone.path} (${clone.repo})`);
}

for (const pair of wiring.filePairs) {
  const v = join(ROOT, pair.vendor);
  const d = join(ROOT, pair.dest);
  if (!existsSync(v)) fail(`Missing vendor file ${pair.vendor}`);
  if (!existsSync(d)) fail(`Missing wired dest ${pair.dest}`);
  if (existsSync(v) && existsSync(d) && pair.requireHashMatch) {
    const hv = sha256File(v);
    const hd = sha256File(d);
    if (hv !== hd) fail(`Hash mismatch ${pair.vendor} ↔ ${pair.dest}`);
    else ok(`Hash match ${pair.dest}`);
  }
}

for (const mirror of wiring.dirMirrors) {
  const vRoot = join(ROOT, mirror.vendorRoot);
  const dRoot = join(ROOT, mirror.destRoot);
  if (!existsSync(vRoot)) {
    fail(`Missing vendor dir ${mirror.vendorRoot}`);
    continue;
  }
  if (!existsSync(dRoot)) {
    fail(`Missing dest dir ${mirror.destRoot}`);
    continue;
  }
  const vFiles = new Set(listFilesRecursive(vRoot));
  const dFiles = new Set(listFilesRecursive(dRoot));
  const onlyV = [...vFiles].filter((f) => !dFiles.has(f));
  const onlyD = [...dFiles].filter((f) => !vFiles.has(f));
  if (onlyV.length || onlyD.length) {
    fail(
      `${mirror.label}: path skew (vendor-only: ${onlyV.length}, dest-only: ${onlyD.length})`
    );
    for (const f of onlyV.slice(0, 5)) console.error(`  vendor-only: ${f}`);
    for (const f of onlyD.slice(0, 5)) console.error(`  dest-only: ${f}`);
  } else ok(`${mirror.label}: ${vFiles.size} files aligned`);
}

const runwayVendorLib = join(ROOT, "_vendor/startup-runway-calculator/src/lib");
const runwayDest = join(ROOT, wiring.runwayLib.destDir);
if (existsSync(runwayVendorLib) && existsSync(runwayDest)) {
  const vendorNames = readdirSync(runwayVendorLib)
    .filter((n) => n.endsWith(".ts"))
    .sort();
  const destNames = readdirSync(runwayDest)
    .filter((n) => n.endsWith(".ts"))
    .sort();
  for (const n of vendorNames) {
    if (!destNames.includes(n)) fail(`Runway lib missing in app: ${n}`);
  }
  if (!destNames.includes("types.ts")) fail("Runway lib missing types.ts in app");
  else ok(`Runway lib: ${vendorNames.length} vendor modules + types.ts in app`);
}

const rvUi = join(ROOT, wiring.runwayUi.vendorDir);
const rdUi = join(ROOT, wiring.runwayUi.destDir);
if (existsSync(rvUi) && existsSync(rdUi)) {
  const v = readdirSync(rvUi).filter((n) => n.endsWith(".tsx")).sort();
  const d = readdirSync(rdUi).filter((n) => n.endsWith(".tsx")).sort();
  const diff = v.filter((x) => !d.includes(x)).concat(d.filter((x) => !v.includes(x)));
  if (diff.length) fail(`Runway UI component name skew: ${diff.join(", ")}`);
  else ok(`Runway UI: ${v.length} components wired`);
}

for (const c of wiring.landingWired.components) {
  if (!existsSync(join(ROOT, c))) fail(`Missing landing component ${c}`);
}
if (existsSync(join(ROOT, wiring.landingWired.homeImport))) {
  const home = readFileSync(join(ROOT, wiring.landingWired.homeImport), "utf8");
  if (!home.includes("MarketingHero3D") || !home.includes("LandingTemplateSections")) {
    fail("Home page missing MarketingHero3D or LandingTemplateSections import");
  } else ok("Home page imports wired landing sections");
}

const toolsTs = join(ROOT, "apps/web/lib/tools.ts");
const toolsContent = existsSync(toolsTs) ? readFileSync(toolsTs, "utf8") : "";
for (const route of wiring.financeRoutes) {
  const pageAbs = join(ROOT, route.page);
  if (!existsSync(pageAbs)) fail(`Missing finance page ${route.page}`);
  else {
    const page = readFileSync(pageAbs, "utf8");
    if (!page.includes(route.componentImport)) {
      fail(`${route.page} does not import ${route.componentImport}`);
    } else ok(`Route ${route.slug} → ${route.componentImport}`);
  }
  if (!toolsContent.includes(`slug: "${route.slug}"`)) {
    fail(`tools.ts missing slug ${route.slug}`);
  }
}

for (const pkg of wiring.workspacePackages) {
  const pkgDir = join(ROOT, pkg.path);
  if (!existsSync(pkgDir)) fail(`Missing package dir ${pkg.path}`);
  const out = join(ROOT, pkg.buildOutput);
  if (!existsSync(out)) {
    warn(
      `${pkg.package} not built (${rel(out)} missing). Run: pnpm --filter ${pkg.package} build`
    );
  } else ok(`${pkg.package} build output present`);
}

console.log(`\nDone: ${errors} error(s), ${warnings} warning(s).`);
process.exit(errors ? 1 : 0);
