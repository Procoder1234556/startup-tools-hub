import type { Metadata } from "next";
import CategoryHub from "@/components/CategoryHub";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Startup Finance Tools — Runway, SAFE, Cap Table",
  description: "Free founder finance tools: runway calculator, SAFE conversion, cap table lite. Browser-side, open-source logic.",
  alternates: { canonical: `${SITE_URL}/tools/finance/` },
};

export default function FinanceHubPage() {
  return (
    <CategoryHub
      categoryId="finance"
      intro={
        <p>
          Tools wired from <strong>batkotron</strong> and runway open-source repos. Your numbers stay in the browser.
        </p>
      }
    />
  );
}
