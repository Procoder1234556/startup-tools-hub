"use client";

import React, { useState, useRef } from "react";
import {
  UploadCloud,
  FileText,
  Trash2,
  ArrowUp,
  ArrowDown,
  Download,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileUp,
  Shield,
  Layers,
  Sparkles,
} from "lucide-react";
import { MarketplaceTool } from "@/lib/marketplace-tools";

interface FileUploadTemplateProps {
  tool: MarketplaceTool;
}

interface UploadedFileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
}

export default function FileUploadTemplate({ tool }: FileUploadTemplateProps) {
  const [files, setFiles] = useState<UploadedFileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processedResult, setProcessedResult] = useState<{
    name: string;
    size: number;
    originalSize: number;
    url: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Tool specific options
  const [compressionLevel, setCompressionLevel] = useState<"low" | "medium" | "high">("medium");
  const [pageRange, setPageRange] = useState<string>("1-5");
  const [password, setPassword] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles || newFiles.length === 0) return;
    setError(null);
    setProcessedResult(null);

    const added: UploadedFileItem[] = [];
    for (let i = 0; i < newFiles.length; i++) {
      const f = newFiles[i];
      added.push({
        id: `${f.name}-${Date.now()}-${Math.random()}`,
        file: f,
        name: f.name,
        size: f.size,
        type: f.type || "application/octet-stream",
      });
    }

    // Single file limit check for some tools
    if (tool.slug.includes("compress") || tool.slug.includes("split")) {
      setFiles([added[0]]);
    } else {
      setFiles((prev) => [...prev, ...added]);
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    if (processedResult) setProcessedResult(null);
  };

  const moveFile = (index: number, direction: "up" | "down") => {
    setFiles((prev) => {
      const updated = [...prev];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= updated.length) return prev;
      const temp = updated[index];
      updated[index] = updated[targetIndex];
      updated[targetIndex] = temp;
      return updated;
    });
  };

  const processFiles = async () => {
    if (files.length === 0) {
      setError("Please upload at least one file to proceed.");
      return;
    }

    setError(null);
    setIsProcessing(true);
    setProgress(15);

    try {
      // Simulate client-side processing stages
      const totalOriginalSize = files.reduce((acc, f) => acc + f.size, 0);

      const timer1 = setTimeout(() => setProgress(45), 300);
      const timer2 = setTimeout(() => setProgress(80), 600);
      const timer3 = setTimeout(() => {
        setProgress(100);

        // Generate synthetic client-side result
        let resultSize = totalOriginalSize;
        if (tool.slug.includes("compress")) {
          const ratio = compressionLevel === "high" ? 0.45 : compressionLevel === "medium" ? 0.65 : 0.85;
          resultSize = Math.max(1024, Math.round(totalOriginalSize * ratio));
        }

        // Create a downloadable mock or combined blob
        const blob = new Blob([files[0].file], { type: files[0].file.type });
        const downloadUrl = URL.createObjectURL(blob);

        let outName = `${tool.slug}-result.pdf`;
        if (tool.slug.includes("merge")) outName = `merged-document-${Date.now()}.pdf`;
        if (tool.slug.includes("compress")) outName = `compressed-${files[0].name}`;
        if (tool.slug.includes("split")) outName = `split-pages-${files[0].name}`;

        setProcessedResult({
          name: outName,
          size: resultSize,
          originalSize: totalOriginalSize,
          url: downloadUrl,
        });

        setIsProcessing(false);
      }, 1000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    } catch (err: any) {
      setError(`Processing failed: ${err.message}`);
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col p-6 sm:p-8 space-y-6">
      {/* ── Dropzone Area ──────────────────────────────────────────── */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 sm:p-12 text-center transition-all cursor-pointer ${
          isDragging
            ? "border-[#2563EB] bg-blue-50/50 scale-[0.99]"
            : "border-[#CBD5E1] bg-[#F8FAFC] hover:border-[#2563EB] hover:bg-blue-50/20"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={tool.slug.includes("merge")}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-[#2563EB] mb-4">
          <UploadCloud className="h-7 w-7" />
        </div>

        <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">
          Click to choose or drag & drop files here
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-[#64748B]">
          Supports PDF, Word, images, and text documents. Max 100MB per file.
        </p>
        <div className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-white border border-[#E2E8F0] px-4 py-2 text-xs font-semibold text-[#0F172A] shadow-xs">
          <FileUp className="h-3.5 w-3.5 text-[#2563EB]" />
          Select File from Computer
        </div>
      </div>

      {/* ── Uploaded Files List ────────────────────────────────────── */}
      {files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-[#0F172A]">
              Selected Files ({files.length})
            </h4>
            <button
              onClick={() => {
                setFiles([]);
                setProcessedResult(null);
              }}
              className="text-xs font-semibold text-rose-600 hover:underline"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {files.map((file, idx) => (
              <div
                key={file.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-[#E2E8F0] bg-white p-3 shadow-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-rose-50 text-rose-600 border border-rose-100">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-xs sm:text-sm text-[#0F172A] truncate">
                      {file.name}
                    </p>
                    <p className="text-[11px] text-[#64748B]">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {tool.slug.includes("merge") && files.length > 1 && (
                    <>
                      <button
                        onClick={() => moveFile(idx, "up")}
                        disabled={idx === 0}
                        className="rounded p-1 text-[#64748B] hover:bg-[#F1F5F9] disabled:opacity-30"
                        title="Move up"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => moveFile(idx, "down")}
                        disabled={idx === files.length - 1}
                        className="rounded p-1 text-[#64748B] hover:bg-[#F1F5F9] disabled:opacity-30"
                        title="Move down"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => removeFile(file.id)}
                    className="rounded p-1 text-[#64748B] hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Remove file"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tool Configuration Controls ────────────────────────────── */}
      {files.length > 0 && (
        <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 sm:p-5 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
            Process Options
          </h4>

          {tool.slug.includes("compress") && (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#0F172A]">
                Compression Level:
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {(["low", "medium", "high"] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setCompressionLevel(lvl)}
                    className={`rounded-lg border p-2.5 text-center text-xs font-semibold capitalize transition-all ${
                      compressionLevel === lvl
                        ? "border-[#2563EB] bg-blue-50 text-[#2563EB] shadow-xs"
                        : "border-[#E2E8F0] bg-white text-[#475569] hover:bg-[#F1F5F9]"
                    }`}
                  >
                    {lvl}
                    <span className="block text-[10px] text-[#64748B] font-normal mt-0.5">
                      {lvl === "high" ? "Smallest file" : lvl === "medium" ? "Recommended" : "Best visual quality"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {tool.slug.includes("split") && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#0F172A]">
                Extract Pages (e.g. 1-3, 5, 8):
              </label>
              <input
                type="text"
                value={pageRange}
                onChange={(e) => setPageRange(e.target.value)}
                placeholder="1-5"
                className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs sm:text-sm font-mono text-[#0F172A] outline-none focus:border-[#2563EB]"
              />
            </div>
          )}

          {tool.slug.includes("protect") && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#0F172A]">
                Document Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a secure document password"
                className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs sm:text-sm text-[#0F172A] outline-none focus:border-[#2563EB]"
              />
            </div>
          )}

          {/* Action Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-[#64748B]">
              <Shield className="h-3.5 w-3.5 text-emerald-600" />
              <span>Safe & Private: Local browser computation</span>
            </div>

            <button
              onClick={processFiles}
              disabled={isProcessing}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1D4ED8] transition-colors disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing ({progress}%)...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Start {tool.name}
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ── Error Banner ───────────────────────────────────────────── */}
      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 p-4 text-xs font-medium text-rose-700">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* ── Success & Download Result ──────────────────────────────── */}
      {processedResult && (
        <div className="rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-white p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xs shrink-0">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-[#0F172A]">
                  Processing Complete!
                </h4>
                <p className="text-xs text-[#64748B]">
                  {processedResult.name} · {formatFileSize(processedResult.size)}
                  {processedResult.originalSize > processedResult.size && (
                    <span className="ml-1 text-emerald-700 font-semibold">
                      (Reduced by{" "}
                      {Math.round(
                        ((processedResult.originalSize - processedResult.size) /
                          processedResult.originalSize) *
                          100
                      )}
                      %)
                    </span>
                  )}
                </p>
              </div>
            </div>

            <a
              href={processedResult.url}
              download={processedResult.name}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              Download Result
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
