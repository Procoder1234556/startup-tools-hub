"use client";

import React, { useState, useRef } from "react";
import {
  FileText,
  MousePointer,
  Type,
  Highlighter,
  PenTool,
  RotateCw,
  RotateCcw,
  Trash2,
  ZoomIn,
  ZoomOut,
  Download,
  UploadCloud,
  ChevronLeft,
  ChevronRight,
  Plus,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Undo2,
} from "lucide-react";
import { MarketplaceTool } from "@/lib/marketplace-tools";

interface PdfWorkspaceTemplateProps {
  tool: MarketplaceTool;
}

interface PdfPageItem {
  id: number;
  rotation: number;
  title: string;
  annotations: Array<{
    id: string;
    type: "text" | "highlight" | "signature";
    content: string;
    x: number;
    y: number;
  }>;
}

export default function PdfWorkspaceTemplate({ tool }: PdfWorkspaceTemplateProps) {
  const [pages, setPages] = useState<PdfPageItem[]>([
    {
      id: 1,
      rotation: 0,
      title: "Executive Summary & System Overview",
      annotations: [
        {
          id: "ann-1",
          type: "highlight",
          content: "100% Client-Side Processing",
          x: 48,
          y: 110,
        },
      ],
    },
    {
      id: 2,
      rotation: 0,
      title: "Architecture & Data Security Policies",
      annotations: [],
    },
    {
      id: 3,
      rotation: 0,
      title: "API Specifications & Endpoint Index",
      annotations: [],
    },
    {
      id: 4,
      rotation: 0,
      title: "Appendix: SLA & Performance Benchmarks",
      annotations: [],
    },
  ]);

  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const [activeTool, setActiveTool] = useState<"select" | "text" | "highlight" | "sign">("select");
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [docName, setDocName] = useState<string>("Quarterly-Report-2026.pdf");
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportSuccess, setExportSuccess] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const activePage = pages[activePageIndex] || pages[0];

  const handleRotatePage = (direction: "cw" | "ccw") => {
    setPages((prev) =>
      prev.map((p, idx) => {
        if (idx !== activePageIndex) return p;
        const delta = direction === "cw" ? 90 : -90;
        return {
          ...p,
          rotation: (p.rotation + delta + 360) % 360,
        };
      })
    );
  };

  const handleDeletePage = (indexToDelete: number) => {
    if (pages.length <= 1) return;
    setPages((prev) => prev.filter((_, idx) => idx !== indexToDelete));
    if (activePageIndex >= pages.length - 1) {
      setActivePageIndex(Math.max(0, pages.length - 2));
    }
  };

  const handleAddPage = () => {
    const newId = pages.length + 1;
    setPages((prev) => [
      ...prev,
      {
        id: newId,
        rotation: 0,
        title: `Document Section ${newId}`,
        annotations: [],
      },
    ]);
    setActivePageIndex(pages.length);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeTool === "select") return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    const newAnnotation: PdfPageItem["annotations"][number] = {
      id: `ann-${Date.now()}`,
      type: activeTool === "sign" ? "signature" : activeTool,
      content:
        activeTool === "text"
          ? "Click to type comment..."
          : activeTool === "sign"
          ? "Approved & Signed"
          : "Highlighted Section",
      x,
      y,
    };

    setPages((prev) =>
      prev.map((p, idx) => {
        if (idx !== activePageIndex) return p;
        return {
          ...p,
          annotations: [...p.annotations, newAnnotation],
        };
      })
    );
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);

      // Trigger download
      const content = `ToolBox Hub PDF Export: ${docName}\nPages: ${pages.length}\nTimestamp: ${new Date().toISOString()}`;
      const blob = new Blob([content], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `edited-${docName}`;
      a.click();
      URL.revokeObjectURL(url);
    }, 800);
  };

  return (
    <div className="flex flex-col bg-[#F1F5F9]/60">
      {/* ── Top Workspace Toolbar ──────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] bg-white px-4 py-2.5 sm:px-6">
        {/* Left: Tools Selection */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTool("select")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
              activeTool === "select"
                ? "bg-[#2563EB] text-white shadow-xs"
                : "text-[#475569] hover:bg-[#F1F5F9]"
            }`}
            title="Select & Move Tool"
          >
            <MousePointer className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Select</span>
          </button>

          <button
            onClick={() => setActiveTool("text")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
              activeTool === "text"
                ? "bg-[#2563EB] text-white shadow-xs"
                : "text-[#475569] hover:bg-[#F1F5F9]"
            }`}
            title="Add Text Note"
          >
            <Type className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Add Text</span>
          </button>

          <button
            onClick={() => setActiveTool("highlight")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
              activeTool === "highlight"
                ? "bg-[#2563EB] text-white shadow-xs"
                : "text-[#475569] hover:bg-[#F1F5F9]"
            }`}
            title="Highlighter"
          >
            <Highlighter className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Highlight</span>
          </button>

          <button
            onClick={() => setActiveTool("sign")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
              activeTool === "sign"
                ? "bg-[#2563EB] text-white shadow-xs"
                : "text-[#475569] hover:bg-[#F1F5F9]"
            }`}
            title="Signature Stamp"
          >
            <PenTool className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Sign</span>
          </button>

          <div className="h-4 w-px bg-[#E2E8F0] mx-1" />

          {/* Page Rotation */}
          <button
            onClick={() => handleRotatePage("ccw")}
            className="rounded-lg p-1.5 text-[#475569] hover:bg-[#F1F5F9] transition-colors"
            title="Rotate Left"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleRotatePage("cw")}
            className="rounded-lg p-1.5 text-[#475569] hover:bg-[#F1F5F9] transition-colors"
            title="Rotate Right"
          >
            <RotateCw className="h-4 w-4" />
          </button>
        </div>

        {/* Center: Zoom Controls */}
        <div className="flex items-center gap-1 text-xs">
          <button
            onClick={() => setZoomLevel((z) => Math.max(75, z - 15))}
            disabled={zoomLevel <= 75}
            className="rounded p-1 text-[#475569] hover:bg-[#F1F5F9] disabled:opacity-40"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </button>
          <span className="w-12 text-center font-mono font-semibold text-[#0F172A]">
            {zoomLevel}%
          </span>
          <button
            onClick={() => setZoomLevel((z) => Math.min(150, z + 15))}
            disabled={zoomLevel >= 150}
            className="rounded p-1 text-[#475569] hover:bg-[#F1F5F9] disabled:opacity-40"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Right: Export & File Info */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1 rounded-lg border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#475569] hover:bg-[#F1F5F9]"
            title="Open another PDF file"
          >
            <UploadCloud className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Upload PDF</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setDocName(e.target.files[0].name);
              }
            }}
          />

          <button
            onClick={handleExport}
            disabled={isExporting}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#2563EB] px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-[#1D4ED8] transition-colors disabled:opacity-50"
          >
            {exportSuccess ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                Exported!
              </>
            ) : (
              <>
                <Download className="h-3.5 w-3.5" />
                Save & Export
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Main Canvas Layout (Sidebar + Document Viewer) ─────────── */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
        {/* ── Left Sidebar: Page Thumbnails (3 cols on desktop) ─────── */}
        <div className="md:col-span-3 border-r border-[#E2E8F0] bg-[#F8FAFC] p-4 space-y-4 max-h-[620px] overflow-y-auto">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Pages ({pages.length})
            </span>
            <button
              onClick={handleAddPage}
              className="inline-flex items-center gap-1 rounded bg-white border border-[#E2E8F0] px-2 py-0.5 text-[11px] font-semibold text-[#2563EB] hover:bg-blue-50"
            >
              <Plus className="h-3 w-3" /> Add Page
            </button>
          </div>

          <div className="space-y-3">
            {pages.map((p, idx) => (
              <div
                key={p.id}
                onClick={() => setActivePageIndex(idx)}
                className={`group relative flex flex-col items-center rounded-xl border p-2.5 cursor-pointer transition-all ${
                  idx === activePageIndex
                    ? "border-[#2563EB] bg-blue-50/50 shadow-xs ring-1 ring-[#2563EB]"
                    : "border-[#E2E8F0] bg-white hover:border-[#94A3B8]"
                }`}
              >
                {/* Simulated Thumbnail Paper */}
                <div
                  className="relative aspect-[1/1.3] w-full rounded-md border border-[#E2E8F0] bg-white shadow-2xs flex flex-col justify-between p-2 overflow-hidden transition-transform"
                  style={{ transform: `rotate(${p.rotation}deg)` }}
                >
                  <div className="h-1.5 w-1/3 rounded-full bg-[#CBD5E1]" />
                  <div className="space-y-1">
                    <div className="h-1 w-full rounded-full bg-[#F1F5F9]" />
                    <div className="h-1 w-4/5 rounded-full bg-[#F1F5F9]" />
                    <div className="h-1 w-2/3 rounded-full bg-[#F1F5F9]" />
                  </div>
                  <div className="text-[8px] font-mono text-[#94A3B8] text-right">
                    P. {idx + 1}
                  </div>
                </div>

                <div className="mt-1.5 flex items-center justify-between w-full px-1">
                  <span className="text-xs font-semibold text-[#0F172A]">
                    Page {idx + 1}
                  </span>
                  {pages.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePage(idx);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-0.5 text-[#94A3B8] hover:text-rose-600 transition-opacity"
                      title="Delete page"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Central Document Canvas (9 cols on desktop) ──────────── */}
        <div className="md:col-span-9 p-6 sm:p-10 flex flex-col items-center justify-center overflow-auto bg-[#E2E8F0]/40">
          {/* Active Canvas Sheet */}
          <div
            onClick={handleCanvasClick}
            style={{
              transform: `scale(${zoomLevel / 100}) rotate(${activePage.rotation}deg)`,
              transformOrigin: "center center",
              transition: "transform 0.2s ease-in-out",
            }}
            className="relative aspect-[1/1.414] w-full max-w-[560px] rounded-lg border border-[#CBD5E1] bg-white shadow-lg p-8 sm:p-12 flex flex-col justify-between select-none cursor-crosshair"
          >
            {/* Header Document Area */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#2563EB]" />
                  <span className="font-bold text-xs uppercase tracking-wider text-[#0F172A]">
                    ToolBox Hub Document Preview
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#94A3B8]">
                  Page {activePageIndex + 1} of {pages.length}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-[#0F172A]">
                {activePage.title}
              </h2>

              <p className="text-xs text-[#475569] leading-relaxed">
                This PDF page is rendered inside your browser's interactive SVG/Canvas sandbox.
                Use the toolbar above to rotate pages, add annotations, insert text labels, or
                place digital approvals directly onto the document canvas without any upload latency.
              </p>

              {/* Sample Content Table */}
              <div className="rounded-md border border-[#E2E8F0] overflow-hidden text-[11px]">
                <div className="grid grid-cols-3 bg-[#F8FAFC] p-2 font-semibold text-[#0F172A] border-b border-[#E2E8F0]">
                  <span>Module</span>
                  <span>Execution Mode</span>
                  <span>Privacy Rating</span>
                </div>
                <div className="grid grid-cols-3 p-2 text-[#475569] border-b border-[#F1F5F9]">
                  <span>Local Worker</span>
                  <span className="text-emerald-600 font-medium">In-Memory</span>
                  <span>100% Confidential</span>
                </div>
                <div className="grid grid-cols-3 p-2 text-[#475569]">
                  <span>PDF Engine</span>
                  <span className="text-blue-600 font-medium">Client WASM</span>
                  <span>Zero Network Calls</span>
                </div>
              </div>
            </div>

            {/* Dynamic Annotations Render */}
            {activePage.annotations.map((ann) => (
              <div
                key={ann.id}
                style={{ top: `${ann.y}px`, left: `${ann.x}px` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded shadow-xs text-xs font-semibold ${
                  ann.type === "highlight"
                    ? "bg-amber-200/80 text-amber-950 border border-amber-300"
                    : ann.type === "signature"
                    ? "bg-blue-50 text-[#2563EB] border-2 border-[#2563EB] font-serif italic"
                    : "bg-white text-[#0F172A] border border-[#CBD5E1]"
                }`}
              >
                {ann.content}
              </div>
            ))}

            {/* Footer Page Number */}
            <div className="flex items-center justify-between border-t border-[#F1F5F9] pt-4 text-[10px] text-[#94A3B8]">
              <span>Confidential & Proprietary</span>
              <span>Doc ID: {docName}</span>
              <span>Page {activePageIndex + 1}</span>
            </div>
          </div>

          {/* Bottom Floating Navigation Indicator */}
          <div className="mt-4 flex items-center gap-3 rounded-full bg-white/90 backdrop-blur-xs border border-[#E2E8F0] px-4 py-1.5 shadow-sm text-xs">
            <button
              onClick={() => setActivePageIndex((idx) => Math.max(0, idx - 1))}
              disabled={activePageIndex === 0}
              className="p-1 text-[#64748B] hover:text-[#0F172A] disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="font-medium text-[#0F172A]">
              Page {activePageIndex + 1} of {pages.length}
            </span>
            <button
              onClick={() =>
                setActivePageIndex((idx) => Math.min(pages.length - 1, idx + 1))
              }
              disabled={activePageIndex >= pages.length - 1}
              className="p-1 text-[#64748B] hover:text-[#0F172A] disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Footer Workspace Stats ─────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E2E8F0] bg-white px-4 py-2 sm:px-6 text-xs text-[#64748B]">
        <div className="flex items-center gap-4">
          <span>Document: <strong className="text-[#0F172A]">{docName}</strong></span>
          <span>Pages: <strong className="text-[#0F172A]">{pages.length}</strong></span>
          <span>Tool: <strong className="text-[#2563EB] capitalize">{activeTool}</strong></span>
        </div>

        <div className="flex items-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span className="text-emerald-700 font-medium">Safe Local PDF Engine</span>
        </div>
      </div>
    </div>
  );
}
