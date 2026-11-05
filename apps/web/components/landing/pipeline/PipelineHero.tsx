"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Terminal, TrendingUp, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

interface PipelineHeroProps {
  onCtaClick?: () => void;
}

export default function PipelineHero({ onCtaClick }: PipelineHeroProps) {
  const [activeCommand, setActiveCommand] = useState<string>("/runway-model");
  const totalTools = 100;
  const toolsActive = 94;
  const progressPercent = Math.round((toolsActive / totalTools) * 100);

  const commands = [
    {
      phase: "PHASE 1 · CAPITAL & RUNWAY",
      name: "/runway-model",
      desc: "burn rate, zero-cash date & runway",
      output: "Calculated zero-cash date: 16.4 months runway at current $18.4k/mo burn rate. 3 hiring scenarios modeled.",
      route: "/tools/finance/runway-calculator",
    },
    {
      phase: "",
      name: "/safe-calculator",
      desc: "post-money dilution, caps & notes",
      output: "SAFE Conversion Model: $1.5M invested on $10M post-money cap results in 15.0% dilution, 75.0% founder equity.",
      route: "/tools/finance/safe-calculator",
    },
    {
      phase: "",
      name: "/cap-table-lite",
      desc: "equity breakdown & option pools",
      output: "Cap table generated: 2 co-founders (80%), 10% unallocated employee option pool, 10% pre-seed angel note.",
      route: "/tools/finance/cap-table-lite",
    },
    {
      phase: "PHASE 2 · ASSETS & PDF",
      name: "/merge-pdf",
      desc: "investor pitch decks & watermarks",
      output: "Merged 3 documents: Main deck + Appendix + Term Sheet. Applied confidential watermark in 0.4s client-side.",
      route: "/tools/pdf/merge-pdf",
    },
    {
      phase: "",
      name: "/compress-pdf",
      desc: "shrink 50MB decks to 3MB for email",
      output: "PDF compressed: 48.6 MB -> 2.8 MB (-94.2% reduction). Ready for Gmail/Outlook attachment limits.",
      route: "/tools/pdf/compress-pdf",
    },
    {
      phase: "",
      name: "/bg-removal",
      desc: "client-side AI product photo cutout",
      output: "Removed background in-browser via WebAssembly AI. Zero cloud upload. Transparent PNG exported.",
      route: "/tools/image/background-remover",
    },
    {
      phase: "PHASE 3 · DEV & LAUNCH",
      name: "/json-formatter",
      desc: "validate, parse & prettify payloads",
      output: "Valid JSON formatted with 2-space indentation. 0 syntax errors detected in API payload.",
      route: "/tools/dev/json-formatter",
    },
    {
      phase: "",
      name: "/seo-preview",
      desc: "OpenGraph cards & meta generator",
      output: "Generated Twitter, LinkedIn & Google SERP previews. JSON-LD schema markup copied to clipboard.",
      route: "/tools/dev/open-graph-preview",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Background dot pattern matching reference aesthetic */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(#E2DFD8_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Hero Copy & Value Props */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow matching reference pill tags */}
            <div className="inline-flex items-center gap-2 text-[12px] font-bold tracking-wide text-sky-600 uppercase">
              <span>The founder toolkit for</span>
              <span className="inline-flex items-center gap-1 rounded bg-sky-100/80 px-2 py-0.5 text-sky-800">
                <span>🚀</span>
                <span>Founders</span>
              </span>
              <span>and your</span>
              <span className="inline-flex items-center gap-1 rounded bg-blue-100/80 px-2 py-0.5 text-blue-800">
                <span>🤖</span>
                <span>AI Agent</span>
              </span>
            </div>

            {/* H1 Headline matching reference tight bold typography */}
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl md:text-5xl lg:text-[50px] lg:leading-[1.12]">
              The Exact Blueprint Founders Use to Build, Launch, and Scale
            </h1>

            {/* Subhead matching what this website actually does */}
            <p className="text-[16px] leading-relaxed text-gray-600 sm:text-[17px] max-w-2xl font-normal">
              From runway and SAFE calculators to PDF manipulation, dev utilities, and image background removal. 
              100+ free, client-side tools built for human founders and automated coding agents to ship production startups without paid SaaS subscriptions.
            </p>

            {/* 3 Checkpoint Bullets matching reference */}
            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                  <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                </div>
                <p className="text-[14px] text-gray-700 sm:text-[15px]">
                  <strong className="font-semibold text-gray-950">100+ instant, free utilities.</strong> 100% private, client-side execution—no files leave your browser
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                  <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                </div>
                <p className="text-[14px] text-gray-700 sm:text-[15px]">
                  <strong className="font-semibold text-gray-950">Agent & founder friendly.</strong> Run directly in browser or invoke via coding agent prompts and CLI
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                  <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                </div>
                <p className="text-[14px] text-gray-700 sm:text-[15px]">
                  <strong className="font-semibold text-gray-950">Zero subscriptions forever.</strong> Replace Carta, Adobe, and paid SaaS with free open-source tools
                </p>
              </div>
            </div>

            {/* CTA & Scarcity Area matching reference */}
            <div className="pt-2 space-y-3.5">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/tools"
                  onClick={onCtaClick}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0091FF] px-8 py-3.5 text-[15px] font-semibold text-white shadow-md shadow-sky-500/20 transition-all hover:bg-sky-600 hover:shadow-lg hover:shadow-sky-500/30 active:scale-[0.98]"
                >
                  <span>Explore 100+ Free Tools — No Signup</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/tools/finance/runway-calculator"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-[14px] font-medium text-gray-800 shadow-xs transition-all hover:bg-gray-50 hover:border-gray-400 active:scale-[0.98]"
                >
                  <span>Runway Calculator</span>
                </Link>
              </div>

              {/* Progress/Scarcity bar matching reference */}
              <div className="space-y-1.5 max-w-md">
                <div className="flex items-center justify-between text-[12px] font-medium">
                  <span className="text-gray-700">
                    <strong className="font-semibold text-orange-600">{toolsActive}/{totalTools} tools active</strong>{" "}
                    in this repo · 100% free & open-source
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

                <p className="text-[11px] text-gray-500">
                  Instant execution in your browser. Zero cloud uploads. No account or credit card required.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: IDE Window Mockup matching reference */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative overflow-hidden rounded-2xl border border-[#232B38] bg-[#0E131F] p-4 sm:p-5 shadow-2xl text-white font-mono"
            >
              {/* Window Title Bar */}
              <div className="flex items-center justify-between border-b border-gray-800/80 pb-3 text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-gray-300">
                  <Terminal className="h-3 w-3 text-sky-400" />
                  <span>your-agent</span>
                  <span className="text-gray-500">·</span>
                  <span className="text-sky-400">7 categories active</span>
                </div>
                <div className="w-10" />
              </div>

              {/* Skills/Commands Tree matching reference structure */}
              <div className="py-3 space-y-2 text-[11.5px] leading-tight">
                {commands.map((item, idx) => (
                  <div key={idx} className="group">
                    {item.phase && (
                      <div className="mt-2.5 mb-1 text-[10px] font-bold tracking-wider text-gray-500 uppercase">
                        {item.phase}
                      </div>
                    )}
                    <button
                      onClick={() => setActiveCommand(item.name)}
                      className={`w-full text-left flex items-start gap-2 rounded px-2 py-1 transition-all ${
                        activeCommand === item.name
                          ? "bg-sky-500/20 text-sky-200 border border-sky-500/40"
                          : "hover:bg-white/5 text-gray-300"
                      }`}
                    >
                      <span className="font-semibold text-sky-400">{item.name}</span>
                      <span className="text-gray-400 text-[11px] truncate">
                        {item.desc}
                      </span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Active command output toast */}
              <div className="mt-2 rounded-lg border border-sky-900/60 bg-sky-950/40 p-2.5 text-[11px] text-sky-200/90 font-sans">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sky-400">$ {activeCommand}</span>
                  {commands.find((c) => c.name === activeCommand)?.route && (
                    <Link
                      href={commands.find((c) => c.name === activeCommand)!.route}
                      className="text-[10px] font-medium text-sky-400 underline hover:text-sky-300"
                    >
                      Open Live Tool →
                    </Link>
                  )}
                </div>
                <p className="mt-1 text-gray-300 text-xs">
                  {commands.find((s) => s.name === activeCommand)?.output}
                </p>
              </div>

              {/* Experiment / Conversion Badge matching reference */}
              <div className="absolute top-12 right-4 rounded-xl border border-emerald-500/40 bg-gray-900/95 p-3 shadow-xl backdrop-blur-md">
                <div className="text-[9px] font-bold tracking-wider text-emerald-400 uppercase">
                  RUNWAY EXPERIMENT · EXTENSION
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-xs text-gray-400 font-sans">Runway</span>
                  <span className="text-base font-bold text-emerald-400 flex items-center gap-0.5">
                    <TrendingUp className="h-3.5 w-3.5" /> +4.2 mos
                  </span>
                </div>
                <div className="mt-0.5 flex gap-3 text-[10px] text-gray-400 font-sans">
                  <span>Burn: -$18.4k/mo</span>
                  <span className="text-white font-medium">Cash: 16 mos</span>
                </div>
              </div>

              {/* Live Status indicator in bottom right corner */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-xl border border-gray-700/60 bg-gray-900/90 p-2 shadow-lg backdrop-blur-sm">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 text-sky-400 font-mono text-xs font-bold border border-gray-700">
                  <span>HUB</span>
                  <div className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-gray-900 animate-pulse" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
