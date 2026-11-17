import type { Metadata } from "next";
import DedicatedToolPage from "@/components/tools/templates/DedicatedToolPage";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator — Free Online Tool | ToolBox Hub",
  description: "Format, validate, prettify, and minify JSON instantly in your browser with zero server uploads.",
  alternates: { canonical: `${SITE_URL}/tools/dev/json-formatter/` },
  openGraph: {
    title: `JSON Formatter | ${SITE_NAME}`,
    description: "Format, validate, prettify, and minify JSON instantly in your browser with zero server uploads.",
    url: `${SITE_URL}/tools/dev/json-formatter/`,
    type: "website",
  },
};

export default function JSONFormatterRoute() {
  return <DedicatedToolPage category="dev" slug="json-formatter" />;
}
