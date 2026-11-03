export type BreakEvenInput = {
  /** Fixed costs per month ($) */
  fixedCostsMonthly: number;
  /** Price per unit ($) */
  pricePerUnit: number;
  /** Variable cost per unit ($) */
  variableCostPerUnit: number;
};

export type BreakEvenResult = {
  contributionPerUnit: number;
  breakEvenUnits: number | null;
  breakEvenRevenue: number | null;
  warnings: string[];
};

export function computeBreakEven(input: BreakEvenInput): BreakEvenResult {
  const warnings: string[] = [];
  const { fixedCostsMonthly, pricePerUnit, variableCostPerUnit } = input;
  const contributionPerUnit = pricePerUnit - variableCostPerUnit;

  if (fixedCostsMonthly < 0) warnings.push("Fixed costs must be non-negative.");
  if (pricePerUnit < 0 || variableCostPerUnit < 0) warnings.push("Price and variable cost must be non-negative.");
  if (contributionPerUnit <= 0) {
    warnings.push("Contribution margin is zero or negative — break-even is not reachable at this price/cost.");
  }

  const breakEvenUnits =
    contributionPerUnit > 0 ? fixedCostsMonthly / contributionPerUnit : null;
  const breakEvenRevenue =
    breakEvenUnits != null ? breakEvenUnits * pricePerUnit : null;

  return { contributionPerUnit, breakEvenUnits, breakEvenRevenue, warnings };
}
