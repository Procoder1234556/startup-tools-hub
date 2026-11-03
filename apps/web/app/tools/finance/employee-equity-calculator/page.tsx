import type { Metadata } from "next";
import FinanceEquityTool from "@/components/tools/FinanceEquityTool";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Startup Employee Equity Calculator",
  description:
    "Model vesting, dilution, exercise cost, and exit value for startup equity grants. Ported from open source (browser-only).",
  alternates: { canonical: `${SITE_URL}/tools/finance/employee-equity-calculator/` },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <FinanceEquityTool />
    </div>
  );
}
