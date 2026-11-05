import type { Metadata } from "next";
import { buildToolMetadata } from "@/lib/tool-seo";
import ToolLayoutWrapper from "@/components/ToolLayoutWrapper";

const SLUG = "organize-pdf";

export const metadata: Metadata = buildToolMetadata(SLUG) ?? {
  title: "Organize PDF Pages — Reorder, Rotate & Delete Pages Free",
  description: "Rearrange, rotate, delete, or duplicate pages in your PDF document visually. 100% private, runs in your browser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ToolLayoutWrapper slug={SLUG}>{children}</ToolLayoutWrapper>;
}
