import fs from "node:fs";

const jelly = JSON.parse(
  fs.readFileSync(new URL("../docs/jellykit-tool-urls.json", import.meta.url), "utf8"),
);
const toolsTs = fs.readFileSync(
  new URL("../apps/web/lib/tools.ts", import.meta.url),
  "utf8",
);

const ours = [...toolsTs.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
const jellySlugs = new Set(jelly.tools.map((p) => p.replace(/^\/tools\//, "")));

const exact = ours.filter((s) => jellySlugs.has(s));
const jellyOnly = [...jellySlugs].filter((s) => !ours.includes(s));

console.log(
  JSON.stringify(
    {
      startupHubTools: ours.length,
      jellykitTools: jellySlugs.size,
      exactSlugOverlap: exact.length,
      sampleOverlap: exact.slice(0, 25),
      jellyOnlyCount: jellyOnly.length,
    },
    null,
    2,
  ),
);
