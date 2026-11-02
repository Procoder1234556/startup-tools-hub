"use client";

import { useMemo, useState } from "react";
import { convertSafes, type Safe, type SafeType } from "@/lib/finance/safe-math";

const pct = (n: number) => (n * 100).toFixed(2) + "%";
const money = (n: number) => "$" + n.toLocaleString(undefined, { maximumFractionDigits: 0 });

export default function FinanceSafeTool() {
  const [founderShares, setFounderShares] = useState(10_000_000);
  const [preMoney, setPreMoney] = useState(15_000_000);
  const [newInvestment, setNewInvestment] = useState(3_000_000);
  const [poolTarget, setPoolTarget] = useState(0.1);
  const [safes, setSafes] = useState<Safe[]>([
    { id: "1", name: "SAFE #1", type: "post-money", amount: 500_000, cap: 5_000_000, discount: 0.2 },
  ]);

  const result = useMemo(() => {
    try {
      return convertSafes({
        founderShares,
        safes,
        round: { preMoneyValuation: preMoney, newInvestment, optionPoolTarget: poolTarget },
      });
    } catch {
      return null;
    }
  }, [founderShares, safes, preMoney, newInvestment, poolTarget]);

  return (
    <div className="py-8 space-y-6">
      <header>
        <h1 className="text-2xl font-bold">SAFE calculator</h1>
        <p className="mt-2 text-gray-600 text-sm">
          Logic from{" "}
          <a href="https://github.com/batkotron/safe-calculator" className="text-emerald-600 underline" target="_blank" rel="noreferrer">
            batkotron/safe-calculator
          </a>
          . Educational only.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="text-sm">Founder shares<input type="number" className="mt-1 w-full border rounded px-3 py-2" value={founderShares} onChange={(e) => setFounderShares(Number(e.target.value))} /></label>
        <label className="text-sm">Pre-money valuation<input type="number" className="mt-1 w-full border rounded px-3 py-2" value={preMoney} onChange={(e) => setPreMoney(Number(e.target.value))} /></label>
        <label className="text-sm">New investment<input type="number" className="mt-1 w-full border rounded px-3 py-2" value={newInvestment} onChange={(e) => setNewInvestment(Number(e.target.value))} /></label>
        <label className="text-sm">Option pool target (0–1)<input type="number" step="0.01" className="mt-1 w-full border rounded px-3 py-2" value={poolTarget} onChange={(e) => setPoolTarget(Number(e.target.value))} /></label>
      </div>

      {safes.map((s) => (
        <div key={s.id} className="rounded-xl border p-4 grid sm:grid-cols-3 gap-2 text-sm" style={{ borderColor: "var(--color-border)" }}>
          <input value={s.name} onChange={(e) => setSafes(safes.map((x) => (x.id === s.id ? { ...x, name: e.target.value } : x)))} className="border rounded px-2 py-1" />
          <select value={s.type} onChange={(e) => setSafes(safes.map((x) => (x.id === s.id ? { ...x, type: e.target.value as SafeType } : x)))} className="border rounded px-2 py-1">
            <option value="post-money">post-money</option>
            <option value="pre-money">pre-money</option>
            <option value="mfn">mfn</option>
          </select>
          <input type="number" value={s.amount} onChange={(e) => setSafes(safes.map((x) => (x.id === s.id ? { ...x, amount: Number(e.target.value) } : x)))} className="border rounded px-2 py-1" />
        </div>
      ))}
      <button type="button" className="text-emerald-600 text-sm" onClick={() => setSafes([...safes, { id: String(Date.now()), name: "New SAFE", type: "post-money", amount: 250_000, cap: 10_000_000, discount: 0.15 }])}>+ Add SAFE</button>

      {result && (
        <div className="rounded-xl bg-cyan-50 border border-cyan-200 p-4 text-sm space-y-2">
          <p>Post-money: {money(result.postMoneyValuation)} · Price/share: ${result.pricePerShare.toFixed(4)} · Founder dilution: {pct(result.founderDilution)}</p>
          <ul className="space-y-1">{result.capTable.map((r) => (<li key={r.name}>{r.name}: {pct(r.ownership)}</li>))}</ul>
        </div>
      )}
    </div>
  );
}
