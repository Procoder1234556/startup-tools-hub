"use client";

import Link from "next/link";
import { Sparkles, ShieldCheck } from "lucide-react";

export default function ToolboxAnnouncementBar() {
  return (
    <aside 
      aria-label="Announcement"
      className="relative z-50 bg-[#0F172A] text-white border-b border-slate-800 text-xs py-2 px-4 transition-colors"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2.5 mx-auto sm:mx-0 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[11px] font-semibold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            FRESH UPDATE
          </span>
          <span className="font-semibold tracking-wider text-slate-200">
            100+ FREE ONLINE TOOLS • NO LOGIN REQUIRED • FAST &amp; PRIVATE
          </span>
        </div>

        <div className="hidden md:flex items-center gap-4 text-slate-300 text-[11px]">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            100% Client-Side Privacy
          </span>
          <span className="text-slate-600">•</span>
          <Link 
            href="#all-tools" 
            className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1 hover:underline underline-offset-2"
          >
            Explore Catalog →
          </Link>
        </div>
      </div>
    </aside>
  );
}
