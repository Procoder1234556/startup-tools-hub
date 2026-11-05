"use client";

import { notFound } from "next/navigation";
import JellykitToolView from "@/components/tools/JellykitToolView";
import { getJellykitTool } from "@/lib/jellykit-tools";

type Props = { category: string; slug: string };

export default function JellykitToolPageClient({ slug }: Props) {
  const tool = getJellykitTool(slug);
  if (!tool) notFound();
  return <JellykitToolView tool={tool} />;
}
