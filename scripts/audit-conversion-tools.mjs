import fs from "fs";
import path from "path";

// 1. Read all tools from tools.ts
const toolsFile = fs.readFileSync("./apps/web/lib/tools.ts", "utf8");
const toolMatches = [...toolsFile.matchAll(/\{\s*slug:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*description:\s*"([^"]+)",\s*category:\s*"([^"]+)"/g)];

const allTools = toolMatches.map(m => ({
  slug: m[1],
  name: m[2],
  description: m[3],
  category: m[4]
}));

const conversionTools = allTools.filter(t => 
  t.slug.includes("-to-") || 
  t.slug.includes("convert") ||
  t.name.toLowerCase().includes("converter") ||
  t.name.toLowerCase().includes("to ")
);

console.log(`Found ${conversionTools.length} conversion tools out of ${allTools.length} total tools.\n`);

const results = [];

for (const tool of conversionTools) {
  // Check if page exists
  const pagePath = path.join("./apps/web/app/tools", tool.category, tool.slug, "page.tsx");
  const exists = fs.existsSync(pagePath);
  let status = "MISSING_PAGE";
  let mode = "UNKNOWN";
  let details = "";

  if (exists) {
    const pageContent = fs.readFileSync(pagePath, "utf8");
    if (pageContent.includes("/api/")) {
      const apiMatches = [...pageContent.matchAll(/\/api\/[a-zA-Z0-9\/-]+/g)].map(m => m[0]);
      mode = "SERVER_API";
      details = apiMatches.join(", ");
    } else {
      mode = "CLIENT_ONLY";
    }

    // Check for common bugs / broken patterns
    const issues = [];
    if (pageContent.includes("unpkg.com/pdfjs-dist")) {
      issues.push("Unpkg CDN worker dependency");
    }
    if (pageContent.includes("dangerouslySetInnerHTML")) {
      issues.push("dangerouslySetInnerHTML present");
    }
    if (pageContent.includes("TODO") || pageContent.includes("Not implemented")) {
      issues.push("Unfinished placeholder");
    }
    status = issues.length > 0 ? `WARN (${issues.join("; ")})` : "OK";
  }

  results.push({
    category: tool.category,
    slug: tool.slug,
    name: tool.name,
    exists,
    mode,
    status,
    details
  });
}

console.table(results);
