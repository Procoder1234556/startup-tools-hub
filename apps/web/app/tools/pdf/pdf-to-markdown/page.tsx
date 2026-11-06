"use client";

// ponytail: Production-grade client-first PDF-to-Markdown conversion.
// Zero remote uploads; instant in-browser AST parsing with headings, bold/italic, and optional server fallback.
import { useState, useCallback } from "react";
import {
  Loader2,
  Download,
  Copy,
  CheckCircle2,
  FileCode,
  Shield,
  AlertCircle,
  CloudUpload,
} from "lucide-react";
import ToolUploadZone, { type UploadedFile } from "@/components/ToolUploadZone";
import { convertPdfToMarkdown } from "@/lib/pdf-to-markdown";

export default function PDFtoMarkdownPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [content, setContent] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [serverProcessing, setServerProcessing] = useState(false);
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [canServerFallback, setCanServerFallback] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pageCount, setPageCount] = useState<number | null>(null);

  const handleFilesSelected = useCallback((uploaded: UploadedFile[]) => {
    setFiles(uploaded);
    setContent(null);
    setError(null);
    setProgress(null);
    setCanServerFallback(false);
    setPageCount(null);
  }, []);

  const extractClientSide = async () => {
    if (files.length === 0) {
      setError("Please select a PDF.");
      return;
    }
    setProcessing(true);
    setError(null);
    setContent(null);
    setProgress(null);
    setCanServerFallback(false);

    const f = files[0].file;

    try {
      // 1. In-browser client extraction (100% private, zero server uploads)
      const res = await convertPdfToMarkdown(f, (current, total) => {
        setProgress({ current, total });
      });

      if (!res.markdown.trim()) {
        throw new Error(
          "No text extracted. Document may be scanned, image-only, or encrypted."
        );
      }

      setContent(res.markdown);
      setPageCount(res.pageCount);
    } catch (clientErr: any) {
      console.warn("Client-side markdown extraction failed:", clientErr);
      setError(
        clientErr.message ||
          "Client conversion could not extract text. The file might be scanned or image-only."
      );
      setCanServerFallback(true);
    } finally {
      setProcessing(false);
    }
  };

  const extractServerSideFallback = async () => {
    if (files.length === 0) return;
    setServerProcessing(true);
    setError(null);

    const f = files[0].file;

    try {
      const fd = new FormData();
      fd.append("file", f);
      const res = await fetch("/api/pdf/extract-markdown/", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `Server error ${res.status}`);
      setContent(data.content);
      setCanServerFallback(false);
    } catch (serverErr: any) {
      setError(serverErr.message || "Server extraction failed.");
    } finally {
      setServerProcessing(false);
    }
  };

  const copy = async () => {
    if (!content) return;
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const download = () => {
    if (!content || files.length === 0) return;
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = files[0].file.name.replace(/\.pdf$/i, "") + ".md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded-full px-3 py-1 mb-3">
          <Shield className="w-3.5 h-3.5" aria-hidden />
          Runs 100% in your browser · Zero server uploads
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          PDF to Markdown Converter
        </h1>
        <p className="mt-3 text-gray-600 leading-relaxed max-w-xl mx-auto text-base">
          Extract text and headings from PDFs into clean Markdown. Ready to copy into ChatGPT,
          Claude, Notion, or your developer docs.
        </p>
      </div>

      <ToolUploadZone
        accept=".pdf"
        multiple={false}
        maxSizeMB={50}
        onFilesSelected={handleFilesSelected}
        label="Drop a PDF here or click to choose"
        sublabel="Single PDF up to 50MB. Text-based PDFs work best."
      />

      {files.length > 0 && !content && (
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
                <span>Extracting & Formatting Markdown…</span>
                <span>
                  Page {progress.current} of {progress.total}
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
            onClick={extractClientSide}
            disabled={processing || serverProcessing}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 transition disabled:opacity-70 shadow-sm cursor-pointer"
          >
            {processing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                {progress && progress.total > 0
                  ? `Extracting page ${progress.current} of ${progress.total}…`
                  : "Extracting Markdown on your device…"}
              </>
            ) : (
              <>
                <FileCode className="w-4 h-4 text-emerald-400" />
                Extract to Markdown (.md)
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
                Want to try server conversion (Poppler engine)? This will upload your PDF securely.
              </p>
              <button
                onClick={extractServerSideFallback}
                disabled={serverProcessing}
                className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold shrink-0 cursor-pointer disabled:opacity-50"
              >
                {serverProcessing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Uploading & Extracting…
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

      {content && (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-semibold text-gray-900">Markdown Extracted</h2>
              <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                {content.length.toLocaleString()} chars · {content.split(/\s+/).filter(Boolean).length.toLocaleString()} words
                {pageCount ? ` · ${pageCount} pages` : ""}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={copy}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border bg-white text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                style={{ borderColor: "var(--color-border)" }}
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </>
                )}
              </button>
              <button
                onClick={download}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-sm cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Download .md
              </button>
            </div>
          </div>
          <pre className="text-xs leading-relaxed whitespace-pre-wrap font-mono max-h-[500px] overflow-y-auto p-4 rounded-xl bg-slate-900 text-slate-100 border border-slate-800">
            {content}
          </pre>
        </div>
      )}
    </div>
  );
}
