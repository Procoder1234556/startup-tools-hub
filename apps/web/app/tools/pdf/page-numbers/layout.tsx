import type { Metadata } from "next";
import { buildToolMetadata } from "@/lib/tool-seo";
import ToolLayoutWrapper from "@/components/ToolLayoutWrapper";

const SLUG = "page-numbers";

export const metadata: Metadata = buildToolMetadata(SLUG) ?? {
  title: "Add Page Numbers to PDF — Free Online PDF Numberer",
  description: "Insert customizable page numbers into your PDF documents directly in your browser. 100% private, free, and instant.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ToolLayoutWrapper slug={SLUG}>{children}</ToolLayoutWrapper>;
}
