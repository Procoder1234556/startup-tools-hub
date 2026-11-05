"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, Globe, ArrowRight, TrendingUp, ShieldCheck } from "lucide-react";

export default function PipelineShippedShowcase() {
  return (
    <section className="bg-[#FAF8F5] py-20 sm:py-24 border-b border-[#ECEAE7]" id="showcase">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading matching reference layout */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
            Live tools shipped in this repository
          </h2>
          <p className="text-[15px] sm:text-[16px] text-gray-600 leading-relaxed font-normal">
            Both running live right now. Click through and test them directly in your browser.
          </p>
        </div>

        {/* 2 Browser Windows Grid matching reference pixel-for-pixel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {/* Browser Window 1: Runway Calculator */}
          <Link
            href="/tools/finance/runway-calculator"
            className="group overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-lg shadow-gray-200/40 transition-all hover:shadow-xl hover:border-gray-300 flex flex-col"
          >
            {/* Browser Header matching reference */}
            <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50/80 px-4 py-3 text-xs text-gray-400">
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
              </div>
              <div className="mx-auto flex items-center gap-1.5 rounded-md bg-white px-3 py-1 text-[11px] font-mono text-gray-500 border border-gray-200/60 shadow-2xs">
                <Globe className="h-3 w-3 text-gray-400" />
                <span>startuptools.dev/tools/finance/runway-calculator</span>
              </div>
              <span className="text-gray-400 group-hover:text-gray-800">
                <ExternalLink className="h-3.5 w-3.5" />
              </span>
            </div>

            {/* Simulated Live Tool Content */}
            <div className="p-6 bg-gradient-to-b from-gray-50/40 to-white flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">
                    STARTUP FINANCE · TIER A
                  </span>
                  <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                    100% Client-Side
                  </span>
                </div>
                <h4 className="text-xl font-extrabold text-gray-950 tracking-tight">
                  Startup Runway Calculator <br />
                  <span className="text-gray-500 font-medium text-base">Model burn, hiring & zero-cash date</span>
                </h4>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                    <span className="text-[10px] text-gray-500 font-medium">CASH RUNWAY</span>
                    <p className="text-xl font-extrabold text-gray-900 mt-0.5">16.4 mos</p>
                    <span className="text-[10px] text-emerald-600 font-medium">Default alive</span>
                  </div>
                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                    <span className="text-[10px] text-gray-500 font-medium">NET MONTHLY BURN</span>
                    <p className="text-xl font-extrabold text-gray-900 mt-0.5">-$18,400</p>
                    <span className="text-[10px] text-gray-500 font-medium">Gross: $32k | Rev: $13.6k</span>
                  </div>
                </div>
              </div>

              {/* Mini visual chart simulation */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-gray-600 font-mono text-[11px]">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Forecast verified · Instant execution</span>
                </div>
                <span className="font-semibold text-sky-600 group-hover:underline flex items-center gap-1">
                  Open Tool <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          </Link>

          {/* Browser Window 2: SAFE Calculator */}
          <Link
            href="/tools/finance/safe-calculator"
            className="group overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-lg shadow-gray-200/40 transition-all hover:shadow-xl hover:border-gray-300 flex flex-col"
          >
            {/* Browser Header matching reference */}
            <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50/80 px-4 py-3 text-xs text-gray-400">
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
              </div>
              <div className="mx-auto flex items-center gap-1.5 rounded-md bg-white px-3 py-1 text-[11px] font-mono text-gray-500 border border-gray-200/60 shadow-2xs">
                <Globe className="h-3 w-3 text-gray-400" />
                <span>startuptools.dev/tools/finance/safe-calculator</span>
              </div>
              <span className="text-gray-400 group-hover:text-gray-800">
                <ExternalLink className="h-3.5 w-3.5" />
              </span>
            </div>

            {/* Simulated Live Tool Content */}
            <div className="p-6 bg-gradient-to-b from-[#FAF8F5] to-white flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">
                    EQUITY & DILUTION
                  </span>
                  <span className="rounded bg-sky-50 px-2 py-0.5 text-[10px] font-semibold text-sky-700">
                    YC Standard Model
                  </span>
                </div>
                <h4 className="text-xl font-extrabold text-gray-950 tracking-tight">
                  SAFE & Cap Table Simulator <br />
                  <span className="text-gray-500 font-medium text-base">Calculate post-money dilution & option pools</span>
                </h4>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-2xs">
                    <span className="text-[10px] text-gray-500 font-medium">FOUNDER EQUITY</span>
                    <p className="text-xl font-extrabold text-emerald-600 mt-0.5">75.0%</p>
                    <span className="text-[10px] text-gray-500 font-medium">Post-seed round</span>
                  </div>
                  <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-2xs">
                    <span className="text-[10px] text-gray-500 font-medium">INVESTOR OWNERSHIP</span>
                    <p className="text-xl font-extrabold text-gray-900 mt-0.5">15.0%</p>
                    <span className="text-[10px] text-gray-500 font-medium">$1.5M on $10M cap</span>
                  </div>
                </div>
              </div>

              {/* Footer strip */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-gray-600 font-mono text-[11px]">
                  <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />
                  <span>No data leaves device · Free export</span>
                </div>
                <span className="font-semibold text-sky-600 group-hover:underline flex items-center gap-1">
                  Open Tool <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Live Startup Tools Link Strip */}
        <div className="rounded-xl border border-sky-100 bg-sky-50/80 p-4 text-center text-sm text-sky-950">
          <span>Looking for the complete suite of 100+ utilities? </span>
          <Link
            href="/tools"
            className="font-bold underline hover:text-sky-700 ml-1 inline-flex items-center gap-1"
          >
            <span>Explore All 100+ Free Browser Tools</span> →
          </Link>
        </div>
      </div>
    </section>
  );
}
