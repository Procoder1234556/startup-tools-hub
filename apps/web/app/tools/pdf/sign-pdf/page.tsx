"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { PDFDocument } from "pdf-lib";
import {
  Loader2,
  Download,
  PenTool,
  Type,
  Upload as UploadIcon,
  Eraser,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import ToolUploadZone, { type UploadedFile } from "@/components/ToolUploadZone";

type SignatureMode = "draw" | "type" | "upload";
type PlacementPosition = "bottom-right" | "bottom-left" | "bottom-center" | "top-right" | "center";

export default function SignPDFPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [mode, setMode] = useState<SignatureMode>("draw");
  const [typedName, setTypedName] = useState<string>("Jane Doe");
  const [uploadedSigFile, setUploadedSigFile] = useState<File | null>(null);
  const [uploadedSigUrl, setUploadedSigUrl] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [targetPageMode, setTargetPageMode] = useState<"last" | "first" | "custom">("last");
  const [customPage, setCustomPage] = useState<number>(1);
  const [position, setPosition] = useState<PlacementPosition>("bottom-right");
  const [includeDate, setIncludeDate] = useState<boolean>(true);
  const [dateStr, setDateStr] = useState<string>(() => new Date().toISOString().split("T")[0]);
  const [sigWidth, setSigWidth] = useState<number>(160);
  const [processing, setProcessing] = useState<boolean>(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Canvas drawing ref & state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef<boolean>(false);
  const hasDrawn = useRef<boolean>(false);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  useEffect(() => {
    if (mode === "draw") {
      initCanvas();
    }
  }, [mode, initCanvas]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hasDrawn.current = false;
    setDownloadUrl(null);
  };

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    isDrawing.current = true;
    hasDrawn.current = true;
    setDownloadUrl(null);

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDraw = () => {
    isDrawing.current = false;
  };

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

  const handleSigUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedSigFile(file);
      setUploadedSigUrl(URL.createObjectURL(file));
      setDownloadUrl(null);
    }
  };

  // Convert current signature (canvas, typed text, or uploaded image) to PNG Uint8Array
  const getSignaturePngBytes = async (): Promise<Uint8Array> => {
    const offscreen = document.createElement("canvas");
    offscreen.width = 400;
    offscreen.height = 160;
    const ctx = offscreen.getContext("2d");
    if (!ctx) throw new Error("Could not create canvas context");

    if (mode === "draw") {
      const srcCanvas = canvasRef.current;
      if (!srcCanvas || !hasDrawn.current) {
        throw new Error("Please draw a signature first.");
      }
      ctx.drawImage(srcCanvas, 0, 0, offscreen.width, offscreen.height);
    } else if (mode === "type") {
      if (!typedName.trim()) throw new Error("Please enter your name to sign.");
      ctx.fillStyle = "#0f172a";
      ctx.font = "italic 44px 'Brush Script MT', 'Dancing Script', cursive, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(typedName.trim(), 200, 70);

      // underline flourish
      ctx.strokeStyle = "#0f172a";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(60, 105);
      ctx.bezierCurveTo(150, 115, 250, 100, 340, 110);
      ctx.stroke();
    } else if (mode === "upload") {
      if (!uploadedSigUrl) throw new Error("Please upload a signature image first.");
      const img = new Image();
      img.src = uploadedSigUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
      ctx.drawImage(img, 0, 0, offscreen.width, offscreen.height);
    }

    if (includeDate && dateStr) {
      ctx.fillStyle = "#64748b";
      ctx.font = "14px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`Signed: ${dateStr}`, 200, 140);
    }

    const dataUrl = offscreen.toDataURL("image/png");
    const res = await fetch(dataUrl);
    const arrayBuffer = await res.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  };

  const applySignature = async () => {
    if (files.length === 0) {
      setError("Please select a PDF to sign.");
      return;
    }
    setProcessing(true);
    setError(null);

    try {
      const sigPngBytes = await getSignaturePngBytes();
      const pdfBytes = await files[0].file.arrayBuffer();
      const pdf = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
      const embeddedSig = await pdf.embedPng(sigPngBytes);

      const count = pdf.getPageCount();
      let targetIndex = count - 1; // default last page
      if (targetPageMode === "first") targetIndex = 0;
      else if (targetPageMode === "custom") targetIndex = Math.min(count - 1, Math.max(0, customPage - 1));

      const page = pdf.getPage(targetIndex);
      const { width, height } = page.getSize();

      const aspect = 160 / 400;
      const stampWidth = sigWidth;
      const stampHeight = sigWidth * aspect;
      const margin = 35;

      let x = width - stampWidth - margin;
      let y = margin;

      switch (position) {
        case "bottom-right":
          x = width - stampWidth - margin;
          y = margin;
          break;
        case "bottom-left":
          x = margin;
          y = margin;
          break;
        case "bottom-center":
          x = (width - stampWidth) / 2;
          y = margin;
          break;
        case "top-right":
          x = width - stampWidth - margin;
          y = height - stampHeight - margin;
          break;
        case "center":
          x = (width - stampWidth) / 2;
          y = (height - stampHeight) / 2;
          break;
      }

      page.drawImage(embeddedSig, {
        x,
        y,
        width: stampWidth,
        height: stampHeight,
      });

      const out = await pdf.save();
      const blob = new Blob([new Uint8Array(out)], { type: "application/pdf" });
      setDownloadUrl(URL.createObjectURL(blob));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign PDF.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Sign PDF Document</h1>
        <p className="mt-3 text-gray-600">
          Draw, type, or upload your signature and stamp it on any page. 100% private in your browser.
        </p>
      </div>

      <ToolUploadZone
        accept=".pdf"
        multiple={false}
        maxSizeMB={150}
        onFilesSelected={handleFilesSelected}
        label="Drop PDF document here to sign"
        sublabel="Single PDF up to 150MB. Processed offline in your browser."
      />

      {files.length > 0 && (
        <div className="mt-8 space-y-6">
          <div className="rounded-2xl border bg-white p-6 shadow-sm border-gray-200">
            <div className="pb-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">{files[0].file.name}</p>
                <p className="text-xs text-gray-500">
                  {totalPages !== null ? `${totalPages} page${totalPages === 1 ? "" : "s"}` : "Document ready"}
                </p>
              </div>
            </div>

            {/* Signature creation mode switcher */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                1. Create Your Signature
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setMode("draw")}
                  className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-sm font-medium transition ${
                    mode === "draw"
                      ? "border-emerald-600 bg-emerald-50 text-emerald-950"
                      : "border-gray-200 hover:bg-gray-50 text-gray-600"
                  }`}
                >
                  <PenTool className="w-4 h-4" />
                  Draw
                </button>
                <button
                  type="button"
                  onClick={() => setMode("type")}
                  className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-sm font-medium transition ${
                    mode === "type"
                      ? "border-emerald-600 bg-emerald-50 text-emerald-950"
                      : "border-gray-200 hover:bg-gray-50 text-gray-600"
                  }`}
                >
                  <Type className="w-4 h-4" />
                  Type
                </button>
                <button
                  type="button"
                  onClick={() => setMode("upload")}
                  className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-sm font-medium transition ${
                    mode === "upload"
                      ? "border-emerald-600 bg-emerald-50 text-emerald-950"
                      : "border-gray-200 hover:bg-gray-50 text-gray-600"
                  }`}
                >
                  <UploadIcon className="w-4 h-4" />
                  Upload Image
                </button>
              </div>

              {/* Mode content */}
              <div className="mt-4">
                {mode === "draw" && (
                  <div className="flex flex-col items-center">
                    <div className="relative w-full max-w-md h-40 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50/70 overflow-hidden cursor-crosshair">
                      <canvas
                        ref={canvasRef}
                        width={400}
                        height={160}
                        className="w-full h-full touch-none"
                        onMouseDown={startDraw}
                        onMouseMove={draw}
                        onMouseUp={stopDraw}
                        onMouseLeave={stopDraw}
                        onTouchStart={startDraw}
                        onTouchMove={draw}
                        onTouchEnd={stopDraw}
                      />
                      <span className="absolute bottom-2 left-3 text-[11px] text-gray-400 select-none pointer-events-none">
                        Draw signature above
                      </span>
                    </div>
                    <button
                      onClick={clearCanvas}
                      className="mt-2 text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                    >
                      <Eraser className="w-3.5 h-3.5" />
                      Clear signature
                    </button>
                  </div>
                )}

                {mode === "type" && (
                  <div className="max-w-md mx-auto space-y-3">
                    <input
                      type="text"
                      value={typedName}
                      onChange={(e) => {
                        setTypedName(e.target.value);
                        setDownloadUrl(null);
                      }}
                      placeholder="Type your full name"
                      className="w-full rounded-xl border border-gray-300 p-2.5 text-sm focus:border-emerald-500 focus:outline-none"
                    />
                    <div className="h-24 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center text-3xl italic font-serif text-gray-900">
                      {typedName || "Your Signature"}
                    </div>
                  </div>
                )}

                {mode === "upload" && (
                  <div className="max-w-md mx-auto">
                    <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-emerald-500 cursor-pointer bg-gray-50">
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={handleSigUpload}
                        className="sr-only"
                      />
                      <UploadIcon className="w-6 h-6 text-gray-400 mb-1" />
                      <span className="text-xs text-gray-600 font-medium">
                        {uploadedSigFile ? uploadedSigFile.name : "Choose signature PNG / JPG"}
                      </span>
                      <span className="text-[10px] text-gray-400 mt-0.5">Transparent background recommended</span>
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Placement options */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                2. Placement &amp; Date Options
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Stamp On Page
                  </label>
                  <select
                    value={targetPageMode}
                    onChange={(e) => setTargetPageMode(e.target.value as "last" | "first" | "custom")}
                    className="w-full rounded-xl border border-gray-300 p-2 text-sm focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="last">Last Page (Recommended for contracts)</option>
                    <option value="first">First Page</option>
                    <option value="custom">Specific Page Number</option>
                  </select>

                  {targetPageMode === "custom" && (
                    <input
                      type="number"
                      min={1}
                      max={totalPages ?? 999}
                      value={customPage}
                      onChange={(e) => setCustomPage(Math.max(1, parseInt(e.target.value) || 1))}
                      placeholder="Page number"
                      className="mt-2 w-full rounded-xl border border-gray-300 p-2 text-sm focus:border-emerald-500 focus:outline-none"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Position on Page
                  </label>
                  <select
                    value={position}
                    onChange={(e) => setPosition(e.target.value as PlacementPosition)}
                    className="w-full rounded-xl border border-gray-300 p-2 text-sm focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="bottom-right">Bottom Right</option>
                    <option value="bottom-left">Bottom Left</option>
                    <option value="bottom-center">Bottom Center</option>
                    <option value="top-right">Top Right</option>
                    <option value="center">Center</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Signature Size ({sigWidth} px)
                  </label>
                  <input
                    type="range"
                    min={100}
                    max={250}
                    value={sigWidth}
                    onChange={(e) => setSigWidth(parseInt(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs font-medium text-gray-700 mb-1">
                    <input
                      type="checkbox"
                      checked={includeDate}
                      onChange={(e) => setIncludeDate(e.target.checked)}
                      className="rounded accent-emerald-600"
                    />
                    <span>Include Date Stamp</span>
                  </label>
                  {includeDate && (
                    <input
                      type="date"
                      value={dateStr}
                      onChange={(e) => setDateStr(e.target.value)}
                      className="w-full rounded-xl border border-gray-300 p-1.5 text-xs focus:border-emerald-500 focus:outline-none"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={applySignature}
                disabled={processing}
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition disabled:opacity-50"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing Document...
                  </>
                ) : (
                  <>
                    <PenTool className="w-5 h-5" />
                    Sign &amp; Download PDF
                  </>
                )}
              </button>

              {downloadUrl && (
                <a
                  href={downloadUrl}
                  download={files[0].file.name.replace(/\.pdf$/i, "-signed.pdf")}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
                >
                  <Download className="w-5 h-5" />
                  Download Signed PDF
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
