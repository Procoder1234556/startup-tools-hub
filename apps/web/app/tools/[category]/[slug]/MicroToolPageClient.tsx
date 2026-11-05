"use client";

import { notFound } from "next/navigation";
import MicroToolView from "@/components/tools/micro/MicroToolView";
import { getMicroTool } from "@/lib/micro-tools/registry";

type Props = { category: string; slug: string };

export default function MicroToolPageClient({ category, slug }: Props) {
  const tool = getMicroTool(category, slug);
  if (!tool) notFound();
  return <MicroToolView tool={tool} />;
}
