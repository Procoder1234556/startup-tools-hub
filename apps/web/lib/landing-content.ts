import { SITE_NAME } from "@/lib/site-config";

/** Copy for wired SaaS landing sections (from _vendor/saas-landing-template + AtotheY). Branding stays in site-config. */
export const LANDING_QUICK_FEATURES = [
  {
    headline: "Ship founder workflows faster",
    description: `Runway, SAFE, and cap table tools alongside PDF and dev utilities—no tab hopping.`,
  },
  {
    headline: "Works with your stack",
    description: "Next.js hub wired from Pickrack, batkotron finance math, Magic UI patterns, and pdf-everything API skeleton.",
  },
  {
    headline: "Private by default",
    description: "Most tools run in the browser. Server-side jobs are labeled, HTTPS-only, and inputs are not retained.",
  },
] as const;

export const LANDING_OSS_STACK = [
  { name: "Next.js", hint: "App shell" },
  { name: "pdf-lib", hint: "PDF tools" },
  { name: "Tailwind", hint: "UI" },
  { name: "React", hint: "Components" },
  { name: "NestJS", hint: "API slice" },
  { name: "shadcn/ui", hint: "Landing sections" },
] as const;

export function landingStats(totalTools: number) {
  return [
    { value: totalTools, suffix: "+", label: "Free tools" },
    { value: 7, suffix: "", label: "Categories" },
    { value: 100, suffix: "%", label: "No signup" },
    { value: 0, suffix: "", label: "Daily limits" },
  ] as const;
}

export const LANDING_TIERS = [
  {
    name: "Browser tools",
    desc: "Default for privacy-sensitive work",
    price: 0,
    isMostPop: true,
    features: ["Runs locally in your browser", "No account required", "Finance + PDF + dev utilities"],
    cta: "Browse tools",
    href: "/tools",
  },
  {
    name: "Server tools",
    desc: "When processing needs a backend",
    price: 0,
    isMostPop: false,
    features: ["PDF compress & convert", "Labeled before upload", "HTTPS, no retention"],
    cta: "PDF hub",
    href: "/tools/pdf",
  },
  {
    name: "Open source",
    desc: "Audit and extend the hub",
    price: 0,
    isMostPop: false,
    features: ["Vendor lineage in docs", "MIT where noted", "Finance math from batkotron"],
    cta: "About the hub",
    href: "/about",
  },
] as const;

export const LANDING_TESTIMONIALS = [
  {
    name: "Alex Kim",
    role: "Solo founder",
    content: `${SITE_NAME} replaced a pile of bookmarked converters. Runway and merge-PDF in one place saves me real time each week.`,
  },
  {
    name: "Jordan Lee",
    role: "Indie hacker",
    content: "I care that JSON and PDF tools stay client-side. The hub is upfront about what hits a server.",
  },
  {
    name: "Sam Rivera",
    role: "Early-stage CFO",
    content: "SAFE and cap table lite are enough for investor updates without spinning up a paid cap table yet.",
  },
  {
    name: "Priya N.",
    role: "Product engineer",
    content: "Category hubs make it easy to send teammates one link instead of five SaaS landing pages.",
  },
] as const;

export const LANDING_FAQ = [
  {
    q: "Are these tools really free?",
    a: `${SITE_NAME} is free to use—no premium tier or daily task counter on the core catalog.`,
  },
  {
    q: "Do files get uploaded to your server?",
    a: "Most tools run in your browser. Server-side tools (PDF compress, some AI) upload only for processing, then discard inputs.",
  },
  {
    q: "How is this different from Smallpdf or iLovePDF?",
    a: "No signup wall, no watermark on free usage, and browser-side processing whenever possible.",
  },
  {
    q: "Which tools work offline?",
    a: "Browser-side tools work offline after the page loads. Server-backed tools need a network connection.",
  },
] as const;
