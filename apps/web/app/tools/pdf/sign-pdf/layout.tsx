import type { Metadata } from "next";
import { buildToolMetadata } from "@/lib/tool-seo";
import ToolLayoutWrapper from "@/components/ToolLayoutWrapper";

const SLUG = "sign-pdf";

export const metadata: Metadata = buildToolMetadata(SLUG) ?? {
  title: "Sign PDF Document Online Free — Draw, Type or Upload Signature",
  description: "Sign contracts, agreements, and PDF documents electronically. Draw, type, or upload your signature. 100% private in browser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ToolLayoutWrapper slug={SLUG}>{children}</ToolLayoutWrapper>;
}
