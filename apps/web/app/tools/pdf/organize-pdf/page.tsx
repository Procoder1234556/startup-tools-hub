"use client";

import { useState, useCallback } from "react";
import { PDFDocument, degrees } from "pdf-lib";
import {
  Loader2,
  Download,
  RotateCw,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Copy,
  RefreshCw,
  Undo2,
  FileText,
} from "lucide-react";
import ToolUploadZone, { type UploadedFile } from "@/components/ToolUploadZone";

interface PageItem {
  id: string;
  originalIndex: number;
  rotation: number;
}

export default function OrganizePDFPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [pages, setPages] = useState<PageItem[]>([]);
  const [deletedPages, setDeletedPages] = useState<PageItem[]>([]);
  const [processing, setProcessing] = useState<boolean>(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFilesSelected = useCallback(async (uploaded: UploadedFile[]) => {
    setFiles(uploaded);
    setDownloadUrl(null);
    setError(null);
    setDeletedPages([]);

    if (uploaded.length > 0) {
      try {
        const buf = await uploaded[0].file.arrayBuffer();
        const pdf = await PDFDocument.load(buf, { ignoreEncryption: true });
        const count = pdf.getPageCount();
        const initialPages: PageItem[] = [];

        for (let i = 0; i < count; i++) {
          const p = pdf.getPage(i);
          const currentRot = p.getRotation().angle;
          initialPages.push({
            id: `page-${i}-${Date.now()}-${Math.random()}`,
            originalIndex: i,
            rotation: currentRot,
          });
        }
        setPages(initialPages);
      } catch (err) {
        setError(err instanceof Error ? `Failed to read PDF: ${err.message}` : "Failed to load PDF.");
        setPages([]);
      }
    } else {
      setPages([]);
    }
  }, []);

  const movePage = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= pages.length) return;
    const next = [...pages];
    const [moved] = next.splice(index, 1);
    next.splice(target, 0, moved);
    setPages(next);
    setDownloadUrl(null);
  };

  const rotatePage = (index: number) => {
    const next = [...pages];
    next[index] = {
      ...next[index],
      rotation: (next[index].rotation + 90) % 360,
    };
    setPages(next);
    setDownloadUrl(null);
  };

  const deletePage = (index: number) => {
    if (pages.length <= 1) {
      setError("PDF must contain at least 1 page.");
      return;
    }
    const next = [...pages];
    const [removed] = next.splice(index, 1);
    setPages(next);
    setDeletedPages((prev) => [removed, ...prev]);
    setDownloadUrl(null);
  };

  const restoreLastDeleted = () => {
    if (deletedPages.length === 0) return;
    const [restoreItem, ...rest] = deletedPages;
    setDeletedPages(rest);
    setPages((prev) => [...prev, restoreItem]);
    setDownloadUrl(null);
  };

  const duplicatePage = (index: number) => {
    const item = pages[index];
    const clone: PageItem = {
      ...item,
      id: `clone-${Date.now()}-${Math.random()}`,
    };
    const next = [...pages];
    next.splice(index + 1, 0, clone);
    setPages(next);
    setDownloadUrl(null);
  };

  const rotateAll = () => {
    setPages((prev) =>
      prev.map((p) => ({
        ...p,
        rotation: (p.rotation + 90) % 360,
      }))
    );
    setDownloadUrl(null);
  };

  const reverseOrder = () => {
    setPages((prev) => [...prev].reverse());
    setDownloadUrl(null);
  };

  const saveOrganizedPDF = async () => {
    if (files.length === 0 || pages.length === 0) {
      setError("No pages to export.");
      return;
    }
    setProcessing(true);
    setError(null);

    try {
      const srcBuf = await files[0].file.arrayBuffer();
      const srcPdf = await PDFDocument.load(srcBuf, { ignoreEncryption: true });
      const newPdf = await PDFDocument.create();

      for (const item of pages) {
        const [copiedPage] = await newPdf.copyPages(srcPdf, [item.originalIndex]);
        copiedPage.setRotation(degrees(item.rotation));
        newPdf.addPage(copiedPage);
      }

      const outBytes = await newPdf.save();
      const blob = new Blob([new Uint8Array(outBytes)], { type: "application/pdf" });
      setDownloadUrl(URL.createObjectURL(blob));
    } catch (err) {
      setError(err instanceof Error ? `Failed to export PDF: ${err.message}` : "Failed to export PDF.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Organize & Reorder PDF Pages</h1>
        <p className="mt-3 text-gray-600">
          Visually rearrange, delete, rotate, and duplicate pages from any PDF. 100% offline in your browser.
        </p>
      </div>

      <ToolUploadZone
        accept=".pdf"
        multiple={false}
        maxSizeMB={150}
        onFilesSelected={handleFilesSelected}
        label="Drop your PDF here to organize pages"
        sublabel="Single PDF file up to 150MB. Drag, reorder, rotate or remove pages."
      />

      {files.length > 0 && pages.length > 0 && (
        <div className="mt-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border bg-white shadow-sm border-gray-200">
            <div>
              <p className="font-semibold text-gray-900">{files[0].file.name}</p>
              <p className="text-xs text-gray-500">
                {pages.length} page{pages.length === 1 ? "" : "s"} active
                {deletedPages.length > 0 && ` (${deletedPages.length} deleted)`}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={rotateAll}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-1.5"
              >
                <RotateCw className="w-3.5 h-3.5" />
                Rotate All 90°
              </button>
              <button
                onClick={reverseOrder}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reverse Order
              </button>
              {deletedPages.length > 0 && (
                <button
                  onClick={restoreLastDeleted}
                  className="px-3 py-1.5 rounded-lg border border-amber-200 bg-amber-50 text-xs font-medium text-amber-800 hover:bg-amber-100 flex items-center gap-1.5"
                >
                  <Undo2 className="w-3.5 h-3.5" />
                  Restore Page
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {pages.map((p, idx) => (
              <div
                key={p.id}
                className="group relative rounded-2xl border bg-white p-4 shadow-xs transition hover:shadow-md border-gray-200 flex flex-col items-center"
              >
                <div className="w-full flex items-center justify-between text-xs font-medium text-gray-500 mb-2">
                  <span className="font-mono bg-gray-100 px-2 py-0.5 rounded-md">
                    #{idx + 1}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    Orig #{p.originalIndex + 1}
                  </span>
                </div>

                <div
                  className="w-24 h-32 my-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center transition-transform"
                  style={{ transform: `rotate(${p.rotation}deg)` }}
                >
                  <FileText className="w-8 h-8 text-gray-400" />
                  <span className="text-[11px] font-semibold text-gray-600 mt-1">
                    Page {p.originalIndex + 1}
                  </span>
                  {p.rotation > 0 && (
                    <span className="text-[9px] text-emerald-600 font-medium">
                      {p.rotation}°
                    </span>
                  )}
                </div>

                <div className="w-full flex items-center justify-center gap-1 mt-3 pt-2 border-t border-gray-100">
                  <button
                    onClick={() => movePage(idx, -1)}
                    disabled={idx === 0}
                    className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30"
                    title="Move earlier"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => rotatePage(idx)}
                    className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"
                    title="Rotate 90°"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => duplicatePage(idx)}
                    className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"
                    title="Duplicate page"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deletePage(idx)}
                    disabled={pages.length <= 1}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 disabled:opacity-30"
                    title="Delete page"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => movePage(idx, 1)}
                    disabled={idx === pages.length - 1}
                    className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30"
                    title="Move later"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <button
              onClick={saveOrganizedPDF}
              disabled={processing || pages.length === 0}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition disabled:opacity-50"
            >
              {processing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Export Reorganized PDF
                </>
              )}
            </button>

            {downloadUrl && (
              <a
                href={downloadUrl}
                download={files[0].file.name.replace(/\.pdf$/i, "-organized.pdf")}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
              >
                <Download className="w-5 h-5" />
                Download ({pages.length} pages)
              </a>
            )}
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-sm border border-rose-200">
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
