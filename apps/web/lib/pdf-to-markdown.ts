// ponytail: Production-grade in-browser PDF-to-Markdown conversion engine.
// Uses shared AST parser from pdf-to-docx to preserve headings, bold/italic runs, and multi-column layouts.
// Zero remote uploads; 100% private, runs offline in browser.

import {
  extractFormattedPagesFromPdf,
  type PageContent,
  type ConversionProgressCallback,
} from "./pdf-to-docx";

/**
 * Converts formatted page AST into clean GitHub Flavored Markdown
 */
export function formatPagesToMarkdown(pages: PageContent[]): string {
  const pageMarkdowns: string[] = [];

  pages.forEach((page) => {
    const linesMarkdown: string[] = [];

    page.lines.forEach((line) => {
      const fullText = line.runs.map((r) => r.text).join("").trim();
      if (!fullText) return;

      if (line.isHeading) {
        // Output clean markdown heading
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

/**
 * High-level PDF to Markdown extractor
 */
export async function convertPdfToMarkdown(
  file: File | ArrayBuffer,
  onProgress?: ConversionProgressCallback
): Promise<{ markdown: string; pageCount: number }> {
  const buf = file instanceof File ? await file.arrayBuffer() : file;
  const pages = await extractFormattedPagesFromPdf(buf, onProgress);
  const markdown = formatPagesToMarkdown(pages);

  return {
    markdown,
    pageCount: pages.length,
  };
}
