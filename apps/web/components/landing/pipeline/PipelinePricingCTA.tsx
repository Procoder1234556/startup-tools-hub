"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, ShieldCheck, Sparkles, Terminal } from "lucide-react";

interface PipelinePricingCTAProps {
  onCtaClick?: () => void;
}

export default function PipelinePricingCTA({ onCtaClick }: PipelinePricingCTAProps) {
  const [isCopied, setIsCopied] = useState(false);
  const totalTools = 100;
  const toolsActive = 94;
  const progressPercent = Math.round((toolsActive / totalTools) * 100);

  const copyQuickCommand = () => {
    navigator.clipboard.writeText("npx shadcn@latest add @canvas-ui/liquid-react");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section className="bg-[#FAF8F5] py-20 sm:py-28 border-b border-[#ECEAE7]" id="pricing">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl md:text-5xl">
          Run your entire startup on open-source tools
        </h2>
        <p className="text-[16px] text-gray-600 max-w-lg mx-auto leading-relaxed font-normal">
          100+ utilities. 100% client-side privacy. Zero subscriptions or signup required.
        </p>

        {/* CTA Area matching reference pixel-for-pixel */}
        <div className="pt-4 max-w-md mx-auto space-y-4">
          <Link
            href="/tools"
            onClick={onCtaClick}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#0091FF] px-8 py-4 text-[16px] font-semibold text-white shadow-lg shadow-sky-500/25 transition-all hover:bg-sky-600 hover:shadow-xl hover:shadow-sky-500/35 active:scale-[0.98]"
          >
            <span>Explore All 100+ Tools — 100% Free</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          {/* Scarcity / Active tools bar matching reference */}
          <div className="space-y-1.5 text-left">
            <div className="flex items-center justify-between text-[12px] font-medium">
              <span className="text-gray-700">
                <strong className="font-semibold text-orange-600">{toolsActive}/{totalTools} tools active</strong>{" "}
                in this repo · 100% client-side & private
              </span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Private
              </span>
            </div>

            <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <p className="text-[11px] text-gray-500 text-center pt-1">
              Free forever. MIT licensed. Run directly in your browser or prompt via your AI coding agent.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-center gap-2 text-xs text-gray-500">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>100% Client-side execution · Zero cloud data leaks · MIT License</span>
          </div>
        </div>
      </div>
    </section>
  );
}
