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
    const lines: TextLine[] = [];
    let currentLineRuns: TextRun[] = [];
    let lastY: number | null = null;

    for (const item of content.items) {
      if ("str" in item) {
        const text = item.str;
        if (!text) continue;

        const y = item.transform[5];
        const isBold = isBoldFont(item.fontName);
        const isItalic = isItalicFont(item.fontName);

        if (lastY !== null && Math.abs(y - lastY) > 6) {
          if (currentLineRuns.length > 0) {
            const lineText = currentLineRuns.map((r) => r.text).join("").trim();
            const isHeading =
              lineText.length < 60 &&
              (currentLineRuns.every((r) => r.isBold) ||
                lineText === lineText.toUpperCase() ||
                /^[A-Z][A-Za-z0-9\s:,-]{3,50}$/.test(lineText));

            lines.push({ runs: currentLineRuns, isHeading });
            currentLineRuns = [];
          }
        }

        const prev = currentLineRuns[currentLineRuns.length - 1];
        if (prev && prev.isBold === isBold && prev.isItalic === isItalic) {
          prev.text += (prev.text.endsWith(" ") || text.startsWith(" ") ? "" : " ") + text;
        } else {
          currentLineRuns.push({
            text: currentLineRuns.length > 0 && !text.startsWith(" ") ? " " + text : text,
            isBold,
            isItalic,
          });
        }
        lastY = y;
      }
    }

    if (currentLineRuns.length > 0) {
      const lineText = currentLineRuns.map((r) => r.text).join("").trim();
      const isHeading =
        lineText.length < 60 &&
        (currentLineRuns.every((r) => r.isBold) ||
          lineText === lineText.toUpperCase() ||
          /^[A-Z][A-Za-z0-9\s:,-]{3,50}$/.test(lineText));
      lines.push({ runs: currentLineRuns, isHeading });
    }

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
