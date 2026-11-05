import type { Metadata } from "next";
import { buildToolMetadata } from "@/lib/tool-seo";
import ToolLayoutWrapper from "@/components/ToolLayoutWrapper";

const SLUG = "cyberchef";

export const metadata: Metadata = buildToolMetadata(SLUG) ?? {
  title: "CyberChef — The Cyber Swiss Army Knife Online",
  description: "Client-side cyber tool for encryption, encoding, compression, hashing, and data analysis with 300+ operations.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ToolLayoutWrapper slug={SLUG}>{children}</ToolLayoutWrapper>;
}
