"use client";

import Link from "next/link";
import { ArrowRight, Lock, Shield, Zap } from "lucide-react";
import ToolSearchBar from "@/components/ToolSearchBar";
import { SITE_NAME } from "@/lib/site-config";

type Props = { totalTools: number };

export default function MarketingHero3D({ totalTools }: Props) {
  return (
    <section className="relative overflow-hidden rounded-3xl border my-8 sm:my-12" style={{ borderColor: "var(--color-border)" }}>
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-950 via-slate-900 to-cyan-950 animate-pulse"
        style={{ animationDuration: "8s" }}
        aria-hidden
      />
      <div
        className="absolute inset-0 -z-10 opacity-30 bg-[radial-gradient(circle_at_30%_20%,rgba(52,211,153,0.35),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(34,211,238,0.25),transparent_45%)]"
        aria-hidden
      />

      <div className="relative px-6 py-16 sm:py-24 text-center text-white">
        <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-emerald-200 bg-white/10 rounded-full px-3 py-1 mb-6">
          <Shield className="w-3 h-3" /> {SITE_NAME} · {totalTools}+ tools · No signup
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
          Ship faster with <span className="text-emerald-300">free startup tools</span>
        </h1>
        <p className="mt-6 text-lg text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
          Runway, SAFE, cap table, PDF, dev utilities, and more—wired from open-source projects into one hub. Most tools run in your browser.
        </p>

        <div className="mt-8 w-full max-w-2xl mx-auto [&_input]:bg-white [&_input]:text-gray-900">
          <ToolSearchBar />
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/tools"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-semibold px-6 py-3 transition"
          >
            Browse all tools <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/tools/finance/runway-calculator"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 hover:bg-white/10 font-medium px-6 py-3 transition"
          >
            Runway calculator
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-emerald-100/80">
          <span className="inline-flex items-center gap-2"><Lock className="w-4 h-4" /> Browser-private</span>
          <span className="inline-flex items-center gap-2"><Zap className="w-4 h-4" /> No watermark</span>
          <span className="inline-flex items-center gap-2"><Shield className="w-4 h-4" /> Open-source core</span>
        </div>
      </div>
    </section>
  );
}
