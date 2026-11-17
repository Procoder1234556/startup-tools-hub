import type { Metadata } from "next";
import DedicatedToolPage from "@/components/tools/templates/DedicatedToolPage";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "JWT Decoder & Inspector — Free Online Tool | ToolBox Hub",
  description: "Decode and inspect JSON Web Tokens client-side. View header, payload, expiration dates and claims safely in your browser.",
  alternates: { canonical: `${SITE_URL}/tools/dev/jwt-decoder/` },
  openGraph: {
    title: `JWT Decoder | ${SITE_NAME}`,
    description: "Decode and inspect JSON Web Tokens client-side safely in your browser.",
    url: `${SITE_URL}/tools/dev/jwt-decoder/`,
    type: "website",
  },
};

export default function JwtDecoderRoute() {
  return <DedicatedToolPage category="dev" slug="jwt-decoder" />;
}
