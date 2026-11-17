import type { Metadata } from "next";
import Two26Landing from "@/components/landing/two26/Two26Landing";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Two26 Studio — Boutique Design Studio | Bucharest",
  description:
    "Two26 is an independent boutique design studio in Bucharest creating brands with strategy, personality and a healthy obsession for the details.",
  alternates: { canonical: `${SITE_URL}/two26/` },
  openGraph: {
    title: "Two26 Studio — Boutique Design Studio",
    description:
      "Independent design studio creating brands with strategy, personality and a healthy obsession for the details.",
    url: `${SITE_URL}/two26/`,
    siteName: "Two26 Studio",
    locale: "en_US",
    type: "website",
  },
};

export default function Two26Page() {
  return <Two26Landing />;
}
