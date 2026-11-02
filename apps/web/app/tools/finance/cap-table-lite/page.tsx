import type { Metadata } from "next";
import FinanceCapTableTool from "@/components/tools/FinanceCapTableTool";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Cap Table (Lite)",
  description: "Simple cap table with priced rounds and CSV export for early-stage founders.",
  alternates: { canonical: `${SITE_URL}/tools/finance/cap-table-lite/` },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <FinanceCapTableTool />
    </div>
  );
}
