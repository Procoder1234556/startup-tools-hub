/** Public HTML crawl — tool URLs only (no JS bundle extraction). */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const CATEGORIES = [
  "",
  "images",
  "pdf",
  "data",
  "developer",
  "text",
  "design",
  "files",
  "utilities",
  "business",
  "social",
  "security",
  "media",
];

const all = new Set();
for (const c of CATEGORIES) {
  const url = c ? `https://jellykit.site/${c}/` : "https://jellykit.site/`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error("fail", url, res.status);
    continue;
  }
  const html = await res.text();
  for (const m of html.matchAll(/href="(\/tools\/[^"]+)"/g)) {
    all.add(m[1].replace(/\/$/, ""));
  }
}

const sorted = [...all].sort();
const payload = { count: sorted.length, tools: sorted };
const out = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "docs", "jellykit-tool-urls.json");
fs.writeFileSync(out, JSON.stringify(payload, null, 2) + "\n", "utf8");
console.log(`Wrote ${sorted.length} tools to ${out}`);
