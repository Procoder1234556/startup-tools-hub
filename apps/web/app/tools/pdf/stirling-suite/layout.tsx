import type { Metadata } from "next";
import { buildToolMetadata } from "@/lib/tool-seo";
import ToolLayoutWrapper from "@/components/ToolLayoutWrapper";

const SLUG = "stirling-suite";

export const metadata: Metadata = buildToolMetadata(SLUG) ?? {
  title: "Stirling-PDF Companion Suite — OCR, Archival & Repair",
  description: "Connect to local or remote Stirling-PDF Docker instance for enterprise OCR, PDF/A conversion, document sanitization, and repairs.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ToolLayoutWrapper slug={SLUG}>{children}</ToolLayoutWrapper>;
}
