/**
 * Two-proportion z-test for A/B conversion — ported from bytefork-tools (MIT).
 * @see _vendor/bytefork-tools/src/lib/ab-test/stats.ts
 */

export interface ABInput {
  conversionsA: number;
  visitorsA: number;
  conversionsB: number;
  visitorsB: number;
  confidence?: 90 | 95 | 99;
}

export interface ABResult {
  rateA: number;
  rateB: number;
  diff: number;
  relativeLift: number;
  zScore: number;
  pValue: number;
  isSignificant: boolean;
  winner: "A" | "B" | "tie";
  confidence: number;
  marginOfError: number;
  ciLow: number;
  ciHigh: number;
}

const Z_CRITICAL: Record<90 | 95 | 99, number> = { 90: 1.645, 95: 1.96, 99: 2.576 };

export function analyze(input: ABInput): ABResult | null {
  const { conversionsA, visitorsA, conversionsB, visitorsB } = input;
  if (
    !Number.isFinite(conversionsA) ||
    !Number.isFinite(visitorsA) ||
    !Number.isFinite(conversionsB) ||
    !Number.isFinite(visitorsB) ||
    visitorsA <= 0 ||
    visitorsB <= 0 ||
    conversionsA < 0 ||
    conversionsB < 0 ||
    conversionsA > visitorsA ||
    conversionsB > visitorsB
  ) {
    return null;
  }
  const confidence = input.confidence ?? 95;
  const pA = conversionsA / visitorsA;
  const pB = conversionsB / visitorsB;
  const pPool = (conversionsA + conversionsB) / (visitorsA + visitorsB);
  const se = Math.sqrt(pPool * (1 - pPool) * (1 / visitorsA + 1 / visitorsB));
  const z = se === 0 ? 0 : (pB - pA) / se;
  const p = twoTailedPValue(z);
  const z975 = Z_CRITICAL[confidence];
  const seDiff = Math.sqrt((pA * (1 - pA)) / visitorsA + (pB * (1 - pB)) / visitorsB);
  const marginOfError = z975 * seDiff;
  return {
    rateA: pA,
    rateB: pB,
    diff: pB - pA,
    relativeLift: pA === 0 ? Infinity : (pB - pA) / pA,
    zScore: z,
    pValue: p,
    isSignificant: p < 1 - confidence / 100,
    winner: pA === pB ? "tie" : pA > pB ? "A" : "B",
    confidence,
    marginOfError,
    ciLow: pB - pA - marginOfError,
    ciHigh: pB - pA + marginOfError,
  };
}

function twoTailedPValue(z: number): number {
  const absZ = Math.abs(z);
  const p = 2 * (1 - normalCdf(absZ));
  return p < 0 ? 0 : p > 1 ? 1 : p;
}

function normalCdf(z: number): number {
  const b1 = 0.319381530;
  const b2 = -0.356563782;
  const b3 = 1.781477937;
  const b4 = -1.821255978;
  const b5 = 1.330274429;
  const p = 0.2316419;
  const c = 0.39894228;
  if (z >= 0) {
    const t = 1 / (1 + p * z);
    return 1 - c * Math.exp((-z * z) / 2) * t * (t * (t * (t * (t * b5 + b4) + b3) + b2) + b1);
  }
  const t = 1 / (1 - p * z);
  return c * Math.exp((-z * z) / 2) * t * (t * (t * (t * (t * b5 + b4) + b3) + b2) + b1);
}

export function formatPercent(n: number, digits = 2): string {
  if (!Number.isFinite(n)) return "—";
  return `${(n * 100).toFixed(digits)}%`;
}
