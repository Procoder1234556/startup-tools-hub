import type { Metadata } from "next";
import CalcVatTool from "@/components/tools/CalcVatTool";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "VAT / GST Calculator",
  description: "Add or remove VAT/GST by country presets with PDF export. Browser-only Toolstrek port.",
  alternates: { canonical: `${SITE_URL}/tools/calc/vat-gst-calculator/` },
};

export default function Page() {
  return <CalcVatTool />;
}
