"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Lock,
  ChevronDown,
} from "lucide-react";
import {
  MarketplaceTool,
  getRelatedTools,
  CATEGORIES_LIST,
} from "@/lib/marketplace-tools";

interface ToolPageShellProps {
  tool: MarketplaceTool;
  children: React.ReactNode;
}

export default function ToolPageShell({ tool, children }: ToolPageShellProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const relatedTools = getRelatedTools(tool, 4);
  const categoryMeta = CATEGORIES_LIST.find((c) => c.id === tool.categorySlug);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      {/* ── Breadcrumb Bar ─────────────────────────────────────────── */}
      <div className="border-b border-[#E2E8F0] bg-white/70 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-xs sm:text-sm text-[#64748B]">
            <Link
              href="/"
              className="hover:text-[#2563EB] transition-colors font-medium"
            >
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#94A3B8]" />
            <Link
              href={`/?cat=${tool.categorySlug}`}
              className="hover:text-[#2563EB] transition-colors font-medium capitalize"
            >
              {categoryMeta?.title || tool.category}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#94A3B8]" />
            <span className="text-[#0F172A] font-semibold truncate">
              {tool.name}
            </span>
          </nav>
        </div>
      </div>

      {/* ── Main Container ─────────────────────────────────────────── */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
        {/* ── Tool Header ───────────────────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                categoryMeta?.bgColor || "bg-blue-50"
              } ${categoryMeta?.iconColor || "text-[#2563EB]"} border border-[#E2E8F0]`}
            >
              {categoryMeta?.icon && (
                <categoryMeta.icon className="h-3.5 w-3.5" />
              )}
              {categoryMeta?.title || tool.category}
            </span>

            {tool.isPopular && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                <Sparkles className="h-3 w-3" /> Popular
              </span>
            )}
            {tool.isNew && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                New
              </span>
            )}

            <div className="ml-auto hidden sm:flex items-center gap-3 text-xs text-[#64748B]">
              <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-[#E2E8F0]">
                <ShieldCheck className="h-3.5 w-3.5 text-[#16A34A]" />
                100% In-Browser
              </span>
              <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-[#E2E8F0]">
                <Lock className="h-3.5 w-3.5 text-[#2563EB]" />
                No Login Required
              </span>
              <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-[#E2E8F0]">
                <Zap className="h-3.5 w-3.5 text-amber-500" />
                Instant Processing
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A]">
              {tool.name}
            </h1>
            <p className="text-base sm:text-lg text-[#475569] max-w-3xl leading-relaxed">
              {tool.tagline}
            </p>
          </div>
        </section>

        {/* ── Main Tool Workspace (60–70% Viewport Focus) ──────────── */}
        <section className="relative rounded-2xl border border-[#E2E8F0] bg-white shadow-sm overflow-hidden">
          {children}
        </section>

        {/* ── Helpful Tool Information & Instructions ──────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          {/* Left Column: What it does & How to use */}
          <div className="lg:col-span-8 space-y-8">
            {/* What this tool does */}
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 sm:p-8 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
                About {tool.name}
              </h2>
              <p className="text-[#475569] leading-relaxed text-sm sm:text-base">
                {tool.description}
              </p>

              {/* Key Features */}
              <div className="pt-4 border-t border-[#F1F5F9] space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#64748B]">
                  Key Capabilities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tool.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-sm text-[#334155]"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[#16A34A] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* How to Use Step-by-Step */}
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 sm:p-8 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
                How to Use {tool.name}
              </h2>
              <div className="space-y-4 pt-2">
                {tool.howToUse.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-xs font-bold text-white shadow-sm">
                      {idx + 1}
                    </span>
                    <div className="text-sm sm:text-base text-[#334155] pt-0.5 leading-relaxed">
                      {step}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Accordion */}
            {tool.faq && tool.faq.length > 0 && (
              <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 sm:p-8 space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-[#2563EB]" />
                  Frequently Asked Questions
                </h2>
                <div className="divide-y divide-[#E2E8F0] pt-2">
                  {tool.faq.map((item, idx) => (
                    <div key={idx} className="py-4">
                      <button
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full flex items-center justify-between text-left text-sm sm:text-base font-semibold text-[#0F172A] hover:text-[#2563EB] transition-colors gap-4"
                      >
                        <span>{item.q}</span>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 text-[#64748B] transition-transform duration-200 ${
                            openFaq === idx ? "rotate-180 text-[#2563EB]" : ""
                          }`}
                        />
                      </button>
                      {openFaq === idx && (
                        <div className="mt-2.5 text-sm text-[#475569] leading-relaxed pl-1">
                          {item.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Privacy Box & Related Tools */}
          <div className="lg:col-span-4 space-y-6">
            {/* Privacy & Security Guarantee Card */}
            <div className="rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50/70 to-white p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0F172A] text-base">
                    Client-Side & Private
                  </h3>
                  <p className="text-xs text-emerald-700 font-medium">
                    Zero Server Storage
                  </p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Your data never leaves your browser. All computations, formatting,
                file processing, and calculations run strictly inside your local web
                worker / JavaScript runtime.
              </p>
              <div className="space-y-2 text-xs text-[#334155] pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>No login, sign-up or cookies required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>100% free and unlimited use</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Zero telemetry or content inspection</span>
                </div>
              </div>
            </div>

            {/* Related Tools */}
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-[#0F172A] text-base">
                  Related Tools
                </h3>
                <Link
                  href={`/?cat=${tool.categorySlug}`}
                  className="text-xs font-semibold text-[#2563EB] hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-3">
                {relatedTools.map((rel) => {
                  const RelIcon = rel.icon;
                  return (
                    <Link
                      key={rel.id}
                      href={rel.href}
                      className="group flex items-start gap-3 rounded-lg border border-[#E2E8F0] p-3 hover:border-[#2563EB] hover:bg-blue-50/30 transition-all"
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${rel.bgColor} ${rel.iconColor} border border-[#E2E8F0] group-hover:scale-105 transition-transform`}
                      >
                        <RelIcon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="font-semibold text-xs text-[#0F172A] group-hover:text-[#2563EB] transition-colors truncate">
                            {rel.name}
                          </h4>
                          <ArrowRight className="h-3 w-3 text-[#94A3B8] group-hover:text-[#2563EB] group-hover:translate-x-0.5 transition-all shrink-0" />
                        </div>
                        <p className="text-[11px] text-[#64748B] line-clamp-2 mt-0.5">
                          {rel.tagline}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
