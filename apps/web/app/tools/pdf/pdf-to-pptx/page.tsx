"use client";

// ponytail: Production-grade client-first PDF-to-PowerPoint (.pptx) conversion.
// Zero remote uploads; instant client-side rendering with pptxgenjs and user-controlled server fallback.
import { useState, useCallback, useEffect } from "react";
import {
  Loader2,
  Download,
  Presentation,
  Shield,
  Info,
  AlertCircle,
  CloudUpload,
  CheckCircle2,
} from "lucide-react";
import ToolUploadZone, { type UploadedFile } from "@/components/ToolUploadZone";
import { convertPdfToPptxClient } from "@/lib/pdf-to-pptx-client";

export default function PDFtoPPTXPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [processing, setProcessing] = useState(false);
  const [serverProcessing, setServerProcessing] = useState(false);
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState<string>("converted.pptx");
  const [error, setError] = useState<string | null>(null);
  const [canServerFallback, setCanServerFallback] = useState(false);
  const [pageCount, setPageCount] = useState<number | null>(null);

  // Revoke object URL to avoid client memory leaks
  useEffect(() => {
    return () => {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
    };
  }, [downloadUrl]);

  const handleFilesSelected = useCallback((uploaded: UploadedFile[]) => {
    setFiles(uploaded);
    setDownloadUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setError(null);
    setProgress(null);
    setCanServerFallback(false);
    setPageCount(null);
  }, []);

  const convertClientSide = async () => {
    if (files.length === 0) {
      setError("Please select a PDF.");
      return;
    }
    setProcessing(true);
    setError(null);
    setProgress(null);
    setCanServerFallback(false);
    setDownloadUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });

    const f = files[0].file;
    const targetName = f.name.replace(/\.pdf$/i, ".pptx") || "converted.pptx";

    try {
      // 1. In-browser client conversion with real-time slide rendering
      const res = await convertPdfToPptxClient(f, undefined, (current, total) => {
        setProgress({ current, total });
      });

      const url = URL.createObjectURL(res.blob);
      setDownloadUrl(url);
      setDownloadName(res.filename || targetName);
      setPageCount(res.pageCount);
    } catch (clientErr: any) {
      console.warn("Client-side PPTX conversion error:", clientErr);
      setError(
        clientErr.message ||
          "Client-side conversion failed. Document might be corrupted or encrypted."
      );
      setCanServerFallback(true);
    } finally {
      setProcessing(false);
    }
  };

  const convertServerSideFallback = async () => {
    if (files.length === 0) return;
    setServerProcessing(true);
    setError(null);

    const f = files[0].file;
    const targetName = f.name.replace(/\.pdf$/i, ".pptx") || "converted.pptx";

    try {
      const fd = new FormData();
      fd.append("file", f);
      const res = await fetch("/api/pdf/pdf-to-pptx/", { method: "POST", body: fd });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Server error ${res.status}`);
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
      setDownloadName(targetName);
      setCanServerFallback(false);
    } catch (serverErr: any) {
      setError(serverErr.message || "Server conversion failed.");
    } finally {
      setServerProcessing(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded-full px-3 py-1 mb-3">
          <Shield className="w-3.5 h-3.5" aria-hidden />
          Runs 100% in your browser · Zero server uploads
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          PDF to PowerPoint Converter
        </h1>
        <p className="mt-3 text-gray-600 leading-relaxed max-w-xl mx-auto text-base">
          Convert each PDF page into a high-resolution PowerPoint (.pptx) slide with exact layout
          preservation. Runs directly on your device.
        </p>
      </div>

      <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50/70 px-4 py-3 flex items-start gap-3 text-sm text-blue-900">
        <Info className="w-5 h-5 shrink-0 mt-0.5 text-blue-600" />
        <div>
          <p className="font-semibold text-blue-950">How this works</p>
          <p className="mt-1 text-xs text-blue-800 leading-relaxed">
            Each page renders into an individual 16:9 widescreen slide. Text layout and graphics are
            preserved exactly as designed. Need editable text? Use{" "}
            <a className="underline font-medium hover:text-blue-950" href="/tools/pdf/pdf-to-word/">
              PDF to Word
            </a>{" "}
            instead.
          </p>
        </div>
      </div>

      <ToolUploadZone
        accept=".pdf"
        multiple={false}
        maxSizeMB={50}
        onFilesSelected={handleFilesSelected}
        label="Drop a PDF here or click to choose"
        sublabel="Single PDF up to 50MB. Multi-page PDFs supported."
      />

      {files.length > 0 && !downloadUrl && (
        <div
          className="mt-6 rounded-2xl border bg-white p-5 shadow-sm space-y-4"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>{files[0].file.name}</span>
            <span>{(files[0].file.size / 1024).toFixed(1)} KB</span>
          </div>

          {processing && progress && progress.total > 0 && (
            <div className="space-y-1.5 pt-1 pb-1">
              <div className="flex justify-between text-xs text-slate-600 font-mono">
                <span>Rendering Slides…</span>
                <span>
                  Slide {progress.current} of {progress.total}
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-150"
                  style={{ width: `${Math.round((progress.current / progress.total) * 100)}%` }}
                />
              </div>
            </div>
          )}

          <button
            onClick={convertClientSide}
            disabled={processing || serverProcessing}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 transition disabled:opacity-70 shadow-sm cursor-pointer"
          >
            {processing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                {progress && progress.total > 0
                  ? `Building slide ${progress.current} of ${progress.total}…`
                  : "Rendering presentation on your device…"}
              </>
            ) : (
              <>
                <Presentation className="w-4 h-4 text-emerald-400" />
                Convert to PowerPoint (.pptx)
              </>
            )}
          </button>
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 space-y-3">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{error}</p>
          </div>
          {canServerFallback && (
            <div className="pt-2 border-t border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-xs text-rose-800">
                Want to try server rendering (Poppler engine)? This will upload your PDF securely.
              </p>
              <button
                onClick={convertServerSideFallback}
                disabled={serverProcessing}
                className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold shrink-0 cursor-pointer disabled:opacity-50"
              >
                {serverProcessing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Uploading & Rendering…
                  </>
                ) : (
                  <>
                    <CloudUpload className="w-3.5 h-3.5" />
                    Try Server Fallback
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {downloadUrl && (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-900">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            Conversion Complete! PowerPoint presentation ready.
          </div>
          {pageCount && (
            <p className="text-xs text-slate-600 font-mono">
              Successfully generated {pageCount} widescreen slides.
            </p>
          )}
          <a
            href={downloadUrl}
            download={downloadName}
            className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 transition shadow-sm"
          >
            <Download className="w-4 h-4" /> Download {downloadName}
          </a>
        </div>
      )}
    </div>
  );
}
