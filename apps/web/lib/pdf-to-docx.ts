// ponytail: Production-grade in-browser and Node.js PDF-to-Word (.docx) conversion engine.
// Extracts structured text using Mozilla's pdfjs-dist and packages standard OpenXML DOCX via JSZip.
// Zero remote uploads; 100% private, works offline and on serverless runtimes without LibreOffice.

import JSZip from "jszip";

export interface TextRun {
  text: string;
  isBold?: boolean;
  isItalic?: boolean;
}

export interface TextLine {
  runs: TextRun[];
  isHeading?: boolean;
}

export interface PageContent {
  lines: TextLine[];
}

export type ConversionProgressCallback = (current: number, total: number) => void;

function escapeXml(str: string): string {
  return str
    // Strip XML 1.0 illegal control characters (\x00-\x08, \x0B-\x0C, \x0E-\x1F, \x7F-\x84, \x86-\x9F)
    // Prevents corrupted document errors when opening .docx in Microsoft Word
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F]/g, "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function isBoldFont(fontName?: string): boolean {
  if (!fontName) return false;
  return /bold|black|heavy|semibold|medium-bold/i.test(fontName);
}

function isItalicFont(fontName?: string): boolean {
  if (!fontName) return false;
  return /italic|oblique/i.test(fontName);
}

/**
 * Builds a standard Microsoft Word OpenXML (.docx) ZIP container with bold/italic styling
 */
export async function buildDocxFromFormattedPages(pages: PageContent[]): Promise<Blob> {
  const zip = new JSZip();

  // 1. [Content_Types].xml
  zip.file(
    "[Content_Types].xml",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
</Types>`
  );

  // 2. _rels/.rels
  zip.file(
    "_rels/.rels",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`
  );

  // 3. word/_rels/document.xml.rels
  zip.file(
    "word/_rels/document.xml.rels",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rIdStyles" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`
  );

  // 4. word/styles.xml
  zip.file(
    "word/styles.xml",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults>
    <w:rPrDefault>
      <w:rPr>
        <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:eastAsia="Calibri" w:cs="Calibri"/>
        <w:sz w:val="22"/>
        <w:szCs w:val="22"/>
        <w:color w:val="1E293B"/>
      </w:rPr>
    </w:rPrDefault>
  </w:docDefaults>
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal">
    <w:name w:val="Normal"/>
    <w:qFormat/>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading1">
    <w:name w:val="heading 1"/>
    <w:basedOn w:val="Normal"/>
    <w:next w:val="Normal"/>
    <w:qFormat/>
    <w:pPr>
      <w:spacing w:before="240" w:after="100"/>
    </w:pPr>
    <w:rPr>
      <w:b/>
      <w:sz w:val="32"/>
      <w:color w:val="0F172A"/>
    </w:rPr>
  </w:style>
</w:styles>`
  );

  // 5. word/document.xml
  let bodyXml = "";

  pages.forEach((page, pageIdx) => {
    if (pageIdx > 0) {
      // Formally insert page break between document pages
      bodyXml += `<w:p><w:r><w:br w:type="page"/></w:r></w:p>`;
    }

    page.lines.forEach((line) => {
      const fullText = line.runs.map((r) => r.text).join("").trim();
      if (!fullText) return;

      let pPr = `<w:pPr><w:spacing w:after="140" w:line="260" w:lineRule="auto"/></w:pPr>`;
      if (line.isHeading) {
        pPr = `<w:pPr><w:pStyle w:val="Heading1"/></w:pPr>`;
      }

      let runsXml = "";
      line.runs.forEach((run) => {
        const clean = run.text;
        if (!clean) return;

        let rPr = "";
        if (run.isBold || run.isItalic) {
          rPr = `<w:rPr>${run.isBold ? "<w:b/>" : ""}${run.isItalic ? "<w:i/>" : ""}</w:rPr>`;
        }
        runsXml += `<w:r>${rPr}<w:t xml:space="preserve">${escapeXml(clean)}</w:t></w:r>`;
      });

      bodyXml += `<w:p>${pPr}${runsXml}</w:p>`;
    });
  });

  // Section margins (Standard 1 inch / 1440 twips)
  bodyXml += `<w:sectPr>
    <w:pgSz w:w="11906" w:h="16838"/>
    <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/>
  </w:sectPr>`;

  zip.file(
    "word/document.xml",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <w:body>${bodyXml}</w:body>
</w:document>`
  );

  return await zip.generateAsync({
    type: "blob",
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });
}

/**
 * Legacy adapter for plain string pages
 */
export async function buildDocxFromTextPages(pages: string[][]): Promise<Blob> {
  const formatted: PageContent[] = pages.map((pageLines) => ({
    lines: pageLines.map((line) => {
      const clean = line.trim();
      const isHeading =
        clean.length < 60 &&
        (clean === clean.toUpperCase() || /^[A-Z][A-Za-z0-9\s:,-]{3,50}$/.test(clean));
      return {
        runs: [{ text: clean }],
        isHeading,
      };
    }),
  }));
  return buildDocxFromFormattedPages(formatted);
}

interface ExtractedItem {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isBold: boolean;
  isItalic: boolean;
}

function processItemsIntoLines(items: ExtractedItem[]): TextLine[] {
  if (items.length === 0) return [];

  // Sort items primarily by Y descending (top-to-bottom in PDF coordinates), then X ascending (left-to-right)
  items.sort((a, b) => {
    const yDiff = b.y - a.y;
    if (Math.abs(yDiff) > 4) {
      return yDiff;
    }
    return a.x - b.x;
  });

  const lines: TextLine[] = [];
  let currentRuns: TextRun[] = [];
  let currentLineY: number | null = null;
  let lastX = 0;
  let lastWidth = 0;

  for (const item of items) {
    if (currentLineY === null || Math.abs(item.y - currentLineY) > 5) {
      if (currentRuns.length > 0) {
        const fullText = currentRuns.map((r) => r.text).join("").trim();
        const isHeading =
          fullText.length > 0 &&
          fullText.length < 60 &&
          (currentRuns.every((r) => r.isBold) ||
            fullText === fullText.toUpperCase() ||
            /^[A-Z][A-Za-z0-9\s:,-]{3,50}$/.test(fullText));
        lines.push({ runs: currentRuns, isHeading });
        currentRuns = [];
      }
      currentLineY = item.y;
      lastX = item.x;
      lastWidth = item.width;
      currentRuns.push({
        text: item.text,
        isBold: item.isBold,
        isItalic: item.isItalic,
      });
    } else {
      const prev = currentRuns[currentRuns.length - 1];
      const needsSpace =
        item.x > lastX + lastWidth + 1 &&
        !prev.text.endsWith(" ") &&
        !item.text.startsWith(" ");

      const textToAdd = (needsSpace ? " " : "") + item.text;

      if (prev.isBold === item.isBold && prev.isItalic === item.isItalic) {
        prev.text += textToAdd;
      } else {
        currentRuns.push({
          text: textToAdd,
          isBold: item.isBold,
          isItalic: item.isItalic,
        });
      }
      lastX = item.x;
      lastWidth = item.width;
    }
  }

  if (currentRuns.length > 0) {
    const fullText = currentRuns.map((r) => r.text).join("").trim();
    const isHeading =
      fullText.length > 0 &&
      fullText.length < 60 &&
      (currentRuns.every((r) => r.isBold) ||
        fullText === fullText.toUpperCase() ||
        /^[A-Z][A-Za-z0-9\s:,-]{3,50}$/.test(fullText));
    lines.push({ runs: currentRuns, isHeading });
  }

  return lines;
}

function processPageItems(rawItems: any[]): TextLine[] {
  const items: ExtractedItem[] = [];

  for (const it of rawItems) {
    if ("str" in it && it.str && it.str.trim()) {
      items.push({
        text: it.str,
        x: it.transform[4],
        y: it.transform[5],
        width: it.width || 0,
        height: it.height || Math.abs(it.transform[0]) || 12,
        isBold: isBoldFont(it.fontName),
        isItalic: isItalicFont(it.fontName),
      });
    }
  }

  if (items.length === 0) return [];

  // Check for 2-column layout (e.g. academic papers, resumes, reports)
  let minX = Infinity;
  let maxX = -Infinity;
  for (const it of items) {
    if (it.x < minX) minX = it.x;
    if (it.x + it.width > maxX) maxX = it.x + it.width;
  }

  const pageWidth = maxX - minX;
  if (pageWidth > 300) {
    const midLeft = minX + pageWidth * 0.42;
    const midRight = minX + pageWidth * 0.58;
    const itemsInGutter = items.filter(
      (it) => (it.x > midLeft && it.x < midRight) || (it.x < midLeft && it.x + it.width > midRight)
    );

    // If gutter is clean (< 5% crossings) and both sides have content, process as two columns
    if (itemsInGutter.length < items.length * 0.05) {
      const midPoint = (minX + maxX) / 2;
      const leftColItems = items.filter((it) => it.x + it.width / 2 < midPoint);
      const rightColItems = items.filter((it) => it.x + it.width / 2 >= midPoint);

      if (leftColItems.length > 5 && rightColItems.length > 5) {
        const leftLines = processItemsIntoLines(leftColItems);
        const rightLines = processItemsIntoLines(rightColItems);
        return [...leftLines, ...rightLines];
      }
    }
  }

  return processItemsIntoLines(items);
}

/**
 * Extracts structured text lines with font formatting and progress notifications
 */
export async function extractFormattedPagesFromPdf(
  buf: ArrayBuffer,
  onProgress?: ConversionProgressCallback
): Promise<PageContent[]> {
  const pdfjs = await import("pdfjs-dist");
  if (typeof window !== "undefined" && !pdfjs.GlobalWorkerOptions.workerSrc) {
    // Same-origin local worker avoids cross-origin CORS security blocks and unpkg dynamic import failures
    pdfjs.GlobalWorkerOptions.workerSrc = "/lib/pdf.worker.min.mjs";
  }

  const loadingTask = pdfjs.getDocument({ data: new Uint8Array(buf) });
  const pdf = await loadingTask.promise;
  const pages: PageContent[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    onProgress?.(i, pdf.numPages);

    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const lines = processPageItems(content.items);

    // If page had no extractable text, record fallback notice
    if (lines.length === 0) {
      lines.push({
        runs: [{ text: `[Page ${i} - Scanned or image-only page]`, isItalic: true }],
      });
    }

    pages.push({ lines });
  }

  return pages;
}

/**
 * Extracts raw string lines per page (legacy compatibility)
 */
export async function extractTextFromPdf(buf: ArrayBuffer): Promise<string[][]> {
  const formatted = await extractFormattedPagesFromPdf(buf);
  return formatted.map((p) => p.lines.map((l) => l.runs.map((r) => r.text).join("").trim()));
}

/**
 * High-level PDF-to-Word converter function for browser and client workbench
 */
export async function convertPdfToDocx(
  file: File | ArrayBuffer,
  originalFilename?: string,
  onProgress?: ConversionProgressCallback
): Promise<{ blob: Blob; filename: string; pageCount: number }> {
  const buf = file instanceof File ? await file.arrayBuffer() : file;
  const name = file instanceof File ? file.name : originalFilename || "document.pdf";
  const baseName = name.replace(/\.[^/.]+$/, "");

  const pages = await extractFormattedPagesFromPdf(buf, onProgress);
  const blob = await buildDocxFromFormattedPages(pages);

  return {
    blob,
    filename: `${baseName}.docx`,
    pageCount: pages.length,
  };
}
