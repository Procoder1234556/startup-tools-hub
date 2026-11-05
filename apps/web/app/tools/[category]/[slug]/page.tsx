import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MicroToolPageClient from "./MicroToolPageClient";
import JellykitToolPageClient from "./JellykitToolPageClient";
import { generateMicroStaticParams, getMicroTool } from "@/lib/micro-tools/registry";
import { getJellykitTool } from "@/lib/jellykit-tools";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

type PageProps = { params: Promise<{ category: string; slug: string }> };

export function generateStaticParams() {
  return generateMicroStaticParams().slice(0, 24);
}

export const dynamicParams = true;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
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
  const micro = getMicroTool(category, slug);
  if (micro) {
    return <MicroToolPageClient category={category} slug={slug} />;
  }

  const jelly = getJellykitTool(slug);
  if (jelly) {
    return <JellykitToolPageClient category={category} slug={slug} />;
  }

  notFound();
}
