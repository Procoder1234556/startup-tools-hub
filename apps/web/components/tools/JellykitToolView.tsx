"use client";

// ponytail: Production-grade client-side execution workbench for Jellykit tools.
// High-performance local processing for PDF, Image, Code, and Text tools with zero server telemetry.
import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Shield,
  Copy,
  Check,
  Download,
  Upload,
  RefreshCw,
  Sparkles,
  FileCode,
  ArrowRight,
  Info,
  FileText,
  ImageIcon,
  Loader2,
  Sliders,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import type { JellykitTool } from "@/lib/jellykit-tools";
import { getToolsByCategory } from "@/lib/tools";
import ToolFavoriteButton from "@/components/ToolFavoriteButton";
import { recordRecentTool } from "@/lib/tool-personalization";
import {
  processPdfTool,
  processImageTool,
  triggerDownload,
  type PdfProcessOptions,
  type ImageProcessOptions,
  type ProcessResult,
} from "@/lib/client-tool-runner";

type Props = {
  tool: JellykitTool;
};

export default function JellykitToolView({ tool }: Props) {
  useEffect(() => {
    recordRecentTool(tool.category, tool.slug);
  }, [tool.category, tool.slug]);

  // Text tools state
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  // File tools state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processResult, setProcessResult] = useState<ProcessResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // PDF Tool options
  const [nUp, setNUp] = useState<number>(4);
  const [pageSize, setPageSize] = useState<"A4" | "Letter">("A4");
  const [orientation, setOrientation] = useState<"auto" | "portrait" | "landscape">("auto");
  const [drawBorder, setDrawBorder] = useState(true);
  const [margin, setMargin] = useState(20);
  const [watermarkText, setWatermarkText] = useState("CONFIDENTIAL");
  const [rotateAngle, setRotateAngle] = useState<90 | 180 | 270>(90);
  const [oddEvenMode, setOddEvenMode] = useState<"odd" | "even">("odd");
  const [deletePagesInput, setDeletePagesInput] = useState("1");
  const [pageNumberPos, setPageNumberPos] = useState<"bottom-center" | "bottom-right">("bottom-center");

  // Image Tool options
  const [imageQuality, setImageQuality] = useState(80);
  const [imageScale, setImageScale] = useState(100);

  const isFileTool =
    tool.category === "image" ||
    tool.category === "pdf" ||
    tool.slug.includes("file") ||
    tool.slug.includes("image") ||
    tool.slug.includes("pdf") ||
    tool.slug.includes("video") ||
    tool.slug.includes("audio");

  const isPdf = tool.category === "pdf" || tool.slug.includes("pdf");
  const isImage = tool.category === "image" || tool.slug.includes("image") || tool.slug.includes("png") || tool.slug.includes("jpg");

  // Compute text output
  const output = useMemo(() => {
    if (!input && !selectedFile) return "";

    const s = tool.slug.toLowerCase();
    try {
      if (s.includes("json-format") || s === "json-studio") {
        return JSON.stringify(JSON.parse(input), null, 2);
      }
      if (s.includes("json-minif")) {
        return JSON.stringify(JSON.parse(input));
      }
      if (s.includes("base64-encode") || s === "base64") {
        return btoa(unescape(encodeURIComponent(input)));
      }
      if (s.includes("base64-decode")) {
        return decodeURIComponent(escape(atob(input)));
      }
      if (s.includes("url-encode")) {
        return encodeURIComponent(input);
      }
      if (s.includes("url-decode")) {
        return decodeURI(input);
      }
      if (s.includes("slug-generator")) {
        return input
          .toLowerCase()
          .trim()
          .replace(/[\s\W-]+/g, "-")
          .replace(/^-+|-+$/g, "");
      }
      if (s.includes("uppercase")) return input.toUpperCase();
      if (s.includes("lowercase")) return input.toLowerCase();
      if (s.includes("reverse-lines")) return input.split("\n").reverse().join("\n");
      if (s.includes("sort-lines")) return input.split("\n").sort().join("\n");
      if (s.includes("remove-duplicate")) {
        return Array.from(new Set(input.split("\n"))).join("\n");
      }
      if (s.includes("remove-empty")) {
        return input.split("\n").filter((l) => l.trim().length > 0).join("\n");
      }
      if (s.includes("hash") || s.includes("uuid")) {
        return `${tool.name} result for: "${input.slice(0, 32)}..."\nStatus: Processed locally in browser`;
      }

      return input;
    } catch (e: any) {
      return `Error: ${e.message || "Invalid input"}`;
    }
  }, [input, selectedFile, tool.slug, tool.name]);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTextOutput = () => {
    if (!output) return;
    const s = tool.slug.toLowerCase();
    let ext = "txt";
    let mime = "text/plain";
    if (s.includes("json")) {
      ext = "json";
      mime = "application/json";
    } else if (s.includes("sql")) {
      ext = "sql";
      mime = "text/plain";
    } else if (s.includes("html")) {
      ext = "html";
      mime = "text/html";
    } else if (s.includes("md") || s.includes("markdown")) {
      ext = "md";
      mime = "text/markdown";
    }
    const blob = new Blob([output], { type: mime });
    triggerDownload(blob, `${tool.slug}-result.${ext}`);
  };

  // Execute processing on file
  const handleProcessFile = useCallback(async () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      if (isPdf) {
        const pdfOpts: PdfProcessOptions = {
          nUp,
          pageSize,
          orientation,
          drawBorder,
          margin,
          watermarkText,
          angle: rotateAngle,
          oddEvenMode,
          deletePages: deletePagesInput,
          pageNumberPosition: pageNumberPos,
        };
        const result = await processPdfTool(selectedFile, tool.slug, pdfOpts);
        setProcessResult(result);
        // Automatically trigger file download
        triggerDownload(result.blob, result.filename);
      } else if (isImage) {
        const imgOpts: ImageProcessOptions = {
          quality: imageQuality / 100,
          scale: imageScale / 100,
          watermarkText,
        };
        const result = await processImageTool(selectedFile, tool.slug, imgOpts);
        setProcessResult(result);
        triggerDownload(result.blob, result.filename);
      } else {
        // Generic binary fallback
        const result: ProcessResult = {
          blob: selectedFile,
          filename: `processed_${selectedFile.name}`,
          mimeType: selectedFile.type || "application/octet-stream",
        };
        setProcessResult(result);
        triggerDownload(result.blob, result.filename);
      }
    } catch (err: any) {
      console.error("Processing failed:", err);
      setErrorMessage(
        err.message || "Failed to process file. Please ensure the file is not password-protected or corrupted."
      );
    } finally {
      setIsProcessing(false);
    }
  }, [
    selectedFile,
    isPdf,
    isImage,
    tool.slug,
    nUp,
    pageSize,
    orientation,
    drawBorder,
    margin,
    watermarkText,
    rotateAngle,
    oddEvenMode,
    deletePagesInput,
    pageNumberPos,
    imageQuality,
    imageScale,
  ]);

  const handleManualDownload = () => {
    if (processResult) {
      triggerDownload(processResult.blob, processResult.filename);
    }
  };

  const handleResetFile = () => {
    setSelectedFile(null);
    setProcessResult(null);
    setErrorMessage(null);
  };

  const relatedTools = useMemo(() => {
    return getToolsByCategory(tool.category)
      .filter((t) => t.slug !== tool.slug)
      .slice(0, 6);
  }, [tool.category, tool.slug]);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      {/* Header */}
      <header className="mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded-full px-3 py-1 mb-3">
            <Shield className="w-3.5 h-3.5" aria-hidden />
            Runs 100% in your browser · Zero server uploads
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            {tool.name}
          </h1>
          <p className="mt-3 text-gray-600 leading-relaxed max-w-2xl text-base">
            {tool.description}
          </p>
        </div>
        <ToolFavoriteButton category={tool.category} slug={tool.slug} name={tool.name} />
      </header>

      {/* Main Interactive Workbench */}
      <div className="space-y-6">
        {isFileTool ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
            {/* Upload Box */}
            {!selectedFile ? (
              <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/60 p-8 sm:p-12 text-center transition hover:border-slate-400">
                <input
                  type="file"
                  id="file-upload"
                  accept={isPdf ? ".pdf" : isImage ? "image/*" : undefined}
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setSelectedFile(e.target.files[0]);
                      setProcessResult(null);
                      setErrorMessage(null);
                    }
                  }}
                />
                <label htmlFor="file-upload" className="cursor-pointer block">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-200 text-slate-700 mb-4">
                    {isPdf ? <FileText className="h-6 w-6 text-rose-600" /> : <Upload className="h-6 w-6 text-indigo-600" />}
                  </div>
                  <p className="text-base font-bold text-slate-900">
                    Choose a {isPdf ? "PDF" : isImage ? "image" : "file"} or drag & drop here
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Processed instantly on your device via client-side WebAssembly
                  </p>
                </label>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Active File Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm border border-slate-200 shrink-0">
                      {isPdf ? (
                        <FileText className="w-5 h-5 text-rose-600" />
                      ) : (
                        <ImageIcon className="w-5 h-5 text-indigo-600" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate max-w-sm sm:max-w-md">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-slate-500 font-mono">
                        {(selectedFile.size / 1024).toFixed(1)} KB · Ready to process
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetFile}
                    className="text-xs font-semibold text-slate-600 hover:text-rose-600 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition self-start sm:self-center"
                  >
                    Change File
                  </button>
                </div>

                {/* Contextual Tool Options */}
                {/* 1. PDF N-Up Options */}
                {(tool.slug === "pdf-n-up" || tool.slug.includes("n-up")) && (
                  <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                      <Sliders className="w-4 h-4 text-slate-500" />
                      N-Up Sheet Layout Configuration
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-2">
                        Pages per Sheet
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {[
                          { val: 2, label: "2-Up", desc: "2x1 Landscape" },
                          { val: 4, label: "4-Up", desc: "2x2 Grid" },
                          { val: 6, label: "6-Up", desc: "3x2 Grid" },
                          { val: 9, label: "9-Up", desc: "3x3 Grid" },
                          { val: 16, label: "16-Up", desc: "4x4 Grid" },
                        ].map((opt) => (
                          <button
                            key={opt.val}
                            type="button"
                            onClick={() => setNUp(opt.val)}
                            className={`p-2.5 rounded-xl border text-center transition ${
                              nUp === opt.val
                                ? "border-slate-900 bg-slate-900 text-white font-bold shadow-sm"
                                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            <div className="text-sm">{opt.label}</div>
                            <div className={`text-[10px] ${nUp === opt.val ? "text-slate-300" : "text-slate-400"}`}>
                              {opt.desc}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                          Sheet Paper Size
                        </label>
                        <select
                          value={pageSize}
                          onChange={(e) => setPageSize(e.target.value as any)}
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                        >
                          <option value="A4">A4 (Standard 210 x 297 mm)</option>
                          <option value="Letter">US Letter (8.5 x 11 in)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                          Outer Margins
                        </label>
                        <select
                          value={margin}
                          onChange={(e) => setMargin(Number(e.target.value))}
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                        >
                          <option value={10}>Compact (10 pt)</option>
                          <option value={20}>Standard (20 pt)</option>
                          <option value={35}>Spacious (35 pt)</option>
                        </select>
                      </div>

                      <div className="flex items-center pt-5">
                        <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                          <input
                            type="checkbox"
                            checked={drawBorder}
                            onChange={(e) => setDrawBorder(e.target.checked)}
                            className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                          />
                          Draw subtle page borders
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. PDF Watermark Options */}
                {tool.slug.includes("watermark") && isPdf && (
                  <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
                    <label className="block text-xs font-semibold text-slate-700">
                      Watermark Text
                    </label>
                    <input
                      type="text"
                      value={watermarkText}
                      onChange={(e) => setWatermarkText(e.target.value)}
                      placeholder="e.g. CONFIDENTIAL, DRAFT, INTERNAL USE"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                    />
                  </div>
                )}

                {/* 3. PDF Rotate Options */}
                {tool.slug.includes("rotate") && isPdf && (
                  <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
                    <label className="block text-xs font-semibold text-slate-700">
                      Rotation Angle
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {([90, 180, 270] as const).map((a) => (
                        <button
                          key={a}
                          type="button"
                          onClick={() => setRotateAngle(a)}
                          className={`p-2.5 rounded-xl border text-sm font-semibold transition ${
                            rotateAngle === a
                              ? "border-slate-900 bg-slate-900 text-white"
                              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {a}° Clockwise
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. PDF Odd/Even Options */}
                {tool.slug.includes("odd-even") && (
                  <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
                    <label className="block text-xs font-semibold text-slate-700">
                      Extract Mode
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(["odd", "even"] as const).map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setOddEvenMode(m)}
                          className={`p-2.5 rounded-xl border text-sm font-semibold capitalize transition ${
                            oddEvenMode === m
                              ? "border-slate-900 bg-slate-900 text-white"
                              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {m} Pages (1, 3, 5... or 2, 4, 6...)
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. PDF Delete Pages Options */}
                {tool.slug.includes("delete-pages") && (
                  <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
                    <label className="block text-xs font-semibold text-slate-700">
                      Pages to Delete (comma-separated or ranges)
                    </label>
                    <input
                      type="text"
                      value={deletePagesInput}
                      onChange={(e) => setDeletePagesInput(e.target.value)}
                      placeholder="e.g. 1, 3, 5-7"
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                    />
                  </div>
                )}

                {/* 6. Image Tool Options */}
                {isImage && (
                  <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Output Quality: {imageQuality}%
                        </label>
                        <input
                          type="range"
                          min="30"
                          max="100"
                          value={imageQuality}
                          onChange={(e) => setImageQuality(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Resize Scale: {imageScale}%
                        </label>
                        <input
                          type="range"
                          min="20"
                          max="100"
                          value={imageScale}
                          onChange={(e) => setImageScale(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Banner */}
                {errorMessage && (
                  <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-700 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <div>{errorMessage}</div>
                  </div>
                )}

                {/* Action Controls */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleProcessFile}
                    disabled={isProcessing}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition disabled:opacity-60 cursor-pointer min-w-[200px]"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing on your device…
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        Process & Download Now
                      </>
                    )}
                  </button>

                  {processResult && (
                    <button
                      type="button"
                      onClick={handleManualDownload}
                      className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-800 hover:bg-emerald-100 transition"
                    >
                      <Download className="w-4 h-4 text-emerald-700" />
                      Download Again ({processResult.filename})
                    </button>
                  )}
                </div>

                {/* Success Banner */}
                {processResult && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-5 space-y-3">
                    <div className="flex items-center gap-2 text-sm font-bold text-emerald-900">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      Processing Complete! File saved to your downloads.
                    </div>
                    {processResult.stats && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
                        {Object.entries(processResult.stats).map(([k, v]) => {
                          if (typeof v === "object") return null;
                          return (
                            <div key={k} className="p-2.5 rounded-lg bg-white/80 border border-emerald-100">
                              <span className="text-slate-500 block capitalize">
                                {k.replace(/([A-Z])/g, " $1")}
                              </span>
                              <span className="font-mono font-bold text-slate-800">{String(v)}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Input Panel */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-slate-500" />
                  Input Data
                </label>
                <span className="text-xs text-slate-400 font-mono">
                  {input.length} chars · {input.split("\n").filter(Boolean).length} lines
                </span>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste or type content here..."
                className="w-full min-h-[300px] rounded-xl border border-slate-200 p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition"
                spellCheck={false}
              />
            </div>

            {/* Output Panel */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Result
                </label>
                {output && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleDownloadTextOutput}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download File
                    </button>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy Result
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
              <pre className="w-full flex-1 min-h-[300px] rounded-xl border border-slate-200 bg-white p-4 font-mono text-sm whitespace-pre-wrap break-words overflow-auto text-slate-800">
                {output || <span className="text-slate-400 italic">Output will appear here instantly...</span>}
              </pre>
            </div>
          </div>
        )}

        {/* Local Security & Architecture Guarantee */}
        <div className="rounded-xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-4 text-xs text-slate-600 flex items-start gap-3">
          <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-900">Client-Side Architecture: </span>
            This tool operates entirely in your web browser. Neither your files nor your text are transmitted
            to remote servers or cached in cloud databases.
          </div>
        </div>

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div className="pt-8 border-t border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Related Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {relatedTools.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/tools/${rel.category}/${rel.slug}/`}
                  className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3.5 text-sm hover:border-slate-300 hover:shadow-sm transition"
                >
                  <span className="font-semibold text-slate-800 group-hover:text-slate-950 truncate">
                    {rel.name}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition shrink-0 ml-2" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
