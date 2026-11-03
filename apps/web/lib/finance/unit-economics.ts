export type LtvCacInput = {
  /** Average revenue per account per month */
  arpaMonthly: number;
  /** Gross margin as decimal (0–1), e.g. 0.8 for 80% */
  grossMargin: number;
  /** Monthly logo churn as decimal (0–1) */
  monthlyChurn: number;
  /** Customer acquisition cost ($) */
  cac: number;
};

export type LtvCacResult = {
  ltv: number | null;
  ltvCacRatio: number | null;
  monthsToPayback: number | null;
  warnings: string[];
};

/** Simple SaaS LTV ≈ (ARPA × gross margin) / monthly churn */
export function computeLtvCac(input: LtvCacInput): LtvCacResult {
  const warnings: string[] = [];
  const { arpaMonthly, grossMargin, monthlyChurn, cac } = input;

  if (arpaMonthly < 0 || cac < 0) warnings.push("ARPA and CAC must be non-negative.");
  if (grossMargin < 0 || grossMargin > 1) warnings.push("Gross margin should be between 0 and 1 (e.g. 0.75).");
  if (monthlyChurn <= 0) warnings.push("Monthly churn must be greater than zero for LTV formula.");
  if (monthlyChurn > 0.5) warnings.push("Churn above 50%/month is unusual — verify input.");

  const contribution = arpaMonthly * grossMargin;
  const ltv = monthlyChurn > 0 ? contribution / monthlyChurn : null;
  const ltvCacRatio = ltv != null && cac > 0 ? ltv / cac : cac === 0 && ltv != null ? null : null;
  const monthsToPayback =
    contribution > 0 && cac > 0 ? cac / contribution : contribution > 0 && cac === 0 ? 0 : null;

  if (ltvCacRatio != null && ltvCacRatio < 1) warnings.push("LTV:CAC below 1 — unit economics may not support paid growth.");

  return { ltv, ltvCacRatio, monthsToPayback, warnings };
}
