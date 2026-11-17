import type { Metadata } from "next";
import DedicatedToolPage from "@/components/tools/templates/DedicatedToolPage";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Image Compressor — Free Online Tool | ToolBox Hub",
  description: "Compress JPG, PNG, and WebP images by up to 80% without noticeable quality loss. 100% private in-browser compression.",
  alternates: { canonical: `${SITE_URL}/tools/image/image-compressor/` },
  openGraph: {
    title: `Image Compressor | ${SITE_NAME}`,
    description: "Compress images with live before-and-after size comparison and quality sliders.",
    url: `${SITE_URL}/tools/image/image-compressor/`,
    type: "website",
  },
};

export default function ImageCompressorRoute() {
  return <DedicatedToolPage category="image" slug="image-compressor" />;
}
