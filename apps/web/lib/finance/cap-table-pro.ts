/**
 * Priced-round cap table — wraps @1984vc/cap-table (MIT).
 * Normalization mirrors upstream CLI so JSON-shaped inputs work in the browser.
 */
import {
  buildPricedRoundCapTable,
  CapTableRowType,
  CommonRowType,
  DEFAULT_ROUNDING_STRATEGY,
  fitConversion,
  type CommonStockholder,
  type PricedRoundCapTable,
  type SAFENote,
  type SeriesInvestor,
  type StakeHolder,
} from "@1984vc/cap-table";

export type PricedRoundInput = {
  preMoneyValuation: number;
  targetOptionsPct?: number;
  unusedOptions?: number;
  commonShareholders: { name: string; shares: number; commonType?: "shareholder" | "unusedOptions" }[];
  safes?: {
    name: string;
    investment: number;
    cap: number;
    discount?: number;
    conversionType?: "pre" | "post";
  }[];
  seriesInvestors?: { name: string; investment: number }[];
};

export type PricedRoundResult = {
  conversion: ReturnType<typeof fitConversion>;
  capTable: PricedRoundCapTable;
};

function normalizeCommon(raw: PricedRoundInput["commonShareholders"]): CommonStockholder[] {
  return raw.map((r) => ({
    name: r.name,
    shares: r.shares,
    type: CapTableRowType.Common,
    commonType:
      r.commonType === "unusedOptions" ? CommonRowType.UnusedOptions : CommonRowType.Shareholder,
  }));
}

function normalizeSafes(raw: NonNullable<PricedRoundInput["safes"]>): SAFENote[] {
  return raw.map((r) => ({
    name: r.name,
    investment: r.investment,
    cap: r.cap,
    discount: r.discount ?? 0,
    type: CapTableRowType.Safe,
    conversionType: r.conversionType ?? "post",
  }));
}

function normalizeSeries(raw: NonNullable<PricedRoundInput["seriesInvestors"]>): SeriesInvestor[] {
  return raw.map((r) => ({
    name: r.name,
    investment: r.investment,
    type: CapTableRowType.Series,
  }));
}

export function runPricedRound(input: PricedRoundInput): PricedRoundResult {
  const targetOptionsPct = input.targetOptionsPct ?? 0.1;
  const unusedOptions = input.unusedOptions ?? 0;
  let common = normalizeCommon(input.commonShareholders);
  const safes = normalizeSafes(input.safes ?? []);
  let series = normalizeSeries(input.seriesInvestors ?? []);

  const commonShares = common
    .filter((c) => c.commonType === CommonRowType.Shareholder)
    .reduce((acc, c) => acc + c.shares, 0);

  const commonPoolShares = common
    .filter((c) => c.commonType === CommonRowType.UnusedOptions)
    .reduce((acc, c) => acc + c.shares, 0);

  const resolvedUnused = input.unusedOptions !== undefined ? unusedOptions : commonPoolShares;
  if (commonPoolShares === 0 && resolvedUnused > 0) {
    common = [
      ...common,
      ...normalizeCommon([
        { name: "Options pool", shares: resolvedUnused, commonType: "unusedOptions" },
      ]),
    ];
  }

  const seriesInvestments = series.map((s) => s.investment);

  const conversion = fitConversion(
    input.preMoneyValuation,
    commonShares,
    safes,
    resolvedUnused,
    targetOptionsPct,
    seriesInvestments,
    DEFAULT_ROUNDING_STRATEGY,
  );

  const stakeholders: StakeHolder[] = [...common, ...safes, ...series];
  const capTable = buildPricedRoundCapTable(conversion, stakeholders);
  return { conversion, capTable };
}

/** Demo scenario inspired by 1984vc cap-table docs (two founders + SAFE stack + Series A). */
export const DEMO_PRICED_ROUND: PricedRoundInput = {
  preMoneyValuation: 12_000_000,
  targetOptionsPct: 0.1,
  commonShareholders: [
    { name: "Founder A", shares: 8_000_000 },
    { name: "Founder B", shares: 2_000_000 },
    { name: "Issued options", shares: 250_000 },
    { name: "Options pool (unused)", shares: 750_000, commonType: "unusedOptions" },
  ],
  safes: [
    { name: "Pre-seed SAFE", investment: 900_000, cap: 8_000_000, discount: 0.2, conversionType: "post" },
  ],
  seriesInvestors: [
    { name: "Series A lead", investment: 4_000_000 },
    { name: "Series A co-invest", investment: 1_000_000 },
  ],
};
