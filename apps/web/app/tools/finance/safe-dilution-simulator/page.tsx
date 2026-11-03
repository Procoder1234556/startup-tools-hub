import type { Metadata } from "next";
import FinanceSafeDilutionTool from "@/components/tools/FinanceSafeDilutionTool";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "SAFE Dilution Simulator",
  description:
    "Visualize founder dilution across angel grants, SAFEs, and priced rounds. Browser-only OSS port.",
  alternates: { canonical: `${SITE_URL}/tools/finance/safe-dilution-simulator/` },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <FinanceSafeDilutionTool />
    </div>
  );
}
