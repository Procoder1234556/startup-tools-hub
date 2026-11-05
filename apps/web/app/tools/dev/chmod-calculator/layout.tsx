import type { Metadata } from "next";
import { buildToolMetadata } from "@/lib/tool-seo";
import ToolLayoutWrapper from "@/components/ToolLayoutWrapper";

const SLUG = "chmod-calculator";

export const metadata: Metadata = buildToolMetadata(SLUG) ?? {
  title: "Linux Permissions (chmod) Calculator — Octal & Symbolic Converter",
  description: "Visual Linux chmod permission calculator. Convert between octal (755, 644, 600) and symbolic (rwxr-xr-x) with ready-to-run shell commands.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ToolLayoutWrapper slug={SLUG}>{children}</ToolLayoutWrapper>;
}
