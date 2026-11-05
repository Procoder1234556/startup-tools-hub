"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { getFavoriteTools, toggleFavorite } from "@/lib/tool-personalization";

type Props = { category: string; slug: string; name: string };

export default function ToolFavoriteButton({ category, slug, name }: Props) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(getFavoriteTools().some((t) => t.category === category && t.slug === slug));
  }, [category, slug]);

  return (
    <button
      type="button"
      onClick={() => {
        toggleFavorite({ category, slug, name });
        setActive(getFavoriteTools().some((t) => t.category === category && t.slug === slug));
      }}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition cursor-pointer ${
        active ? "bg-amber-50 border-amber-200 text-amber-800" : "bg-white hover:border-orange-300 text-gray-700"
      }`}
      style={{ borderColor: active ? undefined : "var(--color-border)" }}
      aria-pressed={active}
    >
      <Star className={`w-4 h-4 ${active ? "fill-amber-400 text-amber-500" : ""}`} />
      {active ? "Saved" : "Save tool"}
    </button>
  );
}
