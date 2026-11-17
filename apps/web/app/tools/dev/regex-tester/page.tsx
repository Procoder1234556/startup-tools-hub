import type { Metadata } from "next";
import DedicatedToolPage from "@/components/tools/templates/DedicatedToolPage";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Regex Tester & Debugger — Free Online Tool | ToolBox Hub",
  description: "Test, build, and debug regular expressions with instant syntax highlighting and match visualization.",
  alternates: { canonical: `${SITE_URL}/tools/dev/regex-tester/` },
  openGraph: {
    title: `Regex Tester | ${SITE_NAME}`,
    description: "Test, build, and debug regular expressions with instant match visualization.",
    url: `${SITE_URL}/tools/dev/regex-tester/`,
    type: "website",
  },
};

export default function RegexTesterRoute() {
  return <DedicatedToolPage category="dev" slug="regex-tester" />;
}
