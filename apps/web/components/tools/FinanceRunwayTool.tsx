"use client";

import { useState } from "react";
import type { InputState, ScenarioKey } from "@/lib/finance/runway/types";
import { useRunwayModel } from "@/hooks/useRunwayModel";
import { InputPanel } from "@/components/tools/runway/InputPanel";
import { RunwayChart } from "@/components/tools/runway/RunwayChart";
import { MetricsCards } from "@/components/tools/runway/MetricsCards";
import { ScenarioToggle } from "@/components/tools/runway/ScenarioToggle";
import { AIPanel } from "@/components/tools/runway/AIPanel";

const DEFAULT_INPUTS: InputState = {
  startingCash: 500_000,
  monthlyBurn: 80_000,
  monthlyRevenue: 30_000,
  burnGrowthMode: "flat",
  visibleScenarios: new Set<ScenarioKey>(["pessimistic", "base", "optimistic"]),
};

export default function FinanceRunwayTool() {
  const [inputs, setInputs] = useState<InputState>(DEFAULT_INPUTS);

  const handleChange = (partial: Partial<InputState>) => setInputs((prev) => ({ ...prev, ...partial }));

  const handleToggle = (key: ScenarioKey) =>
    setInputs((prev) => {
      const next = new Set(prev.visibleScenarios);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return { ...prev, visibleScenarios: next };
    });

  const output = useRunwayModel(inputs);

  return (
    <div className="py-8 space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">Startup runway calculator</h1>
        <p className="text-gray-600 text-sm max-w-3xl">
          Full model from{" "}
          <a
            href="https://github.com/fozankhana/startup-runway-calculator"
            className="text-emerald-600 underline"
            target="_blank"
            rel="noreferrer"
          >
            fozankhana/startup-runway-calculator
          </a>
          : burn trends, three revenue scenarios, chart, metrics, and optional AI assist (your keys stay in the browser).
          Not legal or tax advice.
        </p>
      </header>

      <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
        <div className="border-b px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900 text-white">
          <div>
            <p className="text-lg font-bold tracking-tight">Cash runway</p>
            <p className="text-slate-500 text-xs mt-0.5">Know exactly when you run out of money</p>
          </div>
          <ScenarioToggle output={output} visibleScenarios={inputs.visibleScenarios} onToggle={handleToggle} />
        </div>

        <main className="bg-slate-900 px-4 sm:px-6 py-6 flex flex-col gap-6">
          <AIPanel onApply={handleChange} modelOutput={output} inputs={inputs} />

          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6">
            <InputPanel inputs={inputs} onChange={handleChange} />

            <div className="flex flex-col gap-6 min-w-0">
              <RunwayChart output={output} visibleScenarios={inputs.visibleScenarios} />
              <MetricsCards output={output} visibleScenarios={inputs.visibleScenarios} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
