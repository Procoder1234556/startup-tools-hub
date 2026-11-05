import type { Metadata } from "next";
import { buildToolMetadata } from "@/lib/tool-seo";
import ToolLayoutWrapper from "@/components/ToolLayoutWrapper";

const SLUG = "hmac-generator";

export const metadata: Metadata = buildToolMetadata(SLUG) ?? {
  title: "HMAC Webhook & API Signature Generator — SHA-256, SHA-512",
  description: "Generate and verify cryptographic HMAC signatures for Stripe, GitHub, Shopify, and Slack webhooks. 100% private in browser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ToolLayoutWrapper slug={SLUG}>{children}</ToolLayoutWrapper>;
}
