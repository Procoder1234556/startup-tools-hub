import type { Metadata } from "next";
import DedicatedToolPage from "@/components/tools/templates/DedicatedToolPage";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Percentage Calculator — Free Online Tool | ToolBox Hub",
  description: "Calculate percentage increase, decrease, differences, and fractions instantly with formula breakdowns.",
  alternates: { canonical: `${SITE_URL}/tools/calc/percentage-calculator/` },
  openGraph: {
    title: `Percentage Calculator | ${SITE_NAME}`,
    description: "Calculate percentage increase, decrease, differences, and fractions instantly.",
    url: `${SITE_URL}/tools/calc/percentage-calculator/`,
    type: "website",
  },
};

export default function PercentageCalculatorRoute() {
  return <DedicatedToolPage category="calc" slug="percentage-calculator" />;
}
