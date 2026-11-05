import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { DM_Serif_Display, Inter } from "next/font/google";
import AnnouncementBar from "@/components/landing/editorial/AnnouncementBar";
import EditorialNavbar from "@/components/landing/editorial/Navbar";
import EditorialFooter from "@/components/landing/editorial/EditorialFooter";
import { TOOLS } from "@/lib/tools";
import { SITE_URL, SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION, GA_ID, ADSENSE_CLIENT } from "@/lib/site-config";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "startup tools",
    "free pdf tools",
    "runway calculator",
    "SAFE calculator",
    "cap table",
    "founder tools",
    "developer utilities",
  ],
  openGraph: {
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-default.svg", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_TAGLINE,
    images: ["/og-default.svg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: `${SITE_URL}/` },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const totalTools = TOOLS.filter((t) => t.available).length;

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    description: SITE_DESCRIPTION,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.svg`, width: 200, height: 200 },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/tools/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className={`h-full ${dmSerif.variable} ${inter.variable}`}>
      <head>
        <link rel="alternate" type="application/rss+xml" title={`${SITE_NAME} blog feed`} href="/blog/feed.xml" />
      </head>
      <body className="min-h-full flex flex-col bg-[#E8E7EB] text-[#111111] font-[family-name:var(--font-inter)] antialiased">
        <AnnouncementBar toolCount={totalTools} />
        <EditorialNavbar />
        <main className="flex-1">{children}</main>
        <EditorialFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        {GA_ID ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_ID}');`}
            </Script>
          </>
        ) : null}
        {ADSENSE_CLIENT ? (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
