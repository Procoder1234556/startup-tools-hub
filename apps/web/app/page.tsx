import type { Metadata } from "next";
import { TOOLS } from "@/lib/tools";
import { listCategories } from "@/lib/categories";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site-config";
import AppsmithLandingPage from "@/components/landing/appsmith/AppsmithLandingPage";

export const metadata: Metadata = {
  alternates: { canonical: `${SITE_URL}/` },
  title: "Startup Tools Hub — Precision Utilities for Founders & Architects",
  description:
    "Curated technical utilities inspired by tactile engineering design. Runway calculators, SAFE notes, PDF engines, and dev utilities with 100% client-side privacy.",
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
      <AppsmithLandingPage />
    </>
  );
}
