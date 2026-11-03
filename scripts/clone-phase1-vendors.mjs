#!/usr/bin/env node
/**
 * Shallow-clone Phase 1 research repos listed in docs/phase1-clones.json.
 * Run from repo root: node scripts/clone-phase1-vendors.mjs
 */
import { readFileSync, existsSync, mkdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const manifestPath = join(ROOT, "docs", "phase1-clones.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

mkdirSync(join(ROOT, "_vendor"), { recursive: true });

let errors = 0;

for (const entry of manifest.repos) {
  const dest = join(ROOT, entry.path);
  if (existsSync(dest)) {
    console.log(`SKIP (exists): ${entry.path}`);
    continue;
  }
  const url = `https://github.com/${entry.repo}.git`;
  console.log(`CLONE ${entry.repo} → ${entry.path}`);
  const r = spawnSync("git", ["clone", "--depth", "1", url, dest], {
    stdio: "inherit",
    cwd: ROOT,
  });
  if (r.status !== 0) {
    console.error(`FAILED: ${entry.repo}`);
    errors++;
  }
}

if (manifest.failedClones?.length) {
  console.log("\nKnown failed / skipped upstreams (see manifest):");
  for (const f of manifest.failedClones) {
    console.log(`  - ${f.repo}: ${f.reason}`);
  }
}

console.log(`\nDone: ${errors} error(s). Verify: node scripts/verify-vendor-linkage.mjs`);
process.exit(errors ? 1 : 0);
