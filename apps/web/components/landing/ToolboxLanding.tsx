"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Search,
  FileText,
  QrCode,
  Braces,
  Image as ImageIcon,
  Calculator,
  Lock,
  Shield,
  ShieldCheck,
  Wrench,
  Zap,
  ArrowRight,
  Download,
  Upload,
  Copy,
  Check,
  Settings,
  Sparkles,
  ExternalLink,
  Code2,
  RefreshCw,
  TrendingUp,
  Briefcase,
  Layers,
  FileCode,
  Cpu,
  Eye,
  EyeOff,
  Terminal,
  KeyRound,
  FileSpreadsheet,
  Palette,
  Sliders,
  Type,
  Maximize2,
  CheckCircle2,
  AlertCircle,
  X,
  Play,
  RotateCw,
  FileCheck,
  Hash,
  Globe,
  SlidersHorizontal,
  FolderOpen,
  ArrowUpRight,
  Clock,
  ChevronRight,
  Bookmark,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  ALL_TOOLS,
  CATEGORIES_LIST,
  type MarketplaceTool,
} from "@/lib/marketplace-tools";

export default function ToolboxLanding() {
  // ── Interactive State ──
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"popular" | "alphabetical" | "newest">("popular");
  const [activeTab, setActiveTab] = useState<"all" | "popular" | "new">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Quick Modal State
  const [quickToolModal, setQuickToolModal] = useState<MarketplaceTool | null>(null);

  // Playground States
  const [workspaceTab, setWorkspaceTab] = useState<"json" | "password" | "qr">("json");

  // JSON Tool State
  const [jsonInput, setJsonInput] = useState(
    '{\n  "service": "Startup Tools Hub",\n  "status": "active",\n  "tools_count": 100,\n  "architecture": "client-side-wasm",\n  "privacy": "100%",\n  "features": ["no-login", "fast", "zero-uploads"]\n}'
  );
  const [jsonOutput, setJsonOutput] = useState("");
  const [jsonError, setJsonError] = useState("");
  const [jsonCopied, setJsonCopied] = useState(false);

  // Password Tool State
  const [pwdLength, setPwdLength] = useState(18);
  const [pwdUpper, setPwdUpper] = useState(true);
  const [pwdLower, setPwdLower] = useState(true);
  const [pwdNumbers, setPwdNumbers] = useState(true);
  const [pwdSymbols, setPwdSymbols] = useState(true);
  const [generatedPwd, setGeneratedPwd] = useState("kX9#mQ2$vL7*pW4!aZ");
  const [pwdCopied, setPwdCopied] = useState(false);

  // QR Code Tool State
  const [qrText, setQrText] = useState("https://startup-tools-hub.com");
  const [qrCopied, setQrCopied] = useState(false);

  // Live Clock (Local time)
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(now)
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcut `/` to focus search
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Generate password helper
  const handleGeneratePassword = () => {
    let chars = "";
    if (pwdUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (pwdLower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (pwdNumbers) chars += "0123456789";
    if (pwdSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) chars = "abcdefghijklmnopqrstuvwxyz0123456789";

    let result = "";
    for (let i = 0; i < pwdLength; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedPwd(result);
  };

  // Format JSON helper
  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed, null, 2));
      setJsonError("");
    } catch (err: any) {
      setJsonError("Invalid JSON: " + err.message);
    }
  };

  const handleMinifyJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed));
      setJsonError("");
    } catch (err: any) {
      setJsonError("Invalid JSON: " + err.message);
    }
  };

  // Filtered & Sorted Tools
  const filteredTools = useMemo(() => {
    return ALL_TOOLS.filter((tool) => {
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = tool.name.toLowerCase().includes(q);
        const matchesDesc = tool.description.toLowerCase().includes(q);
        const matchesCat = tool.category.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }

      // Category filter
      if (selectedCategory !== "all") {
        if (tool.categorySlug !== selectedCategory) return false;
      }

      // Tab filter
      if (activeTab === "popular" && !tool.isPopular) return false;
      if (activeTab === "new" && !tool.isNew) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === "alphabetical") return a.name.localeCompare(b.name);
      if (sortBy === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    });
  }, [searchQuery, selectedCategory, activeTab, sortBy]);

  const popularTools = useMemo(() => ALL_TOOLS.filter((t) => t.isPopular).slice(0, 8), []);

  const handleShareTool = (e: React.MouseEvent, tool: MarketplaceTool) => {
    e.stopPropagation();
    e.preventDefault();
    if (typeof window !== "undefined") {
      const fullUrl = `${window.location.origin}${tool.href}`;
      navigator.clipboard.writeText(fullUrl);
      setCopiedId(tool.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8EEE8] text-[#171717] font-sans antialiased selection:bg-[#FF5400] selection:text-white relative overflow-x-hidden">
      {/* ── HERO SECTION (Two26 Studio Aesthetic) ────────────────────── */}
      <section className="relative pt-8 sm:pt-16 pb-16 sm:pb-24 px-4 sm:px-8 max-w-7xl mx-auto">
        {/* Decorative Background Curved Ribbon SVG */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-full pointer-events-none opacity-20 -z-10">
          <svg viewBox="0 0 1000 600" fill="none" className="w-full h-full">
            <path
              d="M 50 320 C 260 80, 420 540, 620 280 C 820 60, 960 480, 980 220"
              stroke="#FF5400"
              strokeWidth="28"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="flex flex-col items-center text-center relative">
          {/* Top floating pill badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#171717] bg-[#171717] text-white px-4 py-1.5 text-xs font-bold tracking-wide transform -rotate-2 hover:rotate-0 transition duration-200 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5400]" />
            100% In-Browser Execution • Zero Server Uploads
          </div>

          {/* Giant Hero Headline */}
          <div className="relative w-full max-w-5xl my-4">
            {/* Playful overlapping sticker badge 1 */}
            <div className="absolute -top-4 sm:-top-8 left-2 sm:left-12 z-10 rounded-full border border-[#FF5400] bg-[#F9E2E1] text-[#FF5400] px-3.5 py-1 text-[11px] sm:text-xs font-black uppercase tracking-wider transform -rotate-6 hover:rotate-0 transition shadow-sm cursor-default">
              ✦ No Login Required
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[104px] font-black tracking-tighter uppercase leading-[0.88] text-[#171717]">
              ALL THE TOOLS.
              <br />
              <span className="text-[#FF5400] underline decoration-[#171717]/20 decoration-wavy decoration-2">
                ZERO BULLSHIT.
              </span>
              <br />
              100% PRIVATE.
            </h1>

            {/* Playful overlapping sticker badge 2 */}
            <div className="absolute -bottom-4 sm:-bottom-6 right-2 sm:right-16 z-10 rounded-full border-2 border-[#171717] bg-white text-[#171717] px-4 py-1 text-[11px] sm:text-xs font-black uppercase tracking-wider transform rotate-3 hover:rotate-0 transition shadow-sm cursor-default">
              ✦ Pure Client WASM
            </div>
          </div>

          {/* Subtitle statement */}
          <p className="mt-8 sm:mt-12 text-lg sm:text-2xl text-[#171717]/80 max-w-3xl font-medium leading-snug">
            Over 100+ precision developer utilities, PDF workflows, image compressors, financial
            calculators, and converters. Processed entirely in your browser.
          </p>

          {/* ── Search Bar Hero Box ── */}
          <div id="hero-search-box" className="mt-8 sm:mt-12 w-full max-w-2xl mx-auto">
            <div className="relative flex items-center shadow-lg hover:shadow-xl focus-within:shadow-xl focus-within:border-[#FF5400] transition-all rounded-2xl border-2 border-[#171717] bg-white group">
              <Search className="w-5 h-5 text-neutral-400 group-focus-within:text-[#FF5400] ml-5 shrink-0 transition-colors" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search 100+ tools... (e.g. PDF to Word, Runway, JSON, Password)"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.length === 1) {
                    const el = document.getElementById("all-tools");
                    el?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className="w-full py-4 pl-3.5 pr-20 text-base font-medium text-[#171717] placeholder:text-neutral-400 bg-transparent focus:outline-none rounded-2xl"
              />

              <div className="absolute right-4 flex items-center gap-2">
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="p-1 text-neutral-400 hover:text-[#171717] rounded-md transition cursor-pointer"
                    title="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <kbd className="hidden sm:inline-flex items-center justify-center px-2 py-1 text-xs font-mono font-bold text-neutral-500 bg-neutral-100 border border-neutral-300 rounded-md">
                    /
                  </kbd>
                )}
              </div>
            </div>

            {/* Popular Search Badges */}
            <div className="mt-4 flex items-center justify-center gap-2 flex-wrap text-xs font-mono">
              <span className="font-bold text-[#171717]">Quick Jump:</span>
              {[
                { name: "PDF to Word", cat: "pdf" },
                { name: "PDF to PPTX", cat: "pdf" },
                { name: "Runway Calculator", cat: "finance" },
                { name: "JSON Formatter", cat: "dev" },
                { name: "Image Compressor", cat: "image" },
                { name: "Password Generator", cat: "calc" },
              ].map((pill) => (
                <button
                  key={pill.name}
                  type="button"
                  onClick={() => {
                    setSearchQuery(pill.name);
                    setSelectedCategory("all");
                    const el = document.getElementById("all-tools");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-2.5 py-1 bg-white hover:bg-[#FF5400] hover:text-white text-[#171717] rounded-md border border-[#171717]/20 transition cursor-pointer font-sans text-xs font-semibold"
                >
                  {pill.name}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="mt-14 sm:mt-20 pt-10 border-t border-[#171717]/15 grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-4xl mx-auto text-left sm:text-center">
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-[#FF5400] font-mono">100+</p>
              <p className="text-xs uppercase font-bold text-[#171717]">Free Online Tools</p>
              <p className="text-[11px] text-[#171717]/60">Full browser suites</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-[#171717] font-mono">00</p>
              <p className="text-xs uppercase font-bold text-[#171717]">Remote Uploads</p>
              <p className="text-[11px] text-[#171717]/60">100% Client-Side Privacy</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-[#FF5400] font-mono">00</p>
              <p className="text-xs uppercase font-bold text-[#171717]">Accounts Required</p>
              <p className="text-[11px] text-[#171717]/60">Zero paywalls or friction</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-[#171717] font-mono">&lt;10ms</p>
              <p className="text-xs uppercase font-bold text-[#171717]">Execution Speed</p>
              <p className="text-[11px] text-[#171717]/60">WASM & Web Workers</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MANIFESTO & PHILOSOPHY (Two26 "A Bit About Us" Style) ────── */}
      <section id="philosophy" className="py-20 sm:py-32 px-4 sm:px-8 border-t border-[#171717]/10 bg-[#F3EDE5]">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-start gap-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF5400] bg-[#FF5400]/10 px-3 py-1 rounded-md border border-[#FF5400]/20">
              WHY WE BUILT THIS HUB
            </span>

            <div className="relative mt-4">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#171717] leading-[1.05]">
                WE BELIEVE TOOLS SHOULD RESPECT YOUR DATA.
              </h2>

              <p className="mt-8 text-xl sm:text-3xl text-[#171717]/85 font-medium leading-relaxed">
                Most online converters secretly upload your confidential PDFs, contracts, financials,
                and images to remote third-party servers, trap you behind signup gates, and slap you
                with paywalls. We think that’s broken.
              </p>
              <p className="mt-4 text-lg sm:text-2xl text-[#171717]/70 font-normal leading-relaxed">
                Every tool on Startup Tools Hub runs directly inside your web browser. No cloud
                uploads, no accounts, and no tracking. Fast, private, and forever open.
              </p>
            </div>

            {/* Three whimsical badges like original Two26 */}
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <div className="rounded-full border border-[#171717] bg-[#171717] text-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider transform -rotate-1">
                ✦ Allergic to paywalls
              </div>
              <div className="rounded-full border border-[#FF5400] bg-[#FF5400] text-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider transform rotate-2">
                ✦ Privacy obsessed
              </div>
              <div className="rounded-full border border-[#171717] bg-white text-[#171717] px-4 py-1.5 text-xs font-bold uppercase tracking-wider transform -rotate-2">
                ✦ Pure client WASM
              </div>
            </div>

            {/* 4 Core Architectural Guarantees */}
            <div className="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full pt-12 border-t border-[#171717]/15">
              <div className="space-y-1">
                <span className="text-3xl font-black text-[#FF5400] font-mono">01</span>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#171717]">
                  Local Compute
                </h4>
                <p className="text-xs text-[#171717]/70">
                  PDF rendering, image compression, and formatting happen in browser memory.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-3xl font-black text-[#171717] font-mono">02</span>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#171717]">
                  Financial Precision
                </h4>
                <p className="text-xs text-[#171717]/70">
                  IEEE 754 safe arithmetic for startup runway, SAFE equity & cap tables.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-3xl font-black text-[#FF5400] font-mono">03</span>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#171717]">
                  Instant Zero Queue
                </h4>
                <p className="text-xs text-[#171717]/70">
                  No server waiting rooms or daily conversion quotas. Unlimited throughput.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-3xl font-black text-[#171717] font-mono">04</span>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#171717]">
                  Zero Login Walls
                </h4>
                <p className="text-xs text-[#171717]/70">
                  No email capture, no passwords to forget, no marketing spam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── POPULAR TOOLS SHOWCASE (Two26 Card Grid) ──────────────────── */}
      <section id="popular" className="py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF5400] bg-[#FF5400]/10 px-3 py-1 rounded-md border border-[#FF5400]/20">
              FEATURED SUITES
            </span>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#171717] mt-3">
              PRECISION WORKBENCHES
            </h2>
          </div>
          <a
            href="#all-tools"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#171717] hover:text-[#FF5400] transition group"
          >
            <span>View All 100+ Tools</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
          </a>
        </div>

        {/* Curated Two26 Studio Featured Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Card 1: PDF Studio Workbench */}
          <div className="rounded-3xl border-2 border-[#171717] bg-[#FEECE3] text-[#381E11] p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group shadow-lg hover:shadow-2xl transition-all">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white text-[#FF5400] border border-[#FF5400]/30">
                  01 / DOCUMENT ENGINE
                </span>
                <span className="text-xs font-mono font-bold text-[#FF5400] flex items-center gap-1">
                  ✦ 100% Client-Side
                </span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#171717]">
                PDF Studio Workbench
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[#381E11]/85 leading-relaxed font-medium">
                Split, merge, sign, convert, and compress confidential PDFs in your browser without uploading a single byte to remote servers.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-md bg-white/80 border border-black/10">Merge &amp; Split</span>
                <span className="px-2.5 py-1 rounded-md bg-white/80 border border-black/10">Sign &amp; Annotate</span>
                <span className="px-2.5 py-1 rounded-md bg-white/80 border border-black/10">PDF to PPTX</span>
                <span className="px-2.5 py-1 rounded-md bg-white/80 border border-black/10">PDF to Word</span>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-black/10 flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-800 font-bold">● 19+ In-Browser Tools</span>
              <Link
                href="/tools/pdf/merge-pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#171717] hover:bg-[#FF5400] text-white text-xs font-bold uppercase tracking-wider transition shadow-sm"
              >
                <span>Open Suite</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Founder Runway & SAFE Engine */}
          <div className="rounded-3xl border-2 border-[#171717] bg-[#0F111A] text-[#F1F5F9] p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group shadow-lg hover:shadow-2xl transition-all">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 text-[#818CF8] border border-[#818CF8]/30">
                  02 / VENTURE MATH
                </span>
                <span className="text-xs font-mono font-bold text-[#818CF8] flex items-center gap-1">
                  ✦ IEEE 754 Precision
                </span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
                Runway &amp; SAFE Engine
              </h3>
              <p className="mt-3 text-sm sm:text-base text-neutral-300 leading-relaxed font-medium">
                High-precision financial runway forecasts, post-money SAFE dilution curves, and founder cap table scenarios.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/10">Runway Forecast</span>
                <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/10">SAFE Dilution</span>
                <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/10">Burn Rate</span>
                <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/10">Cap Table</span>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-[#818CF8] font-bold">● Zero Spreadsheets Needed</span>
              <Link
                href="/tools/finance/startup-runway-calculator"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#818CF8] hover:bg-white hover:text-[#0F111A] text-white text-xs font-bold uppercase tracking-wider transition shadow-sm"
              >
                <span>Launch Modeler</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 3: Developer Utilities & WASM Sandbox */}
          <div className="rounded-3xl border-2 border-[#171717] bg-[#F3EDE5] text-[#2B1A12] p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group shadow-lg hover:shadow-2xl transition-all">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white text-[#C25927] border border-[#C25927]/30">
                  03 / DEVELOPER UTILITIES
                </span>
                <span className="text-xs font-mono font-bold text-[#C25927] flex items-center gap-1">
                  ✦ &lt;2ms Latency
                </span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#171717]">
                Developer WASM Workbench
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[#2B1A12]/85 leading-relaxed font-medium">
                Instant JSON formatting, JWT token inspection, Base64 codecs, UUID generators, and cryptographic SHA-256 / MD5 hashing.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-md bg-white/80 border border-black/10">JSON Formatter</span>
                <span className="px-2.5 py-1 rounded-md bg-white/80 border border-black/10">JWT Parser</span>
                <span className="px-2.5 py-1 rounded-md bg-white/80 border border-black/10">Base64 Codec</span>
                <span className="px-2.5 py-1 rounded-md bg-white/80 border border-black/10">UUID / Hasher</span>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-black/10 flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-800 font-bold">● Offline &amp; Telemetry-Free</span>
              <Link
                href="/tools/dev/json-formatter"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#171717] hover:bg-[#FF5400] text-white text-xs font-bold uppercase tracking-wider transition shadow-sm"
              >
                <span>Open Dev Suite</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 4: Client Image & Vector Lab */}
          <div className="rounded-3xl border-2 border-[#171717] bg-[#141517] text-[#F4F4F5] p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group shadow-lg hover:shadow-2xl transition-all">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 text-[#CCFF00] border border-[#CCFF00]/30">
                  04 / GRAPHICS &amp; MEDIA
                </span>
                <span className="text-xs font-mono font-bold text-[#CCFF00] flex items-center gap-1">
                  ✦ Canvas &amp; WebGL
                </span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
                Client Image &amp; Vector Lab
              </h3>
              <p className="mt-3 text-sm sm:text-base text-neutral-300 leading-relaxed font-medium">
                Lossless in-memory image compression, SVG optimization, WebP conversion, and automated brand color palette extraction.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/10">Compressor</span>
                <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/10">Color Palette</span>
                <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/10">Favicon Gen</span>
                <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/10">QR Code</span>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-[#CCFF00] font-bold">● High Fidelity Compression</span>
              <Link
                href="/tools/image/image-compressor"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#CCFF00] hover:bg-white text-[#141517] text-xs font-black uppercase tracking-wider transition shadow-sm"
              >
                <span>Launch Lab</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Popular Essentials Subtitle */}
        <div className="mb-6">
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#171717]">
            COMMUNITY FAVORITES
          </h3>
          <p className="text-xs text-neutral-500 font-mono">Most frequently used utilities this week</p>
        </div>

        {/* Popular Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                onClick={() => setQuickToolModal(tool)}
                className="group cursor-pointer rounded-2xl border-2 border-[#171717]/15 bg-white p-5 flex flex-col justify-between hover:border-[#171717] hover:shadow-xl transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl ${tool.bgColor} flex items-center justify-center border border-black/5`}
                    >
                      <Icon className={`w-5 h-5 ${tool.iconColor}`} />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                      {tool.category}
                    </span>
                  </div>

                  <h3 className="text-base font-bold uppercase text-[#171717] group-hover:text-[#FF5400] transition">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-[#171717]/70 mt-1 line-clamp-2 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#171717]/10 flex items-center justify-between text-xs font-bold">
                  <span className="text-emerald-700 text-[11px] flex items-center gap-1 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> In-Browser
                  </span>
                  <Link
                    href={tool.href}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-[#171717] group-hover:text-[#FF5400] transition"
                  >
                    <span>Launch</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── ALL TOOLS MARKETPLACE DIRECTORY ─────────────────────────── */}
      <section id="all-tools" className="py-20 sm:py-28 px-4 sm:px-8 border-t border-[#171717]/10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF5400] bg-[#FF5400]/10 px-3 py-1 rounded-md border border-[#FF5400]/20">
                COMPLETE DIRECTORY
              </span>
              <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-[#171717] mt-3">
                ALL TOOLS & UTILITIES
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1 font-mono">
                Showing {filteredTools.length} of {ALL_TOOLS.length} utilities
              </p>
            </div>

            {/* Sorting and Filter Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-xl border border-[#171717]/20 p-1 bg-neutral-50 text-xs font-bold">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                    activeTab === "all" ? "bg-[#171717] text-white shadow-xs" : "text-neutral-600"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveTab("popular")}
                  className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                    activeTab === "popular"
                      ? "bg-[#171717] text-white shadow-xs"
                      : "text-neutral-600"
                  }`}
                >
                  Popular
                </button>
                <button
                  onClick={() => setActiveTab("new")}
                  className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                    activeTab === "new" ? "bg-[#171717] text-white shadow-xs" : "text-neutral-600"
                  }`}
                >
                  New
                </button>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 rounded-xl border border-[#171717]/20 bg-white text-xs font-bold text-[#171717] focus:outline-none"
              >
                <option value="popular">Sort by: Popular</option>
                <option value="alphabetical">Sort by: A-Z</option>
                <option value="newest">Sort by: Newest</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 transition cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-[#FF5400] text-white shadow-xs"
                  : "bg-[#F8EEE8] text-[#171717] border border-[#171717]/15 hover:border-[#171717]"
              }`}
            >
              All Categories ({ALL_TOOLS.length})
            </button>
            {CATEGORIES_LIST.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 transition cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-[#FF5400] text-white shadow-xs"
                    : "bg-[#F8EEE8] text-[#171717] border border-[#171717]/15 hover:border-[#171717]"
                }`}
              >
                {cat.title} ({cat.count})
              </button>
            ))}
          </div>

          {/* Filtered Tools Grid */}
          {filteredTools.length === 0 ? (
            <div className="rounded-3xl border-2 border-dashed border-[#171717]/20 p-12 text-center space-y-3">
              <Wrench className="w-8 h-8 text-neutral-400 mx-auto" />
              <h3 className="text-lg font-bold text-[#171717]">No tools matched your search</h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Try searching for different keywords or clear your active category filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-2 px-4 py-2 rounded-xl bg-[#171717] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#FF5400] transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={tool.id}
                    onClick={() => setQuickToolModal(tool)}
                    className="group cursor-pointer rounded-2xl border border-[#171717]/15 bg-white p-5 flex flex-col justify-between hover:border-[#171717] hover:shadow-lg transition-all duration-200"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className={`w-9 h-9 rounded-lg ${tool.bgColor} flex items-center justify-center border border-black/5`}
                        >
                          <Icon className={`w-4 h-4 ${tool.iconColor}`} />
                        </div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                          {tool.category}
                        </span>
                      </div>

                      <h3 className="text-base font-bold uppercase text-[#171717] group-hover:text-[#FF5400] transition">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-[#171717]/70 mt-1 line-clamp-2 leading-relaxed">
                        {tool.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#171717]/10 flex items-center justify-between text-xs font-bold">
                      <button
                        onClick={(e) => handleShareTool(e, tool)}
                        className="text-[11px] font-mono text-neutral-500 hover:text-[#171717] flex items-center gap-1 transition"
                        title="Copy tool link"
                      >
                        {copiedId === tool.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Share</span>
                          </>
                        )}
                      </button>

                      <Link
                        href={tool.href}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-[#171717] group-hover:text-[#FF5400] transition"
                      >
                        <span>Open Tool</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── INTERACTIVE WORKSPACE PLAYGROUND ─────────────────────────── */}
      <section id="playground" className="py-20 sm:py-32 px-4 sm:px-8 bg-[#171717] text-[#F8EEE8]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF5400] bg-[#FF5400]/20 px-3 py-1 rounded-md border border-[#FF5400]/40">
              INSTANT IN-BROWSER WORKSPACE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              TRY A UTILITY LIVE
            </h2>
            <p className="text-neutral-400 text-sm max-w-xl mx-auto">
              Test real client-side execution right here. Zero remote calls.
            </p>

            {/* Playground Tab Pills */}
            <div className="inline-flex items-center rounded-full border border-neutral-700 bg-neutral-900 p-1.5 mt-4">
              <button
                onClick={() => setWorkspaceTab("json")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                  workspaceTab === "json" ? "bg-[#FF5400] text-white shadow-xs" : "text-neutral-400"
                }`}
              >
                JSON Formatter
              </button>
              <button
                onClick={() => setWorkspaceTab("password")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                  workspaceTab === "password"
                    ? "bg-[#FF5400] text-white shadow-xs"
                    : "text-neutral-400"
                }`}
              >
                Password Generator
              </button>
              <button
                onClick={() => setWorkspaceTab("qr")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                  workspaceTab === "qr" ? "bg-[#FF5400] text-white shadow-xs" : "text-neutral-400"
                }`}
              >
                QR Generator
              </button>
            </div>
          </div>

          {/* Active Playground Window */}
          <div className="rounded-3xl border border-neutral-700 bg-neutral-900/90 p-6 sm:p-10 shadow-2xl">
            {/* 1. JSON Formatter */}
            {workspaceTab === "json" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pb-2 border-b border-neutral-800">
                  <span>Input JSON</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleFormatJson}
                      className="px-3 py-1 rounded-lg bg-[#FF5400] text-white font-bold hover:bg-[#e04a00] transition cursor-pointer"
                    >
                      Beautify
                    </button>
                    <button
                      onClick={handleMinifyJson}
                      className="px-3 py-1 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white transition cursor-pointer"
                    >
                      Minify
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                  <textarea
                    rows={8}
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    className="w-full rounded-xl bg-black/60 border border-neutral-800 p-4 text-emerald-400 focus:outline-none focus:border-[#FF5400]"
                  />
                  <div className="rounded-xl bg-black/60 border border-neutral-800 p-4 relative overflow-y-auto max-h-[200px]">
                    {jsonError ? (
                      <p className="text-rose-400">{jsonError}</p>
                    ) : (
                      <pre className="text-neutral-300 whitespace-pre-wrap">
                        {jsonOutput || "Click Beautify to format output..."}
                      </pre>
                    )}
                    {jsonOutput && (
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(jsonOutput);
                          setJsonCopied(true);
                          setTimeout(() => setJsonCopied(false), 2000);
                        }}
                        className="absolute top-3 right-3 px-2 py-1 bg-neutral-800 hover:bg-neutral-700 text-white rounded text-[11px]"
                      >
                        {jsonCopied ? "Copied" : "Copy"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 2. Password Generator */}
            {workspaceTab === "password" && (
              <div className="space-y-6 max-w-xl mx-auto text-center">
                <div className="p-4 rounded-2xl bg-black/70 border border-neutral-800 flex items-center justify-between gap-3 font-mono text-lg text-emerald-400">
                  <span className="truncate">{generatedPwd}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedPwd);
                      setPwdCopied(true);
                      setTimeout(() => setPwdCopied(false), 2000);
                    }}
                    className="px-3 py-1.5 bg-[#FF5400] text-white rounded-lg text-xs font-bold hover:bg-[#e04a00] transition cursor-pointer shrink-0"
                  >
                    {pwdCopied ? "Copied!" : "Copy"}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-4 text-xs font-mono">
                  <span>Length: {pwdLength}</span>
                  <input
                    type="range"
                    min="8"
                    max="32"
                    value={pwdLength}
                    onChange={(e) => setPwdLength(Number(e.target.value))}
                    className="accent-[#FF5400]"
                  />
                  <button
                    onClick={handleGeneratePassword}
                    className="px-3 py-1 rounded bg-neutral-800 text-white hover:bg-neutral-700 transition"
                  >
                    Regenerate
                  </button>
                </div>
              </div>
            )}

            {/* 3. QR Generator */}
            {workspaceTab === "qr" && (
              <div className="space-y-6 max-w-md mx-auto text-center">
                <input
                  type="text"
                  value={qrText}
                  onChange={(e) => setQrText(e.target.value)}
                  placeholder="Enter URL or text..."
                  className="w-full py-3 px-4 rounded-xl bg-black/60 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#FF5400]"
                />
                <div className="p-6 rounded-2xl bg-white w-48 h-48 mx-auto flex items-center justify-center shadow-md">
                  <div className="text-center text-xs font-mono text-neutral-800 space-y-1">
                    <QrCode className="w-24 h-24 mx-auto text-[#171717]" />
                    <span className="text-[10px] text-neutral-500 truncate block max-w-[140px]">
                      {qrText}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── CALL TO ACTION (Two26 Studio Dark Mode) ────────── */}
      <section className="bg-[#141414] text-[#F8EEE8] pt-20 sm:pt-32 pb-12 px-4 sm:px-8 border-t border-[#262626]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF5400] bg-[#FF5400]/15 px-3 py-1.5 rounded-full border border-[#FF5400]/30 inline-block">
              HAVE A TOOL REQUEST?
            </span>

            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-white leading-[0.88]">
              LET’S BUILD IT.
            </h2>

            <p className="text-neutral-400 text-base sm:text-xl max-w-xl mx-auto font-medium">
              We add new in-browser developer and business tools every week. Open source, privacy
              first, and always free.
            </p>

            {/* Action buttons */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://github.com/Procoder1234556/startup-tools-hub"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#FF5400] hover:bg-[#e04a00] text-white px-8 py-4 text-sm font-bold uppercase tracking-wider transition shadow-lg"
              >
                <span>GitHub Repository</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#all-tools"
                className="inline-flex items-center gap-2 rounded-full border-2 border-neutral-700 hover:border-white bg-transparent text-white px-6 py-4 text-sm font-bold uppercase tracking-wider transition"
              >
                <span>Browse Directory</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK TOOL PREVIEW DIALOG ─────────────────────────────────── */}
      {quickToolModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#171717]/20 p-6 sm:p-8 relative">
            <button
              onClick={() => setQuickToolModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-100 hover:bg-[#171717] hover:text-white transition flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl ${quickToolModal.bgColor} flex items-center justify-center`}
                >
                  {(() => {
                    const ModalIcon = quickToolModal.icon;
                    return <ModalIcon className={`w-6 h-6 ${quickToolModal.iconColor}`} />;
                  })()}
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF5400]">
                    {quickToolModal.category}
                  </span>
                  <h3 className="text-2xl font-black uppercase text-[#171717]">
                    {quickToolModal.name}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-neutral-700 leading-relaxed">
                {quickToolModal.description}
              </p>

              {/* Features list */}
              {quickToolModal.features && quickToolModal.features.length > 0 && (
                <div className="p-4 rounded-xl bg-[#F8EEE8] border border-[#171717]/10 space-y-2">
                  <span className="text-xs font-mono font-bold uppercase text-[#171717] block">
                    Key Features:
                  </span>
                  <ul className="text-xs text-neutral-700 space-y-1">
                    {quickToolModal.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#FF5400] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  100% In-Browser Privacy
                </span>
                <Link
                  href={quickToolModal.href}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#171717] hover:bg-[#FF5400] text-white text-xs font-bold uppercase tracking-wider transition shadow-sm"
                >
                  <span>Launch Tool</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
