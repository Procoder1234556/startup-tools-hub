import type { Metadata } from "next";
import DedicatedToolPage from "@/components/tools/templates/DedicatedToolPage";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Merge PDF Files Online — Free & Fast | ToolBox Hub",
  description: "Combine multiple PDF documents into a single organized file directly in your browser. 100% private, no file uploads or account required.",
  alternates: { canonical: `${SITE_URL}/tools/pdf/merge-pdf/` },
  openGraph: {
    title: `PDF Merger | ${SITE_NAME}`,
    description: "Combine multiple PDF documents into a single organized file.",
    url: `${SITE_URL}/tools/pdf/merge-pdf/`,
    type: "website",
  },
};

export default function MergePdfRoute() {
  return <DedicatedToolPage category="pdf" slug="merge-pdf" />;
}
