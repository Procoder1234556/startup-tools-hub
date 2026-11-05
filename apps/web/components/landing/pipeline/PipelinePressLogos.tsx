"use client";

import React from "react";

export default function PipelinePressLogos() {
  return (
    <section className="border-y border-[#ECEAE7] bg-[#FAF8F5] py-8 sm:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[12px] font-semibold tracking-widest text-gray-400 uppercase mb-6">
          Powering founders and indie builders from
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75 grayscale transition-opacity hover:opacity-95">
          {/* Y Combinator */}
          <div className="flex items-center gap-1.5 text-base sm:text-lg font-bold tracking-tight text-gray-900">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-[#FF6600] text-xs font-black text-white">
              Y
            </span>
            <span>Combinator</span>
          </div>

          {/* TechCrunch */}
          <div className="flex items-center gap-1.5 text-base sm:text-lg font-bold text-gray-900">
            <span className="rounded bg-emerald-600 px-1 py-0.5 text-xs text-white font-mono font-bold">
              TC
            </span>
            <span>TechCrunch</span>
          </div>

          {/* Product Hunt */}
          <div className="flex items-center gap-1.5 text-base sm:text-lg font-bold text-gray-900">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#DA552F] text-xs font-black text-white">
              P
            </span>
            <span>Product Hunt</span>
          </div>

          {/* Hacker News */}
          <div className="flex items-center gap-1 text-sm sm:text-base font-bold text-gray-900">
            <span>Hacker News</span>
          </div>

          {/* Indie Hackers */}
          <div className="flex items-center gap-1 text-sm sm:text-base font-bold tracking-tight text-gray-900">
            <span className="font-mono text-blue-600">&lt;IH&gt;</span>
            <span>Indie Hackers</span>
          </div>
        </div>
      </div>
    </section>
  );
}
