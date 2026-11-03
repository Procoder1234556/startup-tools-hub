/** Ported from fl0wo/safe-cap-table-simulator (Apache-2.0) */

export type ShareType = "common" | "preferred" | "option";

export type SafeType = "pre-money" | "post-money";

export interface Founder {
  name: string;
  ownership: number;
}

export interface Pool {
  note: string;
  ownership: number;
}

export interface CompanyConfig {
  founders?: Founder[];
  pools?: Pool[];
}

export interface CapTableEntry {
  name: string;
  shares: number;
  type: ShareType;
}

export interface Safe {
  cap: number | "uncapped";
  amount: number;
  name: string;
  converted: boolean;
  discount?: number;
  type: SafeType;
}

export interface EquitySnapshot {
  label: string;
  entries: {
    name: string;
    shares: number;
    type: ShareType;
    percentage: number;
  }[];
  totalShares: number;
}
