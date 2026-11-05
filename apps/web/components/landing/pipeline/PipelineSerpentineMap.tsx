"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Star, Terminal, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function PipelineSerpentineMap() {
  const [selectedNode, setSelectedNode] = useState<number | null>(null);

  const steps = [
    {
      id: 1,
      phase: "1 · CAPITAL & RUNWAY",
      name: "Runway calculation",
      desc: "Burn rate, zero-cash date & hiring plans",
      command: "/runway-calculator",
      route: "/tools/finance/runway-calculator",
      details: "Simulate cash balance over time, monthly burn, and milestone hiring targets without spreadsheets.",
    },
    {
      id: 2,
      phase: "1 · CAPITAL & RUNWAY",
      name: "SAFE calculator",
      desc: "Post-money dilution & valuation cap math",
      command: "/safe-calculator",
      route: "/tools/finance/safe-calculator",
      details: "Calculate pre-money vs post-money YC SAFEs, unallocated option pools, and investor ownership.",
    },
    {
      id: 3,
      phase: "1 · CAPITAL & RUNWAY",
      name: "Cap table lite",
      desc: "Founder equity & employee option pool",
      command: "/cap-table-lite",
      route: "/tools/finance/cap-table-lite",
      details: "Map stakeholder shares, simulate priced seed rounds, and calculate founder dilution before term sheets.",
    },
    {
      id: 4,
      phase: "2 · ASSETS & MEDIA",
      name: "Investor pitch PDF",
      desc: "Merge, compress & watermark decks",
      command: "/pdf-merge-compress",
      route: "/tools/pdf/merge-pdf",
      details: "Compress 50MB pitch decks to 3MB for email. Merge appendices and watermark confidential decks.",
    },
    {
      id: 5,
      phase: "2 · ASSETS & MEDIA",
      name: "AI background remove",
      desc: "Client-side product photo cutouts",
      command: "/image-bg-removal",
      route: "/tools/image/background-remover",
      details: "Runs WebAssembly AI on your local GPU to extract transparent PNG cutouts in 0.0s upload time.",
    },
    {
      id: 6,
      phase: "3 · DEV & CODE",
      name: "Format & sanitize",
      desc: "Prettify JSON, format SQL, parse JWT",
      command: "/dev-tools",
      route: "/tools/dev/json-formatter",
      details: "Validate API payloads, beautify SQL queries, debug JWT headers, and encode Base64 strings.",
    },
    {
      id: 7,
      phase: "3 · DEV & CODE",
      name: "Local browser AI",
      desc: "WebGPU on-device models, 0 API fees",
      command: "/local-ai",
      route: "/tools/ai/chat",
      details: "Execute Web-LLM models directly in your browser. Draft marketing copy without cloud token bills.",
    },
    {
      id: 8,
      phase: "3 · DEV & CODE",
      name: "Launch & SEO meta",
      desc: "OpenGraph previews & JSON-LD schema",
      command: "/seo-preview",
      route: "/tools/dev/open-graph-preview",
      details: "Preview social cards on Twitter/LinkedIn, test Google SERP snippets, and export structured schema.",
    },
  ];

  return (
    <section className="bg-[#FAF8F5] py-16 sm:py-24 border-b border-[#ECEAE7]" id="pipeline">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading matching reference layout */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
            How the pipeline works
          </h2>
          <p className="text-[15px] sm:text-[16px] text-gray-600 leading-relaxed font-normal">
            Every step is an interactive browser tool and an agent-ready command. Model your runway, prep your pitch decks, and format your code. Run everything locally, privately, and for free.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3 text-xs sm:text-sm font-medium text-gray-500">
            <span>7 tool categories</span>
            <span>·</span>
            <span>100+ client-side utilities</span>
            <span>·</span>
            <span className="text-emerald-600 font-semibold">100% private execution</span>
          </div>
        </div>

        {/* Selected Step Inspector Banner */}
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="my-6 mx-auto max-w-xl rounded-xl border border-sky-200 bg-sky-50/90 p-4 text-center text-sm shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-sky-950">
                Step {selectedNode}: {steps.find((s) => s.id === selectedNode)?.name}
              </span>
              <span className="font-mono text-xs text-sky-600 font-semibold">
                {steps.find((s) => s.id === selectedNode)?.command}
              </span>
            </div>
            <p className="text-xs text-sky-800 mt-1.5 text-left">
              {steps.find((s) => s.id === selectedNode)?.details}
            </p>
            <div className="mt-2.5 text-right">
              <Link
                href={steps.find((s) => s.id === selectedNode)!.route}
                className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 hover:text-sky-900 underline"
              >
                <span>Launch This Tool in Hub</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </motion.div>
        )}

        {/* The Desktop Serpentine Pipeline Visual (Matching reference component1.jpg pixel-for-pixel) */}
        <div className="mt-12 hidden lg:block relative py-6">
          <div className="relative mx-auto w-full max-w-[1040px] px-8">
            {/* SVG Connecting Curves */}
            <svg
              className="absolute inset-0 h-full w-full pointer-events-none"
              viewBox="0 0 1040 380"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Row 1: Orange Line */}
              <line
                x1="80"
                y1="60"
                x2="880"
                y2="60"
                stroke="#E5A855"
                strokeWidth="6"
                strokeLinecap="round"
              />

              {/* Right Bend: Orange to Teal */}
              <path
                d="M 880 60 A 80 80 0 0 1 880 220"
                stroke="#009E94"
                strokeWidth="6"
                strokeLinecap="round"
              />

              {/* Row 2: Teal Line (Right to Left) */}
              <line
                x1="880"
                y1="220"
                x2="160"
                y2="220"
                stroke="#009E94"
                strokeWidth="6"
                strokeLinecap="round"
              />

              {/* Left Bend: Teal to Purple */}
              <path
                d="M 160 220 A 70 70 0 0 1 160 360"
                stroke="#6C5CE7"
                strokeWidth="6"
                strokeLinecap="round"
              />

              {/* Row 3: Purple Line (Left to Right) */}
              <line
                x1="160"
                y1="360"
                x2="840"
                y2="360"
                stroke="#6C5CE7"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>

            {/* Content Layers on the Serpentine Path */}
            <div className="relative space-y-24">
              {/* ROW 1: Capital & Runway (Steps 1, 2, 3) */}
              <div>
                <div className="text-[11px] font-bold tracking-widest text-[#E5A855] uppercase mb-1 ml-28">
                  1 · CAPITAL & RUNWAY
                </div>
                <div className="relative flex items-center justify-between pt-2">
                  {/* START pill */}
                  <div className="z-10 flex items-center justify-center rounded-full bg-black px-4 py-1.5 text-xs font-bold text-white shadow-md">
                    START
                  </div>

                  {/* Node 1: Runway Calculation */}
                  <button
                    onClick={() => setSelectedNode(1)}
                    className="z-10 group flex flex-col items-center text-center max-w-[190px] transition-transform hover:scale-105"
                  >
                    <div className="h-5 w-5 rounded-full border-4 border-[#E5A855] bg-black shadow-sm group-hover:ring-4 group-hover:ring-[#E5A855]/40" />
                    <span className="mt-3 text-[14px] font-bold text-gray-950 group-hover:text-amber-600">
                      Runway model
                    </span>
                    <span className="text-[11px] text-gray-500 leading-tight">
                      Burn rate, zero-cash date & hiring
                    </span>
                  </button>

                  {/* Node 2: SAFE Calculator */}
                  <button
                    onClick={() => setSelectedNode(2)}
                    className="z-10 group flex flex-col items-center text-center max-w-[190px] transition-transform hover:scale-105"
                  >
                    <div className="h-5 w-5 rounded-full border-4 border-[#E5A855] bg-black shadow-sm group-hover:ring-4 group-hover:ring-[#E5A855]/40" />
                    <span className="mt-3 text-[14px] font-bold text-gray-950 group-hover:text-amber-600">
                      SAFE calculator
                    </span>
                    <span className="text-[11px] text-gray-500 leading-tight">
                      Post-money dilution & cap math
                    </span>
                  </button>

                  {/* Node 3: Cap Table Lite */}
                  <button
                    onClick={() => setSelectedNode(3)}
                    className="z-10 group flex flex-col items-center text-center max-w-[190px] transition-transform hover:scale-105"
                  >
                    <div className="h-5 w-5 rounded-full border-4 border-[#E5A855] bg-black shadow-sm group-hover:ring-4 group-hover:ring-[#E5A855]/40" />
                    <span className="mt-3 text-[14px] font-bold text-gray-950 group-hover:text-amber-600">
                      Cap table lite
                    </span>
                    <span className="text-[11px] text-gray-500 leading-tight">
                      Founder equity & option pool
                    </span>
                  </button>

                  {/* Checkpoint 1: FOUNDER APPROVED */}
                  <div className="z-10 flex flex-col items-center text-center">
                    <div className="flex h-7 w-7 rotate-45 items-center justify-center rounded-sm bg-emerald-500 shadow-sm text-white">
                      <Check className="h-4 w-4 -rotate-45 stroke-[3]" />
                    </div>
                    <span className="mt-3 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                      FOUNDER APPROVED
                    </span>
                  </div>
                </div>
              </div>

              {/* ROW 2: Assets & Media (Steps 4, 5) - Flows Right to Left */}
              <div className="pt-4">
                <div className="text-[11px] font-bold tracking-widest text-[#009E94] uppercase mb-1 text-right mr-36">
                  2 · ASSETS & MEDIA
                </div>
                <div className="relative flex items-center justify-between pt-2">
                  {/* Checkpoint 2: FOUNDER APPROVED (Far Left) */}
                  <div className="z-10 flex flex-col items-center text-center ml-10">
                    <div className="flex h-7 w-7 rotate-45 items-center justify-center rounded-sm bg-emerald-500 shadow-sm text-white">
                      <Check className="h-4 w-4 -rotate-45 stroke-[3]" />
                    </div>
                    <span className="mt-3 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                      FOUNDER APPROVED
                    </span>
                  </div>

                  {/* Node 5: AI Background Removal */}
                  <button
                    onClick={() => setSelectedNode(5)}
                    className="z-10 group flex flex-col items-center text-center max-w-[210px] transition-transform hover:scale-105"
                  >
                    <div className="h-5 w-5 rounded-full border-4 border-[#009E94] bg-black shadow-sm group-hover:ring-4 group-hover:ring-[#009E94]/40" />
                    <span className="mt-3 text-[14px] font-bold text-gray-950 group-hover:text-teal-600">
                      AI background remove
                    </span>
                    <span className="text-[11px] text-gray-500 leading-tight">
                      Client-side product photo cutouts
                    </span>
                  </button>

                  {/* Node 4: Investor Pitch PDF */}
                  <button
                    onClick={() => setSelectedNode(4)}
                    className="z-10 group flex flex-col items-center text-center max-w-[210px] transition-transform hover:scale-105 mr-16"
                  >
                    <div className="h-5 w-5 rounded-full border-4 border-[#009E94] bg-black shadow-sm group-hover:ring-4 group-hover:ring-[#009E94]/40" />
                    <span className="mt-3 text-[14px] font-bold text-gray-950 group-hover:text-teal-600">
                      Investor pitch PDF
                    </span>
                    <span className="text-[11px] text-gray-500 leading-tight">
                      Merge, compress & watermark decks
                    </span>
                  </button>

                  {/* Spacer for alignment */}
                  <div className="w-12" />
                </div>
              </div>

              {/* ROW 3: Dev & Code (Steps 6, 7, 8) -> SHIPPED */}
              <div className="pt-4">
                <div className="text-[11px] font-bold tracking-widest text-[#6C5CE7] uppercase mb-1 ml-28">
                  3 · DEV & CODE
                </div>
                <div className="relative flex items-center justify-between pt-2">
                  {/* Spacer for alignment */}
                  <div className="w-10" />

                  {/* Node 6: Format & Sanitize */}
                  <button
                    onClick={() => setSelectedNode(6)}
                    className="z-10 group flex flex-col items-center text-center max-w-[190px] transition-transform hover:scale-105"
                  >
                    <div className="h-5 w-5 rounded-full border-4 border-[#6C5CE7] bg-black shadow-sm group-hover:ring-4 group-hover:ring-[#6C5CE7]/40" />
                    <span className="mt-3 text-[14px] font-bold text-gray-950 group-hover:text-indigo-600">
                      Format & sanitize
                    </span>
                    <span className="text-[11px] text-gray-500 leading-tight">
                      Prettify JSON, format SQL, parse JWT
                    </span>
                  </button>

                  {/* Node 7: Local Browser AI */}
                  <button
                    onClick={() => setSelectedNode(7)}
                    className="z-10 group flex flex-col items-center text-center max-w-[190px] transition-transform hover:scale-105"
                  >
                    <div className="h-5 w-5 rounded-full border-4 border-[#6C5CE7] bg-black shadow-sm group-hover:ring-4 group-hover:ring-[#6C5CE7]/40" />
                    <span className="mt-3 text-[14px] font-bold text-gray-950 group-hover:text-indigo-600">
                      Local browser AI
                    </span>
                    <span className="text-[11px] text-gray-500 leading-tight">
                      WebGPU models, 0 API fees
                    </span>
                  </button>

                  {/* Node 8: Launch & SEO Meta */}
                  <button
                    onClick={() => setSelectedNode(8)}
                    className="z-10 group flex flex-col items-center text-center max-w-[190px] transition-transform hover:scale-105"
                  >
                    <div className="h-5 w-5 rounded-full border-4 border-[#6C5CE7] bg-black shadow-sm group-hover:ring-4 group-hover:ring-[#6C5CE7]/40" />
                    <span className="mt-3 text-[14px] font-bold text-gray-950 group-hover:text-indigo-600">
                      Launch & SEO meta
                    </span>
                    <span className="text-[11px] text-gray-500 leading-tight">
                      OpenGraph previews & schema
                    </span>
                  </button>

                  {/* Finish Node: ★ SHIPPED & LIVE */}
                  <Link
                    href="/tools"
                    className="z-10 flex items-center justify-center gap-1.5 rounded-full bg-[#009E94] px-5 py-2 text-sm font-bold text-white shadow-lg shadow-teal-500/25 transition-transform hover:scale-105"
                  >
                    <Star className="h-3.5 w-3.5 fill-white" />
                    <span>SHIPPED & LIVE</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Responsive Pipeline Cards */}
        <div className="mt-8 block lg:hidden space-y-4">
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
            <div className="text-xs font-bold text-[#E5A855] uppercase">Phase 1 · Capital & Runway</div>
            <div className="mt-2 space-y-2">
              {steps.slice(0, 3).map((s) => (
                <div key={s.id} className="flex items-start gap-2.5">
                  <div className="mt-1 h-3 w-3 rounded-full bg-[#E5A855] shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900 text-sm">{s.name}</span>
                    <p className="text-xs text-gray-500">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
              <Check className="h-3.5 w-3.5" /> Founder approved before moving to Phase 2
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
            <div className="text-xs font-bold text-[#009E94] uppercase">Phase 2 · Assets & Media</div>
            <div className="mt-2 space-y-2">
              {steps.slice(3, 5).map((s) => (
                <div key={s.id} className="flex items-start gap-2.5">
                  <div className="mt-1 h-3 w-3 rounded-full bg-[#009E94] shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900 text-sm">{s.name}</span>
                    <p className="text-xs text-gray-500">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
              <Check className="h-3.5 w-3.5" /> Founder approved before moving to Phase 3
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
            <div className="text-xs font-bold text-[#6C5CE7] uppercase">Phase 3 · Dev & Code</div>
            <div className="mt-2 space-y-2">
              {steps.slice(5, 8).map((s) => (
                <div key={s.id} className="flex items-start gap-2.5">
                  <div className="mt-1 h-3 w-3 rounded-full bg-[#6C5CE7] shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900 text-sm">{s.name}</span>
                    <p className="text-xs text-gray-500">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#009E94]">
              ★ Shipped & running 100% private in browser
            </div>
          </div>
        </div>

        {/* Support Crew Commands Bar matching reference */}
        <div className="mt-12 text-center text-xs text-gray-500 font-mono">
          <span>Support crew your agent calls when needed: </span>
          <span className="text-gray-800 font-semibold">/runway-calculator</span>
          <span className="mx-2 text-gray-300">·</span>
          <span className="text-gray-800 font-semibold">/safe-calculator</span>
          <span className="mx-2 text-gray-300">·</span>
          <span className="text-gray-800 font-semibold">/merge-pdf</span>
          <span className="mx-2 text-gray-300">·</span>
          <span className="text-gray-800 font-semibold">/bg-removal</span>
          <span className="mx-2 text-gray-300">·</span>
          <span className="text-gray-800 font-semibold">/json-formatter</span>
          <span className="mx-2 text-gray-300">·</span>
          <span className="text-gray-800 font-semibold">/seo-preview</span>
        </div>
      </div>
    </section>
  );
}
