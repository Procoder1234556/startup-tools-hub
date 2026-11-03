import type { Metadata } from "next";
import FinanceLtvCacTool from "@/components/tools/FinanceLtvCacTool";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "LTV CAC Calculator",
  description: "Unit economics: lifetime value, LTV:CAC ratio, and payback months.",
  alternates: { canonical: `${SITE_URL}/tools/finance/ltv-cac-calculator/` },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <FinanceLtvCacTool />
    </div>
  );
}
