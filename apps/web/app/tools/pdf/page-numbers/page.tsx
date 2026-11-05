"use client";

import { useState, useCallback } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { Loader2, Download, Hash, RefreshCw } from "lucide-react";
import ToolUploadZone, { type UploadedFile } from "@/components/ToolUploadZone";

type Position =
  | "bottom-center"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "top-right"
  | "top-left";

type FormatTemplate =
  | "page-n-of-total"
  | "n-of-total"
  | "n-slash-total"
  | "page-n"
  | "n-only"
  | "dash-n-dash";

const FORMAT_OPTIONS: { id: FormatTemplate; label: string; example: string }[] = [
  { id: "page-n-of-total", label: "Page X of Y", example: "Page 1 of 12" },
  { id: "n-of-total", label: "X of Y", example: "1 of 12" },
  { id: "n-slash-total", label: "X / Y", example: "1 / 12" },
  { id: "page-n", label: "Page X", example: "Page 1" },
  { id: "n-only", label: "X only", example: "1" },
  { id: "dash-n-dash", label: "- X -", example: "- 1 -" },
];

export default function PageNumbersTool() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [format, setFormat] = useState<FormatTemplate>("page-n-of-total");
  const [position, setPosition] = useState<Position>("bottom-center");
  const [startPage, setStartPage] = useState<number>(1);
  const [offset, setOffset] = useState<number>(1);
  const [fontSize, setFontSize] = useState<number>(10);
  const [margin, setMargin] = useState<number>(30);
  const [skipCover, setSkipCover] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number | null>(null);

  const handleFilesSelected = useCallback(async (uploaded: UploadedFile[]) => {
    setFiles(uploaded);
    setDownloadUrl(null);
    setError(null);
    if (uploaded.length > 0) {
      try {
        const buf = await uploaded[0].file.arrayBuffer();
        const pdf = await PDFDocument.load(buf, { ignoreEncryption: true });
        setTotalPages(pdf.getPageCount());
      } catch {
        setTotalPages(null);
      }
    } else {
      setTotalPages(null);
    }
  }, []);

  const formatText = (currentNum: number, total: number): string => {
    switch (format) {
      case "page-n-of-total":
        return `Page ${currentNum} of ${total}`;
      case "n-of-total":
        return `${currentNum} of ${total}`;
      case "n-slash-total":
        return `${currentNum} / ${total}`;
      case "page-n":
        return `Page ${currentNum}`;
      case "n-only":
        return `${currentNum}`;
      case "dash-n-dash":
        return `- ${currentNum} -`;
      default:
        return `${currentNum}`;
    }
  };

  const processPDF = async () => {
    if (files.length === 0) {
      setError("Please select a PDF document first.");
      return;
    }
    setProcessing(true);
    setError(null);

    try {
      const buf = await files[0].file.arrayBuffer();
      const pdf = await PDFDocument.load(buf, { ignoreEncryption: true });
      const font = await pdf.embedFont(StandardFonts.Helvetica);
      const pages = pdf.getPages();
      const count = pages.length;

      const firstPageToNumber = skipCover ? Math.max(2, startPage) : startPage;

      for (let i = 0; i < count; i++) {
        const pageIndexOneBased = i + 1;
        if (pageIndexOneBased < firstPageToNumber) {
          continue;
        }

        const page = pages[i];
        const { width, height } = page.getSize();
        const pageNumber = pageIndexOneBased - firstPageToNumber + offset;
        const text = formatText(pageNumber, count);
        const textWidth = font.widthOfTextAtSize(text, fontSize);
        const textHeight = fontSize;

        let x = 0;
        let y = 0;

        switch (position) {
          case "bottom-center":
            x = (width - textWidth) / 2;
            y = margin;
            break;
          case "bottom-right":
            x = width - margin - textWidth;
            y = margin;
            break;
          case "bottom-left":
            x = margin;
            y = margin;
            break;
          case "top-center":
            x = (width - textWidth) / 2;
            y = height - margin - textHeight;
            break;
          case "top-right":
            x = width - margin - textWidth;
            y = height - margin - textHeight;
            break;
          case "top-left":
            x = margin;
            y = height - margin - textHeight;
            break;
        }

        page.drawText(text, {
          x,
          y,
          size: fontSize,
          font,
          color: rgb(0.2, 0.2, 0.2),
        });
      }

      const outBytes = await pdf.save();
      const blob = new Blob([new Uint8Array(outBytes)], { type: "application/pdf" });
      setDownloadUrl(URL.createObjectURL(blob));
    } catch (err) {
      setError(err instanceof Error ? `Failed to number PDF: ${err.message}` : "Failed to number PDF.");
    } finally {
      setProcessing(false);
    }
  };

  const resetAll = () => {
    setFiles([]);
    setDownloadUrl(null);
    setError(null);
    setTotalPages(null);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Add Page Numbers to PDF</h1>
        <p className="mt-3 text-gray-600">
          Insert customizable page numbers into your PDF. Choose format, position, margins, and starting page. 100% browser-side privacy.
        </p>
      </div>

      <ToolUploadZone
        accept=".pdf"
        multiple={false}
        maxSizeMB={150}
        onFilesSelected={handleFilesSelected}
        label="Drop your PDF here or click to choose"
        sublabel="Single PDF file up to 150MB. Processed offline in your browser."
      />

      {files.length > 0 && (
        <div className="mt-8 space-y-6">
          <div className="rounded-2xl border bg-white p-6 shadow-sm border-gray-200">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <p className="font-semibold text-gray-900 truncate">{files[0].file.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {(files[0].file.size / (1024 * 1024)).toFixed(2)} MB
                  {totalPages !== null && ` • ${totalPages} page${totalPages === 1 ? "" : "s"}`}
                </p>
              </div>
              <button
                onClick={resetAll}
                className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Change file
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Numbering Format
                </label>
                <div className="space-y-2">
                  {FORMAT_OPTIONS.map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-center justify-between p-3 rounded-xl border text-sm cursor-pointer transition-colors ${
                        format === opt.id
                          ? "border-emerald-600 bg-emerald-50/50 text-emerald-950 font-medium"
                          : "border-gray-200 hover:border-gray-300 text-gray-700"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="format"
                          checked={format === opt.id}
                          onChange={() => setFormat(opt.id)}
                          className="accent-emerald-600"
                        />
                        {opt.label}
                      </span>
                      <span className="text-xs text-gray-400 font-mono">{opt.example}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position on Page
                  </label>
                  <select
                    value={position}
                    onChange={(e) => setPosition(e.target.value as Position)}
                    className="w-full rounded-xl border border-gray-300 p-2.5 text-sm focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="bottom-center">Bottom Center (Standard)</option>
                    <option value="bottom-right">Bottom Right</option>
                    <option value="bottom-left">Bottom Left</option>
                    <option value="top-center">Top Center</option>
                    <option value="top-right">Top Right</option>
                    <option value="top-left">Top Left</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Start at Page
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={totalPages ?? 999}
                      value={startPage}
                      onChange={(e) => setStartPage(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full rounded-xl border border-gray-300 p-2 text-sm focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      First Number
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={offset}
                      onChange={(e) => setOffset(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full rounded-xl border border-gray-300 p-2 text-sm focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Font Size ({fontSize} pt)
                    </label>
                    <input
                      type="range"
                      min={8}
                      max={18}
                      value={fontSize}
                      onChange={(e) => setFontSize(parseInt(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Margin ({margin} pt)
                    </label>
                    <input
                      type="range"
                      min={15}
                      max={60}
                      value={margin}
                      onChange={(e) => setMargin(parseInt(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 pt-2 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={skipCover}
                    onChange={(e) => setSkipCover(e.target.checked)}
                    className="rounded accent-emerald-600"
                  />
                  <span>Skip first page (Cover page)</span>
                </label>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={processPDF}
                disabled={processing}
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition disabled:opacity-50"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Adding Page Numbers...
                  </>
                ) : (
                  <>
                    <Hash className="w-5 h-5" />
                    Apply Page Numbers
                  </>
                )}
              </button>

              {downloadUrl && (
                <a
                  href={downloadUrl}
                  download={files[0].file.name.replace(/\.pdf$/i, "-numbered.pdf")}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
                >
                  <Download className="w-5 h-5" />
                  Download Numbered PDF
                </a>
              )}
            </div>

            {error && (
              <div className="mt-4 p-3 rounded-xl bg-rose-50 text-rose-700 text-sm border border-rose-200">
                {error}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
