// Test runner for markdown AST generation

export function formatPagesToMarkdown(pages) {
  const pageMarkdowns = [];

  pages.forEach((page) => {
    const linesMarkdown = [];

    page.lines.forEach((line) => {
      const fullText = line.runs.map((r) => r.text).join("").trim();
      if (!fullText) return;

      if (line.isHeading) {
        linesMarkdown.push(`## ${fullText}`);
        return;
      }

      let lineBuffer = "";
      line.runs.forEach((run) => {
        const text = run.text;
        if (!text) return;

        const leadingSpace = text.startsWith(" ") ? " " : "";
        const trailingSpace = text.endsWith(" ") ? " " : "";
        const clean = text.trim();

        if (!clean) {
          lineBuffer += " ";
          return;
        }

        let formatted = clean;
        if (run.isBold && run.isItalic) {
          formatted = `***${clean}***`;
        } else if (run.isBold) {
          formatted = `**${clean}**`;
        } else if (run.isItalic) {
          formatted = `*${clean}*`;
        }

        lineBuffer += leadingSpace + formatted + trailingSpace;
      });

      if (lineBuffer.trim()) {
        linesMarkdown.push(lineBuffer.trim());
      }
    });

    if (linesMarkdown.length > 0) {
      pageMarkdowns.push(linesMarkdown.join("\n\n"));
    }
  });

  return pageMarkdowns.join("\n\n---\n\n");
}

async function runTest() {
  console.log("Starting PDF-to-Markdown test...");

  const testPages = [
    {
      lines: [
        {
          runs: [{ text: "Executive Summary", isBold: true }],
          isHeading: true,
        },
        {
          runs: [
            { text: "This is a paragraph with " },
            { text: "bold text", isBold: true },
            { text: " and " },
            { text: "italic emphasis", isItalic: true },
            { text: " in the first section." },
          ],
        },
      ],
    },
    {
      lines: [
        {
          runs: [{ text: "Key Metrics", isBold: true }],
          isHeading: true,
        },
        {
          runs: [{ text: "Second page bullet point or content." }],
        },
      ],
    },
  ];

  const md = formatPagesToMarkdown(testPages);
  console.log("Generated Markdown:\n" + md);

  if (!md.includes("## Executive Summary")) throw new Error("Missing heading");
  if (!md.includes("**bold text**")) throw new Error("Missing bold formatting");
  if (!md.includes("*italic emphasis*")) throw new Error("Missing italic formatting");
  if (!md.includes("---")) throw new Error("Missing page separator");

  console.log("PASS: PDF-to-Markdown formatting test passed!");
}

runTest().catch((err) => {
  console.error("FAIL:", err);
  process.exit(1);
});
