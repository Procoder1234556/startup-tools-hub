"use client";

// ponytail: Production-grade client-first PDF-to-Word (.docx) conversion.
// Zero remote uploads; instant client-side conversion with OpenXML generation and user-controlled server fallback.
import { useState, useCallback, useEffect } from "react";
import { Loader2, Download, FileText, Shield, CheckCircle2, AlertCircle, CloudUpload } from "lucide-react";
import ToolUploadZone, { type UploadedFile } from "@/components/ToolUploadZone";
import { convertPdfToDocx } from "@/lib/pdf-to-docx";

export default function PDFtoWordPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [processing, setProcessing] = useState(false);
  const [serverProcessing, setServerProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState<string>("converted.docx");
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
    setCanServerFallback(false);
    setDownloadUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });

    const f = files[0].file;
    const targetName = f.name.replace(/\.pdf$/i, ".docx") || "converted.docx";

    try {
      // 1. In-browser client conversion (100% private, zero server uploads)
      const res = await convertPdfToDocx(f);
      const url = URL.createObjectURL(res.blob);
      setDownloadUrl(url);
      setDownloadName(res.filename || targetName);
      setPageCount(res.pageCount);
    } catch (clientErr: any) {
      console.warn("Client-side conversion error:", clientErr);
      setError(
        clientErr.message ||
          "Client-side conversion could not extract text from this PDF (it may be scanned, image-only, or encrypted)."
      );
      // Give user explicit choice to fallback to server rather than secretly uploading
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
    const targetName = f.name.replace(/\.pdf$/i, ".docx") || "converted.docx";

    try {
      const fd = new FormData();
      fd.append("file", f);
      const serverRes = await fetch("/api/pdf/pdf-to-word/", { method: "POST", body: fd });
      if (!serverRes.ok) {
        const data = await serverRes.json().catch(() => ({}));
        throw new Error(data.error || `Server error ${serverRes.status}`);
      }
      const blob = await serverRes.blob();
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
          PDF to Word Converter
        </h1>
        <p className="mt-3 text-gray-600 leading-relaxed max-w-xl mx-auto text-base">
          Convert PDF documents into editable Word files (.docx). Preserves paragraphs, formatting,
          and structure with 100% client-side privacy.
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

      {files.length > 0 && (
        <div
          className="mt-6 rounded-2xl border bg-white p-5 shadow-sm space-y-4"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>{files[0].file.name}</span>
            <span>{(files[0].file.size / 1024).toFixed(1)} KB</span>
          </div>

          <button
            onClick={convertClientSide}
            disabled={processing || serverProcessing}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 transition disabled:opacity-70 shadow-sm cursor-pointer"
          >
            {processing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                Converting to Word on your device…
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 text-emerald-400" />
                Convert to Word (.docx)
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
                Want to try server conversion (LibreOffice engine)? This will upload your PDF securely.
              </p>
              <button
                onClick={convertServerSideFallback}
                disabled={serverProcessing}
                className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold shrink-0 cursor-pointer disabled:opacity-50"
              >
                {serverProcessing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Uploading & Converting…
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
            Conversion Complete! Word document ready.
          </div>
          {pageCount && (
            <p className="text-xs text-slate-600 font-mono">
              Successfully extracted and formatted {pageCount} pages into OpenXML DOCX.
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
