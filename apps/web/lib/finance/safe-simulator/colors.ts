/** Color hints from fl0wo/safe-cap-table-simulator visualization (Apache-2.0) */
import type { ShareType } from "./types";

const TYPE_COLORS: Record<ShareType, string> = {
  common: "#3498db",
  preferred: "#e74c3c",
  option: "#f39c12",
};

const NAMED: Record<string, string> = {
  "founder a": "#1abc9c",
  "founder b": "#16a085",
  founders: "#1abc9c",
  "option pool": "#cddc39",
  "seed round": "#8bc34a",
  "series a": "#2980b9",
  "series b": "#9c27b0",
};

export function colorForStakeholder(name: string, type: ShareType): string {
  const key = name.toLowerCase();
  for (const [needle, color] of Object.entries(NAMED)) {
    if (key.includes(needle)) return color;
  }
  if (key.includes("safe")) return "#c0392b";
  if (key.includes("angel")) return "#9b59b6";
  return TYPE_COLORS[type];
}
