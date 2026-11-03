import type { Metadata } from "next";
import CalcDiscountTool from "@/components/tools/CalcDiscountTool";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Discount Calculator",
  description: "Sale price, stacked discounts, BOGO, and unit price comparison. Browser-only OSS port.",
  alternates: { canonical: `${SITE_URL}/tools/calc/discount-calculator/` },
};

export default function Page() {
  return <CalcDiscountTool />;
}
