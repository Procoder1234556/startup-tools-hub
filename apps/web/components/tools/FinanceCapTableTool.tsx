"use client";

import { useMemo, useState } from "react";
import {
  applyRound,
  snapshot,
  toCSV,
  type Holder,
  type HolderType,
  type PricedRound,
} from "@/lib/finance/cap-table";

const pct = (n: number) => (n * 100).toFixed(2) + "%";

export default function FinanceCapTableTool() {
  const [holders, setHolders] = useState<Holder[]>([
    { id: "1", name: "Founder 1", type: "founder", shares: 5_000_000 },
    { id: "2", name: "Founder 2", type: "founder", shares: 5_000_000 },
    { id: "3", name: "Initial option pool", type: "pool", shares: 1_000_000 },
  ]);
  const [rounds, setRounds] = useState<PricedRound[]>([
    {
      id: "r1",
      name: "Seed",
      preMoneyValuation: 8_000_000,
      newInvestment: 2_000_000,
      investorName: "Seed investors",
      optionPoolTarget: 0.1,
    },
  ]);

  const finalHolders = useMemo(() => {
    let current = [...holders];
    for (const round of rounds) current = applyRound(current, round);
    return current;
  }, [holders, rounds]);

  const initialSnap = useMemo(() => snapshot(holders), [holders]);
  const finalSnap = useMemo(() => snapshot(finalHolders), [finalHolders]);

  const exportCsv = () => {
    const blob = new Blob([toCSV(finalSnap)], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cap-table.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="py-8 space-y-8">
      <header>
        <h1 className="text-2xl font-bold">Cap table (lite)</h1>
        <p className="mt-2 text-gray-600 text-sm">
          Ported from{" "}
          <a href="https://github.com/batkotron/cap-table" className="text-emerald-600 underline" target="_blank" rel="noreferrer">
            batkotron/cap-table
          </a>
          . Not legal or tax advice.
        </p>
      </header>

      <section className="rounded-xl border p-4 space-y-3" style={{ borderColor: "var(--color-border)" }}>
        <h2 className="font-semibold">Holders</h2>
        {holders.map((h) => (
          <div key={h.id} className="grid sm:grid-cols-4 gap-2 text-sm">
            <input className="border rounded px-2 py-1" value={h.name} onChange={(e) => setHolders(holders.map((x) => (x.id === h.id ? { ...x, name: e.target.value } : x)))} />
            <select
              className="border rounded px-2 py-1"
              value={h.type}
              onChange={(e) => setHolders(holders.map((x) => (x.id === h.id ? { ...x, type: e.target.value as HolderType } : x)))}
            >
              {(["founder", "employee", "advisor", "investor", "pool"] as HolderType[]).map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <input
              type="number"
              className="border rounded px-2 py-1"
              value={h.shares}
              onChange={(e) => setHolders(holders.map((x) => (x.id === h.id ? { ...x, shares: Number(e.target.value) } : x)))}
            />
            <button type="button" className="text-red-600 text-left" onClick={() => setHolders(holders.filter((x) => x.id !== h.id))}>Remove</button>
          </div>
        ))}
        <button type="button" className="text-emerald-600 text-sm font-medium" onClick={() => setHolders([...holders, { id: String(Date.now()), name: "New holder", type: "employee", shares: 100_000 }])}>
          + Add holder
        </button>
      </section>

      <section className="rounded-xl border p-4 overflow-x-auto" style={{ borderColor: "var(--color-border)" }}>
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold">After rounds</h2>
          <button type="button" onClick={exportCsv} className="text-sm rounded-full bg-emerald-600 text-white px-4 py-1.5">Export CSV</button>
        </div>
        <table className="w-full text-sm">
          <thead><tr className="text-left border-b"><th className="py-2">Name</th><th>Before</th><th>After</th></tr></thead>
          <tbody>
            {finalSnap.holders.map((h) => {
              const before = initialSnap.holders.find((b) => b.name === h.name);
              return (
                <tr key={h.name + h.type} className="border-b border-gray-100">
                  <td className="py-2">{h.name}</td>
                  <td>{before ? pct(before.ownership) : "—"}</td>
                  <td className="font-medium">{pct(h.ownership)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}
