import type { Metadata } from "next";
import { buildToolMetadata } from "@/lib/tool-seo";
import ToolLayoutWrapper from "@/components/ToolLayoutWrapper";

const SLUG = "cron-generator";

export const metadata: Metadata = buildToolMetadata(SLUG) ?? {
  title: "Crontab / Cron Expression Generator & Explainer — Free Dev Tool",
  description: "Visual cron expression builder, human-readable schedule explanations, and upcoming run time calculations.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ToolLayoutWrapper slug={SLUG}>{children}</ToolLayoutWrapper>;
}
