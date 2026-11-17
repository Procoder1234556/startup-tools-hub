import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MicroToolPageClient from "./MicroToolPageClient";
import JellykitToolPageClient from "./JellykitToolPageClient";
import DedicatedToolPage from "@/components/tools/templates/DedicatedToolPage";
import { generateMicroStaticParams, getMicroTool } from "@/lib/micro-tools/registry";
import { getJellykitTool } from "@/lib/jellykit-tools";
import { getToolBySlug, ALL_TOOLS } from "@/lib/marketplace-tools";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

type PageProps = { params: Promise<{ category: string; slug: string }> };

export function generateStaticParams() {
  const marketplaceParams = ALL_TOOLS.map((t) => ({
    category: t.categorySlug,
    slug: t.slug,
  }));
  const microParams = generateMicroStaticParams().slice(0, 24);
  return [...marketplaceParams, ...microParams];
}

export const dynamicParams = true;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;

  // 1. Check marketplace tool
  const marketplaceTool = getToolBySlug(category, slug);
  if (marketplaceTool) {
    const url = `${SITE_URL}/tools/${category}/${slug}/`;
    return {
      title: `${marketplaceTool.name} — Free Online Tool | ${SITE_NAME}`,
      description: marketplaceTool.tagline || marketplaceTool.description,
      alternates: { canonical: url },
      openGraph: {
        title: `${marketplaceTool.name} | ${SITE_NAME}`,
        description: marketplaceTool.tagline || marketplaceTool.description,
        url,
        type: "website",
      },
    };
  }

  // 2. Fallbacks
  const tool = getMicroTool(category, slug) || getJellykitTool(slug);
  if (!tool) return {};
  const url = `${SITE_URL}/tools/${category}/${slug}/`;
  return {
    title: `${tool.name} — Free Online Tool`,
    description: tool.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${tool.name} | ${SITE_NAME}`,
      description: tool.description,
      url,
      type: "website",
    },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { category, slug } = await params;

  // 1. Primary: ToolBox Hub Dedicated Marketplace Tool
  const marketplaceTool = getToolBySlug(category, slug);
  if (marketplaceTool) {
    return <DedicatedToolPage category={category} slug={slug} />;
  }

  // 2. Micro Tools
  const micro = getMicroTool(category, slug);
  if (micro) {
    return <MicroToolPageClient category={category} slug={slug} />;
  }

  // 3. Jellykit Tools
  const jelly = getJellykitTool(slug);
  if (jelly) {
    return <JellykitToolPageClient category={category} slug={slug} />;
  }

  notFound();
}
