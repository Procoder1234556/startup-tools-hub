"use client";

import { useMemo, useState } from "react";
import { buildExampleScenario } from "@/lib/finance/safe-simulator/company";
import { colorForStakeholder } from "@/lib/finance/safe-simulator/colors";
import type { EquitySnapshot } from "@/lib/finance/safe-simulator/types";

function DilutionRow({ snapshot }: { snapshot: EquitySnapshot }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-gray-800">{snapshot.label}</p>
      <div className="flex h-12 w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
        {snapshot.entries.map((entry) => (
          <div
            key={`${snapshot.label}-${entry.name}`}
            className="relative flex min-w-0 items-center justify-center px-1 text-[10px] font-medium text-white"
            style={{
              width: `${entry.percentage}%`,
              backgroundColor: colorForStakeholder(entry.name, entry.type),
            }}
            title={`${entry.name}: ${entry.percentage.toFixed(1)}%`}
          >
            {entry.percentage >= 8 ? (
              <span className="truncate drop-shadow-sm">{entry.name}</span>
            ) : null}
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500">{snapshot.totalShares.toLocaleString()} shares outstanding</p>
    </div>
  );
}

export default function FinanceSafeDilutionTool() {
  const [history, setHistory] = useState<EquitySnapshot[]>(() => buildExampleScenario().getHistory());

  const finalFounderPct = useMemo(() => {
    const last = history[history.length - 1];
    if (!last) return null;
    const founders = last.entries.filter((e) => e.type === "common" && e.name.toLowerCase().includes("founder"));
    return founders.reduce((sum, e) => sum + e.percentage, 0);
  }, [history]);

  return (
    <div className="space-y-8 py-8">
      <header>
        <h1 className="text-2xl font-bold">SAFE dilution simulator</h1>
        <p className="mt-2 text-sm text-gray-600">
          Timeline engine from{" "}
          <a
            href="https://github.com/fl0wo/safe-cap-table-simulator"
            className="text-emerald-600 underline"
            target="_blank"
            rel="noreferrer"
          >
            fl0wo/safe-cap-table-simulator
          </a>{" "}
          (Apache-2.0). Educational model — not legal or tax advice.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          onClick={() => setHistory(buildExampleScenario().getHistory())}
        >
          Reload example scenario
        </button>
        {finalFounderPct != null && (
          <span className="text-sm text-gray-700">
            Founders combined (final): <strong>{finalFounderPct.toFixed(1)}%</strong>
          </span>
        )}
      </div>

      <div className="space-y-6">
        {history.map((snapshot) => (
          <DilutionRow key={snapshot.label} snapshot={snapshot} />
        ))}
      </div>
    </div>
  );
}
