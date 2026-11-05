import type { Metadata } from "next";
import { buildToolMetadata } from "@/lib/tool-seo";
import ToolLayoutWrapper from "@/components/ToolLayoutWrapper";

const SLUG = "docker-run-to-compose";

export const metadata: Metadata = buildToolMetadata(SLUG) ?? {
  title: "Docker Run to Docker Compose Converter — Instant YAML Generation",
  description: "Convert docker run commands into clean docker-compose.yml specifications. Supports ports, volumes, environment variables, and restart policies.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ToolLayoutWrapper slug={SLUG}>{children}</ToolLayoutWrapper>;
}
