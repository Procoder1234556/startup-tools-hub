import type { Metadata } from "next";
import DevBoxShadowTool from "@/components/tools/DevBoxShadowTool";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "CSS Box Shadow Generator",
  description: "Multi-layer box shadows with live preview and Tailwind/CSS copy. Browser-only.",
  alternates: { canonical: `${SITE_URL}/tools/dev/box-shadow-generator/` },
};

export default function Page() {
  return <DevBoxShadowTool />;
}
