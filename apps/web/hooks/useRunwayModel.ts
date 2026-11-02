import { useMemo } from "react";
import type { InputState, ModelOutput } from "@/lib/finance/runway/types";
import { buildScenarioConfigs } from "@/lib/finance/runway/scenarios";
import { simulateScenario } from "@/lib/finance/runway/financialModel";

export function useRunwayModel(inputs: InputState): ModelOutput {
  return useMemo(() => {
    const configs = buildScenarioConfigs(inputs.burnGrowthMode);
    return { scenarios: configs.map((c) => simulateScenario(inputs, c)) };
  }, [inputs.startingCash, inputs.monthlyBurn, inputs.monthlyRevenue, inputs.burnGrowthMode]);
}
