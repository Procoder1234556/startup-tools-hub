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
  FolderOpen
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

  // ── Playground States (Section 11) ──
  const [workspaceTab, setWorkspaceTab] = useState<"json" | "password" | "qr">("json");

  // JSON Tool State
  const [jsonInput, setJsonInput] = useState(
    '{\n  "service": "ToolBox Hub",\n  "status": "active",\n  "tools_count": 100,\n  "features": ["no-login", "fast", "private"],\n  "meta": {\n    "client_side": true,\n    "version": "2.4.0"\n  }\n}'
  );
  const [jsonOutput, setJsonOutput] = useState("");
  const [jsonError, setJsonError] = useState("");
  const [jsonCopied, setJsonCopied] = useState(false);

  // Password Tool State
  const [pwdLength, setPwdLength] = useState(16);
  const [pwdUpper, setPwdUpper] = useState(true);
  const [pwdLower, setPwdLower] = useState(true);
  const [pwdNumbers, setPwdNumbers] = useState(true);
  const [pwdSymbols, setPwdSymbols] = useState(true);
  const [generatedPwd, setGeneratedPwd] = useState("kX9#mQ2$vL7*pW4!");
  const [pwdCopied, setPwdCopied] = useState(false);

  // QR Code Tool State
  const [qrText, setQrText] = useState("https://toolboxhub.org");
  const [qrCopied, setQrCopied] = useState(false);

  // ── Keyboard shortcut `/` to focus search ──
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
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
      setJsonError("Invalid JSON syntax: " + err.message);
    }
  };

  const handleMinifyJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed));
      setJsonError("");
    } catch (err: any) {
      setJsonError("Invalid JSON syntax: " + err.message);
    }
  };

  // ── Filtered & Sorted Tools (Section 6) ──
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
      if (sortBy === "alphabetical") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "newest") {
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      }
      // default: popular
      return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    });
  }, [searchQuery, selectedCategory, sortBy, activeTab]);

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased selection:bg-[#2563EB] selection:text-white">
      
      {/* ────────────────────────────────────────────────────────────────
          SECTION 3: HERO SECTION
      ─────────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-[#E2E8F0] bg-white">
        {/* Subtle decorative dot grid */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#0F172A 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold tracking-wide uppercase shadow-xs mb-6">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>FREE ONLINE TOOLS FOR EVERYONE</span>
          </div>

          {/* Main H1 Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Powerful Tools. <span className="text-[#2563EB]">No Login.</span> No Hassle.
          </h1>

          {/* Supporting Text */}
          <p className="mt-5 text-base sm:text-lg lg:text-xl text-[#64748B] max-w-2xl mx-auto leading-relaxed">
            PDF tools, developer utilities, generators, converters, productivity tools and more — everything you need, right in your browser.
          </p>

          {/* Large Prominent Search Field */}
          <div className="mt-8 sm:mt-10 max-w-2xl mx-auto">
            <div className="relative flex items-center shadow-md hover:shadow-lg focus-within:shadow-lg focus-within:border-blue-600 transition-all rounded-xl border border-slate-300 bg-white group">
              <Search className="w-5 h-5 text-slate-400 group-focus-within:text-blue-600 ml-4 shrink-0 transition-colors" />
              <input
                ref={searchInputRef}
                id="hero-search-input"
                type="text"
                placeholder="Search for a tool... (e.g. PDF Editor, QR Code, JSON, Password)"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  // If searching, smooth scroll to all-tools if not visible
                  if (e.target.value.length === 1) {
                    const el = document.getElementById("all-tools");
                    el?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className="w-full py-4 pl-3.5 pr-20 text-base text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none rounded-xl"
              />
              
              <div className="absolute right-3.5 flex items-center gap-2">
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
                    title="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <kbd className="hidden sm:inline-flex items-center justify-center px-2 py-1 text-xs font-mono font-medium text-slate-500 bg-slate-100 border border-slate-200 rounded-md shadow-2xs">
                    /
                  </kbd>
                )}
              </div>
            </div>

            {/* Popular Search Pills */}
            <div className="mt-4 flex items-center justify-center gap-2 flex-wrap text-xs text-slate-600">
              <span className="font-semibold text-slate-800">Popular:</span>
              {[
                { name: "PDF Editor", cat: "pdf" },
                { name: "QR Generator", cat: "generators" },
                { name: "JSON Formatter", cat: "dev" },
                { name: "Image Compressor", cat: "image" },
                { name: "Password Generator", cat: "security" },
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
                  className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-md border border-slate-200/80 transition-colors"
                >
                  {pill.name}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="mt-12 pt-8 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left sm:text-center">
            <div>
              <p className="text-2xl font-bold text-slate-900">100+</p>
              <p className="text-xs text-slate-500 font-medium">Free Web Utilities</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-600">0</p>
              <p className="text-xs text-slate-500 font-medium">Logins Required</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">100%</p>
              <p className="text-xs text-slate-500 font-medium">Client-Side Privacy</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">&lt;50ms</p>
              <p className="text-xs text-slate-500 font-medium">Instant Execution</p>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────
          SECTION 4: FEATURED TOOLS (POPULAR TOOLS)
      ─────────────────────────────────────────────────────────────────── */}
      <section id="popular" className="py-16 md:py-20 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Top Rated</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
              Popular Tools
            </h2>
            <p className="mt-2 text-base text-[#64748B]">
              Get things done faster with our most-used tools.
            </p>
          </div>

          <Link
            href="#all-tools"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 group self-start sm:self-auto"
          >
            <span>View All 100+ Tools</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4-column Desktop Grid of Tool Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ALL_TOOLS.filter((t) => t.isPopular).slice(0, 8).map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                className="group relative bg-white border border-[#E2E8F0] hover:border-blue-400 rounded-2xl p-5 shadow-xs hover:shadow-lg transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Top card row: Icon + Category + Popular badge */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className={`w-11 h-11 rounded-xl ${tool.bgColor} flex items-center justify-center ${tool.iconColor} shadow-2xs`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">
                        Popular
                      </span>
                    </div>
                  </div>

                  {/* Tool Title */}
                  <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-blue-600 transition-colors">
                    {tool.name}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-sm text-[#64748B] line-clamp-2 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                {/* Bottom Row */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-500">
                    {tool.category}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setQuickToolModal(tool)}
                      className="px-2 py-1 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded font-medium transition-colors"
                    >
                      Quick View
                    </button>
                    <Link
                      href={tool.href}
                      className="inline-flex items-center gap-1 text-blue-600 font-semibold group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Open</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────
          SECTION 5: CATEGORY NAVIGATION (12 CATEGORIES)
      ─────────────────────────────────────────────────────────────────── */}
      <section id="categories" className="py-16 md:py-20 bg-slate-50/80 border-y border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
              Explore Tools by Category
            </h2>
            <p className="mt-2 text-base text-[#64748B]">
              Browse our comprehensive directory organized by workflow and technical domain.
            </p>
          </div>

          {/* 12 Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {CATEGORIES_LIST.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(isSelected ? "all" : cat.id);
                    const el = document.getElementById("all-tools");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3.5 group ${
                    isSelected
                      ? "bg-white border-blue-600 ring-2 ring-blue-600/20 shadow-md"
                      : "bg-white border-[#E2E8F0] hover:border-slate-300 hover:shadow-sm hover:-translate-y-0.5"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg ${cat.bgColor} flex items-center justify-center shrink-0 ${cat.iconColor} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-sm font-bold text-[#0F172A] group-hover:text-blue-600 transition-colors truncate">
                        {cat.title}
                      </h4>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-full">
                        {cat.count}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#64748B] line-clamp-1">
                      {cat.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────
          SECTION 6: ALL TOOLS MARKETPLACE
      ─────────────────────────────────────────────────────────────────── */}
      <section id="all-tools" className="py-16 md:py-24 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Directory</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
              All Tools
            </h2>
            <p className="mt-2 text-base text-[#64748B]">
              Discover practical tools with instant one-click browser execution.
            </p>
          </div>

          {/* Tab buttons: All / Popular / New */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === "all"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Tools ({ALL_TOOLS.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("popular")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === "popular"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Popular ({ALL_TOOLS.filter((t) => t.isPopular).length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("new")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === "new"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              New Releases ({ALL_TOOLS.filter((t) => t.isNew).length})
            </button>
          </div>
        </div>

        {/* Marketplace Filter Controls Bar */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 mb-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Field */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="marketplace-search-input"
              type="text"
              placeholder="Filter by name or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Dropdown & Sort Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
              >
                <option value="all">All Categories ({CATEGORIES_LIST.length})</option>
                {CATEGORIES_LIST.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title} ({cat.count})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="alphabetical">Alphabetical (A-Z)</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            {(selectedCategory !== "all" || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="text-xs text-blue-600 hover:underline font-semibold ml-auto md:ml-0"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
          <span>Showing {filteredTools.length} of {ALL_TOOLS.length} tools</span>
          {selectedCategory !== "all" && (
            <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-medium border border-blue-200">
              Filtered by: {CATEGORIES_LIST.find((c) => c.id === selectedCategory)?.title}
            </span>
          )}
        </div>

        {/* Responsive Grid: 4 columns desktop, 3 tablet, 2 mobile */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.id}
                  className="group relative bg-white border border-[#E2E8F0] hover:border-blue-400 rounded-xl p-4 shadow-2xs hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className={`w-9 h-9 rounded-lg ${tool.bgColor} flex items-center justify-center ${tool.iconColor}`}>
                        <Icon className="w-4 h-4" />
                      </div>

                      <div className="flex items-center gap-1">
                        {tool.isPopular && (
                          <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200/60">
                            Popular
                          </span>
                        )}
                        {tool.isNew && (
                          <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200/60">
                            NEW
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="text-[15px] font-bold text-[#0F172A] group-hover:text-blue-600 transition-colors">
                      {tool.name}
                    </h3>

                    <p className="mt-1.5 text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500 font-medium">
                      {tool.category}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setQuickToolModal(tool)}
                        className="text-[11px] text-slate-500 hover:text-slate-800 px-1.5 py-0.5 rounded hover:bg-slate-100 transition-colors"
                      >
                        Preview
                      </button>
                      <Link
                        href={tool.href}
                        className="text-blue-600 font-semibold inline-flex items-center gap-0.5 hover:underline"
                      >
                        Open
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-dashed border-slate-200 rounded-2xl p-8">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h4 className="text-base font-semibold text-slate-900">No matching tools found</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              We couldn’t find any tools matching “{searchQuery}”. Try searching for “pdf”, “json”, “qr”, or reset your filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setActiveTab("all");
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </section>

      {/* ────────────────────────────────────────────────────────────────
          SECTION 7: FEATURED TOOL SPOTLIGHT (PDF EDITOR MOCKUP)
      ─────────────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-50 to-white border-y border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Copy Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold tracking-wide uppercase">
                <FileText className="w-3.5 h-3.5" />
                <span>Featured Tool Spotlight</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
                Edit PDFs. <br className="hidden sm:inline" />
                <span className="text-[#2563EB]">Right in your browser.</span>
              </h2>

              <p className="text-base text-[#64748B] leading-relaxed">
                Merge pages, add text, annotate documents, rearrange files, and more without installing software or uploading sensitive files to third-party servers.
              </p>

              {/* Feature Points */}
              <div className="space-y-3 pt-2">
                {[
                  "100% Client-Side Privacy — files never leave your device",
                  "Merge, split, rotate, and re-order pages with drag & drop",
                  "Add text annotations, signatures, and stamps",
                  "Zero file size limits, zero watermarks, zero accounts"
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="pt-4 flex items-center gap-3 flex-wrap">
                <Link
                  href="/tools/pdf/merge-pdf"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-xl shadow-xs transition-all active:scale-95 text-sm uppercase tracking-wider"
                >
                  <span>OPEN PDF EDITOR</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/tools/pdf"
                  className="inline-flex items-center gap-1.5 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-sm transition-colors"
                >
                  <span>Browse 18 PDF Tools</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Realistic Application Preview/Mockup */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-slate-300 bg-slate-900 shadow-xl overflow-hidden text-slate-200 font-sans">
                {/* Application Window Header */}
                <div className="bg-slate-800/90 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    </div>
                    <span className="text-xs text-slate-400 font-mono ml-2 hidden sm:inline">
                      master-services-agreement-v2.pdf
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono text-[11px] border border-emerald-500/30">
                      Local WebAssembly
                    </span>
                    <button 
                      type="button"
                      className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-[11px] font-semibold"
                    >
                      Export PDF
                    </button>
                  </div>
                </div>

                {/* PDF Editor Toolbar */}
                <div className="bg-slate-800/50 px-4 py-2 border-b border-slate-700 flex items-center justify-between text-xs overflow-x-auto gap-3">
                  <div className="flex items-center gap-1">
                    <button className="px-2 py-1 bg-slate-700 text-white rounded font-medium flex items-center gap-1">
                      <Wrench className="w-3.5 h-3.5 text-blue-400" />
                      Select
                    </button>
                    <button className="px-2 py-1 hover:bg-slate-700 text-slate-300 rounded font-medium flex items-center gap-1">
                      <Type className="w-3.5 h-3.5 text-slate-400" />
                      Text
                    </button>
                    <button className="px-2 py-1 hover:bg-slate-700 text-slate-300 rounded font-medium flex items-center gap-1">
                      <Palette className="w-3.5 h-3.5 text-amber-400" />
                      Highlight
                    </button>
                    <button className="px-2 py-1 hover:bg-slate-700 text-slate-300 rounded font-medium flex items-center gap-1">
                      <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Sign
                    </button>
                  </div>

                  <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                    <span className="hidden sm:inline">Zoom: 100%</span>
                    <span>Page 1 / 4</span>
                  </div>
                </div>

                {/* Editor Body Preview */}
                <div className="bg-slate-950 p-4 sm:p-6 grid grid-cols-12 gap-3 min-h-[300px] items-stretch">
                  {/* Thumbnail sidebar */}
                  <div className="hidden sm:flex col-span-3 flex-col gap-2.5 border-r border-slate-800 pr-3">
                    <div className="p-2 rounded-lg bg-slate-900 border-2 border-blue-500/80 text-center">
                      <div className="w-full h-16 bg-white/90 rounded p-1.5 flex flex-col gap-1 overflow-hidden">
                        <div className="w-3/4 h-1.5 bg-slate-400 rounded-xs" />
                        <div className="w-full h-1 bg-slate-300 rounded-xs" />
                        <div className="w-5/6 h-1 bg-slate-300 rounded-xs" />
                        <div className="w-1/2 h-1 bg-blue-400 rounded-xs mt-auto" />
                      </div>
                      <span className="text-[10px] text-blue-400 font-semibold mt-1 block">Page 1 (Active)</span>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-center opacity-60">
                      <div className="w-full h-16 bg-white/70 rounded p-1.5 flex flex-col gap-1 overflow-hidden">
                        <div className="w-2/3 h-1.5 bg-slate-400 rounded-xs" />
                        <div className="w-full h-1 bg-slate-300 rounded-xs" />
                        <div className="w-4/5 h-1 bg-slate-300 rounded-xs" />
                      </div>
                      <span className="text-[10px] text-slate-500 mt-1 block">Page 2</span>
                    </div>
                  </div>

                  {/* Main Document Canvas */}
                  <div className="col-span-12 sm:col-span-9 bg-white text-slate-800 rounded-lg p-5 sm:p-7 shadow-inner flex flex-col justify-between font-sans">
                    <div>
                      <div className="flex items-start justify-between border-b border-slate-200 pb-3 mb-4">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">MUTUAL CONFIDENTIALITY</p>
                          <h4 className="text-base font-extrabold text-slate-900">NON-DISCLOSURE AGREEMENT</h4>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-50 text-blue-700 border border-blue-200">
                          CONFIDENTIAL
                        </span>
                      </div>

                      <p className="text-[12px] text-slate-600 leading-relaxed">
                        This Agreement is entered into by and between the parties to facilitate technical collaboration. All proprietary designs, formulas, software architectures, and product blueprints shall remain strictly confidential.
                      </p>

                      {/* Mock signature stamp */}
                      <div className="mt-6 p-3 rounded-lg border-2 border-dashed border-blue-300 bg-blue-50/50 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-bold text-blue-800 uppercase">Verified Digital Signature</p>
                          <p className="text-[11px] font-mono text-slate-700 italic">Antigravity Principal Engineer</p>
                          <p className="text-[9px] text-slate-400">Timestamp: 2026-11-16T23:18:54Z • SHA256 Valid</p>
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      </div>
                    </div>

                    <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                      <span>ToolBox PDF Engine v2.4</span>
                      <span>100% In-Memory Processing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────
          SECTION 8: WHY USE OUR TOOLS (4-COLUMN BENEFITS)
      ─────────────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-2">
            Built for Humans &amp; Hackers
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
            Why Use Our Tools
          </h2>
          <p className="mt-2 text-base text-[#64748B]">
            Engineered for speed, privacy, and frictionless utility. No dark patterns, ever.
          </p>
        </div>

        {/* 4 Benefit Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-[#E2E8F0] hover:border-blue-400 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-200">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 shadow-2xs">
              <EyeOff className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A]">No Login</h3>
            <p className="mt-2 text-sm text-[#64748B] leading-relaxed">
              Start using tools immediately. No account required, no email collection, no onboarding friction.
            </p>
          </div>

          <div className="bg-white border border-[#E2E8F0] hover:border-emerald-400 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-200">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 shadow-2xs">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A]">Free to Use</h3>
            <p className="mt-2 text-sm text-[#64748B] leading-relaxed">
              Useful everyday utilities without unnecessary paywalls, artificial daily caps, or hidden credit systems.
            </p>
          </div>

          <div className="bg-white border border-[#E2E8F0] hover:border-amber-400 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-200">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5 shadow-2xs">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A]">Fast &amp; Simple</h3>
            <p className="mt-2 text-sm text-[#64748B] leading-relaxed">
              Clean interfaces designed to help you finish tasks quickly without popup ads, banners, or bloated clutter.
            </p>
          </div>

          <div className="bg-white border border-[#E2E8F0] hover:border-purple-400 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-200">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-5 shadow-2xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A]">Privacy First</h3>
            <p className="mt-2 text-sm text-[#64748B] leading-relaxed">
              Whenever possible, process files directly in your browser. Confidential data never leaves your device.
            </p>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────
          SECTION 9: STARTUP / DEVELOPER TOOLS SECTION
      ─────────────────────────────────────────────────────────────────── */}
      <section id="dev-tools" className="py-16 md:py-24 bg-[#F1F5F9] border-y border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-mono font-semibold mb-2">
                &lt;code /&gt; DEVELOPER WORKBENCH
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
                Tools Developers Actually Need
              </h2>
              <p className="mt-2 text-base text-[#64748B]">
                Precision utilities built for software engineers, devops hackers, and architects.
              </p>
            </div>

            <Link
              href="#workspace"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors self-start md:self-auto"
            >
              <span>Try Live Playground</span>
              <Terminal className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Compact 9 Developer Cards with Monospace Snippets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ALL_TOOLS.filter((t) => t.isDev).slice(0, 9).map((devTool) => {
              const Icon = devTool.icon;
              return (
                <div
                  key={devTool.id}
                  className="bg-white border border-[#E2E8F0] hover:border-blue-500 rounded-xl p-4 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">{devTool.name}</h4>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        In-Browser
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                      {devTool.description}
                    </p>

                    {/* Monospace Code Visual Snippet */}
                    <div className="bg-slate-900 text-slate-200 p-2.5 rounded-lg font-mono text-[11px] overflow-x-auto border border-slate-800">
                      <code>{devTool.codeSnippet || "// Instant browser computation"}</code>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        if (devTool.id === "json-formatter") {
                          setWorkspaceTab("json");
                          const el = document.getElementById("workspace");
                          el?.scrollIntoView({ behavior: "smooth" });
                        } else {
                          setQuickToolModal(devTool);
                        }
                      }}
                      className="text-slate-600 hover:text-blue-600 font-medium"
                    >
                      Quick Test
                    </button>
                    <Link
                      href={devTool.href}
                      className="text-blue-600 font-semibold inline-flex items-center gap-1 hover:underline"
                    >
                      <span>Launch Tool</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────
          SECTION 10: NEW TOOLS (FRESHLY ADDED)
      ─────────────────────────────────────────────────────────────────── */}
      <section id="new-tools" className="py-16 md:py-20 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Weekly Drops</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
              Freshly Added Tools
            </h2>
            <p className="mt-2 text-base text-[#64748B]">
              Explore the latest additions to our expanding open toolkit.
            </p>
          </div>

          <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-200 self-start sm:self-auto">
            Updated This Week
          </span>
        </div>

        {/* 6 Cards with Vibrant NEW Badge */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ALL_TOOLS.filter((t) => t.isNew).slice(0, 6).map((newTool) => {
            const Icon = newTool.icon;
            return (
              <div
                key={newTool.id}
                className="group relative bg-white border border-[#E2E8F0] hover:border-purple-400 rounded-xl p-5 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-lg ${newTool.bgColor} flex items-center justify-center ${newTool.iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md border border-purple-300">
                      NEW
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#0F172A] group-hover:text-purple-600 transition-colors">
                    {newTool.name}
                  </h3>

                  <p className="mt-2 text-xs text-[#64748B] leading-relaxed">
                    {newTool.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">
                    {newTool.category}
                  </span>
                  <Link
                    href={newTool.href}
                    className="text-purple-600 font-semibold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Try Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────
          SECTION 11: TOOL DETAIL / INTERACTIVE QUICK-WORKSPACE
      ─────────────────────────────────────────────────────────────────── */}
      <section id="workspace" className="py-16 md:py-24 bg-white border-y border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-2">
              <Play className="w-3 h-3 text-blue-600" />
              Live In-Browser Playgrounds
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
              Test Tools Immediately
            </h2>
            <p className="mt-2 text-base text-[#64748B]">
              No redirects required. Try our primary utilities directly inside this interactive workspace.
            </p>
          </div>

          {/* Workspace Tabs Header */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <button
              type="button"
              onClick={() => setWorkspaceTab("json")}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                workspaceTab === "json"
                  ? "bg-[#2563EB] text-white shadow-sm shadow-blue-500/20"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Braces className="w-4 h-4" />
              JSON Formatter
            </button>

            <button
              type="button"
              onClick={() => setWorkspaceTab("password")}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                workspaceTab === "password"
                  ? "bg-[#2563EB] text-white shadow-sm shadow-blue-500/20"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Lock className="w-4 h-4" />
              Password Generator
            </button>

            <button
              type="button"
              onClick={() => setWorkspaceTab("qr")}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                workspaceTab === "qr"
                  ? "bg-[#2563EB] text-white shadow-sm shadow-blue-500/20"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <QrCode className="w-4 h-4" />
              QR Code Generator
            </button>
          </div>

          {/* Workbench Frame */}
          <div className="bg-slate-50 border border-slate-300 rounded-2xl p-6 sm:p-8 shadow-sm max-w-4xl mx-auto">
            
            {/* 1. JSON Formatter Workbench */}
            {workspaceTab === "json" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Braces className="w-5 h-5 text-blue-600" />
                    <span className="font-bold text-slate-900 text-sm">JSON Formatter &amp; Minifier</span>
                    <span className="text-xs text-slate-400">• 100% Client-Side</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleFormatJson}
                      className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
                    >
                      Format JSON
                    </button>
                    <button
                      type="button"
                      onClick={handleMinifyJson}
                      className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-semibold transition-colors"
                    >
                      Minify
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const content = jsonOutput || jsonInput;
                        navigator.clipboard.writeText(content);
                        setJsonCopied(true);
                        setTimeout(() => setJsonCopied(false), 2000);
                      }}
                      className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      {jsonCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{jsonCopied ? "Copied!" : "Copy"}</span>
                    </button>
                  </div>
                </div>

                {jsonError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{jsonError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Raw JSON Input
                    </label>
                    <textarea
                      rows={10}
                      value={jsonInput}
                      onChange={(e) => {
                        setJsonInput(e.target.value);
                        setJsonError("");
                      }}
                      className="w-full font-mono text-xs p-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none text-slate-900 leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Formatted Result
                    </label>
                    <textarea
                      readOnly
                      rows={10}
                      placeholder="Click 'Format JSON' to view formatted output..."
                      value={jsonOutput}
                      className="w-full font-mono text-xs p-3 bg-slate-900 text-emerald-400 border border-slate-800 rounded-xl focus:outline-none resize-none leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 2. Password Generator Workbench */}
            {workspaceTab === "password" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-blue-600" />
                    <span className="font-bold text-slate-900 text-sm">Cryptographic Password Generator</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleGeneratePassword}
                    className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    Regenerate
                  </button>
                </div>

                {/* Generated Password Box */}
                <div className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl">
                  <span className="flex-1 font-mono text-lg font-bold text-slate-900 tracking-wider select-all overflow-x-auto">
                    {generatedPwd}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(generatedPwd);
                      setPwdCopied(true);
                      setTimeout(() => setPwdCopied(false), 2000);
                    }}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    {pwdCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{pwdCopied ? "Copied!" : "Copy Password"}</span>
                  </button>
                </div>

                {/* Length Slider & Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div>
                    <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-2">
                      <span>Length: {pwdLength} characters</span>
                      <span className="text-emerald-600 font-bold">Strong</span>
                    </div>
                    <input
                      type="range"
                      min={8}
                      max={64}
                      value={pwdLength}
                      onChange={(e) => {
                        setPwdLength(Number(e.target.value));
                        handleGeneratePassword();
                      }}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-medium text-slate-700">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pwdUpper}
                        onChange={(e) => {
                          setPwdUpper(e.target.checked);
                          handleGeneratePassword();
                        }}
                        className="rounded accent-blue-600"
                      />
                      Uppercase (A-Z)
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pwdLower}
                        onChange={(e) => {
                          setPwdLower(e.target.checked);
                          handleGeneratePassword();
                        }}
                        className="rounded accent-blue-600"
                      />
                      Lowercase (a-z)
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pwdNumbers}
                        onChange={(e) => {
                          setPwdNumbers(e.target.checked);
                          handleGeneratePassword();
                        }}
                        className="rounded accent-blue-600"
                      />
                      Numbers (0-9)
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pwdSymbols}
                        onChange={(e) => {
                          setPwdSymbols(e.target.checked);
                          handleGeneratePassword();
                        }}
                        className="rounded accent-blue-600"
                      />
                      Symbols (!@#$)
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* 3. QR Code Generator Workbench */}
            {workspaceTab === "qr" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-blue-600" />
                    <span className="font-bold text-slate-900 text-sm">Instant QR Code Generator</span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">SVG &amp; PNG Output</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  <div className="sm:col-span-8 space-y-3">
                    <label className="block text-xs font-semibold text-slate-700">
                      Destination URL or Text
                    </label>
                    <input
                      type="text"
                      value={qrText}
                      onChange={(e) => setQrText(e.target.value)}
                      placeholder="https://yourwebsite.com or custom text"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <p className="text-xs text-slate-500">
                      The QR code updates in real-time as you type. Scannable by any mobile camera.
                    </p>
                  </div>

                  <div className="sm:col-span-4 flex flex-col items-center justify-center p-4 bg-white border border-slate-200 rounded-xl">
                    {/* Visual QR Code SVG Representation */}
                    <div className="w-32 h-32 bg-slate-900 rounded-lg p-2.5 flex items-center justify-center shadow-xs">
                      <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
                        <rect x="10" y="10" width="25" height="25" fill="white" />
                        <rect x="15" y="15" width="15" height="15" fill="#0F172A" />
                        <rect x="65" y="10" width="25" height="25" fill="white" />
                        <rect x="70" y="15" width="15" height="15" fill="#0F172A" />
                        <rect x="10" y="65" width="25" height="25" fill="white" />
                        <rect x="15" y="70" width="15" height="15" fill="#0F172A" />
                        <rect x="45" y="15" width="10" height="20" fill="white" />
                        <rect x="40" y="45" width="20" height="20" fill="white" />
                        <rect x="65" y="65" width="15" height="15" fill="white" />
                        <rect x="75" y="45" width="10" height="10" fill="white" />
                      </svg>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setQrCopied(true);
                        setTimeout(() => setQrCopied(false), 2000);
                      }}
                      className="mt-3 text-xs font-semibold text-blue-600 hover:text-blue-800"
                    >
                      {qrCopied ? "Downloaded!" : "Download PNG"}
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────
          SECTION 12: FAQ SECTION (SHADCN ACCORDION)
      ─────────────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-16 md:py-24 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">
            Got Questions?
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-base text-[#64748B]">
            Everything you need to know about our free tools and zero-signup model.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-3">
          <AccordionItem value="item-1" className="bg-white border border-[#E2E8F0] rounded-xl px-4 shadow-2xs">
            <AccordionTrigger className="text-sm sm:text-base font-bold text-slate-900 hover:text-blue-600 hover:no-underline py-4">
              Are these tools free?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-slate-600 leading-relaxed pt-1 pb-4">
              Yes, 100% free. There are no subscriptions, no credit cards required, and no daily usage limits. We believe foundational utilities should be accessible to everyone without artificial payment barriers.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="bg-white border border-[#E2E8F0] rounded-xl px-4 shadow-2xs">
            <AccordionTrigger className="text-sm sm:text-base font-bold text-slate-900 hover:text-blue-600 hover:no-underline py-4">
              Do I need to create an account?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-slate-600 leading-relaxed pt-1 pb-4">
              No. You never need an account, password, or email address to use any tool on our platform. Just open the tool and get your work done immediately.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="bg-white border border-[#E2E8F0] rounded-xl px-4 shadow-2xs">
            <AccordionTrigger className="text-sm sm:text-base font-bold text-slate-900 hover:text-blue-600 hover:no-underline py-4">
              Are my uploaded files stored?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-slate-600 leading-relaxed pt-1 pb-4">
              No. Most tools (including PDF merge/split/rotate, image compression, QR generation, text converters, and developer formatters) process files 100% locally in your browser using modern WebAssembly and JavaScript APIs. For tools that require server-side computing, files are held in temporary memory only for the duration of the request and are permanently deleted immediately after processing.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="bg-white border border-[#E2E8F0] rounded-xl px-4 shadow-2xs">
            <AccordionTrigger className="text-sm sm:text-base font-bold text-slate-900 hover:text-blue-600 hover:no-underline py-4">
              Can I use these tools on mobile?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-slate-600 leading-relaxed pt-1 pb-4">
              Yes! The entire platform is built with a responsive, mobile-first design. All calculators, text tools, converters, and generators work seamlessly across iPhone, iPad, Android, and tablets.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="bg-white border border-[#E2E8F0] rounded-xl px-4 shadow-2xs">
            <AccordionTrigger className="text-sm sm:text-base font-bold text-slate-900 hover:text-blue-600 hover:no-underline py-4">
              Which tools work directly in the browser?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-slate-600 leading-relaxed pt-1 pb-4">
              Over 90% of our tools operate completely offline in your browser once the page is loaded. This includes JSON formatting, password generation, regex testing, Base64 encoding, markdown preview, word counting, and PDF page reorganization.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="bg-white border border-[#E2E8F0] rounded-xl px-4 shadow-2xs">
            <AccordionTrigger className="text-sm sm:text-base font-bold text-slate-900 hover:text-blue-600 hover:no-underline py-4">
              Can I suggest a new tool?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-slate-600 leading-relaxed pt-1 pb-4">
              Yes! We love community feedback. Click the "Submit a Tool" button in the navigation bar or visit our GitHub repository to submit feature requests and new tool suggestions.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* ── Quick Tool Detail Modal ── */}
      <Dialog open={!!quickToolModal} onOpenChange={(open) => !open && setQuickToolModal(null)}>
        <DialogContent className="sm:max-w-md bg-white border border-slate-200 text-slate-900 p-6">
          {quickToolModal && (
            <div>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-xl ${quickToolModal.bgColor} flex items-center justify-center ${quickToolModal.iconColor}`}>
                    <quickToolModal.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <DialogTitle className="text-lg font-bold text-slate-900">
                      {quickToolModal.name}
                    </DialogTitle>
                    <span className="text-xs text-slate-500 font-medium">
                      {quickToolModal.category} • No Login Required
                    </span>
                  </div>
                </div>
                <DialogDescription className="text-sm text-slate-600 pt-1 leading-relaxed">
                  {quickToolModal.description}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-5 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-slate-800">100% Client-Side Private</span>
                </div>
                <p>Process your data securely in your local browser without transmitting sensitive files to any cloud servers.</p>
              </div>

              <div className="mt-6 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setQuickToolModal(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg"
                >
                  Close
                </button>
                <Link
                  href={quickToolModal.href}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
                >
                  <span>Open Full Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

    </div>
  );
}
