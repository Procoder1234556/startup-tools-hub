"use client";

import Link from "next/link";
import { Clock, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { getCategory } from "@/lib/categories";
import { getFavoriteTools, getRecentTools, type ToolRef } from "@/lib/tool-personalization";
import { getTool } from "@/lib/tools";
import { ToolIcon } from "@/components/ToolIcon";

function ToolChip({ ref: toolRef }: { ref: ToolRef }) {
  const meta = getTool(toolRef.slug);
  const cat = getCategory((meta?.category ?? toolRef.category) as Parameters<typeof getCategory>[0]);
  const name = meta?.name ?? toolRef.name ?? toolRef.slug;

  return (
    <Link
      href={`/tools/${cat.slug}/${toolRef.slug}/`}
      className="group inline-flex items-center gap-2 rounded-xl border bg-white px-3 py-2 hover:border-[#111111]/30 hover:shadow-sm transition min-w-0 max-w-full cursor-pointer"
      style={{ borderColor: "var(--color-border)" }}
    >
      <span className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${cat.bgColor} ${meta?.iconColor ?? cat.iconColor}`}>
        <ToolIcon slug={toolRef.slug} category={cat.id} className="w-4 h-4" />
      </span>
      <span className="text-sm font-medium text-gray-900 truncate group-hover:text-orange-700">{name}</span>
    </Link>
  );
}

export default function ToolPersonalizationStrip() {
  const [favorites, setFavorites] = useState<ToolRef[]>([]);
  const [recent, setRecent] = useState<ToolRef[]>([]);

  useEffect(() => {
    setFavorites(getFavoriteTools().slice(0, 8));
    setRecent(getRecentTools().slice(0, 8));
  }, []);

  if (favorites.length === 0 && recent.length === 0) return null;

  return (
    <section className="py-10 border-t border-[#D7D5DA]" style={{ borderColor: "var(--color-border)" }}>
      {recent.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-[#111111]" aria-hidden />
            <h2 className="text-xl font-bold tracking-tight">Recently used</h2>
          </div>
          <div className="flex flex-wrap gap-2">{recent.map((r) => <ToolChip key={`${r.category}/${r.slug}`} ref={r} />)}</div>
        </div>
      )}
      {favorites.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-amber-500" aria-hidden />
            <h2 className="text-xl font-bold tracking-tight">Saved tools</h2>
          </div>
          <div className="flex flex-wrap gap-2">{favorites.map((r) => <ToolChip key={`f-${r.category}/${r.slug}`} ref={r} />)}</div>
        </div>
      )}
    </section>
  );
}
