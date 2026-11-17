"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, ShieldCheck, ArrowUpRight } from "lucide-react";

export default function ToolboxAnnouncementBar() {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
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

  return (
    <aside
      aria-label="Announcement"
      className="relative z-50 bg-[#141414] text-[#F8EEE8] border-b border-[#262626] text-xs font-mono py-2 px-4 transition-colors"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2.5 mx-auto sm:mx-0 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#FF5400]/20 text-[#FF5400] border border-[#FF5400]/30 text-[10px] font-bold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5400] animate-pulse" />
            LIVE WASM
          </span>
          <span className="font-semibold tracking-wider text-[#F8EEE8]">
            STARTUP TOOLS HUB • 100+ FREE UTILITIES • ZERO SERVER UPLOADS
          </span>
        </div>

        <div className="hidden md:flex items-center gap-4 text-[#F8EEE8]/70 text-[11px]">
          <span className="inline-flex items-center gap-1.5 text-neutral-300">
            <Clock className="w-3 h-3 text-[#FF5400]" />
            Local: <strong className="text-white font-mono">{timeStr || "12:00:00"}</strong>
          </span>
          <span className="text-neutral-600">•</span>
          <span className="inline-flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            100% Client-Side Privacy
          </span>
          <span className="text-neutral-600">•</span>
          <Link
            href="/#all-tools"
            className="text-[#FF5400] hover:text-white font-bold inline-flex items-center gap-0.5 transition"
          >
            Directory (100+)
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
