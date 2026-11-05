import { CORE_TOOL_SLUGS } from "./core-slugs";
import { generateColorMicroTools, generateNumberBaseMicroTools } from "./generators/misc";
import { generateMathMicroTools } from "./generators/math";
import { generateTextMicroTools } from "./generators/text";
import { generateUnitMicroTools } from "./generators/units";
import type { CategoryId } from "@/lib/categories";
import type { MicroToolDef } from "./types";

function buildRegistry(): MicroToolDef[] {
  const all = [
    ...generateUnitMicroTools(),
    ...generateTextMicroTools(),
    ...generateMathMicroTools(),
    ...generateNumberBaseMicroTools(),
    ...generateColorMicroTools(),
  ];

  const seen = new Set<string>();
  const filtered: MicroToolDef[] = [];
  for (const t of all) {
    if (CORE_TOOL_SLUGS.has(t.slug)) continue;
    if (seen.has(t.slug)) continue;
    seen.add(t.slug);
    filtered.push(t);
  }
  return filtered;
}

export const MICRO_TOOLS: MicroToolDef[] = buildRegistry();

/** Count of data-driven micro-tools (excludes hand-built Pickrack/finance pages). */
export const MICRO_TOOL_COUNT = MICRO_TOOLS.length;

export const MICRO_TOOLS_BY_KEY = new Map<string, MicroToolDef>(
  MICRO_TOOLS.map((t) => [`${t.category}/${t.slug}`, t])
);

export function getMicroTool(category: string, slug: string): MicroToolDef | undefined {
  return MICRO_TOOLS_BY_KEY.get(`${category}/${slug}`);
}

export function microToolsToRegistryEntries(): {
  slug: string;
  name: string;
  description: string;
  category: CategoryId;
  available: true;
  iconColor: string;
  micro: true;
}[] {
  return MICRO_TOOLS.map((t) => ({
    slug: t.slug,
    name: t.name,
    description: t.description,
    category: t.category,
    available: true as const,
    iconColor: t.iconColor,
    micro: true as const,
  }));
}

export function generateMicroStaticParams() {
  return MICRO_TOOLS.map((t) => ({ category: t.category, slug: t.slug }));
}
