import { buildDocxFromFormattedPages } from "../apps/web/lib/pdf-to-docx.ts";

async function runTest() {
  console.log("Starting PDF-to-Word generator test...");

  const testPages = [
    {
      lines: [
        {
          runs: [{ text: "ANNUAL REPORT 2026", isBold: true }],
          isHeading: true,
        },
        {
          runs: [
            { text: "This is a normal paragraph with " },
            { text: "bold text", isBold: true },
            { text: " and " },
            { text: "italic emphasis", isItalic: true },
            { text: ". Clean XML control chars: \x00\x08 test." },
          ],
        },
      ],
    },
    {
      lines: [
        {
          runs: [{ text: "Page 2 Content", isBold: true }],
          isHeading: true,
        },
        {
          runs: [{ text: "Second page text run." }],
        },
      ],
    },
  ];

  const blob = await buildDocxFromFormattedPages(testPages);
  console.log(`Successfully generated DOCX Blob: ${blob.size} bytes, type: ${blob.type}`);

  if (blob.size < 1000) {
    throw new Error(`Generated DOCX too small: ${blob.size} bytes`);
  }

  console.log("PASS: DOCX generation test successful!");
}

runTest().catch((err) => {
  console.error("FAIL:", err);
  process.exit(1);
});
