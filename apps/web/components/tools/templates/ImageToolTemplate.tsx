"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  UploadCloud,
  ImageIcon,
  Download,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Sliders,
  Maximize2,
  Sparkles,
  ArrowRightLeft,
  Copy,
  Check,
  RefreshCw,
  Eye,
  ShieldCheck,
} from "lucide-react";
import { MarketplaceTool } from "@/lib/marketplace-tools";

interface ImageToolTemplateProps {
  tool: MarketplaceTool;
}

export default function ImageToolTemplate({ tool }: ImageToolTemplateProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<{
    name: string;
    size: number;
    width: number;
    height: number;
    type: string;
  } | null>(null);

  const [quality, setQuality] = useState<number>(80);
  const [targetWidth, setTargetWidth] = useState<number>(800);
  const [targetHeight, setTargetHeight] = useState<number>(600);
  const [keepAspect, setKeepAspect] = useState<boolean>(true);
  const [format, setFormat] = useState<"image/jpeg" | "image/png" | "image/webp">("image/jpeg");

  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [processedSize, setProcessedSize] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [aspectRatio, setAspectRatio] = useState<number>(1);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const ar = img.naturalWidth / img.naturalHeight;
        setAspectRatio(ar);
        setOriginalFile({
          name: file.name,
          size: file.size,
          width: img.naturalWidth,
          height: img.naturalHeight,
          type: file.type,
        });
        setTargetWidth(img.naturalWidth);
        setTargetHeight(img.naturalHeight);
        setImageSrc(src);

        // Pre-configure format based on tool
        if (tool.slug.includes("png-to-jpg")) {
          setFormat("image/jpeg");
        } else if (tool.slug.includes("jpg-to-png")) {
          setFormat("image/png");
        }
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  // Re-process on configuration change
  useEffect(() => {
    if (!imageSrc || !originalFile) return;

    setIsProcessing(true);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Fill white background for JPEGs
      if (format === "image/jpeg") {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            if (processedUrl) URL.revokeObjectURL(processedUrl);
            const url = URL.createObjectURL(blob);
            setProcessedUrl(url);
            setProcessedSize(blob.size);
          }
          setIsProcessing(false);
        },
        format,
        quality / 100
      );
    };
    img.src = imageSrc;
  }, [imageSrc, targetWidth, targetHeight, quality, format]);

  const handleWidthChange = (w: number) => {
    setTargetWidth(w);
    if (keepAspect && aspectRatio > 0) {
      setTargetHeight(Math.round(w / aspectRatio));
    }
  };

  const handleHeightChange = (h: number) => {
    setTargetHeight(h);
    if (keepAspect && aspectRatio > 0) {
      setTargetWidth(Math.round(h * aspectRatio));
    }
  };

  const copyImage = async () => {
    if (!processedUrl) return;
    try {
      const response = await fetch(processedUrl);
      const blob = await response.blob();
      // PNG is universally supported for clipboard write
      await navigator.clipboard.write([
        new ClipboardItem({
          "image/png": blob,
        }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      navigator.clipboard.writeText(processedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const clearImage = () => {
    if (processedUrl) URL.revokeObjectURL(processedUrl);
    setImageSrc(null);
    setOriginalFile(null);
    setProcessedUrl(null);
    setProcessedSize(null);
  };

  return (
    <div className="flex flex-col">
      {!imageSrc ? (
        /* ── Upload State ── */
        <div className="p-8 sm:p-14">
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files?.[0]) {
                handleImageUpload(e.dataTransfer.files[0]);
              }
            }}
            className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-10 sm:p-16 text-center hover:border-[#2563EB] hover:bg-blue-50/20 cursor-pointer transition-all"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) handleImageUpload(e.target.files[0]);
              }}
            />
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-[#2563EB] mb-4 shadow-xs">
              <UploadCloud className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A]">
              Drop an image here or click to browse
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-[#64748B] max-w-md">
              Supports JPG, PNG, WEBP, GIF and SVG. 100% processed in your browser memory.
            </p>
            <div className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-[#2563EB] px-4 py-2.5 text-xs font-semibold text-white shadow-xs">
              <ImageIcon className="h-4 w-4" />
              Choose Photo
            </div>
          </div>
        </div>
      ) : (
        /* ── Active Editor State ── */
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#E2E8F0]">
          {/* Left Column: Image Controls (5 Cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 space-y-6 bg-[#F8FAFC]/50">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                <Sliders className="h-4 w-4 text-[#2563EB]" />
                Image Adjustments
              </h3>
              <button
                onClick={clearImage}
                className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:underline"
              >
                <Trash2 className="h-3 w-3" />
                Change Image
              </button>
            </div>

            {/* Quality Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-[#0F172A]">
                <span>Compression Quality:</span>
                <span className="font-mono text-[#2563EB] font-bold">{quality}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full accent-[#2563EB]"
              />
              <div className="flex justify-between text-[10px] text-[#64748B]">
                <span>Smallest File</span>
                <span>Balanced</span>
                <span>Max Fidelity</span>
              </div>
            </div>

            {/* Dimensions Control */}
            <div className="space-y-3 pt-2 border-t border-[#E2E8F0]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#0F172A]">
                  Output Dimensions:
                </label>
                <label className="flex items-center gap-1.5 text-xs text-[#475569] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={keepAspect}
                    onChange={(e) => setKeepAspect(e.target.checked)}
                    className="rounded text-[#2563EB]"
                  />
                  Lock Ratio
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-[11px] text-[#64748B]">Width (px)</span>
                  <input
                    type="number"
                    value={targetWidth}
                    onChange={(e) => handleWidthChange(Number(e.target.value))}
                    className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs font-semibold outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] text-[#64748B]">Height (px)</span>
                  <input
                    type="number"
                    value={targetHeight}
                    onChange={(e) => handleHeightChange(Number(e.target.value))}
                    className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs font-semibold outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>
            </div>

            {/* Format Selection */}
            <div className="space-y-2 pt-2 border-t border-[#E2E8F0]">
              <label className="text-xs font-semibold text-[#0F172A]">
                Target File Format:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "JPG", val: "image/jpeg" },
                  { label: "PNG", val: "image/png" },
                  { label: "WEBP", val: "image/webp" },
                ].map((fmt) => (
                  <button
                    key={fmt.val}
                    onClick={() => setFormat(fmt.val as any)}
                    className={`rounded-lg border py-2 text-xs font-semibold uppercase transition-all ${
                      format === fmt.val
                        ? "border-[#2563EB] bg-blue-50 text-[#2563EB] shadow-xs"
                        : "border-[#E2E8F0] bg-white text-[#475569] hover:bg-[#F1F5F9]"
                    }`}
                  >
                    {fmt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2">
              {processedUrl && (
                <a
                  href={processedUrl}
                  download={`optimized-${originalFile?.name || "image"}.${format.split("/")[1]}`}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#1D4ED8] transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Download Processed Image
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Live Comparison & Preview (7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-white space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
                <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
                  <Eye className="h-4 w-4 text-[#2563EB]" />
                  Processed Preview
                </h3>

                <button
                  onClick={copyImage}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs font-semibold text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#16A34A]" />
                      <span className="text-[#16A34A]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-[#64748B]" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Image Preview Canvas Area */}
              <div className="relative flex items-center justify-center rounded-xl border border-[#E2E8F0] bg-[#0B1220]/5 p-4 min-h-[340px] max-h-[460px] overflow-hidden">
                {processedUrl ? (
                  <img
                    src={processedUrl}
                    alt="Optimized Preview"
                    className="max-h-[380px] max-w-full object-contain rounded shadow-xs"
                  />
                ) : (
                  <div className="text-xs text-[#64748B]">Processing image...</div>
                )}
              </div>

              {/* File Stats Comparison */}
              {originalFile && processedSize && (
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5 text-center">
                    <div className="text-[11px] text-[#64748B] font-medium">Original</div>
                    <div className="text-sm font-bold text-[#0F172A] mt-0.5">
                      {formatFileSize(originalFile.size)}
                    </div>
                    <div className="text-[10px] text-[#64748B]">
                      {originalFile.width} × {originalFile.height}
                    </div>
                  </div>

                  <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-3.5 text-center">
                    <div className="text-[11px] text-[#2563EB] font-medium">Optimized</div>
                    <div className="text-sm font-bold text-[#0F172A] mt-0.5">
                      {formatFileSize(processedSize)}
                    </div>
                    <div className="text-[10px] text-[#64748B]">
                      {targetWidth} × {targetHeight}
                    </div>
                  </div>

                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3.5 text-center">
                    <div className="text-[11px] text-emerald-700 font-medium">Saved</div>
                    <div className="text-sm font-bold text-emerald-700 mt-0.5">
                      {originalFile.size > processedSize
                        ? `${Math.round(
                            ((originalFile.size - processedSize) / originalFile.size) *
                              100
                          )}%`
                        : "0%"}
                    </div>
                    <div className="text-[10px] text-emerald-600">Reduction</div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-[#64748B] pt-4 border-t border-[#F1F5F9]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>Zero Uploads — Rendered on GPU Canvas</span>
              </div>
              <span>Ready for Web</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
