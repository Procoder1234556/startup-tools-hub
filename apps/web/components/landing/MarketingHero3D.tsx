"use client";

import Link from "next/link";
import { ArrowRight, Lock, Shield, Sparkles, UploadCloud } from "lucide-react";
import ToolSearchBar from "@/components/ToolSearchBar";
import { SITE_NAME } from "@/lib/site-config";
import { listCategories } from "@/lib/categories";

type Props = { totalTools: number };

export default function MarketingHero3D({ totalTools }: Props) {
  const categoryCount = listCategories().length;

  return (
    <section className="relative overflow-hidden rounded-[2rem] border my-8 sm:my-12 shadow-[0_24px_80px_-40px_rgba(234,88,12,0.45)]" style={{ borderColor: "var(--color-border)" }}>
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,#ffedd5,transparent_55%),radial-gradient(ellipse_at_bottom_right,#ffe4e6,transparent_50%),linear-gradient(135deg,#fff7ed_0%,#ffffff_45%,#fff1f2_100%)]"
        aria-hidden
      />
      <div
        className="absolute -top-24 -right-16 h-64 w-64 rounded-full bg-orange-200/40 blur-3xl motion-safe:animate-pulse"
        style={{ animationDuration: "10s" }}
        aria-hidden
      />

      <div className="relative px-6 py-14 sm:py-20 lg:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-orange-800 bg-white/70 backdrop-blur border border-orange-100 rounded-full px-3 py-1 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" aria-hidden />
            {SITE_NAME} · Local-first toolbox
          </div>
          <h1 className="font-[family-name:var(--font-outfit)] text-4xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight text-slate-900 leading-[1.05]">
            Everything you need.
            <span className="block text-orange-600">Right in your browser.</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            PDF, startup finance, dev utilities, text, math, and converters — {totalTools} free tools with no signup. Most work offline after load; your data stays on your device.
          </p>

          <div className="mt-8 w-full max-w-2xl mx-auto">
            <ToolSearchBar totalTools={totalTools} />
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/tools"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-semibold px-6 py-3 transition shadow-lg shadow-orange-600/20 cursor-pointer"
            >
              Browse all tools <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/tools/finance/runway-calculator"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-orange-200 bg-white/80 hover:bg-white font-medium px-6 py-3 transition cursor-pointer"
            >
              Runway calculator
            </Link>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          <StatCard label="Tools" value={String(totalTools)} />
          <StatCard label="Categories" value={String(categoryCount)} />
          <StatCard label="Uploads required" value="0" icon={<UploadCloud className="w-4 h-4" />} />
          <StatCard label="Accounts" value="None" icon={<Lock className="w-4 h-4" />} />
        </div>

        <p className="mt-8 text-center text-sm text-slate-500 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <span className="inline-flex items-center gap-2"><Shield className="w-4 h-4 text-orange-600" /> Browser-private Tier A tools</span>
          <span className="inline-flex items-center gap-2"><Lock className="w-4 h-4 text-orange-600" /> No watermark · No daily cap</span>
        </p>
      </div>
    </section>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-white/80 backdrop-blur px-4 py-4 text-left" style={{ borderColor: "var(--color-border)" }}>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 flex items-center gap-1.5">
        {icon}
        {label}
      </p>
      <p className="mt-1 text-2xl sm:text-3xl font-bold text-slate-900 font-[family-name:var(--font-outfit)] tabular-nums">{value}</p>
    </div>
  );
}
