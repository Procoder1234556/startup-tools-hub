import type { Metadata } from "next";
import FinanceBreakEvenTool from "@/components/tools/FinanceBreakEvenTool";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Break-Even Calculator",
  description: "Fixed costs, price, and variable cost → break-even units and revenue.",
  alternates: { canonical: `${SITE_URL}/tools/finance/break-even-calculator/` },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <FinanceBreakEvenTool />
    </div>
  );
}
