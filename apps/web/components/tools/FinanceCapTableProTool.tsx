"use client";

import { useMemo, useState } from "react";
import {
  DEMO_PRICED_ROUND,
  runPricedRound,
  type PricedRoundInput,
} from "@/lib/finance/cap-table-pro";

const pct = (n: number) => (n * 100).toFixed(2) + "%";

export default function FinanceCapTableProTool() {
  const [preMoney, setPreMoney] = useState(DEMO_PRICED_ROUND.preMoneyValuation);
  const [poolTarget, setPoolTarget] = useState(DEMO_PRICED_ROUND.targetOptionsPct ?? 0.1);
  const [seriesTotal, setSeriesTotal] = useState(
    DEMO_PRICED_ROUND.seriesInvestors?.reduce((s, i) => s + i.investment, 0) ?? 0,
  );

  const input: PricedRoundInput = useMemo(() => {
    const investors = DEMO_PRICED_ROUND.seriesInvestors ?? [];
    const ratio =
      investors.length && seriesTotal > 0
        ? seriesTotal / investors.reduce((s, i) => s + i.investment, 0)
        : 1;
    return {
      ...DEMO_PRICED_ROUND,
      preMoneyValuation: preMoney,
      targetOptionsPct: poolTarget,
      seriesInvestors: investors.map((inv) => ({
        ...inv,
        investment: Math.round(inv.investment * ratio),
      })),
    };
  }, [preMoney, poolTarget, seriesTotal]);

  const result = useMemo(() => {
    try {
      return runPricedRound(input);
    } catch {
      return null;
    }
  }, [input]);

  const rows = useMemo(() => {
    if (!result) return [];
    const { capTable } = result;
    return [
      ...capTable.common.map((r) => ({ name: r.name, shares: r.shares, ownership: r.ownershipPct })),
      ...capTable.safes.map((r) => ({ name: r.name, shares: r.shares, ownership: r.ownershipPct })),
      ...capTable.series.map((r) => ({ name: r.name, shares: r.shares, ownership: r.ownershipPct })),
      {
        name: capTable.optionsPool.name,
        shares: capTable.optionsPool.shares,
        ownership: capTable.optionsPool.ownershipPct,
      },
    ];
  }, [result]);

  return (
    <div className="space-y-8 py-8">
      <header>
        <h1 className="text-2xl font-bold">Cap table pro (priced round)</h1>
        <p className="mt-2 text-sm text-gray-600">
          Recursive SAFE + pool refresh math from{" "}
          <a
            href="https://github.com/1984vc/cap-table"
            className="text-emerald-600 underline"
            target="_blank"
            rel="noreferrer"
          >
            @1984vc/cap-table
          </a>{" "}
          (MIT). Demo uses two founders, issued options, unused pool, one SAFE, and Series A checks.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="text-sm">
          Pre-money valuation ($)
          <input
            type="number"
            className="mt-1 w-full rounded border px-3 py-2"
            value={preMoney}
            onChange={(e) => setPreMoney(Number(e.target.value))}
          />
        </label>
        <label className="text-sm">
          Target option pool (0–1)
          <input
            type="number"
            step="0.01"
            className="mt-1 w-full rounded border px-3 py-2"
            value={poolTarget}
            onChange={(e) => setPoolTarget(Number(e.target.value))}
          />
        </label>
        <label className="text-sm">
          Series A total ($)
          <input
            type="number"
            className="mt-1 w-full rounded border px-3 py-2"
            value={seriesTotal}
            onChange={(e) => setSeriesTotal(Number(e.target.value))}
          />
        </label>
      </div>

      {result ? (
        <div className="space-y-4 rounded-xl border border-cyan-200 bg-cyan-50/80 p-4 text-sm">
          <p>
            Round PPS: <strong>${result.conversion.pps.toFixed(5)}</strong> · Total shares:{" "}
            <strong>{result.conversion.totalShares.toLocaleString()}</strong> · New pool shares:{" "}
            <strong>{result.conversion.additionalOptions.toLocaleString()}</strong>
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-cyan-200">
                  <th className="py-2 pr-4">Holder</th>
                  <th className="py-2 pr-4">Shares</th>
                  <th className="py-2">Ownership</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.name} className="border-b border-cyan-100/80">
                    <td className="py-2 pr-4">{r.name}</td>
                    <td className="py-2 pr-4">{(r.shares ?? 0).toLocaleString()}</td>
                    <td className="py-2">{pct(r.ownership ?? 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-sm text-red-600">Could not solve this scenario — check inputs.</p>
      )}

      <p className="text-xs text-gray-500">
        For stacked SAFE side letters (YC MFN, pro-rata), use the full CLI or extend this form in a later
        Phase 2 batch.
      </p>
    </div>
  );
}
