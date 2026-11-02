import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "apps", "web");
const toolsPath = path.join(root, "lib", "tools.ts");
const toolsSrc = fs.readFileSync(toolsPath, "utf8");

const entries = [];
const re = /slug:\s*"([^"]+)"[\s\S]*?category:\s*"([^"]+)"/g;
let m;
while ((m = re.exec(toolsSrc)) !== null) {
  entries.push({ slug: m[1], category: m[2] });
}

const missing = [];
for (const { slug, category } of entries) {
  const page = path.join(root, "app", "tools", category, slug, "page.tsx");
  if (!fs.existsSync(page)) missing.push({ slug, category, page });
}

console.log(`Registry tools: ${entries.length}`);
console.log(`Missing routes: ${missing.length}`);
for (const x of missing) console.log(`  ${x.category}/${x.slug}`);
