import type { Metadata } from "next";
import FinanceRunwayTool from "@/components/tools/FinanceRunwayTool";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Startup Runway Calculator",
  description:
    "Project cash runway with burn trends, pessimistic/base/optimistic scenarios, chart, metrics, and optional AI assist.",
  alternates: { canonical: `${SITE_URL}/tools/finance/runway-calculator/` },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <FinanceRunwayTool />
    </div>
  );
}
