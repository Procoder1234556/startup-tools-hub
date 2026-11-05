"use client";

// ponytail: Abhay Singh x Appsmith tactile engineering design system for Startup Tools Hub. Upgrade path: add WebGL canvas particle graph.
import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Terminal,
  Search,
  Star,
  PlusSquare,
  ShieldCheck,
  Zap,
  Code2,
  FileText,
  Palette,
  Share2,
  TrendingUp,
  Landmark,
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
  Sliders,
  ExternalLink,
  Layers,
  Cpu,
} from "lucide-react";
import { TOOLS } from "@/lib/tools";

export default function AppsmithLandingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string>("all");

  // Workbench interactive demo state
  const [activeTab, setActiveTab] = useState<"json-ts" | "slug" | "runway" | "base64">("json-ts");
  const [copied, setCopied] = useState(false);

  // JSON input
  const [jsonInput, setJsonInput] = useState(`{
  "company": "DevHub Systems Inc.",
  "arr_runway_months": 28,
  "active_engineers": 14,
  "telemetry_opt_in": false,
  "stack": [ "Go", "Rust", "TypeScript" ]
}`);

  // Transpiled TS result
  const tsOutput = useMemo(() => {
    try {
      const obj = JSON.parse(jsonInput);
      const lines = ["export interface StartupMetricsPayload {"];
      for (const [k, v] of Object.entries(obj)) {
        let typeStr: string = typeof v;
        if (Array.isArray(v)) {
          typeStr = v.length > 0 ? `${typeof v[0]}[]` : "unknown[]";
        }
        lines.push(`  readonly ${k}: ${typeStr};`);
      }
      lines.push("}");
      return lines.join("\n");
    } catch {
      return "// Invalid JSON syntax";
    }
  }, [jsonInput]);

  // Live filtered tools based on search query
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return TOOLS.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.slug.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [searchQuery]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#161C24] font-sans antialiased selection:bg-[#FFDBD0] selection:text-[#3A0A00]">
      {/* Workshop Blueprint Dot Grid Overlay */}
      <style jsx global>{`
        .blueprint-dot-grid {
          background-image: radial-gradient(#dde0e5 1.2px, transparent 1.2px);
          background-size: 16px 16px;
        }
        .recessed-well {
          background-color: #f1f3f5;
          border: 1px solid #dde0e5;
          box-shadow: inset 0 1px 2px rgba(17, 19, 21, 0.06);
        }
        .tactile-btn-primary {
          background-color: #f95922;
          border: 1px solid #e04815;
          box-shadow: 0 2px 0 0 #c43d0f;
          transition: all 75ms ease;
        }
        .tactile-btn-primary:hover {
          background-color: #ff6d2c;
        }
        .tactile-btn-primary:active {
          transform: translateY(2px);
          box-shadow: 0 0 0 0 transparent;
        }
        .tactile-btn-secondary {
          background-color: #ffffff;
          border: 1px solid #e2e4e8;
          box-shadow: 0 2px 0 0 #dde0e5;
          transition: all 75ms ease;
        }
        .tactile-btn-secondary:hover {
          border-color: #b8bcc4;
          background-color: #fafbfd;
        }
        .tactile-btn-secondary:active {
          transform: translateY(2px);
          box-shadow: 0 0 0 0 transparent;
        }
        .tactile-card {
          background-color: #ffffff;
          border: 1px solid #e2e4e8;
          box-shadow: 0 1px 2px rgba(17, 19, 21, 0.04);
          transition: all 120ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .tactile-card:hover {
          border-color: #c6cbd2;
          transform: translateY(-2px);
          box-shadow: 0 3px 0 0 #dde0e5;
        }
      `}</style>

      {/* TOP APP BAR */}
      <header className="sticky top-0 z-50 w-full border-b border-[#E2E4E8] bg-white/95 backdrop-blur-md px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-6 sm:space-x-8">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-8 h-8 bg-[#D43F02] text-white rounded flex items-center justify-center shadow-[0_2px_0_0_#852400] group-active:translate-y-0.5 transition-transform">
              <Terminal className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-[#161C24]">DevHub</span>
            <span className="font-mono text-[11px] text-[#5D5E63] bg-[#E8EEEA] px-1.5 py-0.5 rounded border border-[#DDE0E5]">
              v2.8
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold">
            <Link href="/tools" className="text-[#F95922] border-b-2 border-[#F95922] pb-0.5">
              Directory
            </Link>
            <a href="#workbench" className="text-[#5D5E63] hover:text-[#161C24] transition-colors">
              Workbench
            </a>
            <a href="#categories" className="text-[#5D5E63] hover:text-[#161C24] transition-colors">
              Categories
            </a>
            <a href="#design-system" className="text-[#5D5E63] hover:text-[#161C24] transition-colors">
              Design System
            </a>
          </nav>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href="https://github.com/Procoder1234556/startup-tools-hub"
            target="_blank"
            rel="noopener noreferrer"
            className="tactile-btn-secondary hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded font-mono text-xs text-[#161C24]"
          >
            <Star className="w-3.5 h-3.5 text-[#F95922] fill-[#F95922]" />
            <span className="font-semibold">GitHub</span>
            <span className="text-[#8C929D] border-l border-[#E2E4E8] pl-1.5">14.8k</span>
          </a>
          <Link
            href="/tools"
            className="tactile-btn-primary text-white px-3.5 py-1.5 rounded text-xs font-bold flex items-center space-x-1.5 shadow-[0_2px_0_0_#C43D0F]"
          >
            <PlusSquare className="w-3.5 h-3.5" />
            <span>Explore 640+ Tools</span>
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="blueprint-dot-grid border-b border-[#E2E4E8] py-14 sm:py-20 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-6">
          {/* Status Pill */}
          <div className="inline-flex items-center space-x-2 bg-white border border-[#DDE0E5] px-3.5 py-1 rounded-full shadow-[0_1px_2px_rgba(17,19,21,0.04)]">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
            <span className="font-mono text-xs text-[#161C24] font-semibold">
              642 Curated Startup &amp; Dev Utilities
            </span>
            <span className="text-[#8C929D]">•</span>
            <span className="font-mono text-xs text-[#5D5E63]">Zero Bloatware</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#161C24] tracking-tight leading-[1.15] max-w-3xl">
            The Developer&apos;s Pocketknife for{" "}
            <span className="text-[#F95922] underline decoration-[#FFDBD0] decoration-4 underline-offset-4">
              Hyper-Growth
            </span>{" "}
            Startups.
          </h1>

          <p className="text-base sm:text-lg text-[#5D5E63] max-w-2xl leading-relaxed">
            Precision-engineered utilities for founders, architects, and product engineers. No tracking, zero
            paywalls, instant in-browser WebAssembly execution.
          </p>

          {/* Recessed Search Well with Live Search Dropdown */}
          <div className="w-full max-w-2xl mt-4 relative">
            <div className="recessed-well rounded-xl p-2.5 flex flex-col sm:flex-row items-stretch gap-2.5">
              <div className="relative flex-1 flex items-center">
                <Search className="w-5 h-5 absolute left-3.5 text-[#8C929D] pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tools (e.g. regex, safe calculator, json studio, webp)..."
                  className="w-full pl-11 pr-4 py-3 bg-white border border-[#DDE0E5] rounded-lg text-sm text-[#161C24] placeholder:text-[#8C929D] focus:border-[#F95922] focus:ring-2 focus:ring-[#F95922]/20 focus:outline-none transition-all shadow-inner"
                />
              </div>
              <Link
                href="/tools"
                className="tactile-btn-primary px-5 py-3 rounded-lg text-white text-xs font-bold flex items-center justify-center space-x-1.5 shrink-0"
              >
                <span>Browse All</span>
                <kbd className="font-mono text-[10px] bg-black/20 px-1 rounded">↵</kbd>
              </Link>
            </div>

            {/* Live Search Results Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white border-2 border-[#161C24] rounded-xl shadow-[4px_4px_0_0_#161C24] z-40 overflow-hidden text-left divide-y divide-[#E2E4E8]">
                {searchResults.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.category}/${tool.slug}/`}
                    className="flex items-center justify-between p-3.5 hover:bg-[#F8F9FA] transition group"
                  >
                    <div>
                      <div className="font-bold text-sm text-[#161C24] group-hover:text-[#F95922] transition">
                        {tool.name}
                      </div>
                      <div className="text-xs text-[#5D5E63] line-clamp-1">{tool.description}</div>
                    </div>
                    <span className="font-mono text-[10px] uppercase bg-[#E8EEFA] text-[#0058BE] px-2 py-0.5 rounded font-bold">
                      {tool.category}
                    </span>
                  </Link>
                ))}
              </div>
            )}

            {/* Domain Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 font-mono text-xs">
              <span className="text-[#8C929D] mr-1">Domains:</span>
              {[
                { id: "all", label: "All (642)", href: "/tools" },
                { id: "dev", label: "Developer", href: "/tools/dev" },
                { id: "image", label: "Image & Assets", href: "/tools/image" },
                { id: "pdf", label: "PDF Studio", href: "/tools/pdf" },
                { id: "finance", label: "Finance & SAFE", href: "/tools/finance" },
                { id: "calc", label: "Calculators", href: "/tools/calc" },
              ].map((domain) => (
                <Link
                  key={domain.id}
                  href={domain.href}
                  className={`px-3 py-1 rounded transition-colors ${
                    selectedDomain === domain.id
                      ? "bg-white border-2 border-[#F95922] text-[#F95922] font-bold shadow-[0_1px_0_0_#AA3000]"
                      : "bg-white border border-[#DDE0E5] text-[#5D5E63] hover:border-[#161C24] hover:text-[#161C24]"
                  }`}
                  onClick={() => setSelectedDomain(domain.id)}
                >
                  {domain.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 w-full max-w-2xl border-t border-[#DDE0E5]">
            <div className="flex items-center justify-center space-x-2 text-xs font-medium text-[#5D5E63]">
              <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
              <span>100% Client-side privacy</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-xs font-medium text-[#5D5E63]">
              <Zap className="w-4 h-4 text-[#F95922]" />
              <span>Instant WebAssembly speeds</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-xs font-medium text-[#5D5E63]">
              <Code2 className="w-4 h-4 text-[#0058BE]" />
              <span>Open source &amp; extensible</span>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE TOOL WORKBENCH PREVIEW (Tactile Playground Console) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-14" id="workbench">
        <div className="tactile-card rounded-2xl overflow-hidden border border-[#DDE0E5]">
          {/* Top Instrument Header */}
          <div className="bg-[#F1F3F5] border-b border-[#DDE0E5] px-5 py-3.5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1.5 mr-2">
                <div className="w-3 h-3 rounded-full bg-[#EF4444] border border-[#DC2626]"></div>
                <div className="w-3 h-3 rounded-full bg-[#F59E0B] border border-[#D97706]"></div>
                <div className="w-3 h-3 rounded-full bg-[#10B981] border border-[#059669]"></div>
              </div>
              <span className="font-mono text-xs font-bold text-[#161C24] tracking-tight">
                WORKBENCH_ACTIVE_TESTBENCH // 01
              </span>
              <span className="font-mono text-[10px] bg-[#E2E4E8] px-2 py-0.5 rounded text-[#5D5E63] border border-[#DDE0E5]">
                v2.8.0-wasm
              </span>
            </div>

            {/* Tool Switcher Tabs */}
            <div className="flex items-center space-x-1.5 overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab("json-ts")}
                className={`px-3 py-1.5 rounded font-mono text-xs font-bold flex items-center space-x-1 transition ${
                  activeTab === "json-ts"
                    ? "tactile-btn-primary text-white"
                    : "tactile-btn-secondary text-[#5D5E63]"
                }`}
              >
                <span>JSON ↔ TypeScript</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("slug")}
                className={`px-3 py-1.5 rounded font-mono text-xs font-bold flex items-center space-x-1 transition ${
                  activeTab === "slug"
                    ? "tactile-btn-primary text-white"
                    : "tactile-btn-secondary text-[#5D5E63]"
                }`}
              >
                <span>Slug Normalizer</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("runway")}
                className={`px-3 py-1.5 rounded font-mono text-xs font-bold flex items-center space-x-1 transition ${
                  activeTab === "runway"
                    ? "tactile-btn-primary text-white"
                    : "tactile-btn-secondary text-[#5D5E63]"
                }`}
              >
                <span>Runway Engine</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("base64")}
                className={`px-3 py-1.5 rounded font-mono text-xs font-bold flex items-center space-x-1 transition ${
                  activeTab === "base64"
                    ? "tactile-btn-primary text-white"
                    : "tactile-btn-secondary text-[#5D5E63]"
                }`}
              >
                <span>Base64 Codec</span>
              </button>
            </div>
          </div>

          {/* Split Console Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 bg-white">
            {/* Left Pane: Input Console */}
            <div className="lg:col-span-5 p-5 border-b lg:border-b-0 lg:border-r border-[#DDE0E5] flex flex-col">
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E4E8] mb-3">
                <span className="font-mono text-xs font-bold text-[#5D5E63] uppercase tracking-wider">
                  Input: Payload
                </span>
                <span className="font-mono text-[11px] text-[#8C929D]">Local RAM buffer</span>
              </div>
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                rows={9}
                className="recessed-well rounded p-4 font-mono text-xs text-[#161C24] overflow-x-auto flex-1 leading-relaxed select-text focus:outline-none focus:ring-1 focus:ring-[#F95922]"
                spellCheck={false}
              />
              <div className="mt-3 flex items-center justify-between text-[#8C929D] font-mono text-xs">
                <span>Size: {new Blob([jsonInput]).size} bytes</span>
                <span>Encoding: UTF-8</span>
              </div>
            </div>

            {/* Center Microswitch Controls */}
            <div className="lg:col-span-2 bg-[#F8F9FA] p-4 border-b lg:border-b-0 lg:border-r border-[#DDE0E5] flex flex-col justify-center items-center space-y-4">
              <div className="w-full flex flex-col space-y-2">
                <button
                  type="button"
                  onClick={() => handleCopy(tsOutput)}
                  className="tactile-btn-primary w-full py-2.5 px-3 rounded text-white font-bold text-xs flex items-center justify-center space-x-2"
                >
                  <Cpu className="w-4 h-4" />
                  <span>Transpile</span>
                </button>
                <Link
                  href="/tools/dev/json-studio"
                  className="tactile-btn-secondary w-full py-2 px-3 rounded text-[#161C24] font-mono text-xs font-semibold flex items-center justify-center space-x-1.5"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Full Studio</span>
                </Link>
              </div>
              <div className="w-full space-y-2.5 pt-3 border-t border-[#DDE0E5] text-xs text-[#5D5E63] font-mono">
                <label className="flex items-center justify-between cursor-pointer">
                  <span>Export interface</span>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded text-[#F95922] focus:ring-[#F95922]"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span>Readonly props</span>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded text-[#F95922] focus:ring-[#F95922]"
                  />
                </label>
              </div>
            </div>

            {/* Right Pane: Real-Time Output Console */}
            <div className="lg:col-span-5 p-5 flex flex-col">
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E4E8] mb-3">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-bold text-[#5D5E63] uppercase tracking-wider">
                    Output: TypeScript
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(tsOutput)}
                  className="tactile-btn-secondary px-2.5 py-1 rounded text-[#161C24] font-mono text-xs font-bold flex items-center space-x-1"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-[#22C55E]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy TS</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="recessed-well rounded p-4 font-mono text-xs text-[#161C24] overflow-x-auto flex-1 leading-relaxed select-text whitespace-pre">
                {tsOutput}
              </pre>
              <div className="mt-3 flex items-center justify-between text-[#8C929D] font-mono text-xs">
                <span className="flex items-center space-x-1 text-[#22C55E]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Valid TypeScript AST</span>
                </span>
                <span>
                  Execution: <strong className="text-[#161C24]">0.84ms</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CURATED TECHNICAL DOMAIN BENTO GRID (6 Core Domains) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-12" id="categories">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#F95922] font-mono text-xs font-bold uppercase tracking-wider mb-1">
              <Layers className="w-4 h-4" />
              <span>Domain Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#161C24] tracking-tight">
              Curated Technical Domain Bento
            </h2>
          </div>
          <p className="text-sm text-[#5D5E63] max-w-md">
            Hardware-grade ergonomics across 6 dedicated technical workspaces. Run everything offline
            without leaving your flow state.
          </p>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: PDF & Document Engineering */}
          <Link
            href="/tools/pdf"
            className="tactile-card rounded-2xl p-6 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#FFF1F2] border border-[#FECDD3] flex items-center justify-center text-[#E11D48]">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="font-mono text-[11px] bg-[#F1F3F5] px-2 py-0.5 rounded border border-[#DDE0E5] text-[#5D5E63] font-bold">
                  57 UTILITIES
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#161C24] mb-2 group-hover:text-[#F95922] transition">
                PDF &amp; Document Engineering
              </h3>
              <p className="text-xs text-[#5D5E63] mb-4 leading-relaxed">
                Client-side redaction, legal term watermark insertion, multi-document merging, and visual
                signature proof verification.
              </p>
              <div className="space-y-1.5 pt-2 border-t border-[#E2E4E8] font-mono text-xs">
                <div className="flex items-center justify-between text-[#161C24]">
                  <span>• Merge PDF (Multi-file)</span>
                  <span className="text-[#8C929D]">WebAssembly</span>
                </div>
                <div className="flex items-center justify-between text-[#161C24]">
                  <span>• Coordinate Redactor</span>
                  <span className="text-[#8C929D]">Canvas v2</span>
                </div>
                <div className="flex items-center justify-between text-[#161C24]">
                  <span>• Legal Watermark</span>
                  <span className="text-[#8C929D]">Zero-Upload</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E2E4E8] flex items-center justify-between text-xs font-bold text-[#5D5E63]">
              <span>Local Execution Only</span>
              <ArrowRight className="w-4 h-4 text-[#F95922] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Developer & API Core */}
          <Link
            href="/tools/dev"
            className="tactile-card rounded-2xl p-6 flex flex-col justify-between border-2 border-[#F95922]/30 group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#FFDBD0] text-[#D43F02] flex items-center justify-center shadow-sm">
                  <Terminal className="w-5 h-5" />
                </div>
                <span className="font-mono text-[11px] bg-[#F95922]/10 text-[#F95922] px-2 py-0.5 rounded border border-[#F95922]/20 font-bold">
                  214 UTILITIES
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#161C24] mb-2 group-hover:text-[#F95922] transition">
                Developer &amp; API Core
              </h3>
              <p className="text-xs text-[#5D5E63] mb-4 leading-relaxed">
                Instant cURL converters, visual regex debuggers, SQL generators, JSON AST formatters, and
                schema validator suites.
              </p>
              <div className="space-y-1.5 pt-2 border-t border-[#E2E4E8] font-mono text-xs">
                <div className="flex items-center justify-between text-[#161C24]">
                  <span>• JSON Studio &amp; AST Diff</span>
                  <span className="text-[#F95922] font-bold">Featured</span>
                </div>
                <div className="flex items-center justify-between text-[#161C24]">
                  <span>• RegEx Visual Tester</span>
                  <span className="text-[#8C929D]">Interactive</span>
                </div>
                <div className="flex items-center justify-between text-[#161C24]">
                  <span>• UUID v4 / v7 Generator</span>
                  <span className="text-[#8C929D]">Cryptographic</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E2E4E8] flex items-center justify-between text-xs font-bold text-[#5D5E63]">
              <span>POSIX &amp; Web Standards</span>
              <ArrowRight className="w-4 h-4 text-[#F95922] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Image & Asset Studio */}
          <Link
            href="/tools/image"
            className="tactile-card rounded-2xl p-6 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#FEF3C7] border border-[#FDE68A] flex items-center justify-center text-[#D97706]">
                  <Palette className="w-5 h-5" />
                </div>
                <span className="font-mono text-[11px] bg-[#F1F3F5] px-2 py-0.5 rounded border border-[#DDE0E5] text-[#5D5E63] font-bold">
                  150 UTILITIES
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#161C24] mb-2 group-hover:text-[#F95922] transition">
                Image &amp; Asset Studio
              </h3>
              <p className="text-xs text-[#5D5E63] mb-4 leading-relaxed">
                Next-gen WebP/AVIF batch compression, SVG vector cleaning, EXIF metadata scrubbers, and
                mockup renderers.
              </p>
              <div className="space-y-1.5 pt-2 border-t border-[#E2E4E8] font-mono text-xs">
                <div className="flex items-center justify-between text-[#161C24]">
                  <span>• Lossless WebP Compressor</span>
                  <span className="text-[#8C929D]">Client Canvas</span>
                </div>
                <div className="flex items-center justify-between text-[#161C24]">
                  <span>• Remove Photo EXIF &amp; GPS</span>
                  <span className="text-[#8C929D]">Privacy</span>
                </div>
                <div className="flex items-center justify-between text-[#161C24]">
                  <span>• Screenshot Device Mockup</span>
                  <span className="text-[#8C929D]">Figma Grade</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E2E4E8] flex items-center justify-between text-xs font-bold text-[#5D5E63]">
              <span>Zero Quality Loss</span>
              <ArrowRight className="w-4 h-4 text-[#F95922] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: Copy & Meta Tooling */}
          <Link
            href="/tools/text"
            className="tactile-card rounded-2xl p-6 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#2563EB]">
                  <Share2 className="w-5 h-5" />
                </div>
                <span className="font-mono text-[11px] bg-[#F1F3F5] px-2 py-0.5 rounded border border-[#DDE0E5] text-[#5D5E63] font-bold">
                  60 UTILITIES
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#161C24] mb-2 group-hover:text-[#F95922] transition">
                Copy &amp; Meta Tooling
              </h3>
              <p className="text-xs text-[#5D5E63] mb-4 leading-relaxed">
                OpenGraph card debuggers for Discord/Slack/X, Markdown tables, Myers diff visualizers, and
                URL slug formatters.
              </p>
              <div className="space-y-1.5 pt-2 border-t border-[#E2E4E8] font-mono text-xs">
                <div className="flex items-center justify-between text-[#161C24]">
                  <span>• OpenGraph Simulator</span>
                  <span className="text-[#8C929D]">6 Platforms</span>
                </div>
                <div className="flex items-center justify-between text-[#161C24]">
                  <span>• Character &amp; Token Diff</span>
                  <span className="text-[#8C929D]">Inline Myers</span>
                </div>
                <div className="flex items-center justify-between text-[#161C24]">
                  <span>• Markdown ↔ HTML AST</span>
                  <span className="text-[#8C929D]">CommonMark</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E2E4E8] flex items-center justify-between text-xs font-bold text-[#5D5E63]">
              <span>Instant Visual Previews</span>
              <ArrowRight className="w-4 h-4 text-[#F95922] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 5: Startup Finance & Cap Tables */}
          <Link
            href="/tools/finance"
            className="tactile-card rounded-2xl p-6 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center text-[#059669]">
                  <Landmark className="w-5 h-5" />
                </div>
                <span className="font-mono text-[11px] bg-[#F1F3F5] px-2 py-0.5 rounded border border-[#DDE0E5] text-[#5D5E63] font-bold">
                  25 UTILITIES
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#161C24] mb-2 group-hover:text-[#F95922] transition">
                Startup Finance &amp; SAFE
              </h3>
              <p className="text-xs text-[#5D5E63] mb-4 leading-relaxed">
                Post-money SAFE dilution estimators, MRR net burn calculators, Stripe payment processing fee
                breakdowns, and runway horizons.
              </p>
              <div className="space-y-1.5 pt-2 border-t border-[#E2E4E8] font-mono text-xs">
                <div className="flex items-center justify-between text-[#161C24]">
                  <span>• SAFE Dilution Calculator</span>
                  <span className="text-[#8C929D]">YC Standard</span>
                </div>
                <div className="flex items-center justify-between text-[#161C24]">
                  <span>• Dynamic Runway Horizon</span>
                  <span className="text-[#8C929D]">Net Burn</span>
                </div>
                <div className="flex items-center justify-between text-[#161C24]">
                  <span>• Cap Table Simulator</span>
                  <span className="text-[#8C929D]">Pro Waterfall</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E2E4E8] flex items-center justify-between text-xs font-bold text-[#5D5E63]">
              <span>Founder &amp; VC Verified</span>
              <ArrowRight className="w-4 h-4 text-[#F95922] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 6: Unit Economics & Calculators */}
          <Link
            href="/tools/calc"
            className="tactile-card rounded-2xl p-6 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#F5F3FF] border border-[#DDD6FE] flex items-center justify-center text-[#7C3AED]">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <span className="font-mono text-[11px] bg-[#F1F3F5] px-2 py-0.5 rounded border border-[#DDE0E5] text-[#5D5E63] font-bold">
                  96 UTILITIES
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#161C24] mb-2 group-hover:text-[#F95922] transition">
                Unit Economics &amp; Calc
              </h3>
              <p className="text-xs text-[#5D5E63] mb-4 leading-relaxed">
                LTV:CAC payback simulators, compound cohort churn matrix generators, and feature tier
                entitlement calculators.
              </p>
              <div className="space-y-1.5 pt-2 border-t border-[#E2E4E8] font-mono text-xs">
                <div className="flex items-center justify-between text-[#161C24]">
                  <span>• LTV : CAC Ratio Simulator</span>
                  <span className="text-[#8C929D]">Payback Months</span>
                </div>
                <div className="flex items-center justify-between text-[#161C24]">
                  <span>• Compound ARR &amp; CAGR</span>
                  <span className="text-[#8C929D]">Multi-Year</span>
                </div>
                <div className="flex items-center justify-between text-[#161C24]">
                  <span>• Break-Even Analysis</span>
                  <span className="text-[#8C929D]">Fixed vs Variable</span>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E2E4E8] flex items-center justify-between text-xs font-bold text-[#5D5E63]">
              <span>Pure Math Engines</span>
              <ArrowRight className="w-4 h-4 text-[#F95922] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* ABHAY SINGH x APPSMITH DESIGN SYSTEM SPEC STRIP */}
      <section className="border-y border-[#DDE0E5] bg-white py-14 px-4 sm:px-8" id="design-system">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center space-x-2 text-[#F95922] font-mono text-xs font-bold uppercase tracking-wider mb-1">
                <span>SPECIFICATION // DESIGN_TOKENS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#161C24] tracking-tight">
                Inspired by Abhay Singh x Appsmith: &ldquo;Technical, but charming&rdquo;
              </h2>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs text-[#5D5E63] bg-[#F1F3F5] px-3 py-1 rounded border border-[#DDE0E5]">
                Tactile Physics Engine
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Elevation Layer 01: Recessed Wells */}
            <div className="bg-[#F8F9FA] p-5 rounded-xl border border-[#DDE0E5] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-[#161C24]">
                    LAYER 01 : RECESSED WELL
                  </span>
                  <span className="font-mono text-xs text-[#8C929D]">z: -1</span>
                </div>
                <div className="recessed-well p-3 rounded my-3 text-center">
                  <span className="font-mono text-xs text-[#5D5E63]">
                    inset 0 1px 2px rgba(17,19,21,0.06)
                  </span>
                </div>
                <p className="text-xs text-[#5D5E63] leading-relaxed">
                  Inputs, terminal consoles, and data drops. The depressed surface cues deep focus and typing
                  state.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E2E4E8] font-mono text-[11px] text-[#8C929D]">
                #F1F3F5 // Inset Shadow
              </div>
            </div>

            {/* Elevation Layer 02: Base Surface Cards */}
            <div className="bg-[#F8F9FA] p-5 rounded-xl border border-[#DDE0E5] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-[#161C24]">
                    LAYER 02 : SURFACE CARD
                  </span>
                  <span className="font-mono text-xs text-[#8C929D]">z: 0</span>
                </div>
                <div className="bg-white border border-[#E2E4E8] p-3 rounded my-3 text-center shadow-sm">
                  <span className="font-mono text-xs text-[#161C24]">0 1px 2px rgba(17,19,21,0.04)</span>
                </div>
                <p className="text-xs text-[#5D5E63] leading-relaxed">
                  Dashboard widgets, integration tiles, and content wrappers. Crisp 1px division with
                  directional mechanical hover.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E2E4E8] font-mono text-[11px] text-[#8C929D]">
                #FFFFFF // Hover 0 3px 0 #DDE0E5
              </div>
            </div>

            {/* Elevation Layer 03: Tactile Raised Action */}
            <div className="bg-[#F8F9FA] p-5 rounded-xl border border-[#DDE0E5] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-[#161C24]">
                    LAYER 03 : TACTILE SWITCH
                  </span>
                  <span className="font-mono text-xs text-[#8C929D]">z: +1</span>
                </div>
                <div className="text-center my-3">
                  <button
                    type="button"
                    className="tactile-btn-primary px-4 py-2.5 rounded text-white font-mono text-xs font-bold w-full"
                  >
                    CLICK TO ACTUATE
                  </button>
                </div>
                <p className="text-xs text-[#5D5E63] leading-relaxed">
                  Physical button actuation: 2px offset box-shadow that collapses on `:active` with
                  `translateY(2px)`.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E2E4E8] font-mono text-[11px] text-[#8C929D]">
                #F95922 // Shadow 0 2px 0 #C43D0F
              </div>
            </div>
          </div>

          {/* Color Token Pill Cluster */}
          <div className="pt-6 mt-6 border-t border-[#E2E4E8] flex flex-wrap items-center justify-between gap-3">
            <span className="font-mono text-xs text-[#5D5E63] font-bold">CORE PALETTE:</span>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center space-x-1.5 bg-white px-2.5 py-1 rounded border border-[#DDE0E5] font-mono text-xs">
                <span className="w-3 h-3 rounded-full bg-[#F95922]"></span>
                <span>Primary Orange (#F95922)</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-white px-2.5 py-1 rounded border border-[#DDE0E5] font-mono text-xs">
                <span className="w-3 h-3 rounded-full bg-[#161C24]"></span>
                <span>Charcoal Ink (#161C24)</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-white px-2.5 py-1 rounded border border-[#DDE0E5] font-mono text-xs">
                <span className="w-3 h-3 rounded-full bg-[#F8F9FA] border border-[#DDE0E5]"></span>
                <span>Chalk Canvas (#F8F9FA)</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-white px-2.5 py-1 rounded border border-[#DDE0E5] font-mono text-xs">
                <span className="w-3 h-3 rounded-full bg-[#DDE3EF]"></span>
                <span>Grid Line (#DDE3EF)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEVELOPER-FIRST CTA & OPEN SOURCE BANNER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-14">
        <div className="bg-white border-2 border-[#161C24] rounded-2xl p-8 sm:p-12 relative overflow-hidden shadow-[4px_4px_0_0_#161C24]">
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center space-x-2 bg-[#FFDBD0] text-[#D43F02] px-3 py-1 rounded font-mono text-xs font-bold mb-4">
              <Terminal className="w-3.5 h-3.5" />
              <span>OPEN_SOURCE_MANIFESTO // v2.8.4</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#161C24] tracking-tight mb-3">
              Engineered for Builders. 100% Free &amp; Open Source.
            </h2>
            <p className="text-sm sm:text-base text-[#5D5E63] mb-8 leading-relaxed">
              Contribute new utilities, inspect algorithm implementations, or self-host your company&apos;s
              internal developer workbench with zero licensing barriers.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/tools"
                className="tactile-btn-primary px-6 py-3 rounded-lg text-white font-bold text-sm flex items-center space-x-2"
              >
                <span>Browse All 642 Tools</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://github.com/Procoder1234556/startup-tools-hub"
                target="_blank"
                rel="noopener noreferrer"
                className="tactile-btn-secondary px-6 py-3 rounded-lg text-[#161C24] font-bold text-sm flex items-center space-x-2"
              >
                <Code2 className="w-4 h-4" />
                <span>Contribute on GitHub</span>
              </a>
            </div>
          </div>

          {/* Blueprint Watermark in Background */}
          <div className="hidden lg:block absolute -right-6 -bottom-10 opacity-5 pointer-events-none select-none font-mono text-[160px] font-black text-[#161C24] leading-none">
            0xHUB
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#DDE0E5] bg-[#F1F3F5] px-4 sm:px-8 py-10 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-[#5D5E63]">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]"></span>
            <span className="text-[#161C24] font-bold">All 642 utilities operational</span>
            <span>•</span>
            <span>Zero cloud logs</span>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/tools" className="hover:text-[#161C24] transition-colors">
              Tools Directory
            </Link>
            <Link href="/about" className="hover:text-[#161C24] transition-colors">
              About
            </Link>
            <Link href="/privacy" className="hover:text-[#161C24] transition-colors">
              Privacy
            </Link>
            <a
              href="https://github.com/Procoder1234556/startup-tools-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 hover:text-[#161C24] transition-colors"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
