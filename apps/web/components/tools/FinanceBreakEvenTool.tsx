"use client";

import { useMemo, useState } from "react";
import { computeBreakEven } from "@/lib/finance/break-even";
import { formatUsd } from "@/lib/finance/tam-sam-som";

function parseNum(raw: string): number {
  const n = parseFloat(raw.replace(/,/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export default function FinanceBreakEvenTool() {
  const [fixed, setFixed] = useState("50000");
  const [price, setPrice] = useState("120");
  const [variable, setVariable] = useState("35");

  const result = useMemo(
    () =>
      computeBreakEven({
        fixedCostsMonthly: parseNum(fixed),
        pricePerUnit: parseNum(price),
        variableCostPerUnit: parseNum(variable),
      }),
    [fixed, price, variable]
  );

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-cyan-600 focus:outline-none focus:ring-1 focus:ring-cyan-600";

  return (
    <div className="py-8 space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">Break-even calculator</h1>
        <p className="text-gray-600 text-sm max-w-3xl">
          Monthly fixed costs, unit price, and variable cost per unit → contribution margin and break-even volume.
          Useful for SaaS + physical hybrids; browser-only.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block space-y-1 text-sm">
          <span className="font-medium text-gray-700">Fixed costs / month ($)</span>
          <input className={inputClass} value={fixed} onChange={(e) => setFixed(e.target.value)} inputMode="decimal" />
        </label>
        <label className="block space-y-1 text-sm">
          <span className="font-medium text-gray-700">Price per unit ($)</span>
          <input className={inputClass} value={price} onChange={(e) => setPrice(e.target.value)} inputMode="decimal" />
        </label>
        <label className="block space-y-1 text-sm">
          <span className="font-medium text-gray-700">Variable cost / unit ($)</span>
          <input className={inputClass} value={variable} onChange={(e) => setVariable(e.target.value)} inputMode="decimal" />
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
          <p className="text-xs font-medium uppercase tracking-wide text-cyan-800">Contribution / unit</p>
          <p className="mt-1 text-2xl font-semibold">{formatUsd(result.contributionPerUnit)}</p>
        </div>
        <div className="rounded-xl border border-cyan-200 bg-cyan-50/50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-cyan-800">Break-even units</p>
          <p className="mt-1 text-2xl font-semibold">
            {result.breakEvenUnits != null ? Math.ceil(result.breakEvenUnits).toLocaleString() : "—"}
          </p>
        </div>
        <div className="rounded-xl border border-cyan-200 bg-cyan-50/50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-cyan-800">Break-even revenue</p>
          <p className="mt-1 text-2xl font-semibold">
            {result.breakEvenRevenue != null ? formatUsd(result.breakEvenRevenue) : "—"}
          </p>
        </div>
      </div>
    </div>
  );
}
