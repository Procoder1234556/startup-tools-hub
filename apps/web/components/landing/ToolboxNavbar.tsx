"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Wrench, 
  Search, 
  PlusCircle, 
  Info, 
  Menu, 
  X, 
  Sparkles, 
  Layers, 
  Flame, 
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Check
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
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
      const searchInput = document.getElementById("marketplace-search-input") || document.getElementById("hero-search-input");
      if (searchInput) {
        searchInput.focus();
        searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
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
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] transition-shadow duration-200">
      <div className="max-w-[1280px] mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-8">
          <Link 
            href="/" 
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-[#2563EB] flex items-center justify-center text-white shadow-sm shadow-blue-500/20 group-hover:bg-[#1D4ED8] transition-colors">
              <Wrench className="w-5 h-5 text-white transform -rotate-12 group-hover:rotate-0 transition-transform duration-200" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-[#0F172A] flex items-center gap-1.5 font-sans">
                ToolBox
                <span className="text-xs px-1.5 py-0.5 font-semibold bg-blue-50 text-blue-600 border border-blue-200 rounded-md">
                  Hub
                </span>
              </span>
            </div>
          </Link>

          {/* Center: Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-[14px] font-medium text-[#64748B]" aria-label="Main Navigation">
            <Link 
              href="#all-tools" 
              className="px-3 py-2 rounded-lg hover:text-[#0F172A] hover:bg-slate-100 transition-colors"
            >
              All Tools
            </Link>
            <Link 
              href="#categories" 
              className="px-3 py-2 rounded-lg hover:text-[#0F172A] hover:bg-slate-100 transition-colors"
            >
              Categories
            </Link>
            <Link 
              href="#popular" 
              className="px-3 py-2 rounded-lg hover:text-[#0F172A] hover:bg-slate-100 transition-colors inline-flex items-center gap-1"
            >
              <Flame className="w-4 h-4 text-amber-500" />
              Popular
            </Link>
            <Link 
              href="#new-tools" 
              className="px-3 py-2 rounded-lg hover:text-[#0F172A] hover:bg-slate-100 transition-colors inline-flex items-center gap-1"
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              New Tools
            </Link>
            <Link 
              href="#dev-tools" 
              className="px-3 py-2 rounded-lg hover:text-[#0F172A] hover:bg-slate-100 transition-colors"
            >
              For Developers
            </Link>
          </nav>
        </div>

        {/* Right: Actions (No Login Required!) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Quick Search Button */}
          <button
            type="button"
            onClick={handleFocusSearch}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-lg hover:border-slate-300 hover:bg-white hover:text-slate-800 transition-all shadow-xs"
            aria-label="Search tools"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Search tools...</span>
            <kbd className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-mono font-medium text-slate-400 bg-white border border-slate-200 rounded">
              /
            </kbd>
          </button>

          {/* Submit a Tool */}
          <button
            type="button"
            onClick={() => setSubmitModalOpen(true)}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-colors"
          >
            <PlusCircle className="w-4 h-4 text-blue-600" />
            <span>Submit a Tool</span>
          </button>

          {/* About link */}
          <Link
            href="/about"
            className="hidden xl:inline-flex items-center gap-1 px-2.5 py-1.5 text-[13px] font-medium text-slate-600 hover:text-slate-900 rounded-lg transition-colors"
          >
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span>About</span>
          </Link>

          {/* No Login Pill Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>No Login</span>
          </div>

          {/* Direct CTA */}
          <Link
            href="#all-tools"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[13px] sm:text-[14px] font-semibold shadow-xs transition-all active:scale-95"
          >
            <span>Browse Tools</span>
            <ArrowRight className="w-4 h-4 hidden sm:inline" />
          </Link>

          {/* Mobile Menu Hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Open mobile navigation"
              >
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[360px] bg-white border-l border-slate-200 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-lg font-bold text-slate-900">
                    <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                      <Wrench className="w-4 h-4" />
                    </div>
                    ToolBox Hub
                  </div>
                </div>

                {/* Mobile Search button */}
                <div className="mt-5">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      setTimeout(handleFocusSearch, 200);
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-500 hover:bg-slate-100"
                  >
                    <span className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-blue-600" />
                      Search all 100+ tools...
                    </span>
                    <kbd className="px-1.5 py-0.5 text-[11px] bg-white border border-slate-200 rounded text-slate-400">
                      /
                    </kbd>
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="mt-6 flex flex-col gap-1 text-[15px] font-medium text-slate-700" aria-label="Mobile Navigation">
                  <Link
                    href="#all-tools"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-slate-50"
                  >
                    <span className="flex items-center gap-2.5">
                      <Layers className="w-4 h-4 text-blue-600" />
                      All Tools
                    </span>
                    <span className="text-xs text-slate-400">100+</span>
                  </Link>

                  <Link
                    href="#categories"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-slate-50"
                  >
                    <span className="flex items-center gap-2.5">
                      <Wrench className="w-4 h-4 text-slate-600" />
                      Categories
                    </span>
                    <span className="text-xs text-slate-400">12</span>
                  </Link>

                  <Link
                    href="#popular"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-slate-50"
                  >
                    <span className="flex items-center gap-2.5">
                      <Flame className="w-4 h-4 text-amber-500" />
                      Popular Tools
                    </span>
                    <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">Hot</span>
                  </Link>

                  <Link
                    href="#new-tools"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-slate-50"
                  >
                    <span className="flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      New Releases
                    </span>
                    <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">New</span>
                  </Link>

                  <Link
                    href="#dev-tools"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-slate-50"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Developer Utilities
                  </Link>

                  <div className="h-px bg-slate-100 my-2" />

                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      setSubmitModalOpen(true);
                    }}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left text-blue-600 hover:bg-blue-50"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Submit a Tool
                  </button>

                  <Link
                    href="/about"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50"
                  >
                    <Info className="w-4 h-4 text-slate-400" />
                    About Platform
                  </Link>
                </nav>
              </div>

              {/* Bottom Info */}
              <div className="pt-6 border-t border-slate-100">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">Zero Signups Required</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Use every tool freely without an account, subscription, or watermark.</p>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Submit a Tool Dialog */}
      <Dialog open={submitModalOpen} onOpenChange={setSubmitModalOpen}>
        <DialogContent className="sm:max-w-md bg-white border border-slate-200 text-slate-900">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2 text-slate-900">
              <PlusCircle className="w-5 h-5 text-blue-600" />
              Submit a New Tool
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500">
              Recommend an open-source or free utility to add to our browser collection. No account needed.
            </DialogDescription>
          </DialogHeader>

          {submitted ? (
            <div className="py-8 text-center flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-base font-semibold text-slate-900">Thank you for your suggestion!</h4>
              <p className="text-xs text-slate-500 max-w-xs">
                Our team reviews submissions weekly. Free, browser-friendly utilities are prioritized.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitTool} className="space-y-4 mt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tool Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SVG to CSS Converter"
                  value={toolName}
                  onChange={(e) => setToolName(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tool URL or GitHub Repository
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={toolUrl}
                  onChange={(e) => setToolUrl(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  What does this tool do?
                </label>
                <textarea
                  rows={3}
                  placeholder="Short description of the tool workflow..."
                  value={toolDesc}
                  onChange={(e) => setToolDesc(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSubmitModalOpen(false)}
                  className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
                >
                  Send Submission
                </button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </header>
  );
}
