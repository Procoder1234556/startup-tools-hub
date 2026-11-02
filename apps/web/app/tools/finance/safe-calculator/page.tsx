import type { Metadata } from "next";
import FinanceSafeTool from "@/components/tools/FinanceSafeTool";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "SAFE Calculator",
  description: "Model stacked SAFE notes converting at a priced round.",
  alternates: { canonical: `${SITE_URL}/tools/finance/safe-calculator/` },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <FinanceSafeTool />
    </div>
  );
}
