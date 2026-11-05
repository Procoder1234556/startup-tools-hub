import type { CategoryId } from "@/lib/categories";

export const FEATURED_TOOL_SLUGS: { slug: string; category: CategoryId; preview: "runway" | "safe" | "captable" | "pdf" | "image" | "json" }[] = [
  { slug: "runway-calculator", category: "finance", preview: "runway" },
  { slug: "safe-calculator", category: "finance", preview: "safe" },
  { slug: "cap-table-lite", category: "finance", preview: "captable" },
  { slug: "merge-pdf", category: "pdf", preview: "pdf" },
  { slug: "background-remover", category: "image", preview: "image" },
  { slug: "json-formatter", category: "dev", preview: "json" },
];

/** Blog slugs that exist under /blog/[slug] — no invented URLs. */
export const EDITORIAL_BLOG_SLUGS = [
  "10-best-free-pdf-tools-2026",
  "best-free-json-formatter-tools-2026",
  "merge-pdf-without-adobe-2026",
] as const;

export const UNSPLASH = {
  founderLaptop:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
  finance:
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80",
  documents:
    "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=900&q=80",
  developer:
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80",
  creative:
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80",
  finalCta:
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=80",
} as const;
