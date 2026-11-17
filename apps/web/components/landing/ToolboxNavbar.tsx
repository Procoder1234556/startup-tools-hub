"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  PlusCircle,
  Menu,
  X,
  ArrowUpRight,
  ShieldCheck,
  Check,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface ToolboxNavbarProps {
  onSearchClick?: () => void;
}

export default function ToolboxNavbar({ onSearchClick }: ToolboxNavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [toolName, setToolName] = useState("");
  const [toolUrl, setToolUrl] = useState("");
  const [toolDesc, setToolDesc] = useState("");

  const handleFocusSearch = () => {
    if (onSearchClick) {
      onSearchClick();
    } else {
      const searchBox = document.getElementById("hero-search-box") || document.getElementById("all-tools");
      const searchInput = (document.querySelector('input[type="text"]') as HTMLInputElement) || document.getElementById("marketplace-search-input");
      if (searchBox) {
        searchBox.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 300);
      }
    }
  };

  const handleSubmitTool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!toolName.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSubmitModalOpen(false);
      setToolName("");
      setToolUrl("");
      setToolDesc("");
    }, 2000);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F8EEE8]/90 backdrop-blur-md border-b border-[#171717]/10 transition-all duration-200">
      <div className="max-w-7xl mx-auto flex h-16 sm:h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Brand Identity (Two26 Studio Wordmark) */}
        <div className="flex items-center gap-6 sm:gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5400] rounded-lg"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tighter uppercase text-[#171717] group-hover:text-[#FF5400] transition-colors">
                STARTUP TOOLS
              </span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#FF5400] text-white tracking-widest shadow-xs">
                HUB
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-[#171717]"
            aria-label="Main Navigation"
          >
            <Link
              href="/#all-tools"
              className="hover:text-[#FF5400] transition relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#FF5400] hover:after:w-full after:transition-all"
            >
              All Tools (100+)
            </Link>
            <Link
              href="/#all-tools"
              className="hover:text-[#FF5400] transition relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#FF5400] hover:after:w-full after:transition-all"
            >
              PDF Suite
            </Link>
            <Link
              href="/#popular"
              className="hover:text-[#FF5400] transition relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#FF5400] hover:after:w-full after:transition-all"
            >
              Popular
            </Link>
            <Link
              href="/#playground"
              className="hover:text-[#FF5400] transition relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#FF5400] hover:after:w-full after:transition-all"
            >
              Playground
            </Link>
            <Link
              href="/#philosophy"
              className="hover:text-[#FF5400] transition relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#FF5400] hover:after:w-full after:transition-all"
            >
              Philosophy
            </Link>
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Quick Search Trigger */}
          <button
            type="button"
            onClick={handleFocusSearch}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono font-medium text-[#171717] bg-white border border-[#171717]/20 rounded-full hover:border-[#171717] hover:shadow-sm transition cursor-pointer"
            aria-label="Search tools"
          >
            <Search className="w-3.5 h-3.5 text-neutral-400" />
            <span>Search 100+ tools...</span>
            <kbd className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-mono font-bold text-neutral-500 bg-neutral-100 border border-neutral-300 rounded">
              /
            </kbd>
          </button>

          {/* Submit Tool Trigger */}
          <button
            type="button"
            onClick={() => setSubmitModalOpen(true)}
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#171717] hover:text-[#FF5400] transition cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-[#FF5400]" />
            <span>Suggest Tool</span>
          </button>

          {/* Privacy Pill Badge */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#171717] text-white text-[11px] font-mono font-medium shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>0 Uploads • WASM</span>
          </div>

          {/* Direct CTA */}
          <Link
            href="/#all-tools"
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#171717] hover:bg-[#FF5400] text-white text-xs font-black uppercase tracking-wider transition-all shadow-xs group cursor-pointer"
          >
            <span>Explore</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
          </Link>

          {/* Mobile Menu Hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#171717]/20 bg-white text-[#171717] hover:bg-[#171717] hover:text-white transition cursor-pointer"
                aria-label="Open mobile navigation"
              >
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[360px] bg-[#F8EEE8] border-l border-[#171717]/20 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#171717]/15">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl font-black uppercase tracking-tight text-[#171717]">
                      STARTUP TOOLS
                    </span>
                    <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-[#FF5400] text-white">
                      HUB
                    </span>
                  </div>
                </div>

                {/* Mobile Search Button */}
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      setTimeout(handleFocusSearch, 200);
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 bg-white border border-[#171717]/20 rounded-2xl text-xs font-mono text-[#171717] hover:border-[#171717] transition shadow-xs cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-neutral-400" />
                      Search 100+ tools...
                    </span>
                    <kbd className="px-2 py-0.5 text-[10px] bg-neutral-100 rounded border border-neutral-300">
                      /
                    </kbd>
                  </button>
                </div>

                {/* Mobile Links */}
                <nav className="mt-6 flex flex-col space-y-1 text-sm font-bold uppercase tracking-wider text-[#171717]">
                  <Link
                    href="/#all-tools"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[#171717]/5 transition"
                  >
                    <span>All Tools Catalog</span>
                    <span className="text-xs font-mono font-normal text-neutral-500">100+</span>
                  </Link>
                  <Link
                    href="/#popular"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[#171717]/5 transition"
                  >
                    <span>Popular Tools</span>
                    <span className="text-xs font-mono text-[#FF5400]">✦ TOP</span>
                  </Link>
                  <Link
                    href="/#playground"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[#171717]/5 transition"
                  >
                    <span>Interactive Playground</span>
                    <span className="text-xs font-mono text-emerald-600">LIVE</span>
                  </Link>
                  <Link
                    href="/#philosophy"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[#171717]/5 transition"
                  >
                    <span>Manifesto &amp; Privacy</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[#171717]/5 transition"
                  >
                    <span>About &amp; Principles</span>
                  </Link>
                  <Link
                    href="/two26"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[#171717]/5 transition text-[#FF5400]"
                  >
                    <span>Two26 Studio Case</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </nav>

                <div className="mt-6 pt-6 border-t border-[#171717]/15">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      setSubmitModalOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-full border-2 border-[#171717] bg-white text-xs font-black uppercase tracking-wider text-[#171717] hover:bg-[#171717] hover:text-white transition cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4 text-[#FF5400]" />
                    <span>Suggest a Tool</span>
                  </button>
                </div>
              </div>

              {/* Mobile Drawer Footer */}
              <div className="pt-6 border-t border-[#171717]/15 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-600">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Client-Side • Zero Uploads</span>
                </div>
                <p className="text-[11px] text-neutral-500 font-mono">
                  © {new Date().getFullYear()} Startup Tools Hub
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* ── SUBMIT / SUGGEST TOOL MODAL ──────────────────────────────── */}
      <Dialog open={submitModalOpen} onOpenChange={setSubmitModalOpen}>
        <DialogContent className="max-w-md bg-[#F8EEE8] border-2 border-[#171717] rounded-3xl p-6 sm:p-8">
          <DialogHeader>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#FF5400]">
              <Sparkles className="w-4 h-4" />
              <span>Community Contrib</span>
            </div>
            <DialogTitle className="text-2xl font-black uppercase tracking-tight text-[#171717] mt-1">
              Suggest a Tool
            </DialogTitle>
            <DialogDescription className="text-xs text-neutral-600">
              Know an open-source or in-browser utility that belongs in Startup Tools Hub? Tell us below.
            </DialogDescription>
          </DialogHeader>

          {submitted ? (
            <div className="py-8 text-center space-y-3 animate-in fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-[#171717]">Suggestion Received!</h4>
              <p className="text-xs text-neutral-600">
                Thank you. We review every suggestion for privacy and in-browser WASM compliance.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitTool} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#171717] mb-1">
                  Tool Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SvgOMG or Excalidraw"
                  value={toolName}
                  onChange={(e) => setToolName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#171717]/20 bg-white text-xs text-[#171717] focus:outline-none focus:border-[#FF5400]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#171717] mb-1">
                  Tool URL or GitHub Repository
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/..."
                  value={toolUrl}
                  onChange={(e) => setToolUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#171717]/20 bg-white text-xs text-[#171717] focus:outline-none focus:border-[#FF5400]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#171717] mb-1">
                  Brief Description &amp; Why It Fits
                </label>
                <textarea
                  rows={3}
                  placeholder="What does it do and why is it useful for founders?"
                  value={toolDesc}
                  onChange={(e) => setToolDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#171717]/20 bg-white text-xs text-[#171717] focus:outline-none focus:border-[#FF5400] resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSubmitModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold uppercase text-neutral-600 hover:text-[#171717] transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-[#171717] hover:bg-[#FF5400] text-white text-xs font-bold uppercase tracking-wider transition shadow-sm cursor-pointer"
                >
                  Submit Suggestion
                </button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </header>
  );
}
