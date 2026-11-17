import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site-config";
import ToolboxLanding from "@/components/landing/ToolboxLanding";
import { ALL_TOOLS } from "@/lib/marketplace-tools";

export const metadata: Metadata = {
  alternates: { canonical: `${SITE_URL}/` },
  title: "ToolBox Hub — 100+ Free Online Tools • No Login Required",
  description:
    "Discover and use practical browser-based PDF tools, developer utilities, generators, converters, calculators, and image tools without creating an account. Fast, free, and private.",
  keywords: [
    "free online tools",
    "no login tools",
    "pdf editor online",
    "json formatter",
    "qr code generator",
    "password generator",
    "developer utilities",
    "image compressor",
    "free web utilities",
    "in-browser tools"
  ],
  openGraph: {
    title: "ToolBox Hub — 100+ Free Online Tools • No Login Required",
    description: "PDF tools, developer utilities, generators, converters, and calculators right in your browser.",
    url: `${SITE_URL}/`,
    siteName: "ToolBox Hub",
    locale: "en_US",
    type: "website",
  },
};

export default function HomePage() {
  const catalogJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "ToolBox Hub — 100+ Free Online Tools",
    description: "All-in-one online tools marketplace: PDF editor, QR code generator, JSON formatter, converters, calculators, and developer utilities with zero login requirements.",
    url: `${SITE_URL}/`,
    isPartOf: {
      "@type": "WebSite",
      name: "ToolBox Hub",
      url: `${SITE_URL}/`,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: ALL_TOOLS.length,
      itemListElement: ALL_TOOLS.map((tool, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        item: {
          "@type": "WebApplication",
          name: tool.name,
          description: tool.description,
          applicationCategory: tool.category,
          operatingSystem: "All (Browser-based)",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
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
      <ToolboxLanding />
    </>
  );
}
