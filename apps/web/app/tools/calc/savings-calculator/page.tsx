import type { Metadata } from "next";
import FinanceSavingsTool from "@/components/tools/FinanceSavingsTool";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Savings & Compound Interest Calculator",
  description:
    "Project savings growth with contributions, compounding, tax, and inflation. Browser-only — ported from Toolstrek.",
  alternates: { canonical: `${SITE_URL}/tools/calc/savings-calculator/` },
};

export default function Page() {
  return <FinanceSavingsTool />;
}
