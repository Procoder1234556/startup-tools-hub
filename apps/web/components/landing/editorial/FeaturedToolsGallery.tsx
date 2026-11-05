"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCategory } from "@/lib/categories";
import { getTool } from "@/lib/tools";
import { FEATURED_TOOL_SLUGS } from "@/lib/landing-editorial";
import {
  CapTablePreview,
  ImagePreview,
  JsonPreview,
  PdfPreview,
  RunwayPreview,
  SafePreview,
} from "./ProductPreviews";

const PREVIEW_MAP = {
  runway: RunwayPreview,
  safe: SafePreview,
  captable: CapTablePreview,
  pdf: PdfPreview,
  image: ImagePreview,
  json: JsonPreview,
};

export default function FeaturedToolsGallery() {
  const items = FEATURED_TOOL_SLUGS.map((item) => {
    const tool = getTool(item.slug);
    if (!tool) return null;
    const cat = getCategory(item.category);
    const Preview = PREVIEW_MAP[item.preview];
    return { tool, cat, Preview };
  }).filter(Boolean) as {
    tool: NonNullable<ReturnType<typeof getTool>>;
    cat: ReturnType<typeof getCategory>;
    Preview: ComponentType;
  }[];

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin -mx-[18px] px-[18px] sm:mx-0 sm:px-0">
      {items.map(({ tool, cat, Preview }, idx) => (
        <Link
          key={tool.slug}
          href={`/tools/${cat.slug}/${tool.slug}/`}
          className="snap-start shrink-0 w-[min(85vw,280px)] sm:w-[300px] group rounded-xl border border-[#D7D5DA] bg-white p-5 transition hover:-translate-y-1 hover:shadow-[0_12px_40px_-24px_rgba(17,17,17,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
          style={{ minHeight: idx % 2 === 0 ? 320 : 340 }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#89878E]">{cat.shortLabel}</p>
          <h3 className="mt-2 font-[family-name:var(--font-serif)] text-xl text-[#111111]">{tool.name}</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-[#57565B] line-clamp-2">{tool.description}</p>
          <div className="mt-4 mb-4">
            <Preview />
          </div>
          <span className="inline-flex items-center gap-1 text-[12px] font-medium text-[#111111] group-hover:gap-2 transition-all">
            Open tool <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      ))}
    </div>
  );
}
