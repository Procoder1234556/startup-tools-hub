import type { Metadata } from "next";
import CalcAbTestTool from "@/components/tools/CalcAbTestTool";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "A/B Test Significance Calculator",
  description: "Two-proportion z-test for startup conversion experiments. Browser-only.",
  alternates: { canonical: `${SITE_URL}/tools/calc/ab-test-calculator/` },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <CalcAbTestTool />
    </div>
  );
}
