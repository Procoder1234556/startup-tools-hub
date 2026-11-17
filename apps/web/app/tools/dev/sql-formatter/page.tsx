import type { Metadata } from "next";
import DedicatedToolPage from "@/components/tools/templates/DedicatedToolPage";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "SQL Formatter & Beautifier — Free Online Tool | ToolBox Hub",
  description: "Format, beautify, and indent SQL queries instantly with standard keywords and uppercase styling.",
  alternates: { canonical: `${SITE_URL}/tools/dev/sql-formatter/` },
  openGraph: {
    title: `SQL Formatter | ${SITE_NAME}`,
    description: "Format, beautify, and indent SQL queries instantly in your browser.",
    url: `${SITE_URL}/tools/dev/sql-formatter/`,
    type: "website",
  },
};

export default function SqlFormatterRoute() {
  return <DedicatedToolPage category="dev" slug="sql-formatter" />;
}
