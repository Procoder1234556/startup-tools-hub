import type { MicroToolDef } from "../types";

const bases = [
  { base: 2 as const, label: "Binary" },
  { base: 8 as const, label: "Octal" },
  { base: 10 as const, label: "Decimal" },
  { base: 16 as const, label: "Hexadecimal" },
];

export function generateNumberBaseMicroTools(): MicroToolDef[] {
  const out: MicroToolDef[] = [];
  for (const from of bases) {
    for (const to of bases) {
      if (from.base === to.base) continue;
      out.push({
        slug: `base-${from.base}-to-${to.base}`,
        name: `${from.label} to ${to.label}`,
        description: `Convert numbers from ${from.label.toLowerCase()} to ${to.label.toLowerCase()} in your browser.`,
        category: "dev",
        kind: "number-base",
        iconColor: "text-blue-600",
        numberBase: { fromBase: from.base, toBase: to.base },
      });
    }
  }
  return out;
}

export function generateColorMicroTools(): MicroToolDef[] {
  const modes: NonNullable<MicroToolDef["colorConvert"]>[] = [
    { mode: "hex-rgb" },
    { mode: "rgb-hex" },
    { mode: "hex-hsl" },
    { mode: "hsl-hex" },
  ];
  const labels: Record<string, { name: string; description: string }> = {
    "hex-rgb": { name: "HEX to RGB", description: "Convert #RRGGBB colors to rgb(r,g,b)." },
    "rgb-hex": { name: "RGB to HEX", description: "Convert rgb(r,g,b) to #RRGGBB." },
    "hex-hsl": { name: "HEX to HSL", description: "Convert hex colors to hsl(h,s%,l%)." },
    "hsl-hex": { name: "HSL to HEX", description: "Convert hsl to hex color codes." },
  };
  return modes.map((mode) => ({
    slug: `color-${mode.mode}`,
    name: labels[mode.mode].name,
    description: labels[mode.mode].description,
    category: "dev" as const,
    kind: "color-convert" as const,
    iconColor: "text-violet-600",
    colorConvert: mode,
  }));
}
