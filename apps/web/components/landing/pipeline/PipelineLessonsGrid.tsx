"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Terminal, FileText, CheckCircle2, Layout, Sparkles, Code, Check, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function PipelineLessonsGrid() {
  const [selectedVariant, setSelectedVariant] = useState<string>("B");

  return (
    <section className="bg-[#FAF8F5] py-20 sm:py-28 border-b border-[#ECEAE7]" id="tools-grid">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Section Heading matching reference typography and layout */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
            The tool suites, one by one
          </h2>
          <p className="text-[15px] sm:text-[16px] text-gray-600 leading-relaxed font-normal">
            What you get — and what your agent runs — across each core startup milestone.
          </p>
        </div>

        {/* 1. Know your zero-cash date before spending a dollar */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Mockup Card */}
          <div className="rounded-2xl border border-gray-200/90 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 text-xs font-mono text-gray-400">
              <span className="flex items-center gap-1.5 font-semibold text-gray-800">
                <FileText className="h-3.5 w-3.5 text-sky-500" /> runway-forecast.json
              </span>
              <span className="rounded bg-sky-50 px-2 py-0.5 text-sky-700 text-[10px] font-bold">
                16.4 MOS CASH
              </span>
            </div>
            <div className="mt-4 space-y-4 font-mono text-xs">
              <div>
                <span className="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-gray-700">
                  CURRENT BURN RATE
                </span>
                <p className="mt-1 text-gray-700 font-sans text-xs leading-relaxed font-semibold">
                  $18,400 / month ($300k starting bank balance)
                </p>
              </div>
              <div>
                <span className="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-gray-700">
                  ZERO-CASH MILESTONE
                </span>
                <p className="mt-1 text-gray-600 font-sans text-xs leading-relaxed">
                  Default alive if revenue hits $22k MRR by Month 11. Zero-cash date projected at Nov 2027 without new funding.
                </p>
              </div>
              <div>
                <span className="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-gray-700">
                  HIRING SCENARIO
                </span>
                <div className="mt-1.5 space-y-1 text-gray-500 text-[11px]">
                  <p>• Adding 1 Senior Engineer (-$12k/mo) drops runway to 9.8 months.</p>
                  <p>• Milestone target: Raise Seed at Month 10 with 6 months buffer remaining.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text Description */}
          <div className="space-y-4">
            <div className="text-[11px] font-bold tracking-widest text-[#E5A855] uppercase">
              PHASE 1 · CAPITAL & RUNWAY
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight text-gray-950 sm:text-3xl">
              Know your zero-cash date before spending a dollar
            </h3>
            <p className="text-[15px] leading-relaxed text-gray-600">
              Model hiring plans, revenue growth scenarios, and monthly burn with zero spreadsheets. Visual runway forecasts tell you exactly when you need to raise, cut expenses, or reach default alive.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <Link
                href="/tools/finance/runway-calculator"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1.5 font-mono text-xs font-semibold text-gray-800 hover:bg-gray-200 transition-colors"
              >
                <Terminal className="h-3.5 w-3.5 text-sky-600" />
                <span>$ /runway-calculator</span>
              </Link>
              <Link
                href="/tools/finance/runway-calculator"
                className="text-xs font-semibold text-sky-600 hover:text-sky-800 flex items-center gap-1"
              >
                <span>Launch Tool</span> →
              </Link>
            </div>
          </div>
        </div>

        {/* 2. Model dilution without getting diluted to oblivion (Reversed) */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Text Description */}
          <div className="space-y-4 order-2 lg:order-1">
            <div className="text-[11px] font-bold tracking-widest text-[#E5A855] uppercase">
              PHASE 1 · CAPITAL & RUNWAY
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight text-gray-950 sm:text-3xl">
              Model dilution without getting diluted to oblivion
            </h3>
            <p className="text-[15px] leading-relaxed text-gray-600">
              Calculate post-money YC SAFEs, pre-money notes, valuation caps, MFN clauses, and unallocated option pools. Understand your exact ownership percentage before signing investor term sheets.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <Link
                href="/tools/finance/safe-calculator"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1.5 font-mono text-xs font-semibold text-gray-800 hover:bg-gray-200 transition-colors"
              >
                <Terminal className="h-3.5 w-3.5 text-sky-600" />
                <span>$ /safe-calculator</span>
              </Link>
              <Link
                href="/tools/finance/safe-calculator"
                className="text-xs font-semibold text-sky-600 hover:text-sky-800 flex items-center gap-1"
              >
                <span>Launch Tool</span> →
              </Link>
            </div>
          </div>

          {/* Mockup Card */}
          <div className="rounded-2xl border border-gray-200/90 bg-white p-6 shadow-sm order-1 lg:order-2">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 text-xs font-mono text-gray-400">
              <span className="flex items-center gap-1.5 font-semibold text-gray-800">
                <FileText className="h-3.5 w-3.5 text-sky-500" /> post-money-safe.model
              </span>
              <span className="rounded bg-sky-50 px-2 py-0.5 text-sky-700 text-[10px] font-bold">
                YC POST-MONEY
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg bg-gray-50 p-2.5">
                <span className="text-[10px] font-bold text-gray-400">VALUATION CAP</span>
                <p className="mt-0.5 text-gray-900 font-bold text-sm">$10,000,000</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-2.5">
                <span className="text-[10px] font-bold text-gray-400">INVESTED AMOUNT</span>
                <p className="mt-0.5 text-gray-900 font-bold text-sm">$1,500,000</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-2.5">
                <span className="text-[10px] font-bold text-gray-400">FOUNDER EQUITY</span>
                <p className="mt-0.5 text-emerald-600 font-bold text-sm">75.0%</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-2.5">
                <span className="text-[10px] font-bold text-gray-400">OPTION POOL</span>
                <p className="mt-0.5 text-gray-800 font-semibold text-sm">10.0% (Unallocated)</p>
              </div>
              <div className="col-span-2 rounded-lg bg-sky-50/70 p-2.5 border border-sky-100">
                <span className="text-[10px] font-bold text-sky-700">DILUTION SUMMARY</span>
                <p className="mt-0.5 text-sky-950 font-medium text-[11px]">
                  Investor gets 15.0% ownership upon priced Series A conversion. No phantom dilution on unallocated pool.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Clean investor decks without paid Adobe or iLovePDF */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Mockup Card */}
          <div className="rounded-2xl border border-gray-200/90 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 text-xs font-mono text-gray-400">
              <span className="flex items-center gap-1.5 font-semibold text-gray-800">
                <FileText className="h-3.5 w-3.5 text-sky-500" /> pitch-deck-pipeline.pdf
              </span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                -94.2% COMPRESSED
              </span>
            </div>
            <div className="mt-4 overflow-hidden rounded-lg border border-gray-100">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-gray-50 text-[10px] text-gray-500 uppercase">
                  <tr>
                    <th className="p-2">OPERATION</th>
                    <th className="p-2">STATUS</th>
                    <th className="p-2">PRIVACY</th>
                    <th className="p-2 text-right">TIME</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-[11px]">
                  <tr>
                    <td className="p-2 font-sans font-medium text-gray-900">Merge Deck + Appendix</td>
                    <td className="p-2 text-sky-600">32 Pages Merged</td>
                    <td className="p-2 text-emerald-600 font-bold">100% Client-side</td>
                    <td className="p-2 text-right text-gray-500">0.3s</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-sans font-medium text-gray-900">Shrink 48MB to 2.8MB</td>
                    <td className="p-2 text-sky-600">Lossless Vector</td>
                    <td className="p-2 text-emerald-600 font-bold">No Cloud Upload</td>
                    <td className="p-2 text-right text-gray-500">1.1s</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-sans font-medium text-gray-900">Add Confidential Watermark</td>
                    <td className="p-2 text-sky-600">Stamped 'Investor Copy'</td>
                    <td className="p-2 text-emerald-600 font-bold">Zero Trace</td>
                    <td className="p-2 text-right text-gray-500">0.2s</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Text Description */}
          <div className="space-y-4">
            <div className="text-[11px] font-bold tracking-widest text-[#009E94] uppercase">
              PHASE 2 · ASSETS & PDF
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight text-gray-950 sm:text-3xl">
              Clean investor decks without paid Adobe or iLovePDF
            </h3>
            <p className="text-[15px] leading-relaxed text-gray-600">
              Compress 50MB pitch decks down to 3MB for email attachments. Merge partner appendices, reorder slides, and add watermarks—all inside your browser without uploading sensitive deck files to third-party servers.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <Link
                href="/tools/pdf/merge-pdf"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1.5 font-mono text-xs font-semibold text-gray-800 hover:bg-gray-200 transition-colors"
              >
                <Terminal className="h-3.5 w-3.5 text-sky-600" />
                <span>$ /pdf-tools</span>
              </Link>
              <Link
                href="/tools/pdf/merge-pdf"
                className="text-xs font-semibold text-sky-600 hover:text-sky-800 flex items-center gap-1"
              >
                <span>Launch Tool</span> →
              </Link>
            </div>
          </div>
        </div>

        {/* 4. Studio product photos and clean PNGs in seconds (Reversed) */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Text Description */}
          <div className="space-y-4 order-2 lg:order-1">
            <div className="text-[11px] font-bold tracking-widest text-[#009E94] uppercase">
              PHASE 2 · ASSETS & MEDIA
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight text-gray-950 sm:text-3xl">
              Studio product photos and clean PNGs in seconds
            </h3>
            <p className="text-[15px] leading-relaxed text-gray-600">
              Runs WebAssembly AI background removal entirely on your local machine. Zero API keys, zero upload lag, zero monthly cloud costs. Perfect for founder headshots, logos, and e-commerce hero assets.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <Link
                href="/tools/image/background-remover"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1.5 font-mono text-xs font-semibold text-gray-800 hover:bg-gray-200 transition-colors"
              >
                <Terminal className="h-3.5 w-3.5 text-sky-600" />
                <span>$ /bg-removal</span>
              </Link>
              <Link
                href="/tools/image/background-remover"
                className="text-xs font-semibold text-sky-600 hover:text-sky-800 flex items-center gap-1"
              >
                <span>Launch Tool</span> →
              </Link>
            </div>
          </div>

          {/* Mockup Card */}
          <div className="rounded-2xl border border-gray-200/90 bg-white p-6 shadow-sm order-1 lg:order-2">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 text-xs font-mono text-gray-400">
              <span className="flex items-center gap-1.5 font-semibold text-gray-800">
                <Sparkles className="h-3.5 w-3.5 text-sky-500" /> wasm-cutout.png
              </span>
              <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                ON-DEVICE WASM
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-gray-200 bg-gray-100 p-3 text-center space-y-2">
                <span className="text-[10px] font-bold text-gray-500 font-mono">ORIGINAL PHOTO</span>
                <div className="aspect-square rounded-lg bg-gray-300 flex items-center justify-center text-xs text-gray-600 font-mono">
                  Full Background
                </div>
                <span className="text-[10px] text-gray-400">Messy studio background</span>
              </div>
              <div className="rounded-xl border border-sky-300 bg-sky-50/50 p-3 text-center space-y-2">
                <span className="text-[10px] font-bold text-sky-700 font-mono">AI CUTOUT (0.4s)</span>
                <div className="aspect-square rounded-lg bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:8px_8px] bg-white border border-gray-200 flex items-center justify-center text-xs text-sky-700 font-mono font-bold">
                  Transparent PNG
                </div>
                <span className="text-[10px] text-emerald-600 font-semibold">100% Crisp Edges</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Validate, format, and debug payloads instantly */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Mockup Card */}
          <div className="rounded-2xl border border-gray-200/90 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 text-xs font-mono text-gray-400">
              <span className="flex items-center gap-1.5 font-semibold text-gray-800">
                <Code className="h-3.5 w-3.5 text-sky-500" /> payload-prettifier.json
              </span>
              <div className="flex gap-1.5">
                <span className="rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.5">
                  VALID JSON
                </span>
                <span className="rounded bg-sky-100 text-sky-800 text-[9px] font-bold px-1.5 py-0.5">
                  2-SPACE
                </span>
              </div>
            </div>
            <div className="mt-4 rounded-lg bg-gray-900 p-3.5 font-mono text-[11px] text-gray-200 space-y-1 overflow-x-auto">
              <p><span className="text-purple-400">&#123;</span></p>
              <p className="ml-3"><span className="text-sky-300">"status"</span>: <span className="text-emerald-400">"success"</span>,</p>
              <p className="ml-3"><span className="text-sky-300">"founder"</span>: <span className="text-emerald-400">"ready_to_ship"</span>,</p>
              <p className="ml-3"><span className="text-sky-300">"tools_active"</span>: <span className="text-amber-400">100</span>,</p>
              <p className="ml-3"><span className="text-sky-300">"privacy"</span>: <span className="text-emerald-400">"zero_telemetry"</span></p>
              <p><span className="text-purple-400">&#125;</span></p>
            </div>
          </div>

          {/* Text Description */}
          <div className="space-y-4">
            <div className="text-[11px] font-bold tracking-widest text-[#6C5CE7] uppercase">
              PHASE 3 · DEV & CODE
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight text-gray-950 sm:text-3xl">
              Validate, format, and debug payloads instantly
            </h3>
            <p className="text-[15px] leading-relaxed text-gray-600">
              JSON formatting and validation, SQL query beautifier, Base64 encoder/decoder, and JWT inspection. The utility belt every founder and developer keeps pinned in their browser tabs.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <Link
                href="/tools/dev/json-formatter"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1.5 font-mono text-xs font-semibold text-gray-800 hover:bg-gray-200 transition-colors"
              >
                <Terminal className="h-3.5 w-3.5 text-sky-600" />
                <span>$ /dev-tools</span>
              </Link>
              <Link
                href="/tools/dev/json-formatter"
                className="text-xs font-semibold text-sky-600 hover:text-sky-800 flex items-center gap-1"
              >
                <span>Launch Tool</span> →
              </Link>
            </div>
          </div>
        </div>

        {/* 6. Local browser AI intelligence with zero API keys (Reversed) */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Text Description */}
          <div className="space-y-4 order-2 lg:order-1">
            <div className="text-[11px] font-bold tracking-widest text-[#6C5CE7] uppercase">
              PHASE 3 · DEV & CODE
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight text-gray-950 sm:text-3xl">
              Local browser AI intelligence with zero API keys
            </h3>
            <p className="text-[15px] leading-relaxed text-gray-600">
              Run open-source LLMs right inside your browser via WebGPU acceleration. Draft landing page copy, generate marketing taglines, and parse messy unstructured text with complete privacy and zero monthly token bills.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <Link
                href="/tools/ai/chat"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1.5 font-mono text-xs font-semibold text-gray-800 hover:bg-gray-200 transition-colors"
              >
                <Terminal className="h-3.5 w-3.5 text-sky-600" />
                <span>$ /local-ai</span>
              </Link>
              <Link
                href="/tools/ai/chat"
                className="text-xs font-semibold text-sky-600 hover:text-sky-800 flex items-center gap-1"
              >
                <span>Launch Tool</span> →
              </Link>
            </div>
          </div>

          {/* Mockup Card */}
          <div className="rounded-2xl border border-gray-200/90 bg-white p-6 shadow-sm order-1 lg:order-2">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 text-xs font-mono text-gray-400">
              <span className="flex items-center gap-1.5 font-semibold text-gray-800">
                <Sparkles className="h-3.5 w-3.5 text-sky-500" /> web-llm-session.local
              </span>
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                WEBGPU ACCELERATED
              </span>
            </div>
            <div className="mt-4 space-y-2.5 font-sans text-xs">
              <div className="rounded-lg bg-gray-100 p-2.5 text-gray-800">
                <span className="text-[10px] font-bold text-gray-500 font-mono">PROMPT</span>
                <p className="mt-0.5 font-medium">"Draft 3 punchy benefit bullets for a free startup tool suite."</p>
              </div>
              <div className="rounded-lg bg-sky-50 border border-sky-100 p-2.5 text-sky-950">
                <span className="text-[10px] font-bold text-sky-700 font-mono">ON-DEVICE RESPONSE</span>
                <p className="mt-0.5 font-semibold">1. Zero file uploads: 100% browser-side privacy.</p>
                <p className="mt-0.5 font-semibold">2. Built for AI agents: CLI and prompt ready.</p>
                <p className="mt-0.5 font-semibold">3. Free forever: no subscriptions or cards.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 7. Pick a direction, preview social cards */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Mockup Card (4 Variants Grid) */}
          <div className="rounded-2xl border border-gray-200/90 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 text-xs font-mono text-gray-400">
              <span className="flex items-center gap-1.5 font-semibold text-gray-800">
                <Layout className="h-3.5 w-3.5 text-sky-500" /> 4 Social Card Previews
              </span>
              <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                SELECTED: {selectedVariant}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { id: "A", name: "Twitter / X Card", tag: "Summary large image" },
                { id: "B", name: "LinkedIn Post", tag: "Professional preview" },
                { id: "C", name: "Google SERP", tag: "Title, snippet & rich URL" },
                { id: "D", name: "Slack / Discord", tag: "OpenGraph un-furling" },
              ].map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v.id)}
                  className={`flex flex-col text-left rounded-xl p-3 border transition-all ${
                    selectedVariant === v.id
                      ? "border-sky-500 bg-sky-50/60 shadow-sm ring-2 ring-sky-500/20"
                      : "border-gray-200 bg-gray-50/50 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900">{v.name}</span>
                    {selectedVariant === v.id && (
                      <CheckCircle2 className="h-3.5 w-3.5 text-sky-600" />
                    )}
                  </div>
                  <span className="text-[10px] text-gray-500 mt-1">{v.tag}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Text Description */}
          <div className="space-y-4">
            <div className="text-[11px] font-bold tracking-widest text-[#6C5CE7] uppercase">
              PHASE 3 · DEV & CODE
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight text-gray-950 sm:text-3xl">
              Rank on Google and win social feeds
            </h3>
            <p className="text-[15px] leading-relaxed text-gray-600">
              Inspect OpenGraph metadata, preview Twitter & LinkedIn cards, test Google SERP snippets, and export structured JSON-LD schema markup. Ensure your startup looks immaculate wherever it is shared.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <Link
                href="/tools/dev/open-graph-preview"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1.5 font-mono text-xs font-semibold text-gray-800 hover:bg-gray-200 transition-colors"
              >
                <Terminal className="h-3.5 w-3.5 text-sky-600" />
                <span>$ /seo-preview</span>
              </Link>
              <Link
                href="/tools/dev/open-graph-preview"
                className="text-xs font-semibold text-sky-600 hover:text-sky-800 flex items-center gap-1"
              >
                <span>Launch Tool</span> →
              </Link>
            </div>
          </div>
        </div>

        {/* 8. Real startup assets in every placeholder (Reversed) */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Text Description */}
          <div className="space-y-4 order-2 lg:order-1">
            <div className="text-[11px] font-bold tracking-widest text-[#6C5CE7] uppercase">
              PHASE 3 · DEV & CODE
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight text-gray-950 sm:text-3xl">
              QR codes, UTM links, and launch utilities
            </h3>
            <p className="text-[15px] leading-relaxed text-gray-600">
              Generate branded SVG/PNG QR codes, build campaign UTM tracking links, calculate readability scores, and convert timestamps. Everything you need to coordinate your launch day in one tab.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <Link
                href="/tools/calc/qr-generator"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1.5 font-mono text-xs font-semibold text-gray-800 hover:bg-gray-200 transition-colors"
              >
                <Terminal className="h-3.5 w-3.5 text-sky-600" />
                <span>$ /qr-generator</span>
              </Link>
              <Link
                href="/tools/calc/qr-generator"
                className="text-xs font-semibold text-sky-600 hover:text-sky-800 flex items-center gap-1"
              >
                <span>Launch Tool</span> →
              </Link>
            </div>
          </div>

          {/* Mockup Card (Mini Charts & Stat Cards) */}
          <div className="rounded-2xl border border-gray-200/90 bg-white p-6 shadow-sm order-1 lg:order-2">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 text-xs font-mono text-gray-400">
              <span className="flex items-center gap-1.5 font-semibold text-gray-800">
                <Sparkles className="h-3.5 w-3.5 text-sky-500" /> launch-kit/
              </span>
              <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                READY TO SHIP
              </span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {/* Mini QR Code */}
              <div className="flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-gray-50 p-2.5 h-24">
                <div className="h-10 w-10 bg-gray-900 rounded p-1 flex items-center justify-center text-[8px] text-white font-mono">
                  QR
                </div>
                <span className="mt-1 text-[9px] font-mono text-gray-500">Vector SVG</span>
              </div>

              {/* UTM Link Pill Card */}
              <div className="flex flex-col justify-center rounded-xl border border-gray-100 bg-gray-50 p-2.5 space-y-1 h-24 text-[10px]">
                <div className="text-gray-400 font-mono text-[9px]">UTM TAGS</div>
                <div className="font-semibold text-gray-800 truncate">src=producthunt</div>
                <div className="text-emerald-600 font-semibold">100% Validated</div>
              </div>

              {/* Stat Pill Card */}
              <div className="flex flex-col justify-center items-center rounded-xl border border-gray-100 bg-gray-50 p-3 h-24 text-center">
                <span className="text-lg font-bold text-gray-900">100+</span>
                <span className="text-[9px] text-gray-500">Free Tools Live</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
