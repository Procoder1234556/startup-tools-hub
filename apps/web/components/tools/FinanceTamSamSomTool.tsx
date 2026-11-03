"use client";

import { useMemo, useState } from "react";
import { computeTamSamSom, formatUsd } from "@/lib/finance/tam-sam-som";

function parseMoney(raw: string): number {
  const cleaned = raw.replace(/[$,\s]/g, "");
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
}

export default function FinanceTamSamSomTool() {
  const [tam, setTam] = useState("1000000000");
  const [sam, setSam] = useState("200000000");
  const [som, setSom] = useState("10000000");

  const result = useMemo(
    () =>
      computeTamSamSom({
        tam: parseMoney(tam),
        sam: parseMoney(sam),
        som: parseMoney(som),
      }),
    [tam, sam, som]
  );

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-cyan-600 focus:outline-none focus:ring-1 focus:ring-cyan-600";

  return (
    <div className="py-8 space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">TAM / SAM / SOM calculator</h1>
        <p className="text-gray-600 text-sm max-w-3xl">
          Size your market top-down: total addressable market (TAM), serviceable addressable market (SAM), and
          serviceable obtainable market (SOM). Runs entirely in your browser — not investment advice.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block space-y-1 text-sm">
          <span className="font-medium text-gray-700">TAM ($)</span>
          <input className={inputClass} value={tam} onChange={(e) => setTam(e.target.value)} inputMode="decimal" />
        </label>
        <label className="block space-y-1 text-sm">
          <span className="font-medium text-gray-700">SAM ($)</span>
          <input className={inputClass} value={sam} onChange={(e) => setSam(e.target.value)} inputMode="decimal" />
        </label>
        <label className="block space-y-1 text-sm">
          <span className="font-medium text-gray-700">SOM ($)</span>
          <input className={inputClass} value={som} onChange={(e) => setSom(e.target.value)} inputMode="decimal" />
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
          <p className="text-xs font-medium uppercase tracking-wide text-cyan-800">SAM ÷ TAM</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">
            {result.samPctOfTam != null ? `${result.samPctOfTam.toFixed(1)}%` : "—"}
          </p>
          <p className="mt-1 text-xs text-gray-600">{formatUsd(parseMoney(sam))} of {formatUsd(parseMoney(tam))}</p>
        </div>
        <div className="rounded-xl border border-cyan-200 bg-cyan-50/50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-cyan-800">SOM ÷ SAM</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">
            {result.somPctOfSam != null ? `${result.somPctOfSam.toFixed(1)}%` : "—"}
          </p>
          <p className="mt-1 text-xs text-gray-600">Obtainable share of SAM</p>
        </div>
        <div className="rounded-xl border border-cyan-200 bg-cyan-50/50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-cyan-800">SOM ÷ TAM</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">
            {result.somPctOfTam != null ? `${result.somPctOfTam.toFixed(2)}%` : "—"}
          </p>
          <p className="mt-1 text-xs text-gray-600">Share of total market</p>
        </div>
      </div>
    </div>
  );
}
