"use client";

import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Clock, Github, Twitter } from "lucide-react";
import { SITE_NAME } from "@/lib/site-config";

export default function ToolboxFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#141414] text-[#F8EEE8] border-t border-[#262626] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 pb-16 border-b border-[#262626]">
          
          {/* Brand & Manifesto Column (2 cols) */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <span className="text-2xl font-black uppercase tracking-tight text-white group-hover:text-[#FF5400] transition-colors">
                STARTUP TOOLS
              </span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#FF5400] text-white tracking-widest">
                HUB
              </span>
            </Link>

            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Precision browser-based developer utilities, PDF workflows, image processors, and financial calculators. Free forever, zero accounts required, 100% private.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>In-browser WASM sandbox • Zero server uploads</span>
            </div>

            <div className="pt-2 text-neutral-500 font-mono text-[11px]">
              Bucharest &amp; Global Studio Architecture
            </div>
          </div>

          {/* Col 1: PDF Workflows */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#FF5400]">
              PDF Suite
            </h4>
            <ul className="space-y-2 text-xs font-medium text-neutral-400">
              <li>
                <Link href="/tools/pdf/merge-pdf" className="hover:text-white transition-colors">
                  Merge PDF
                </Link>
              </li>
              <li>
                <Link href="/tools/pdf/split-pdf" className="hover:text-white transition-colors">
                  Split PDF
                </Link>
              </li>
              <li>
                <Link href="/tools/pdf/sign-pdf" className="hover:text-white transition-colors">
                  Sign &amp; Annotate PDF
                </Link>
              </li>
              <li>
                <Link href="/tools/pdf/compress-pdf" className="hover:text-white transition-colors">
                  Compress PDF
                </Link>
              </li>
              <li>
                <Link href="/tools/pdf/pdf-to-pptx" className="hover:text-white transition-colors">
                  PDF to PowerPoint
                </Link>
              </li>
              <li>
                <Link href="/tools/pdf/pdf-to-word" className="hover:text-white transition-colors">
                  PDF to Word
                </Link>
              </li>
              <li>
                <Link href="/tools/pdf/stirling-suite" className="hover:text-white transition-colors">
                  Stirling In-Browser Suite
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Developer & WASM */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#FF5400]">
              Developer Tools
            </h4>
            <ul className="space-y-2 text-xs font-medium text-neutral-400">
              <li>
                <Link href="/tools/dev/json-formatter" className="hover:text-white transition-colors">
                  JSON Formatter &amp; Validator
                </Link>
              </li>
              <li>
                <Link href="/tools/dev/base64-encoder" className="hover:text-white transition-colors">
                  Base64 Encoder / Decoder
                </Link>
              </li>
              <li>
                <Link href="/tools/dev/jwt-debugger" className="hover:text-white transition-colors">
                  JWT Debugger &amp; Parser
                </Link>
              </li>
              <li>
                <Link href="/tools/dev/regex-tester" className="hover:text-white transition-colors">
                  Regex Tester
                </Link>
              </li>
              <li>
                <Link href="/tools/dev/uuid-generator" className="hover:text-white transition-colors">
                  UUID / GUID Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/dev/hash-generator" className="hover:text-white transition-colors">
                  SHA-256 / MD5 Hasher
                </Link>
              </li>
              <li>
                <Link href="/tools/dev/sql-formatter" className="hover:text-white transition-colors">
                  SQL Formatter
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Finance & Runway */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#FF5400]">
              Founder Finance
            </h4>
            <ul className="space-y-2 text-xs font-medium text-neutral-400">
              <li>
                <Link href="/tools/finance/startup-runway-calculator" className="hover:text-white transition-colors">
                  Runway Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/finance/safe-note-calculator" className="hover:text-white transition-colors">
                  SAFE Note Dilution
                </Link>
              </li>
              <li>
                <Link href="/tools/finance/cap-table-modeler" className="hover:text-white transition-colors">
                  Cap Table Modeler
                </Link>
              </li>
              <li>
                <Link href="/tools/finance/burn-rate-calculator" className="hover:text-white transition-colors">
                  Burn Rate Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/finance/saas-metrics-calculator" className="hover:text-white transition-colors">
                  SaaS Metrics (LTV/CAC)
                </Link>
              </li>
              <li>
                <Link href="/tools/calc/mortgage-calculator" className="hover:text-white transition-colors">
                  Mortgage &amp; Loan
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Image & Utility */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#FF5400]">
              Media &amp; Utils
            </h4>
            <ul className="space-y-2 text-xs font-medium text-neutral-400">
              <li>
                <Link href="/tools/image/image-compressor" className="hover:text-white transition-colors">
                  Image Compressor
                </Link>
              </li>
              <li>
                <Link href="/tools/image/color-palette" className="hover:text-white transition-colors">
                  Color Palette Extractor
                </Link>
              </li>
              <li>
                <Link href="/tools/calc/qr-generator" className="hover:text-white transition-colors">
                  QR Code Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/calc/password-generator" className="hover:text-white transition-colors">
                  Password Generator
                </Link>
              </li>
              <li>
                <Link href="/two26" className="hover:text-[#FF5400] transition-colors flex items-center gap-1 font-bold">
                  <span>Two26 Studio Case</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-2">
            <span>© {currentYear} STARTUP TOOLS HUB.</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-white transition">
              About
            </Link>
            <Link href="/privacy" className="hover:text-white transition">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition">
              Terms
            </Link>
            <Link href="/sitemap.xml" className="hover:text-white transition">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
