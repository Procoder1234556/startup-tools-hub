import type { Metadata } from "next";
import FinanceTamSamSomTool from "@/components/tools/FinanceTamSamSomTool";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "TAM SAM SOM Calculator",
  description: "Top-down market sizing: total, serviceable, and obtainable market in your browser.",
  alternates: { canonical: `${SITE_URL}/tools/finance/tam-sam-som-calculator/` },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <FinanceTamSamSomTool />
    </div>
  );
}
