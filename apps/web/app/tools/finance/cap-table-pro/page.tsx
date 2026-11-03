import type { Metadata } from "next";
import FinanceCapTableProTool from "@/components/tools/FinanceCapTableProTool";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Cap Table Pro — Priced Round",
  description:
    "Model SAFE conversion, option pool refresh, and Series ownership with @1984vc/cap-table. Browser-only.",
  alternates: { canonical: `${SITE_URL}/tools/finance/cap-table-pro/` },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <FinanceCapTableProTool />
    </div>
  );
}
