"use client";

import { useMemo, useState } from "react";
import { computeLtvCac } from "@/lib/finance/unit-economics";
import { formatUsd } from "@/lib/finance/tam-sam-som";

function parseNum(raw: string): number {
  const n = parseFloat(raw.replace(/,/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export default function FinanceLtvCacTool() {
  const [arpa, setArpa] = useState("99");
  const [marginPct, setMarginPct] = useState("80");
  const [churnPct, setChurnPct] = useState("3");
  const [cac, setCac] = useState("450");

  const result = useMemo(() => {
    const grossMargin = parseNum(marginPct) / 100;
    const monthlyChurn = parseNum(churnPct) / 100;
    return computeLtvCac({
      arpaMonthly: parseNum(arpa),
      grossMargin,
      monthlyChurn,
      cac: parseNum(cac),
    });
  }, [arpa, marginPct, churnPct, cac]);

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-cyan-600 focus:outline-none focus:ring-1 focus:ring-cyan-600";

  return (
    <div className="py-8 space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">LTV / CAC calculator</h1>
        <p className="text-gray-600 text-sm max-w-3xl">
          Estimate customer lifetime value (LTV), LTV:CAC ratio, and CAC payback months using ARPA, gross margin, and
          logo churn. Standard SaaS shorthand — verify with your finance model.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1 text-sm">
          <span className="font-medium text-gray-700">ARPA / month ($)</span>
          <input className={inputClass} value={arpa} onChange={(e) => setArpa(e.target.value)} inputMode="decimal" />
        </label>
        <label className="block space-y-1 text-sm">
          <span className="font-medium text-gray-700">Gross margin (%)</span>
          <input className={inputClass} value={marginPct} onChange={(e) => setMarginPct(e.target.value)} inputMode="decimal" />
        </label>
        <label className="block space-y-1 text-sm">
          <span className="font-medium text-gray-700">Monthly churn (%)</span>
          <input className={inputClass} value={churnPct} onChange={(e) => setChurnPct(e.target.value)} inputMode="decimal" />
        </label>
        <label className="block space-y-1 text-sm">
          <span className="font-medium text-gray-700">CAC ($)</span>
          <input className={inputClass} value={cac} onChange={(e) => setCac(e.target.value)} inputMode="decimal" />
        </label>
      </div>

      {result.warnings.length > 0 && (
        <ul className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 list-disc pl-8">
          {result.warnings.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-cyan-200 bg-cyan-50/50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-cyan-800">LTV</p>
          <p className="mt-1 text-2xl font-semibold">{result.ltv != null ? formatUsd(result.ltv) : "—"}</p>
        </div>
        <div className="rounded-xl border border-cyan-200 bg-cyan-50/50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-cyan-800">LTV : CAC</p>
          <p className="mt-1 text-2xl font-semibold">
            {result.ltvCacRatio != null ? `${result.ltvCacRatio.toFixed(2)}×` : "—"}
          </p>
        </div>
        <div className="rounded-xl border border-cyan-200 bg-cyan-50/50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-cyan-800">CAC payback</p>
          <p className="mt-1 text-2xl font-semibold">
            {result.monthsToPayback != null ? `${result.monthsToPayback.toFixed(1)} mo` : "—"}
          </p>
        </div>
      </div>
    </div>
  );
}
