"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { TOOLS } from "@/lib/tools";
import { getCategory } from "@/lib/categories";
import { ToolIcon } from "@/components/ToolIcon";

export default function ToolsCatalogFilter() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const available = TOOLS.filter((t) => t.available);
    if (!q) return available;
    return available.filter(
      (t) => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.slug.includes(q)
    );
  }, [query]);

  return (
    <div className="mb-10">
      <div className="relative max-w-xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Filter ${TOOLS.filter((t) => t.available).length} tools…`}
          className="w-full pl-10 pr-4 py-3 rounded-2xl border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500/40"
          style={{ borderColor: "var(--color-border)" }}
          aria-label="Filter tools"
        />
      </div>
      <p className="mt-2 text-sm text-gray-500">
        Showing {filtered.length} tool{filtered.length === 1 ? "" : "s"}
        {query ? ` matching “${query}”` : ""}
      </p>

      {query ? (
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(0, 60).map((tool) => {
            const cat = getCategory(tool.category);
            return (
              <Link
                key={tool.slug}
                href={`/tools/${cat.slug}/${tool.slug}/`}
                className="rounded-xl border bg-white p-4 hover:border-orange-400 transition cursor-pointer"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${cat.bgColor} ${tool.iconColor} mb-2`}>
                  <ToolIcon slug={tool.slug} category={tool.category} className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-sm">{tool.name}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 mt-1">{tool.description}</p>
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
