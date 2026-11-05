"use client";

import { useState, useCallback } from "react";
import { PDFDocument } from "pdf-lib";
import { Loader2, Download, ShieldCheck, Tag, RefreshCw, Eraser } from "lucide-react";
import ToolUploadZone, { type UploadedFile } from "@/components/ToolUploadZone";

interface PdfMeta {
  title: string;
  author: string;
  subject: string;
  keywords: string;
  creator: string;
  producer: string;
}

export default function MetadataEditorPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [meta, setMeta] = useState<PdfMeta>({
    title: "",
    author: "",
    subject: "",
    keywords: "",
    creator: "",
    producer: "",
  });
  const [originalMeta, setOriginalMeta] = useState<PdfMeta | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sanitizedNotice, setSanitizedNotice] = useState<boolean>(false);

  const handleFilesSelected = useCallback(async (uploaded: UploadedFile[]) => {
    setFiles(uploaded);
    setDownloadUrl(null);
    setError(null);
    setSanitizedNotice(false);

    if (uploaded.length > 0) {
      try {
        const buf = await uploaded[0].file.arrayBuffer();
        const pdf = await PDFDocument.load(buf, { ignoreEncryption: true });

        const extracted: PdfMeta = {
          title: pdf.getTitle() ?? "",
          author: pdf.getAuthor() ?? "",
          subject: pdf.getSubject() ?? "",
          keywords: pdf.getKeywords() ?? "",
          creator: pdf.getCreator() ?? "",
          producer: pdf.getProducer() ?? "",
        };

        setMeta(extracted);
        setOriginalMeta(extracted);
      } catch (err) {
        setError(err instanceof Error ? `Failed to read PDF metadata: ${err.message}` : "Failed to load PDF.");
      }
    } else {
      setOriginalMeta(null);
    }
  }, []);

  const stripAllMetadata = () => {
    setMeta({
      title: "",
      author: "",
      subject: "",
      keywords: "",
      creator: "",
      producer: "",
    });
    setSanitizedNotice(true);
    setDownloadUrl(null);
  };

  const resetToOriginal = () => {
    if (originalMeta) {
      setMeta(originalMeta);
      setSanitizedNotice(false);
      setDownloadUrl(null);
    }
  };

  const saveMetadata = async () => {
    if (files.length === 0) {
      setError("Please select a PDF document first.");
      return;
    }
    setProcessing(true);
    setError(null);

    try {
      const buf = await files[0].file.arrayBuffer();
      const pdf = await PDFDocument.load(buf, { ignoreEncryption: true });

      if (meta.title.trim()) pdf.setTitle(meta.title.trim());
      else pdf.setTitle("");

      if (meta.author.trim()) pdf.setAuthor(meta.author.trim());
      else pdf.setAuthor("");

      if (meta.subject.trim()) pdf.setSubject(meta.subject.trim());
      else pdf.setSubject("");

      if (meta.creator.trim()) pdf.setCreator(meta.creator.trim());
      else pdf.setCreator("");

      if (meta.producer.trim()) pdf.setProducer(meta.producer.trim());
      else pdf.setProducer("");

      const kwList = meta.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean);
      pdf.setKeywords(kwList);

      const outBytes = await pdf.save();
      const blob = new Blob([new Uint8Array(outBytes)], { type: "application/pdf" });
      setDownloadUrl(URL.createObjectURL(blob));
    } catch (err) {
      setError(err instanceof Error ? `Failed to update metadata: ${err.message}` : "Failed to update PDF.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">PDF Metadata Editor & Sanitizer</h1>
        <p className="mt-3 text-gray-600">
          View, edit, or wipe sensitive metadata (author, title, creator, producer) from any PDF before sharing.
        </p>
      </div>

      <ToolUploadZone
        accept=".pdf"
        multiple={false}
        maxSizeMB={150}
        onFilesSelected={handleFilesSelected}
        label="Drop PDF here to view or edit metadata"
        sublabel="Single PDF up to 150MB. Processed privately in your browser."
      />

      {files.length > 0 && originalMeta && (
        <div className="mt-8 space-y-6">
          <div className="rounded-2xl border bg-white p-6 shadow-sm border-gray-200">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100">
              <div>
                <p className="font-semibold text-gray-900">{files[0].file.name}</p>
                <p className="text-xs text-gray-500">
                  {(files[0].file.size / (1024 * 1024)).toFixed(2)} MB • Client-side inspection
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={stripAllMetadata}
                  className="px-3 py-1.5 rounded-lg border border-rose-200 bg-rose-50 text-xs font-medium text-rose-700 hover:bg-rose-100 flex items-center gap-1.5 transition"
                >
                  <Eraser className="w-3.5 h-3.5" />
                  Strip All Metadata (Sanitize)
                </button>
                <button
                  onClick={resetToOriginal}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-1.5 transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset
                </button>
              </div>
            </div>

            {sanitizedNotice && (
              <div className="mt-4 p-3 rounded-xl bg-amber-50 text-amber-800 text-xs border border-amber-200 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>All metadata fields cleared. Click &ldquo;Save &amp; Export PDF&rdquo; to download your sanitized document.</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Document Title
                </label>
                <input
                  type="text"
                  value={meta.title}
                  onChange={(e) => {
                    setMeta({ ...meta, title: e.target.value });
                    setDownloadUrl(null);
                  }}
                  placeholder="e.g., Pitch Deck Q3 2026"
                  className="w-full rounded-xl border border-gray-300 p-2.5 text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Author / Creator Name
                </label>
                <input
                  type="text"
                  value={meta.author}
                  onChange={(e) => {
                    setMeta({ ...meta, author: e.target.value });
                    setDownloadUrl(null);
                  }}
                  placeholder="e.g., Founders Team"
                  className="w-full rounded-xl border border-gray-300 p-2.5 text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={meta.subject}
                  onChange={(e) => {
                    setMeta({ ...meta, subject: e.target.value });
                    setDownloadUrl(null);
                  }}
                  placeholder="e.g., Series Seed Investment Memo"
                  className="w-full rounded-xl border border-gray-300 p-2.5 text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Keywords (comma-separated)
                </label>
                <input
                  type="text"
                  value={meta.keywords}
                  onChange={(e) => {
                    setMeta({ ...meta, keywords: e.target.value });
                    setDownloadUrl(null);
                  }}
                  placeholder="e.g., startup, pitch, seed, AI"
                  className="w-full rounded-xl border border-gray-300 p-2.5 text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Creator Application
                </label>
                <input
                  type="text"
                  value={meta.creator}
                  onChange={(e) => {
                    setMeta({ ...meta, creator: e.target.value });
                    setDownloadUrl(null);
                  }}
                  placeholder="e.g., Startup Tools Hub"
                  className="w-full rounded-xl border border-gray-300 p-2.5 text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  PDF Producer
                </label>
                <input
                  type="text"
                  value={meta.producer}
                  onChange={(e) => {
                    setMeta({ ...meta, producer: e.target.value });
                    setDownloadUrl(null);
                  }}
                  placeholder="e.g., pdf-lib engine"
                  className="w-full rounded-xl border border-gray-300 p-2.5 text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={saveMetadata}
                disabled={processing}
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition disabled:opacity-50"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Updating PDF...
                  </>
                ) : (
                  <>
                    <Tag className="w-5 h-5" />
                    Save &amp; Export PDF
                  </>
                )}
              </button>

              {downloadUrl && (
                <a
                  href={downloadUrl}
                  download={files[0].file.name.replace(/\.pdf$/i, "-meta.pdf")}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
                >
                  <Download className="w-5 h-5" />
                  Download Clean PDF
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
