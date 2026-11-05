"use client";

import Link from "next/link";
import { Terminal, Shield, ArrowRight, Sparkles } from "lucide-react";

interface PipelineNavbarProps {
  onCtaClick?: () => void;
}

export default function PipelineNavbar({ onCtaClick }: PipelineNavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E6E4DF] bg-[#FAF8F5]/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo Info matching reference avatar + dual-line text */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-300 bg-gray-900 text-white font-bold shadow-xs">
            <span className="text-sm font-mono tracking-tight text-sky-400">ST</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] font-bold tracking-tight text-gray-950 group-hover:text-blue-600 transition-colors">
              The Startup Tools Pipeline
            </span>
            <span className="text-[12px] text-gray-500 font-medium">
              100+ free founder tools, client-side & private
            </span>
          </div>
        </Link>

        {/* Navigation Links matching reference layout */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/tools"
            className="text-[13px] font-medium text-gray-600 hover:text-gray-950 transition-colors"
          >
            All Tools
          </Link>

          <Link
            href="/tools/finance"
            className="hidden text-[13px] font-medium text-gray-600 hover:text-gray-950 sm:inline-block transition-colors"
          >
            Finance Hub
          </Link>

          <a
            href="#pipeline"
            className="hidden text-[13px] font-medium text-gray-600 hover:text-gray-950 md:inline-block transition-colors"
          >
            How It Works
          </a>

          <a
            href="#tools-grid"
            className="hidden text-[13px] font-medium text-gray-600 hover:text-gray-950 lg:inline-block transition-colors"
          >
            Tool Suites
          </a>

          <Link
            href="/tools"
            onClick={(e) => {
              if (onCtaClick) {
                e.preventDefault();
                onCtaClick();
              }
            }}
            className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-4 py-1.5 text-[13px] font-semibold text-gray-900 shadow-xs transition-all hover:bg-gray-50 hover:border-gray-400 active:scale-95"
          >
            Open Hub Free
          </Link>
        </div>
      </div>
    </header>
  );
}
