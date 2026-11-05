export type ToolRef = { category: string; slug: string; name?: string; ts: number };

const FAVORITES_KEY = "sth-tool-favorites-v1";
const RECENT_KEY = "sth-tool-recent-v1";
const MAX_RECENT = 12;

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFavoriteTools(): ToolRef[] {
  return readJson<ToolRef[]>(FAVORITES_KEY, []);
}

export function toggleFavorite(ref: Omit<ToolRef, "ts">): ToolRef[] {
  const list = getFavoriteTools();
  const idx = list.findIndex((t) => t.category === ref.category && t.slug === ref.slug);
  if (idx >= 0) list.splice(idx, 1);
  else list.unshift({ ...ref, ts: Date.now() });
  writeJson(FAVORITES_KEY, list);
  return list;
}

export function isFavorite(category: string, slug: string): boolean {
  return getFavoriteTools().some((t) => t.category === category && t.slug === slug);
}

export function recordRecentTool(category: string, slug: string) {
  const list = readJson<ToolRef[]>(RECENT_KEY, []).filter((t) => !(t.category === category && t.slug === slug));
  list.unshift({ category, slug, ts: Date.now() });
  writeJson(RECENT_KEY, list.slice(0, MAX_RECENT));
}

export function getRecentTools(): ToolRef[] {
  return readJson<ToolRef[]>(RECENT_KEY, []);
}
