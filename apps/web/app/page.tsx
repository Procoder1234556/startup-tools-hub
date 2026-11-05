import type { Metadata } from "next";
import { TOOLS } from "@/lib/tools";
import { listCategories } from "@/lib/categories";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site-config";
import LandingPagePipeline from "@/components/landing/pipeline/LandingPagePipeline";

export const metadata: Metadata = {
  alternates: { canonical: `${SITE_URL}/` },
  title: "The Startup Tools Pipeline — 100+ Free Tools for Founders & AI Agents",
  description:
    "The exact blueprint and tools founders use to build, launch, and scale. Runway calculators, SAFE notes, PDF engines, and dev utilities. 100% client-side privacy.",
};

export default function HomePage() {
  const totalTools = TOOLS.filter((t) => t.available).length;
  const categories = listCategories();

  const catalogJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${SITE_NAME} — Free Online Tools`,
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/`,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: `${SITE_URL}/`,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: totalTools,
      itemListElement: categories.map((cat, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        item: {
          "@type": "CollectionPage",
          name: cat.name,
          description: cat.tagline,
          url: `${SITE_URL}/tools/${cat.slug}/`,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogJsonLd) }}
      />
      <LandingPagePipeline />
    </>
  );
}
