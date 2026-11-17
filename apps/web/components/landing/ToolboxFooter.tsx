"use client";

import Link from "next/link";
import { Wrench, ShieldCheck, Heart, Github, Twitter, Disc as Discord, Rss, ArrowUpRight } from "lucide-react";
import { SITE_NAME, SOCIAL } from "@/lib/site-config";

export default function ToolboxFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0F172A] text-slate-300 border-t border-slate-800 text-sm">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Info (2 columns on large) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white shadow-xs">
                <Wrench className="w-4 h-4 transform -rotate-12 group-hover:rotate-0 transition-transform" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-sans">
                ToolBox<span className="text-blue-400">Hub</span>
              </span>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Simple online tools for work, business, development, and everyday tasks. High performance, 100% free, and zero signups required.
            </p>

            {/* Privacy Guarantee Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>All browser processing happens locally on your device.</span>
            </div>
          </div>

          {/* Col 1: Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Tools
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="#all-tools" className="hover:text-white transition-colors">
                  PDF Tools
                </Link>
              </li>
              <li>
                <Link href="#all-tools" className="hover:text-white transition-colors">
                  Developer Tools
                </Link>
              </li>
              <li>
                <Link href="#all-tools" className="hover:text-white transition-colors">
                  Image Tools
                </Link>
              </li>
              <li>
                <Link href="#all-tools" className="hover:text-white transition-colors">
                  Text Tools
                </Link>
              </li>
              <li>
                <Link href="#all-tools" className="hover:text-white transition-colors">
                  Generators
                </Link>
              </li>
              <li>
                <Link href="#all-tools" className="hover:text-white transition-colors">
                  Calculators &amp; Finance
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Popular */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Popular
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/tools/pdf/merge-pdf" className="hover:text-white transition-colors">
                  PDF Editor &amp; Merger
                </Link>
              </li>
              <li>
                <Link href="/tools/calc/qr-generator" className="hover:text-white transition-colors">
                  QR Code Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/dev/json-formatter" className="hover:text-white transition-colors">
                  JSON Formatter
                </Link>
              </li>
              <li>
                <Link href="/tools/image" className="hover:text-white transition-colors">
                  Image Compressor
                </Link>
              </li>
              <li>
                <Link href="/tools/calc/password-generator" className="hover:text-white transition-colors">
                  Password Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/dev/uuid-generator" className="hover:text-white transition-colors">
                  UUID Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a 
                  href="https://github.com/Procoder1234556/startup-tools-hub" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  GitHub Project
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Resources
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Tool Guides &amp; Blog
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="hover:text-white transition-colors">
                  Methodology
                </Link>
              </li>
              <li>
                <a 
                  href="/sitemap.xml" 
                  className="hover:text-white transition-colors"
                >
                  Sitemap
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
            <p>© {currentYear} ToolBox Hub. Built for productivity.</p>
            <span className="hidden sm:inline text-slate-700">•</span>
            {/* Small No Login Required label */}
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-900/60 text-blue-300 border border-blue-700/50 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              No Login Required
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-slate-400">
            <a 
              href="https://github.com/Procoder1234556/startup-tools-hub" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub Repository" 
              className="p-1 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Twitter / X" 
              className="p-1 hover:text-white transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <Link 
              href="/blog/feed.xml" 
              aria-label="RSS Feed" 
              className="p-1 hover:text-white transition-colors"
            >
              <Rss className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
