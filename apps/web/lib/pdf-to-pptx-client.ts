// ponytail: Production-grade client-side PDF-to-PowerPoint (.pptx) conversion engine.
// Renders each PDF page to an image canvas and packages standard Microsoft PowerPoint PPTX using pptxgenjs.
// Zero remote uploads; 100% private in browser, works offline and on serverless deployments without Poppler.

export type PptxProgressCallback = (current: number, total: number) => void;

export interface ConvertPdfToPptxResult {
  blob: Blob;
  filename: string;
  pageCount: number;
}

/**
 * Converts a PDF file into a 16:9 PowerPoint (.pptx) presentation directly in the browser
 */
export async function convertPdfToPptxClient(
  file: File | ArrayBuffer,
  originalFilename?: string,
  onProgress?: PptxProgressCallback
): Promise<ConvertPdfToPptxResult> {
  const pdfjs = await import("pdfjs-dist");
  if (typeof window !== "undefined" && !pdfjs.GlobalWorkerOptions.workerSrc) {
    pdfjs.GlobalWorkerOptions.workerSrc = "/lib/pdf.worker.min.mjs";
  }

  const pptxModule = await import("pptxgenjs");
  const PptxGen = pptxModule.default || pptxModule;
  const pptx = new PptxGen();

  // Standard PowerPoint 16:9 widescreen layout
  pptx.defineLayout({ name: "16x9", width: 13.333, height: 7.5 });
  pptx.layout = "16x9";

  const buf = file instanceof File ? await file.arrayBuffer() : file;
  const name = file instanceof File ? file.name : originalFilename || "presentation.pdf";
  const baseName = name.replace(/\.[^/.]+$/, "");

  const loadingTask = pdfjs.getDocument({ data: new Uint8Array(buf) });
  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;

  if (numPages === 0) {
    throw new Error("The PDF document contains no pages.");
  }

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    onProgress?.(pageNum, numPages);

    const page = await pdf.getPage(pageNum);
    // Render at 1.5x scale for balanced sharpness and memory efficiency
    const viewport = page.getViewport({ scale: 1.5 });

    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Unable to create canvas context for page rendering.");
    }

    await (page.render as any)({ canvasContext: ctx, viewport, canvas }).promise;

    const imgData = canvas.toDataURL("image/png");

    // Add new slide and insert contained page image
    const slide = pptx.addSlide();
    slide.background = { color: "FFFFFF" };
    slide.addImage({
      data: imgData,
      x: 0,
      y: 0,
      w: 13.333,
      h: 7.5,
      sizing: { type: "contain", w: 13.333, h: 7.5 },
    });

    // Free canvas memory
    canvas.width = 0;
    canvas.height = 0;
  }

  const output = await pptx.write({ outputType: "blob" });
  const blob = output instanceof Blob ? output : new Blob([output as any], {
    type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  });

  return {
    blob,
    filename: `${baseName}.pptx`,
    pageCount: numPages,
  };
}
