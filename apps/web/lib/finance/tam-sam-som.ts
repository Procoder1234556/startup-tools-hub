export type TamSamSomInput = {
  /** Total addressable market ($) */
  tam: number;
  /** Serviceable addressable market ($) — subset of TAM */
  sam: number;
  /** Serviceable obtainable market ($) — realistic share of SAM */
  som: number;
};

export type TamSamSomResult = {
  samPctOfTam: number | null;
  somPctOfSam: number | null;
  somPctOfTam: number | null;
  warnings: string[];
};

export function computeTamSamSom(input: TamSamSomInput): TamSamSomResult {
  const warnings: string[] = [];
  const { tam, sam, som } = input;

  if (tam <= 0) warnings.push("TAM should be a positive market size.");
  if (sam < 0 || som < 0) warnings.push("SAM and SOM cannot be negative.");
  if (tam > 0 && sam > tam) warnings.push("SAM is larger than TAM — check definitions.");
  if (sam > 0 && som > sam) warnings.push("SOM is larger than SAM — check your obtainable share.");

  const samPctOfTam = tam > 0 ? (sam / tam) * 100 : null;
  const somPctOfSam = sam > 0 ? (som / sam) * 100 : null;
  const somPctOfTam = tam > 0 ? (som / tam) * 100 : null;

  return { samPctOfTam, somPctOfSam, somPctOfTam, warnings };
}

export function formatUsd(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: n >= 1_000_000 ? 0 : 2,
  }).format(n);
}
