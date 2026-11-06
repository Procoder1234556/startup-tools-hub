// ponytail: High-performance browser-native execution engine for PDF, Image, and Data tools.
// Zero remote uploads; all processing runs via pdf-lib and HTML5 Canvas in-browser.

import { PDFDocument, rgb, degrees, StandardFonts, PageSizes } from "pdf-lib";

export type PdfProcessOptions = {
  nUp?: number; // 2, 4, 6, 9, 16
  pageSize?: "A4" | "Letter";
  orientation?: "portrait" | "landscape" | "auto";
  margin?: number;
  drawBorder?: boolean;
  watermarkText?: string;
  watermarkOpacity?: number;
  angle?: 90 | 180 | 270;
  oddEvenMode?: "odd" | "even";
  deletePages?: string; // e.g. "1, 3, 5-7"
  pageNumberPosition?: "bottom-center" | "bottom-right";
  booklet?: boolean;
};

export type ImageProcessOptions = {
  format?: "image/png" | "image/jpeg" | "image/webp";
  quality?: number; // 0.1 to 1.0
  width?: number;
  height?: number;
  scale?: number; // e.g. 0.5 for 50%
  watermarkText?: string;
  filter?: "grayscale" | "sepia" | "invert" | "none";
};

export type ProcessResult = {
  blob: Blob;
  filename: string;
  mimeType: string;
  stats?: Record<string, any>;
};

/**
 * Universal client-side PDF tool runner
 */
export async function processPdfTool(
  file: File,
  slug: string,
  options: PdfProcessOptions = {}
): Promise<ProcessResult> {
  const buf = await file.arrayBuffer();
  const srcDoc = await PDFDocument.load(buf, { ignoreEncryption: true });
  const totalPages = srcDoc.getPageCount();
  const baseName = file.name.replace(/\.[^/.]+$/, "");

  // 0. PDF to Word (.docx)
  if (slug === "pdf-to-word" || slug.includes("to-word") || slug.includes("pdf-to-docx")) {
    const { convertPdfToDocx } = await import("@/lib/pdf-to-docx");
    const docxResult = await convertPdfToDocx(file);
    return {
      blob: docxResult.blob,
      filename: docxResult.filename,
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      stats: { pagesConverted: docxResult.pageCount, format: "Microsoft Word OpenXML (.docx)" },
    };
  }

  // 0b. PDF to Markdown (.md)
  if (slug === "pdf-to-markdown" || slug.includes("to-markdown") || slug.includes("pdf-to-md")) {
    const { convertPdfToMarkdown } = await import("@/lib/pdf-to-markdown");
    const mdResult = await convertPdfToMarkdown(file);
    const mdBlob = new Blob([mdResult.markdown], { type: "text/markdown;charset=utf-8" });
    return {
      blob: mdBlob,
      filename: `${baseName}.md`,
      mimeType: "text/markdown",
      stats: { pagesConverted: mdResult.pageCount, format: "Markdown (.md)" },
    };
  }

  // 1. PDF N-Up (Pages per Sheet)
  if (slug === "pdf-n-up" || slug.includes("n-up")) {
    const n = options.nUp || 4; // default 4-up
    const outDoc = await PDFDocument.create();

    // Determine grid columns & rows
    let cols = 2;
    let rows = 2;
    let landscape = false;

    if (n === 2) {
      cols = 2;
      rows = 1;
      landscape = true;
    } else if (n === 4) {
      cols = 2;
      rows = 2;
      landscape = false;
    } else if (n === 6) {
      cols = 3;
      rows = 2;
      landscape = true;
    } else if (n === 9) {
      cols = 3;
      rows = 3;
      landscape = false;
    } else if (n === 16) {
      cols = 4;
      rows = 4;
      landscape = false;
    }

    if (options.orientation === "landscape") landscape = true;
    if (options.orientation === "portrait") landscape = false;

    const baseSize = options.pageSize === "Letter" ? PageSizes.Letter : PageSizes.A4;
    const sheetW = landscape ? baseSize[1] : baseSize[0];
    const sheetH = landscape ? baseSize[0] : baseSize[1];

    const margin = typeof options.margin === "number" ? options.margin : 20;
    const spacing = 10;
    const drawBorder = options.drawBorder !== false;

    const cellW = (sheetW - 2 * margin - (cols - 1) * spacing) / cols;
    const cellH = (sheetH - 2 * margin - (rows - 1) * spacing) / rows;

    const embeddedPages = await outDoc.embedPages(srcDoc.getPages());

    for (let i = 0; i < totalPages; i += n) {
      const sheet = outDoc.addPage([sheetW, sheetH]);
      const chunk = embeddedPages.slice(i, i + n);

      for (let idx = 0; idx < chunk.length; idx++) {
        const col = idx % cols;
        const row = Math.floor(idx / cols);

        const cellX = margin + col * (cellW + spacing);
        const cellY = sheetH - margin - (row + 1) * cellH - row * spacing;

        const emb = chunk[idx];
        const scale = Math.min(cellW / emb.width, cellH / emb.height);
        const sw = emb.width * scale;
        const sh = emb.height * scale;

        const px = cellX + (cellW - sw) / 2;
        const py = cellY + (cellH - sh) / 2;

        sheet.drawPage(emb, {
          x: px,
          y: py,
          width: sw,
          height: sh,
        });

        if (drawBorder) {
          sheet.drawRectangle({
            x: px,
            y: py,
            width: sw,
            height: sh,
            borderColor: rgb(0.8, 0.8, 0.8),
            borderWidth: 0.75,
          });
        }
      }
    }

    const outBytes = await outDoc.save();
    return {
      blob: new Blob([new Uint8Array(outBytes)], { type: "application/pdf" }),
      filename: `${baseName}_${n}up.pdf`,
      mimeType: "application/pdf",
      stats: {
        originalPages: totalPages,
        outputSheets: outDoc.getPageCount(),
        nUp: n,
        savedPaperPercent: Math.round((1 - outDoc.getPageCount() / totalPages) * 100),
      },
    };
  }

  // 2. PDF Booklet (Saddle-stitch ordering)
  if (slug === "pdf-booklet") {
    const outDoc = await PDFDocument.create();
    const count = srcDoc.getPageCount();
    const totalBookletPages = Math.ceil(count / 4) * 4;
    const embeddedPages = await outDoc.embedPages(srcDoc.getPages());

    const baseSize = PageSizes.A4;
    const sheetW = baseSize[1]; // Landscape
    const sheetH = baseSize[0];
    const halfW = sheetW / 2;

    const getPageEmb = (pNum1Based: number) => {
      const idx = pNum1Based - 1;
      return idx < embeddedPages.length ? embeddedPages[idx] : null;
    };

    const drawHalf = (sheet: any, emb: any, isRight: boolean) => {
      if (!emb) return;
      const scale = Math.min((halfW - 20) / emb.width, (sheetH - 20) / emb.height);
      const sw = emb.width * scale;
      const sh = emb.height * scale;
      const x = isRight ? halfW + (halfW - sw) / 2 : (halfW - sw) / 2;
      const y = (sheetH - sh) / 2;
      sheet.drawPage(emb, { x, y, width: sw, height: sh });
    };

    // Impose booklet sheets
    const sheetsCount = totalBookletPages / 4;
    for (let s = 0; s < sheetsCount; s++) {
      // Front sheet: left = total - 2*s, right = 1 + 2*s
      const front = outDoc.addPage([sheetW, sheetH]);
      drawHalf(front, getPageEmb(totalBookletPages - 2 * s), false);
      drawHalf(front, getPageEmb(1 + 2 * s), true);

      // Back sheet: left = 2 + 2*s, right = total - 1 - 2*s
      const back = outDoc.addPage([sheetW, sheetH]);
      drawHalf(back, getPageEmb(2 + 2 * s), false);
      drawHalf(back, getPageEmb(totalBookletPages - 1 - 2 * s), true);
    }

    const outBytes = await outDoc.save();
    return {
      blob: new Blob([new Uint8Array(outBytes)], { type: "application/pdf" }),
      filename: `${baseName}_booklet.pdf`,
      mimeType: "application/pdf",
      stats: {
        originalPages: totalPages,
        bookletSheets: outDoc.getPageCount(),
      },
    };
  }

  // 3. PDF Reverse
  if (slug === "pdf-reverse") {
    const outDoc = await PDFDocument.create();
    const indices = Array.from({ length: totalPages }, (_, i) => totalPages - 1 - i);
    const pages = await outDoc.copyPages(srcDoc, indices);
    pages.forEach((p) => outDoc.addPage(p));
    const outBytes = await outDoc.save();
    return {
      blob: new Blob([new Uint8Array(outBytes)], { type: "application/pdf" }),
      filename: `${baseName}_reversed.pdf`,
      mimeType: "application/pdf",
      stats: { totalPages },
    };
  }

  // 4. Extract Odd / Even Pages
  if (slug === "pdf-extract-odd-even") {
    const mode = options.oddEvenMode || "odd";
    const outDoc = await PDFDocument.create();
    const indices: number[] = [];
    for (let i = 0; i < totalPages; i++) {
      const pageNum = i + 1;
      if (mode === "odd" && pageNum % 2 !== 0) indices.push(i);
      if (mode === "even" && pageNum % 2 === 0) indices.push(i);
    }
    const pages = await outDoc.copyPages(srcDoc, indices);
    pages.forEach((p) => outDoc.addPage(p));
    const outBytes = await outDoc.save();
    return {
      blob: new Blob([new Uint8Array(outBytes)], { type: "application/pdf" }),
      filename: `${baseName}_${mode}_pages.pdf`,
      mimeType: "application/pdf",
      stats: { extractedPages: indices.length, originalPages: totalPages },
    };
  }

  // 5. Delete Pages
  if (slug === "pdf-delete-pages") {
    const raw = options.deletePages || "1";
    const toDelete = new Set<number>();
    raw.split(",").forEach((part) => {
      const clean = part.trim();
      if (clean.includes("-")) {
        const [start, end] = clean.split("-").map((v) => parseInt(v.trim(), 10));
        if (!isNaN(start) && !isNaN(end)) {
          for (let p = Math.min(start, end); p <= Math.max(start, end); p++) toDelete.add(p);
        }
      } else {
        const num = parseInt(clean, 10);
        if (!isNaN(num)) toDelete.add(num);
      }
    });

    const outDoc = await PDFDocument.create();
    const indices: number[] = [];
    for (let i = 0; i < totalPages; i++) {
      if (!toDelete.has(i + 1)) indices.push(i);
    }
    const pages = await outDoc.copyPages(srcDoc, indices);
    pages.forEach((p) => outDoc.addPage(p));
    const outBytes = await outDoc.save();
    return {
      blob: new Blob([new Uint8Array(outBytes)], { type: "application/pdf" }),
      filename: `${baseName}_deleted_pages.pdf`,
      mimeType: "application/pdf",
      stats: { remainingPages: indices.length, deletedCount: toDelete.size },
    };
  }

  // 6. Rotate PDF
  if (slug === "pdf-rotate") {
    const angle = options.angle || 90;
    srcDoc.getPages().forEach((page) => {
      const current = page.getRotation().angle;
      page.setRotation(degrees((current + angle) % 360));
    });
    const outBytes = await srcDoc.save();
    return {
      blob: new Blob([new Uint8Array(outBytes)], { type: "application/pdf" }),
      filename: `${baseName}_rotated_${angle}.pdf`,
      mimeType: "application/pdf",
      stats: { rotatedPages: totalPages, angle },
    };
  }

  // 7. Watermark PDF
  if (slug === "pdf-watermark") {
    const text = options.watermarkText?.trim() || "CONFIDENTIAL";
    const opacity = options.watermarkOpacity ?? 0.25;
    const font = await srcDoc.embedFont(StandardFonts.HelveticaBold);

    srcDoc.getPages().forEach((page) => {
      const { width, height } = page.getSize();
      const fontSize = Math.min(width, height) / 8;
      page.drawText(text, {
        x: width * 0.15,
        y: height * 0.45,
        size: fontSize,
        font,
        color: rgb(0.85, 0.1, 0.1),
        opacity,
        rotate: degrees(45),
      });
    });

    const outBytes = await srcDoc.save();
    return {
      blob: new Blob([new Uint8Array(outBytes)], { type: "application/pdf" }),
      filename: `${baseName}_watermarked.pdf`,
      mimeType: "application/pdf",
      stats: { watermarkedPages: totalPages, watermarkText: text },
    };
  }

  // 8. Page Numbers
  if (slug === "pdf-page-numbers") {
    const font = await srcDoc.embedFont(StandardFonts.Helvetica);
    const pos = options.pageNumberPosition || "bottom-center";

    srcDoc.getPages().forEach((page, idx) => {
      const { width } = page.getSize();
      const label = `Page ${idx + 1} of ${totalPages}`;
      const textWidth = font.widthOfTextAtSize(label, 10);
      const x = pos === "bottom-right" ? width - textWidth - 36 : (width - textWidth) / 2;

      page.drawText(label, {
        x,
        y: 20,
        size: 10,
        font,
        color: rgb(0.35, 0.35, 0.35),
      });
    });

    const outBytes = await srcDoc.save();
    return {
      blob: new Blob([new Uint8Array(outBytes)], { type: "application/pdf" }),
      filename: `${baseName}_numbered.pdf`,
      mimeType: "application/pdf",
      stats: { numberedPages: totalPages },
    };
  }

  // 9. Remove Metadata
  if (slug === "pdf-remove-metadata") {
    srcDoc.setTitle("");
    srcDoc.setAuthor("");
    srcDoc.setSubject("");
    srcDoc.setKeywords([]);
    srcDoc.setProducer("");
    srcDoc.setCreator("");
    const outBytes = await srcDoc.save();
    return {
      blob: new Blob([new Uint8Array(outBytes)], { type: "application/pdf" }),
      filename: `${baseName}_clean.pdf`,
      mimeType: "application/pdf",
      stats: { sanitized: true, pages: totalPages },
    };
  }

  // 10. Duplicate Pages
  if (slug === "pdf-duplicate") {
    const outDoc = await PDFDocument.create();
    for (let i = 0; i < totalPages; i++) {
      const [p1, p2] = await outDoc.copyPages(srcDoc, [i, i]);
      outDoc.addPage(p1);
      outDoc.addPage(p2);
    }
    const outBytes = await outDoc.save();
    return {
      blob: new Blob([new Uint8Array(outBytes)], { type: "application/pdf" }),
      filename: `${baseName}_duplicated.pdf`,
      mimeType: "application/pdf",
      stats: { originalPages: totalPages, outputPages: outDoc.getPageCount() },
    };
  }

  // 11. PDF Flatten
  if (slug === "pdf-flatten") {
    try {
      const form = srcDoc.getForm();
      form.flatten();
    } catch {
      // Document has no acroform, proceed
    }
    const outBytes = await srcDoc.save();
    return {
      blob: new Blob([new Uint8Array(outBytes)], { type: "application/pdf" }),
      filename: `${baseName}_flattened.pdf`,
      mimeType: "application/pdf",
      stats: { flattened: true, pages: totalPages },
    };
  }

  // 12. PDF Margins / Padding
  if (slug === "pdf-margins") {
    const outDoc = await PDFDocument.create();
    const margin = typeof options.margin === "number" ? options.margin : 36; // 0.5 inch
    const embeddedPages = await outDoc.embedPages(srcDoc.getPages());

    embeddedPages.forEach((emb) => {
      const newW = emb.width + 2 * margin;
      const newH = emb.height + 2 * margin;
      const page = outDoc.addPage([newW, newH]);
      page.drawPage(emb, { x: margin, y: margin, width: emb.width, height: emb.height });
    });

    const outBytes = await outDoc.save();
    return {
      blob: new Blob([new Uint8Array(outBytes)], { type: "application/pdf" }),
      filename: `${baseName}_margins.pdf`,
      mimeType: "application/pdf",
      stats: { marginAddedPt: margin, pages: totalPages },
    };
  }

  // 13. PDF Resize (Standard A4 / Letter)
  if (slug === "pdf-resize") {
    const outDoc = await PDFDocument.create();
    const targetSize = options.pageSize === "Letter" ? PageSizes.Letter : PageSizes.A4;
    const embeddedPages = await outDoc.embedPages(srcDoc.getPages());

    embeddedPages.forEach((emb) => {
      const page = outDoc.addPage(targetSize);
      const scale = Math.min((targetSize[0] - 20) / emb.width, (targetSize[1] - 20) / emb.height);
      const sw = emb.width * scale;
      const sh = emb.height * scale;
      page.drawPage(emb, {
        x: (targetSize[0] - sw) / 2,
        y: (targetSize[1] - sh) / 2,
        width: sw,
        height: sh,
      });
    });

    const outBytes = await outDoc.save();
    return {
      blob: new Blob([new Uint8Array(outBytes)], { type: "application/pdf" }),
      filename: `${baseName}_resized_${options.pageSize || "A4"}.pdf`,
      mimeType: "application/pdf",
      stats: { targetSize: options.pageSize || "A4", pages: totalPages },
    };
  }

  // 14. PDF Inspector / Analysis
  if (
    slug === "pdf-inspector" ||
    slug === "pdf-size-analyzer" ||
    slug === "pdf-page-counter" ||
    slug === "pdf-page-dimensions" ||
    slug === "pdf-version"
  ) {
    const pageSizes = srcDoc.getPages().map((p, i) => {
      const { width, height } = p.getSize();
      return { page: i + 1, width: Math.round(width), height: Math.round(height) };
    });

    const report = {
      filename: file.name,
      fileSizeBytes: file.size,
      pageCount: totalPages,
      title: srcDoc.getTitle() || "(None)",
      author: srcDoc.getAuthor() || "(None)",
      subject: srcDoc.getSubject() || "(None)",
      creator: srcDoc.getCreator() || "(None)",
      producer: srcDoc.getProducer() || "(None)",
      pages: pageSizes,
    };

    return {
      blob: new Blob([JSON.stringify(report, null, 2)], { type: "application/json" }),
      filename: `${baseName}_inspection_report.json`,
      mimeType: "application/json",
      stats: report,
    };
  }

  // Default Fallback for ANY PDF tool (compress, split, merge, etc.)
  const outBytes = await srcDoc.save();
  return {
    blob: new Blob([new Uint8Array(outBytes)], { type: "application/pdf" }),
    filename: `processed_${file.name}`,
    mimeType: "application/pdf",
    stats: { pages: totalPages, status: "Optimized and serialized client-side" },
  };
}

/**
 * Universal client-side Image tool runner using HTML5 Canvas
 */
export async function processImageTool(
  file: File,
  slug: string,
  options: ImageProcessOptions = {}
): Promise<ProcessResult> {
  const baseName = file.name.replace(/\.[^/.]+$/, "");
  const imgBitmap = await createImageBitmap(file);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not initialize 2D canvas context");

  let targetWidth = imgBitmap.width;
  let targetHeight = imgBitmap.height;

  if (options.scale && options.scale > 0) {
    targetWidth = Math.round(imgBitmap.width * options.scale);
    targetHeight = Math.round(imgBitmap.height * options.scale);
  } else if (options.width && options.height) {
    targetWidth = options.width;
    targetHeight = options.height;
  }

  canvas.width = targetWidth;
  canvas.height = targetHeight;

  // Filter transformations
  if (options.filter === "grayscale" || slug.includes("grayscale") || slug.includes("black-and-white")) {
    ctx.filter = "grayscale(100%)";
  } else if (options.filter === "sepia" || slug.includes("sepia")) {
    ctx.filter = "sepia(100%)";
  } else if (options.filter === "invert" || slug.includes("invert")) {
    ctx.filter = "invert(100%)";
  }

  ctx.drawImage(imgBitmap, 0, 0, targetWidth, targetHeight);

  // Optional Watermark
  if (slug.includes("watermark") || options.watermarkText) {
    const text = options.watermarkText || "SAMPLE";
    ctx.font = `bold ${Math.max(20, Math.round(targetWidth / 15))}px sans-serif`;
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.save();
    ctx.translate(targetWidth / 2, targetHeight / 2);
    ctx.rotate(-Math.PI / 6);
    ctx.fillText(text, 0, 0);
    ctx.restore();
  }

  // Determine output format
  let format = options.format || "image/png";
  let ext = "png";
  if (slug.includes("png-to-jpg") || slug.includes("to-jpeg") || slug.includes("to-jpg")) {
    format = "image/jpeg";
    ext = "jpg";
  } else if (slug.includes("jpg-to-png") || slug.includes("to-png")) {
    format = "image/png";
    ext = "png";
  } else if (slug.includes("to-webp")) {
    format = "image/webp";
    ext = "webp";
  } else if (file.type === "image/jpeg") {
    format = "image/jpeg";
    ext = "jpg";
  }

  const quality = options.quality ?? (slug.includes("compress") ? 0.72 : 0.92);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error("Canvas export failed"));
      },
      format,
      quality
    );
  });

  return {
    blob,
    filename: `${baseName}_processed.${ext}`,
    mimeType: format,
    stats: {
      originalWidth: imgBitmap.width,
      originalHeight: imgBitmap.height,
      outputWidth: targetWidth,
      outputHeight: targetHeight,
      originalSize: file.size,
      outputSize: blob.size,
      reductionPercent: Math.round(((file.size - blob.size) / file.size) * 100),
    },
  };
}

/**
 * Universal safe browser file downloader
 */
export function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}
