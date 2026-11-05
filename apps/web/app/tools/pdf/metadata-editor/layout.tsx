import type { Metadata } from "next";
import { buildToolMetadata } from "@/lib/tool-seo";
import ToolLayoutWrapper from "@/components/ToolLayoutWrapper";

const SLUG = "metadata-editor";

export const metadata: Metadata = buildToolMetadata(SLUG) ?? {
  title: "PDF Metadata Editor & Sanitizer — View, Edit, Strip Metadata",
  description: "Inspect and edit PDF title, author, subject, and keywords or wipe all metadata for complete document privacy. 100% offline in browser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ToolLayoutWrapper slug={SLUG}>{children}</ToolLayoutWrapper>;
}
