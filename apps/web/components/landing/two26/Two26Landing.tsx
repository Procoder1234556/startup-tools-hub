"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Sparkles,
  Check,
  Copy,
  Clock,
  Compass,
  Layers,
  Box,
  Eye,
  Award,
  ChevronRight,
  X,
  Play,
  Pause,
  ExternalLink,
} from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  client: string;
  year: string;
  category: string;
  tagline: string;
  description: string;
  accentColor: string;
  bgColor: string;
  textColor: string;
  tags: string[];
  awards: string[];
  deliverables: string[];
  heroStats: { label: string; value: string }[];
  visualType: "seltzer" | "kroma" | "nectar" | "veloce" | "opal" | "aura";
}

const PROJECTS: ProjectItem[] = [
  {
    id: "mellow-seltzer",
    title: "Mellow Seltzer",
    client: "Mellow Botanicals Inc.",
    year: "2026",
    category: "Branding • Packaging • 3D",
    tagline: "Botanical craft soda for modern thirsts & calm minds",
    description:
      "A complete brand universe for a functional botanical seltzer crafted from wild lavender and yuzu. We developed the brand strategy, bespoke can die-lines with micro-embossed aluminum textures, and a 3D-first web launch campaign.",
    accentColor: "#FF5400",
    bgColor: "#FEECE3",
    textColor: "#381E11",
    tags: ["Branding", "Packaging", "3D Motion", "Art Direction"],
    awards: ["Awwwards Site of the Day", "Lapa Ninja Best of Branding"],
    deliverables: [
      "Brand Identity & Wordmark",
      "Custom Can Packaging & Die-lines",
      "Photorealistic 3D CGI Can Renders",
      "E-Commerce Experience (Shopify + Next.js)",
    ],
    heroStats: [
      { label: "Launch Sellout", value: "48 Hours" },
      { label: "Retail Doors", value: "120+" },
      { label: "D2C Conversion", value: "+44%" },
    ],
    visualType: "seltzer",
  },
  {
    id: "kroma-health",
    title: "Kroma Longevity",
    client: "Kroma Biosystems",
    year: "2026",
    category: "Digital Platform • UI/UX • WebGL",
    tagline: "Biometric longevity platform with spatial bio-data visualization",
    description:
      "Transforming complex mitochondrial telemetry into an elegant, daily interface for longevity patients. Featuring real-time cellular animations, custom dark-mode token architecture, and fluid data graphs.",
    accentColor: "#818CF8",
    bgColor: "#0F111A",
    textColor: "#F1F5F9",
    tags: ["Product Design", "Design System", "WebGL", "Mobile App"],
    awards: ["FWA of the Day", "CSS Design Awards - Special Kudos"],
    deliverables: [
      "Clinical Dashboard & Mobile Companion",
      "Generative 3D Mesh Visualizations",
      "Multi-platform Design Tokens (iOS & Web)",
      "High-Precision Interaction Architecture",
    ],
    heroStats: [
      { label: "User Retention", value: "92%" },
      { label: "App Store Rating", value: "4.9 ★" },
      { label: "Active Clinics", value: "65+" },
    ],
    visualType: "kroma",
  },
  {
    id: "nectar-roasters",
    title: "Nectar Roasters",
    client: "Nectar Coffee Group",
    year: "2025",
    category: "Identity • Editorial • Custom Type",
    tagline: "Single-origin specialty coffee identity from Copenhagen",
    description:
      "Rooted in Scandinavian brutalism and organic tactile paper goods. We crafted a custom display typeface, tactile coffee bags printed on 100% compostable rice paper, and a clean editorial subscription portal.",
    accentColor: "#C25927",
    bgColor: "#F3EDE5",
    textColor: "#2B1A12",
    tags: ["Brand Strategy", "Custom Typography", "Packaging", "Editorial"],
    awards: ["Typewolf Site of the Day", "Brand New Notable"],
    deliverables: [
      "Custom Serif Display Typeface",
      "Compostable Bag Packaging System",
      "Roastery Menu & Tasting Notes Taxonomy",
      "Online Bean Club & Subscription Platform",
    ],
    heroStats: [
      { label: "Subscribers", value: "14,000+" },
      { label: "Direct Trade", value: "100%" },
      { label: "Packaging Waste", value: "0% Plastic" },
    ],
    visualType: "nectar",
  },
  {
    id: "veloce-mobility",
    title: "Veloce Micro-Mobility",
    client: "Veloce Transit EU",
    year: "2025",
    category: "Mobile UI • Motion System • Strategy",
    tagline: "Next-gen European urban e-bike & micro-transit platform",
    description:
      "Reimagining metropolitan commutes across Amsterdam, Paris, and Berlin. An energetic kinetic identity paired with an ultra-fast mobile unlock interface designed for one-handed operation in rainy European winters.",
    accentColor: "#CCFF00",
    bgColor: "#141517",
    textColor: "#F4F4F5",
    tags: ["Mobile UI/UX", "Brand Identity", "Motion Design", "Transit"],
    awards: ["Awwwards Honorable Mention", "Mindsparkle Mag Selection"],
    deliverables: [
      "Rider iOS & Android Applications",
      "Physical Bike Decal & Frame Branding",
      "City Kiosk UI & Dynamic Maps",
      "Micro-interaction Motion System",
    ],
    heroStats: [
      { label: "Monthly Rides", value: "1.2M+" },
      { label: "Unlock Speed", value: "0.8s" },
      { label: "Cities Active", value: "8 EU Hubs" },
    ],
    visualType: "veloce",
  },
  {
    id: "opal-audio",
    title: "Opal Audio Flagship",
    client: "Opal Acoustics Corp.",
    year: "2025",
    category: "E-Commerce • 3D Audio • Design Engineering",
    tagline: "Audiophile-grade studio monitors & spatial audio immersion",
    description:
      "Crafting an ethereal digital experience for premium acoustic hardware. We built an interactive 3D listening room simulator allowing audio engineers to test room acoustics before purchasing.",
    accentColor: "#E0E7FF",
    bgColor: "#1A1C23",
    textColor: "#EEF2FF",
    tags: ["E-Commerce", "Spatial Audio", "WebGL", "Hardware"],
    awards: ["FWA of the Month Nominee", "Lapa Ninja Gold"],
    deliverables: [
      "Interactive 3D Product Customizer",
      "Bespoke WebGL Acoustic Simulation",
      "Global DTC E-Commerce Platform",
      "Unboxing Hardware Manual Architecture",
    ],
    heroStats: [
      { label: "AOV Increase", value: "+38%" },
      { label: "Time on Site", value: "4m 12s" },
      { label: "Return Rate", value: "<1.2%" },
    ],
    visualType: "opal",
  },
  {
    id: "aura-ceramics",
    title: "Aura Ceramics Atelier",
    client: "Aura Studio Kyoto",
    year: "2024",
    category: "Art Direction • Flagship Store • Photography",
    tagline: "Handcrafted stoneware studio in Kyoto with bespoke e-shop",
    description:
      "Celebrating Japanese wabi-sabi philosophy through brutalist asymmetry and organic stoneware textures. We directed the campaign photography in Kyoto and built a collector's flagship digital gallery.",
    accentColor: "#785341",
    bgColor: "#EBE6DF",
    textColor: "#261D18",
    tags: ["Art Direction", "Lookbook", "E-Commerce", "Photography"],
    awards: ["Typewolf Feature", "Lapa Ninja Featured"],
    deliverables: [
      "Campaign Art Direction & Lookbook",
      "Editorial Minimalist Web Flagship",
      "Packaging & Certificate of Authenticity",
      "Limited Batch Drop Engine",
    ],
    heroStats: [
      { label: "Batch Drops", value: "Sold Out in <5m" },
      { label: "Collector Base", value: "32 Countries" },
      { label: "Average Rating", value: "5.0 ★" },
    ],
    visualType: "aura",
  },
];

const SERVICES = [
  {
    number: "01",
    title: "Brand Strategy & Core Identity",
    summary:
      "We build brands with clear positioning, authentic personality, and zero corporate fluff.",
    deliverables: [
      "Naming & Verbal Identity",
      "Brand Architecture & Positioning",
      "Logo System & Typographic Scale",
      "Comprehensive Digital Brand Guidelines",
      "Custom Graphic Assets & Patterns",
    ],
  },
  {
    number: "02",
    title: "Digital Product & Web Experiences",
    summary:
      "Award-winning digital interfaces engineered with craft, tactile motion, and fast production code.",
    deliverables: [
      "UI/UX Design for Web & Mobile",
      "Interactive Prototyping & Motion",
      "Next.js, React & Webflow Development",
      "Design Systems & Token Architecture",
      "Spatial 3D & Micro-interactions",
    ],
  },
  {
    number: "03",
    title: "Packaging & Tactile Production",
    summary:
      "Physical touchpoints designed to feel substantial in the hand and leave a lasting impression.",
    deliverables: [
      "Custom Die-line & Box Architecture",
      "Foil Stamping, Embossing & Paper Specs",
      "Sustainable & Recyclable Material Sourcing",
      "Unboxing Choreography & Collateral",
      "Physical Print Supervision",
    ],
  },
  {
    number: "04",
    title: "Art Direction & 3D Motion",
    summary:
      "Visual storytelling through photorealistic CGI, kinetic typography, and campaign key art.",
    deliverables: [
      "3D Product Modeling & Rendering",
      "Kinetic Social Video Toolkits",
      "Campaign Key Art & Lookbooks",
      "Bespoke Iconography & Glyphs",
      "Creative Editorial Direction",
    ],
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Working with Two26 was the absolute antidote to typical agency bureaucracy. Direct access to founding designers, relentless attention to detail, and a brand that immediately set us miles apart from competitors.",
    author: "Elena Rostova",
    role: "Founder & CEO, Mellow Botanicals",
    city: "London / Berlin",
  },
  {
    quote:
      "They aren't yes-men. They challenged our assumptions, forced us to simplify our positioning, and delivered a digital experience that earned us Awwwards Site of the Day on launch week.",
    author: "Marc Van Houten",
    role: "Head of Product, Veloce Mobility",
    city: "Amsterdam",
  },
  {
    quote:
      "Every single kerning pair, page transition, and packaging fold was treated with religious obsession. You simply cannot get this level of craft from 100-person agencies.",
    author: "Kenji Takahashi",
    role: "Creative Director, Aura Ceramics",
    city: "Kyoto",
  },
];

export default function Two26Landing() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [openServiceIdx, setOpenServiceIdx] = useState<number>(0);
  const [isPlayingReel, setIsPlayingReel] = useState<boolean>(true);
  const [activeTestimonial, setActiveTestimonial] = useState<number>(0);

  // Live Bucharest Local Clock (UTC+2 / EET)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const bucharestTime = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Bucharest",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setCurrentTime(bucharestTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@two26.studio");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#F8EEE8] text-[#171717] font-sans antialiased selection:bg-[#FF5400] selection:text-white relative overflow-x-hidden">
      {/* ── Top Announcement Banner ─────────────────────────────────── */}
      <div className="bg-[#171717] text-[#F8EEE8] px-4 py-2 text-xs font-mono tracking-wider flex items-center justify-between border-b border-[#262626]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#FF5400] animate-pulse" />
          <span className="font-semibold text-white">TWO26 STUDIO</span>
          <span className="hidden sm:inline text-neutral-400">
            • Independent Design Studio • Bucharest, RO
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="hidden md:inline-flex items-center gap-1.5 text-neutral-400">
            <Clock className="w-3 h-3 text-[#FF5400]" />
            Bucharest Local: <strong className="text-white">{currentTime || "14:26:00"} EET</strong>
          </span>
          <span className="text-emerald-400 font-medium">● Available Q3/Q4</span>
          <Link
            href="/"
            className="text-neutral-400 hover:text-white transition flex items-center gap-1 underline underline-offset-2"
          >
            Startup Tools Hub
          </Link>
        </div>
      </div>

      {/* ── Sticky Floating Capsule Navigation ───────────────────────── */}
      <header className="sticky top-4 z-40 px-4 sm:px-8 max-w-7xl mx-auto">
        <nav className="rounded-full bg-[#F8EEE8]/90 backdrop-blur-md border border-[#171717]/15 px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs transition-all">
          {/* Logo */}
          <Link href="/two26" className="flex items-center gap-1.5 group">
            <span className="text-xl sm:text-2xl font-black tracking-tighter text-[#171717]">
              TWO26
            </span>
            <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#FF5400] text-white tracking-widest">
              STUDIO
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-[#171717]">
            <a
              href="#work"
              className="hover:text-[#FF5400] transition relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#FF5400] hover:after:w-full after:transition-all"
            >
              Work
            </a>
            <a
              href="#about"
              className="hover:text-[#FF5400] transition relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#FF5400] hover:after:w-full after:transition-all"
            >
              About
            </a>
            <a
              href="#services"
              className="hover:text-[#FF5400] transition relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#FF5400] hover:after:w-full after:transition-all"
            >
              Services
            </a>
            <a
              href="#philosophy"
              className="hover:text-[#FF5400] transition relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#FF5400] hover:after:w-full after:transition-all"
            >
              Philosophy
            </a>
            <a
              href="#contact"
              className="hover:text-[#FF5400] transition relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#FF5400] hover:after:w-full after:transition-all"
            >
              Contact
            </a>
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#171717] hover:bg-[#FF5400] text-[#F8EEE8] hover:text-white px-4 sm:px-5 py-2 text-xs font-bold uppercase tracking-wider transition duration-200 shadow-xs cursor-pointer group"
            >
              <span>Let’s Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </a>
          </div>
        </nav>
      </header>

      {/* ── HERO SECTION ────────────────────────────────────────────── */}
      <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-28 px-4 sm:px-8 max-w-7xl mx-auto">
        {/* Background Decorative SVG Curve Loop (Two26 Signature) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-full pointer-events-none opacity-20 -z-10">
          <svg viewBox="0 0 1000 600" fill="none" className="w-full h-full">
            <path
              d="M 50 300 C 250 50, 400 550, 600 300 C 800 50, 950 500, 980 200"
              stroke="#FF5400"
              strokeWidth="28"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="flex flex-col items-center text-center relative">
          {/* Top floating pill badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#171717] bg-[#171717] text-white px-4 py-1.5 text-xs font-bold tracking-wide transform -rotate-2 hover:rotate-0 transition duration-200 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5400]" />
            Independent studio in Bucharest
          </div>

          {/* Giant Hero Headline */}
          <div className="relative w-full max-w-5xl my-4">
            {/* Playful overlapping sticker badge 1 */}
            <div className="absolute -top-4 sm:-top-8 left-2 sm:left-12 z-10 rounded-full border border-[#FF5400] bg-[#F9E2E1] text-[#FF5400] px-3.5 py-1 text-[11px] sm:text-xs font-black uppercase tracking-wider transform -rotate-6 hover:rotate-0 transition shadow-sm cursor-default">
              ✦ Branding & design
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[108px] font-black tracking-tighter uppercase leading-[0.88] text-[#171717]">
              LOOKING
              <br />
              <span className="text-[#FF5400] underline decoration-[#171717]/20 decoration-wavy decoration-2">
                SUSPICIOUSLY
              </span>
              <br />
              GOOD.
            </h1>

            {/* Playful overlapping sticker badge 2 */}
            <div className="absolute -bottom-4 sm:-bottom-6 right-2 sm:right-16 z-10 rounded-full border-2 border-[#171717] bg-white text-[#171717] px-4 py-1 text-[11px] sm:text-xs font-black uppercase tracking-wider transform rotate-3 hover:rotate-0 transition shadow-sm cursor-default">
              ✦ No funny business
            </div>
          </div>

          {/* Subtitle paragraph */}
          <p className="mt-8 sm:mt-12 text-lg sm:text-2xl text-[#171717]/80 max-w-2xl font-medium leading-snug">
            Two26 is a boutique design studio creating high-impact brands with sharp strategy,
            personality, and a healthy obsession for the details.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full bg-[#FF5400] hover:bg-[#e04a00] text-white px-7 py-3.5 text-sm font-bold uppercase tracking-wider transition shadow-sm"
            >
              <span>Explore Selected Work</span>
              <ChevronRight className="w-4 h-4" />
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#171717] bg-transparent hover:bg-[#171717] text-[#171717] hover:text-white px-7 py-3.5 text-sm font-bold uppercase tracking-wider transition"
            >
              <span>Our Philosophy</span>
            </a>
          </div>

          {/* ── Interactive Hero Showcase Card ── */}
          <div className="w-full mt-14 sm:mt-20 rounded-3xl border border-[#171717]/15 bg-white p-3 sm:p-5 shadow-xl overflow-hidden relative group">
            <div className="relative aspect-video sm:aspect-[21/9] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#171717] to-[#2D1F17] flex items-center justify-center text-white p-6 sm:p-12">
              {/* Animated Canvas / Graphic Elements */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#FF5400_1px,transparent_1px)] [background-size:24px_24px]" />

              <div className="relative z-10 flex flex-col items-center text-center space-y-4 max-w-xl">
                <span className="text-xs font-mono uppercase tracking-widest text-[#FF5400] bg-black/50 px-3 py-1 rounded-full border border-[#FF5400]/40">
                  Interactive Studio Reel 2026
                </span>
                <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
                  CRAFTED WITH OBSESSION FOR THE DETAILS
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300">
                  From custom display typography to micro-animations and physical packaging
                  die-lines. We turn brands into culture.
                </p>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => setIsPlayingReel(!isPlayingReel)}
                    className="inline-flex items-center gap-2 rounded-full bg-white text-[#171717] hover:bg-[#FF5400] hover:text-white px-4 py-2 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                  >
                    {isPlayingReel ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isPlayingReel ? "Pause Motion" : "Play Reel"}</span>
                  </button>
                  <a
                    href="#work"
                    className="text-xs text-neutral-400 hover:text-white transition flex items-center gap-1 underline underline-offset-4"
                  >
                    View All Case Studies
                  </a>
                </div>
              </div>

              {/* Decorative Corner Watermarks */}
              <div className="absolute bottom-4 left-4 text-[10px] font-mono text-neutral-500 uppercase tracking-wider hidden sm:block">
                Studio Reel • 60 FPS • WebGL
              </div>
              <div className="absolute bottom-4 right-4 text-[10px] font-mono text-neutral-500 uppercase tracking-wider hidden sm:block">
                Bucharest • Worldwide
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── A BIT ABOUT US (MANIFESTO) ──────────────────────────────── */}
      <section id="about" className="py-20 sm:py-32 px-4 sm:px-8 border-t border-[#171717]/10 bg-[#F3EDE5]">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-start gap-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF5400] bg-[#FF5400]/10 px-3 py-1 rounded-md border border-[#FF5400]/20">
              A BIT ABOUT US
            </span>

            {/* Bold statement with floating badges */}
            <div className="relative mt-4">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#171717] leading-[1.05]">
                WE BELIEVE CREATIVE WORK NEEDS FOCUS.
              </h2>

              <p className="mt-8 text-xl sm:text-3xl text-[#171717]/85 font-medium leading-relaxed">
                That’s why we keep our team tight and our involvement high, so every single project
                gets our full, undivided attention. We build brands from scratch or make existing
                ones unforgettable.
              </p>
            </div>

            {/* Three whimsical badges like original Two26 */}
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <div className="rounded-full border border-[#171717] bg-[#171717] text-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider transform -rotate-1">
                ✦ Professional overthinkers
              </div>
              <div className="rounded-full border border-[#FF5400] bg-[#FF5400] text-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider transform rotate-2">
                ✦ Nerding out on design
              </div>
              <div className="rounded-full border border-[#171717] bg-white text-[#171717] px-4 py-1.5 text-xs font-bold uppercase tracking-wider transform -rotate-2">
                ✦ Allergic to generic
              </div>
            </div>

            {/* 4 Pillars / Studio Metrics */}
            <div className="mt-16 sm:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6 w-full pt-12 border-t border-[#171717]/15">
              <div className="space-y-1">
                <span className="text-4xl sm:text-5xl font-black text-[#FF5400] font-mono">
                  04
                </span>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#171717]">
                  Senior Creators
                </h4>
                <p className="text-xs text-[#171717]/60">
                  Zero junior pass-offs. You work directly with founders.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-4xl sm:text-5xl font-black text-[#171717] font-mono">
                  03
                </span>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#171717]">
                  Max Concurrent Projects
                </h4>
                <p className="text-xs text-[#171717]/60">
                  We limit engagements to guarantee deep immersion.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-4xl sm:text-5xl font-black text-[#FF5400] font-mono">
                  00
                </span>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#171717]">
                  Middlemen
                </h4>
                <p className="text-xs text-[#171717]/60">
                  No account managers playing telephone with feedback.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-4xl sm:text-5xl font-black text-[#171717] font-mono">
                  14
                </span>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#171717]">
                  Global Accolades
                </h4>
                <p className="text-xs text-[#171717]/60">
                  Awwwards, FWA, Lapa Ninja, Typewolf, and Mindsparkle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SELECTED WORK SHOWCASE ──────────────────────────────────── */}
      <section id="work" className="py-20 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF5400] bg-[#FF5400]/10 px-3 py-1 rounded-md border border-[#FF5400]/20">
              FEATURED CASE STUDIES
            </span>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#171717] mt-3">
              SELECTED WORK
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {["All", "Branding", "Digital", "Packaging", "3D"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#171717] text-white shadow-xs"
                    : "bg-white text-[#171717] border border-[#171717]/15 hover:border-[#171717]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer rounded-3xl border border-[#171717]/15 bg-white p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* Project Visual Container */}
              <div
                style={{ backgroundColor: project.bgColor, color: project.textColor }}
                className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden p-6 sm:p-8 flex flex-col justify-between transition-transform duration-300 group-hover:scale-[1.01]"
              >
                {/* Top Badges */}
                <div className="flex items-center justify-between z-10">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-xs text-[#171717]">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono font-bold">{project.year}</span>
                </div>

                {/* Abstract Visual Centerpiece */}
                <div className="my-auto text-center space-y-2 py-6">
                  <div className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-serif">
                    {project.title}
                  </div>
                  <div className="text-xs font-mono opacity-70 uppercase tracking-widest">
                    {project.client}
                  </div>
                </div>

                {/* Bottom Accolades & Interactive Hint */}
                <div className="flex items-center justify-between text-xs font-mono z-10 pt-2 border-t border-current/15">
                  <span className="truncate max-w-[200px]">{project.awards[0]}</span>
                  <span className="inline-flex items-center gap-1 font-bold group-hover:text-[#FF5400] transition">
                    View Case Study <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Card Meta Footer */}
              <div className="pt-5 flex items-center justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold uppercase text-[#171717] group-hover:text-[#FF5400] transition">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#171717]/70 mt-1 line-clamp-1">
                    {project.tagline}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full border border-[#171717]/20 flex items-center justify-center shrink-0 group-hover:bg-[#FF5400] group-hover:border-[#FF5400] group-hover:text-white transition">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES & CAPABILITIES (ACCORDION MATRIX) ──────────────── */}
      <section id="services" className="py-20 sm:py-32 px-4 sm:px-8 border-t border-[#171717]/10 bg-[#171717] text-[#F8EEE8]">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF5400] bg-[#FF5400]/20 px-3 py-1 rounded-md border border-[#FF5400]/40">
                WHAT WE DO
              </span>
              <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mt-3">
                SERVICES & CRAFT
              </h2>
            </div>
            <p className="text-neutral-400 text-sm max-w-sm">
              We operate across branding, physical packaging, and custom digital software with no
              middlemen.
            </p>
          </div>

          {/* Interactive Accordion List */}
          <div className="divide-y divide-[#2E2E2E] border-y border-[#2E2E2E]">
            {SERVICES.map((serv, index) => {
              const isOpen = openServiceIdx === index;
              return (
                <div key={serv.number} className="py-6 sm:py-8 transition">
                  <button
                    onClick={() => setOpenServiceIdx(isOpen ? -1 : index)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-6 sm:gap-10">
                      <span className="text-sm font-mono font-bold text-[#FF5400]">
                        {serv.number}
                      </span>
                      <h3 className="text-xl sm:text-3xl font-black uppercase tracking-tight group-hover:text-[#FF5400] transition">
                        {serv.title}
                      </h3>
                    </div>
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 group-hover:text-white transition px-3 py-1 rounded-full border border-neutral-700">
                      {isOpen ? "Close" : "Expand"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="mt-6 pl-10 sm:pl-16 pr-4 space-y-4 animate-in fade-in duration-200">
                      <p className="text-neutral-300 text-sm sm:text-base max-w-2xl">
                        {serv.summary}
                      </p>
                      <div className="pt-2">
                        <span className="text-xs font-mono uppercase tracking-wider text-[#FF5400] block mb-2">
                          Core Deliverables:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-neutral-300">
                          {serv.deliverables.map((d, dIdx) => (
                            <div key={dIdx} className="flex items-center gap-2">
                              <Check className="w-3.5 h-3.5 text-[#FF5400] shrink-0" />
                              <span>{d}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CLIENT TESTIMONIALS & RECOGNITION ───────────────────────── */}
      <section id="philosophy" className="py-20 sm:py-28 px-4 sm:px-8 border-t border-[#171717]/10 bg-[#F8EEE8]">
        <div className="max-w-5xl mx-auto">
          {/* Recognition Badges Marquee */}
          <div className="mb-20 text-center space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF5400]">
              RECOGNITION & HONORS
            </span>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4 opacity-75">
              {[
                "Awwwards Site of the Day",
                "FWA of the Day",
                "Lapa Ninja Featured",
                "Typewolf Site of the Day",
                "Mindsparkle Mag",
                "CSS Design Awards",
              ].map((badge, bIdx) => (
                <div
                  key={bIdx}
                  className="px-4 py-2 rounded-xl border border-[#171717]/15 bg-white text-xs font-bold uppercase tracking-wider text-[#171717]"
                >
                  ✦ {badge}
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="rounded-3xl border border-[#171717]/15 bg-white p-8 sm:p-14 shadow-sm relative overflow-hidden">
            <div className="text-6xl font-serif text-[#FF5400] leading-none mb-4">“</div>
            <p className="text-xl sm:text-2xl font-medium text-[#171717] leading-relaxed">
              {TESTIMONIALS[activeTestimonial].quote}
            </p>

            <div className="mt-8 pt-6 border-t border-[#171717]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="font-bold text-base text-[#171717]">
                  {TESTIMONIALS[activeTestimonial].author}
                </div>
                <div className="text-xs text-[#171717]/60 font-mono">
                  {TESTIMONIALS[activeTestimonial].role} • {TESTIMONIALS[activeTestimonial].city}
                </div>
              </div>

              {/* Quote pagination buttons */}
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      activeTestimonial === idx ? "w-8 bg-[#FF5400]" : "w-2.5 bg-neutral-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CALL TO ACTION & FOOTER ─────────────────────────────────── */}
      <footer id="contact" className="bg-[#141414] text-[#F8EEE8] pt-20 sm:pt-32 pb-12 px-4 sm:px-8 border-t border-[#262626]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF5400] bg-[#FF5400]/15 px-3 py-1.5 rounded-full border border-[#FF5400]/30 inline-block">
              HAVE A PROJECT IN MIND?
            </span>

            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-white leading-[0.88]">
              LET’S TALK.
            </h2>

            <p className="text-neutral-400 text-base sm:text-xl max-w-xl mx-auto font-medium">
              We take on a strictly limited number of projects per quarter. Drop us a line with your
              vision and timeframe.
            </p>

            {/* Email Contact Action */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2.5 rounded-full bg-[#FF5400] hover:bg-[#e04a00] text-white px-8 py-4 text-sm font-bold uppercase tracking-wider transition shadow-lg cursor-pointer"
              >
                {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedEmail ? "Copied hello@two26.studio!" : "Copy Email: hello@two26.studio"}</span>
              </button>

              <a
                href="mailto:hello@two26.studio"
                className="inline-flex items-center gap-2 rounded-full border-2 border-neutral-700 hover:border-white bg-transparent text-white px-6 py-4 text-sm font-bold uppercase tracking-wider transition"
              >
                <span>Open Mail Client</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Studio Meta Information Grid */}
          <div className="mt-20 sm:mt-28 pt-12 border-t border-[#262626] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-xs font-mono">
            <div>
              <span className="text-neutral-500 uppercase block mb-1">Office & Atelier</span>
              <p className="text-neutral-300">
                Str. General Berthelot 42
                <br />
                Sector 1, Bucharest
                <br />
                010164, Romania
              </p>
            </div>

            <div>
              <span className="text-neutral-500 uppercase block mb-1">Local Time</span>
              <p className="text-neutral-300 font-bold">
                {currentTime || "14:26:00"} EET (UTC+2)
              </p>
              <span className="text-emerald-400 block mt-1">● Studio is currently open</span>
            </div>

            <div>
              <span className="text-neutral-500 uppercase block mb-1">Socials & Press</span>
              <div className="flex flex-col space-y-1 text-neutral-300">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF5400] transition"
                >
                  Instagram ↗
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF5400] transition"
                >
                  X / Twitter ↗
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF5400] transition"
                >
                  LinkedIn ↗
                </a>
                <a
                  href="https://awwwards.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF5400] transition"
                >
                  Awwwards Profile ↗
                </a>
              </div>
            </div>

            <div>
              <span className="text-neutral-500 uppercase block mb-1">Platform</span>
              <p className="text-neutral-400">
                Created with Next.js 16, Tailwind CSS & Antigravity Design System.
              </p>
              <Link
                href="/"
                className="mt-2 inline-block text-[#FF5400] hover:underline font-bold"
              >
                ← Back to Startup Tools Hub
              </Link>
            </div>
          </div>

          <div className="mt-12 text-center text-[11px] text-neutral-600 font-mono">
            © {new Date().getFullYear()} Two26 Studio. All rights reserved. Looking suspiciously good.
          </div>
        </div>
      </footer>

      {/* ── PROJECT DETAIL MODAL ────────────────────────────────────── */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#171717]/20 p-6 sm:p-10 relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-neutral-100 hover:bg-[#171717] hover:text-white transition flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF5400]">
                  {selectedProject.category} • {selectedProject.year}
                </span>
                <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#171717] mt-1">
                  {selectedProject.title}
                </h3>
                <p className="text-sm font-mono text-neutral-500">{selectedProject.client}</p>
              </div>

              <div
                style={{ backgroundColor: selectedProject.bgColor, color: selectedProject.textColor }}
                className="rounded-2xl p-8 sm:p-12 text-center space-y-2 border border-black/10"
              >
                <span className="text-xs font-mono uppercase tracking-widest opacity-70">
                  Client Showcase
                </span>
                <div className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-serif">
                  {selectedProject.title}
                </div>
                <p className="text-sm max-w-md mx-auto opacity-80 pt-2">
                  {selectedProject.tagline}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#171717] mb-2">
                  Project Overview
                </h4>
                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-center">
                {selectedProject.heroStats.map((st, sIdx) => (
                  <div key={sIdx}>
                    <div className="text-lg sm:text-2xl font-black font-mono text-[#FF5400]">
                      {st.value}
                    </div>
                    <div className="text-[10px] sm:text-xs text-neutral-600 uppercase font-mono">
                      {st.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Deliverables */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#171717] mb-2">
                  Key Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedProject.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-neutral-700">
                      <Check className="w-3.5 h-3.5 text-[#FF5400] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-500">
                  Awards: {selectedProject.awards.join(" • ")}
                </span>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2 rounded-full bg-[#171717] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#FF5400] transition cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
