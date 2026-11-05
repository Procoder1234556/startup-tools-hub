"use client";

// ponytail: Simplified landing page architecture using pure Tailwind v4, Lucide icons, and CSS-native keyframe animations.
// Ceiling: Static/SSR-safe layout without heavy WebGL runtime dependencies.
// Upgrade path: Re-introduce client-side canvas/WebGL via isolated dynamic import (next/dynamic with ssr: false) if required.

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  BarChart3,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Building2,
  MoreHorizontal,
} from "lucide-react";

export default function EstateoPage() {
  const [activeInsight, setActiveInsight] = useState<number>(1);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);

  const insights = [
    {
      num: "01",
      title: "Market Analytics",
      desc: "Analyze neighborhood trends, price histories, and economic indicators to identify areas with rising property values. Track economic shifts to pinpoint high-growth zones before the competition.",
    },
    {
      num: "02",
      title: "Predictive Insights",
      desc: "Use AI-driven forecasting to spot properties that match your growth goals and investment criteria. Leverage AI-driven modeling to identify off-market gems and assets aligned with your long-term capital goals.",
    },
    {
      num: "03",
      title: "Actionable Recommendations",
      desc: "Receive clear, data-backed suggestions on properties likely to deliver strong capital gains. Access data-backed investment roadmaps designed to maximize your portfolio's appreciation and yield.",
    },
  ];

  const properties = [
    {
      id: "brooklyn",
      badge: "Fast Appreciation",
      badgeColor: "bg-blue-100 text-blue-700",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=85",
      title: "Edge, Brooklyn, NY",
      subtitle: "Near transit and tech hubs",
      price: "$3,800/month",
    },
    {
      id: "malibu",
      badge: "Under Offer",
      badgeColor: "bg-[#fed7aa] text-[#c2410c]",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=85",
      title: "Villa Redwood, Malibu, CA",
      subtitle: "Luxury coastal estate with high demand",
      price: "$4,800/month",
    },
    {
      id: "aspen",
      badge: "Rented",
      badgeColor: "bg-[#bbf7d0] text-[#15803d]",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=85",
      title: "The Cedar Pavilion, Aspen",
      subtitle: "Mountain resort home in a grow...",
      price: "$3,200/month",
    },
    {
      id: "austin",
      badge: "New Listing",
      badgeColor: "bg-purple-100 text-purple-700",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85",
      title: "Skyline Vista, Austin, TX",
      subtitle: "Bespoke architectural hillside modern",
      price: "$5,100/month",
    },
  ];

  const handleNext = () => setCarouselIndex((prev) => (prev + 1) % properties.length);
  const handlePrev = () => setCarouselIndex((prev) => (prev - 1 + properties.length) % properties.length);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#F4F6F9] text-[#121316] antialiased selection:bg-[#3b82f6] selection:text-white">
      {/* Google Fonts: Plus Jakarta Sans & Playfair Display */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@1,400;1,500;1,600&display=swap');
        
        .font-estateo-sans {
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
        }
        .font-estateo-serif {
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic;
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes floatAlt {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(8px); }
        }
        .animate-float-slow {
          animation: floatSlow 4s ease-in-out infinite;
        }
        .animate-float-alt {
          animation: floatAlt 4.5s ease-in-out infinite;
        }
      `,
        }}
      />

      <div className="font-estateo-sans max-w-[1320px] mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-12 sm:space-y-20">

        {/* 1. HERO SECTION WITH LUXURY VILLA ARCHITECTURE & FLOATING GLASS WIDGETS */}
        <section className="relative w-full rounded-[32px] sm:rounded-[44px] overflow-hidden min-h-[720px] sm:min-h-[860px] flex flex-col justify-between p-6 sm:p-12 shadow-2xl border border-black/5 bg-[#648BA2]">
          
          {/* Villa Architecture Photography Background */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=90"
              alt="Modern luxury property with infinity pool"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#3B6682]/65 via-[#3B6682]/25 to-transparent" />
            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* Top Floating Pill Navigation Bar (from 21st.dev / Magic UI) */}
          <div className="relative z-20 flex justify-center w-full">
            <header className="inline-flex items-center gap-4 sm:gap-6 px-5 sm:px-7 py-2.5 rounded-full bg-white/75 backdrop-blur-md border border-white/60 shadow-[0_4px_24px_rgba(0,0,0,0.06)] text-xs sm:text-[13px] font-medium text-[#1E242B] transition-all hover:bg-white/90">
              <a href="#home" className="hover:text-black transition">Home</a>
              <span className="w-1 h-1 rounded-full bg-[#1E242B]/40" />
              <a href="#features" className="hover:text-black transition">Features</a>
              
              <div className="flex items-center justify-center w-7 h-7 rounded-xl bg-white/95 text-[#2563eb] shadow-sm border border-white">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[2.2] stroke-linecap-round stroke-linejoin-round">
                  <path d="M3 10.5 12 3l9 7.5" />
                  <path d="M5 9v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9" />
                  <path d="M9 21V12h6v9" />
                </svg>
              </div>

              <a href="#about" className="hover:text-black transition">About</a>
              <span className="w-1 h-1 rounded-full bg-[#1E242B]/40" />
              <a href="#contact" className="hover:text-black transition">Contact</a>
            </header>
          </div>

          {/* Hero Heading & Primary CTA */}
          <div className="relative z-20 max-w-3xl mx-auto text-center mt-6 sm:mt-8 space-y-5">
            <h1 className="text-3xl sm:text-5xl md:text-[58px] font-medium text-white tracking-tight leading-[1.12] drop-shadow-[0_2px_12px_rgba(0,0,0,0.2)]">
              Discover high-growth{" "}
              <span className="font-estateo-serif font-normal italic text-white">property investments</span>
            </h1>

            <div>
              <button className="px-7 py-3 rounded-full bg-[#0F1115] hover:bg-black text-white text-xs sm:text-sm font-medium tracking-wide shadow-xl transition-transform hover:scale-105 active:scale-95 inline-flex items-center gap-2">
                Start investing now
              </button>
            </div>
          </div>

          {/* Floating Glassmorphic Widgets on the Hero Image */}
          <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto pt-14 sm:pt-20 items-end">
            
            {/* Left Glassmorphic Card: Occupancy Rate Donut Chart */}
            <div className="animate-float-slow justify-self-start bg-white/85 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/70 w-full max-w-[270px]">
              <div className="text-[11px] font-medium text-gray-500 mb-3">Occupancy Rate</div>
              
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 shrink-0">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="14.3" fill="none" stroke="#E2E8F0" strokeWidth="3.2" />
                    <circle
                      cx="18"
                      cy="18"
                      r="14.3"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="3.5"
                      strokeDasharray="56 100"
                      strokeDashoffset="0"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="14.3"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="3.5"
                      strokeDasharray="22 100"
                      strokeDashoffset="-58"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="14.3"
                      fill="none"
                      stroke="#818CF8"
                      strokeWidth="3.5"
                      strokeDasharray="12 100"
                      strokeDashoffset="-82"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-sm font-bold text-gray-900 leading-none">74</span>
                    <span className="text-[8px] font-medium text-gray-400 mt-0.5">Houses</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-[10px] text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                    <span><strong className="text-gray-900 font-semibold">62%</strong> Rented</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                    <span><strong className="text-gray-900 font-semibold">25%</strong> Maintenance</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#818CF8]" />
                    <span><strong className="text-gray-900 font-semibold">13%</strong> Vacant</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Glassmorphic Card: Bruce Walker Matrix */}
            <div className="animate-float-alt justify-self-end bg-white/85 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/70 w-full max-w-[310px]">
              <div className="flex items-center justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-2">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                    alt="Bruce Walker"
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-white"
                  />
                  <span className="text-xs font-semibold text-gray-900">Bruce Walker</span>
                </div>
                <span className="text-xs font-bold text-gray-900 tracking-tight">$242,491</span>
              </div>

              <div className="flex items-center gap-[3px] py-1">
                {[...Array(18)].map((_, i) => (
                  <span
                    key={i}
                    className={`h-3 w-2.5 rounded-xs transition-colors ${i < 12 ? "bg-[#3B82F6]" : "bg-gray-200"}`}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-[10px] text-gray-500 mt-2">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" /> Closed
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300" /> Projected
                  </span>
                </div>
                <div className="flex items-center gap-2 font-medium text-gray-600">
                  <span>🛡️ 7</span>
                  <span>⌂ 15</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 2. DATA-DRIVEN PROPERTY INSIGHTS */}
        <section className="space-y-8 sm:space-y-12 pt-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-[#DCFCE7] text-[#15803D] text-[10px] font-bold tracking-wider uppercase">
                Investments
              </span>
              <span className="px-3 py-1 rounded-full bg-[#FCE7F3] text-[#BE185D] text-[10px] font-bold tracking-wider uppercase">
                Exclusive
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-[44px] font-semibold tracking-tight text-[#111317] leading-[1.15]">
                  Data-driven <br />
                  <span className="font-estateo-serif font-normal italic">property insights</span>
                </h2>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-lg">
                  Our platform leverages smart analytics and market trends to help you find high-potential investments. We combine real-time data with intuitive visual dashboards so you can pinpoint properties poised for growth.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Left 3 items */}
            <div className="space-y-4">
              {insights.map((item, idx) => {
                const isActive = activeInsight === idx;
                return (
                  <div
                    key={item.num}
                    onClick={() => setActiveInsight(idx)}
                    className={`cursor-pointer transition-all duration-300 rounded-2xl ${
                      isActive
                        ? "bg-[#141518] text-white p-5 sm:p-6 shadow-xl border border-gray-800"
                        : "bg-transparent hover:bg-white/60 p-5 rounded-2xl border border-transparent"
                    }`}
                  >
                    {isActive ? (
                      <div>
                        <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-gray-300 mb-3">
                          <BarChart3 className="w-4 h-4 text-[#818CF8]" />
                        </div>
                        <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight">
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-tight">
                          <span className="text-gray-400 font-normal mr-2">{item.num}</span> {item.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1.5 leading-relaxed line-clamp-2">
                          {item.desc}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Revenue Card with Pastel Aura Glow */}
            <div className="relative rounded-3xl p-6 sm:p-12 flex items-center justify-center overflow-hidden bg-gradient-to-tr from-[#E9D5FF]/60 via-[#FCE7F3]/50 to-[#CFFAFE]/60">
              <div className="relative z-10 bg-white rounded-2xl p-6 shadow-2xl border border-white/80 w-full max-w-[340px]">
                <div className="flex items-center justify-between text-gray-400">
                  <span className="text-xs font-medium text-gray-500">Revenue</span>
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </div>

                <div className="mt-2">
                  <div className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    $96,437
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-1">
                    <span>↑ 18.4%</span>
                    <span className="text-gray-400 font-normal">vs last week</span>
                  </div>
                </div>

                <div className="mt-8 relative pt-6">
                  <svg viewBox="0 0 280 80" className="absolute top-0 left-0 w-full h-20 pointer-events-none z-10">
                    <path
                      d="M 10 50 Q 50 55 90 40 T 170 30 T 210 15 T 270 45"
                      fill="none"
                      stroke="#EF4444"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  </svg>

                  <div className="flex items-end justify-between gap-2 h-28 pt-4">
                    {[
                      { day: "Mon", h: "h-14", active: false },
                      { day: "Tue", h: "h-10", active: false },
                      { day: "Wed", h: "h-18", active: false },
                      { day: "Thu", h: "h-16", active: false },
                      { day: "Fri", h: "h-24", active: true, badge: "+20%" },
                      { day: "Sat", h: "h-12", active: false },
                      { day: "Sun", h: "h-16", active: false },
                    ].map((col) => (
                      <div key={col.day} className="flex flex-col items-center gap-2 flex-1">
                        <div className="relative w-full flex justify-center items-end">
                          {col.badge && (
                            <span className="absolute -top-6 px-1.5 py-0.5 rounded bg-[#2563EB] text-white text-[9px] font-bold shadow-md">
                              {col.badge}
                            </span>
                          )}
                          <div
                            className={`w-full max-w-[24px] ${col.h} rounded-t-lg transition-all ${
                              col.active ? "bg-[#3B82F6]" : "bg-[#E0E7FF]"
                            }`}
                          />
                        </div>
                        <span className="text-[10px] text-gray-400 font-medium">{col.day}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 3. FEATURED PROPERTIES */}
        <section className="space-y-8 pt-4">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#111317]">
              Featured <span className="font-estateo-serif font-normal italic">investment properties</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Each property below represents a prime opportunity for strong capital gains and steady income.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.slice(carouselIndex, carouselIndex + 3).concat(
              carouselIndex + 3 > properties.length
                ? properties.slice(0, (carouselIndex + 3) % properties.length)
                : []
            ).map((prop) => (
              <div
                key={prop.id}
                className="group bg-white rounded-3xl p-3 shadow-md border border-gray-100 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative w-full h-52 sm:h-56 rounded-2xl overflow-hidden">
                  <img
                    src={prop.image}
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md shadow-sm ${prop.badgeColor}`}
                  >
                    {prop.badge}
                  </span>
                </div>

                <div className="p-3">
                  <h3 className="text-base font-semibold text-gray-900 tracking-tight">{prop.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{prop.subtitle}</p>

                  <div className="flex items-center justify-between mt-4 pt-2">
                    <span className="text-base sm:text-lg font-bold text-gray-900">{prop.price}</span>
                    <button className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-[#141518] hover:bg-black text-white text-xs font-medium transition">
                      Explore <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={handlePrev}
              className="w-9 h-9 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 flex items-center justify-center transition shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-9 h-9 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 flex items-center justify-center transition shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* 4. INVEST TODAY IN A DREAM HOUSE */}
        <section className="relative rounded-[36px] sm:rounded-[44px] bg-[#EBF0F6] p-6 sm:p-12 overflow-hidden border border-gray-200/60 shadow-lg">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl sm:text-5xl md:text-[54px] font-medium tracking-tight text-[#111317] leading-tight">
              Invest Today in <br />
              <span className="font-estateo-serif font-normal italic text-[#2563EB]">a Dream</span>{" "}
              <span className="font-bold">House</span>
            </h2>
          </div>

          <div className="relative w-full max-w-2xl mx-auto h-64 sm:h-96 my-6 rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
              alt="Architectural Dream Villa"
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-white hover:shadow-md transition">
              <h3 className="text-sm font-semibold text-gray-900">Smart Property</h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                AI-powered analysis identifies properties with the highest capital growth potential based on market trends and long-term value drivers.
              </p>
              <a href="#smart" className="inline-flex items-center gap-1 text-xs font-semibold text-gray-800 hover:text-blue-600 mt-4 transition">
                Find more <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-white hover:shadow-md transition">
              <h3 className="text-sm font-semibold text-gray-900">Growth Forecasting</h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Predict future property value appreciation using data-driven forecasts, historical performance, and real-time market indicators.
              </p>
              <a href="#forecasting" className="inline-flex items-center gap-1 text-xs font-semibold text-gray-800 hover:text-blue-600 mt-4 transition">
                Find more <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-white hover:shadow-md transition">
              <h3 className="text-sm font-semibold text-gray-900">Portfolio Optimization</h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Build and balance a real estate portfolio designed to maximize long-term asset growth while managing risk across locations.
              </p>
              <a href="#portfolio" className="inline-flex items-center gap-1 text-xs font-semibold text-gray-800 hover:text-blue-600 mt-4 transition">
                Find more <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* 5. OMNI-CHANNEL BENTO GRID */}
        <section className="space-y-8 pt-4">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-[#FCE7F3] text-[#BE185D] text-[10px] font-bold tracking-wider uppercase inline-block">
              Portfolio Tools
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-semibold tracking-tight text-[#111317] leading-tight">
              Omni-channel, any task, <br />
              <span className="font-estateo-serif font-normal italic">multi-language</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Assistant offers a human-like service that effortlessly blends in your process, completing nearly any tasks and collaborating with your team within the platform.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Unified dashboard */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition">
                <div>
                  <h3 className="text-base font-bold text-gray-900">Unified dashboard</h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Track all your properties, income, and growth metrics in one intuitive interface.
                  </p>
                </div>
                <div className="mt-6 p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-700">Market Trends</span>
                    <span className="font-bold text-gray-900">$300k</span>
                  </div>
                  <div className="h-16 w-full relative flex items-center">
                    <svg viewBox="0 0 200 60" className="w-full h-full">
                      <defs>
                        <linearGradient id="pinkGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#F43F5E" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path d="M 0 45 Q 40 10 90 35 T 150 15 T 200 25 L 200 60 L 0 60 Z" fill="url(#pinkGrad)" />
                      <path d="M 0 45 Q 40 10 90 35 T 150 15 T 200 25" fill="none" stroke="#F43F5E" strokeWidth="2.5" />
                    </svg>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1 border-t border-gray-200">
                    <span>Weekly schedule</span>
                    <div className="flex items-center gap-1.5 font-semibold text-gray-600">
                      <span className="px-1.5 py-0.5 rounded bg-gray-200">15</span>
                      <span className="px-1.5 py-0.5 rounded bg-[#2563EB] text-white animate-pulse">16</span>
                      <span className="px-1.5 py-0.5 rounded bg-gray-200">17</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Collaborative */}
              <div className="bg-[#141518] rounded-3xl p-6 text-white shadow-xl border border-gray-800 relative overflow-hidden flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Collaborative</h3>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    Sub-agents work together seamlessly to handle complex scenarios, achieving superior results.
                  </p>
                </div>
                <div className="relative w-full h-44 my-2 flex items-center justify-center">
                  <svg viewBox="0 0 160 160" className="w-36 h-36 opacity-85">
                    <circle cx="80" cy="80" r="64" fill="none" stroke="#6366F1" strokeWidth="1" strokeDasharray="3 3" />
                    <ellipse cx="80" cy="80" rx="64" ry="24" fill="none" stroke="#818CF8" strokeWidth="1" />
                    <ellipse cx="80" cy="80" rx="64" ry="46" fill="none" stroke="#A855F7" strokeWidth="1" />
                    <ellipse cx="80" cy="80" rx="24" ry="64" fill="none" stroke="#6366F1" strokeWidth="1" />
                    <ellipse cx="80" cy="80" rx="46" ry="64" fill="none" stroke="#A855F7" strokeWidth="1" />
                  </svg>
                  <div className="animate-float-slow absolute top-4 right-2 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] text-white flex items-center gap-1.5 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Robert Wilson
                  </div>
                  <div className="animate-float-alt absolute bottom-10 left-2 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] text-white flex items-center gap-1.5 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    Jennifer Davis
                  </div>
                  <div className="animate-float-slow absolute bottom-2 right-6 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] text-white flex items-center gap-1.5 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-fuchsia-400" />
                    Elizabeth Taylor
                  </div>
                </div>
              </div>

              {/* Rental Empire */}
              <div className="bg-[#FFFBF0] rounded-3xl p-6 border border-amber-100 flex flex-col justify-between hover:shadow-md transition">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                    From single assets <br />
                    to a rental empire
                  </h3>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                    Our coordinated sub-agents handle the complexities of property management, leaving you with nothing but consistent monthly returns.
                  </p>
                </div>
                <div className="pt-4">
                  <button className="px-5 py-2.5 rounded-full bg-[#141518] hover:bg-black text-white text-xs font-semibold shadow-md transition hover:scale-105 active:scale-95">
                    Start investing
                  </button>
                </div>
              </div>

              {/* Lead Performing Agents */}
              <div className="bg-gradient-to-tr from-[#FCE7F3]/80 via-[#EDE9FE]/70 to-[#FEF3C7]/70 rounded-3xl p-6 border border-pink-100/60 shadow-sm flex flex-col justify-between">
                <div className="text-xs font-bold text-gray-800 tracking-tight mb-3">
                  Lead Performing Agents
                </div>
                <div className="space-y-4">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-white/60 shadow-sm space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                          alt="Emily Gray"
                          className="w-6 h-6 rounded-full object-cover ring-1 ring-white"
                        />
                        <span className="text-xs font-semibold text-gray-900">Emily Gray</span>
                        <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[9px] font-bold">
                          ⭐ Top
                        </span>
                      </div>
                      <span className="text-xs font-bold text-gray-900">$421,376</span>
                    </div>
                    <div className="flex items-center gap-[2px]">
                      {[...Array(16)].map((_, i) => (
                        <span
                          key={i}
                          className={`h-2.5 w-2 rounded-xs ${i < 12 ? "bg-emerald-500" : "bg-gray-200"}`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-[9px] text-gray-500">
                      <span>• Closed • Projected</span>
                      <span>12 • 16</span>
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-white/60 shadow-sm space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                          alt="Bruce Walker"
                          className="w-6 h-6 rounded-full object-cover ring-1 ring-white"
                        />
                        <span className="text-xs font-semibold text-gray-900">Bruce Walker</span>
                      </div>
                      <span className="text-xs font-bold text-gray-900">$242,491</span>
                    </div>
                    <div className="flex items-center gap-[2px]">
                      {[...Array(16)].map((_, i) => (
                        <span
                          key={i}
                          className={`h-2.5 w-2 rounded-xs ${i < 8 ? "bg-blue-500" : "bg-gray-200"}`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-[9px] text-gray-500">
                      <span>• Closed • Projected</span>
                      <span>8 • 16</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Smart Homes */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition">
              <div>
                <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold tracking-wider uppercase inline-block mb-3">
                  Sustainable
                </span>
                <h3 className="text-xl font-bold text-gray-900 tracking-tight leading-snug">
                  Smart homes. <br />
                  Smarter investments
                </h3>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  Data-driven insights to help you secure the best eco-homes for the short-term rental market. High demand. High returns.
                </p>
              </div>

              <div className="relative w-full h-80 sm:h-96 mt-6 rounded-2xl overflow-hidden shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=85"
                  alt="Sustainable Eco-Villas with Solar"
                  className="w-full h-full object-cover object-center"
                />
                <div className="animate-float-slow absolute top-12 left-6 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-gray-900 font-bold text-xs shadow-lg border border-white cursor-pointer hover:scale-110 transition">
                  $920,000
                </div>
                <div className="animate-float-alt absolute top-20 right-6 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-gray-900 font-bold text-xs shadow-lg border border-white cursor-pointer hover:scale-110 transition">
                  $832,500
                </div>
                <div className="animate-float-slow absolute bottom-16 left-8 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-gray-900 font-bold text-xs shadow-lg border border-white cursor-pointer hover:scale-110 transition">
                  $959,000
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 6. REAL STARTUP FOOTER */}
        <footer className="pt-12 sm:pt-16 pb-10 border-t border-gray-200/80 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#2563EB] text-white shadow-sm">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[2.2] stroke-linecap-round stroke-linejoin-round">
                    <path d="M3 10.5 12 3l9 7.5" />
                    <path d="M5 9v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9" />
                    <path d="M9 21V12h6v9" />
                  </svg>
                </div>
                <span className="text-xl font-bold tracking-tight text-gray-900 lowercase">estateo</span>
              </div>
              <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
                From property search to portfolio growth.
              </p>
              <div className="flex items-center gap-2 pt-2">
                <a href="#twitter" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-black hover:border-black transition">
                  <span className="text-xs font-bold">𝕏</span>
                </a>
                <a href="#instagram" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-black hover:border-black transition">
                  <span className="text-xs font-bold">IG</span>
                </a>
                <a href="#facebook" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-black hover:border-black transition">
                  <span className="text-xs font-bold">f</span>
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-900 tracking-wider">Products</h4>
              <ul className="space-y-2 text-xs text-gray-500">
                <li><a href="#finder" className="hover:text-black transition">Investment Finder</a></li>
                <li><a href="#yield" className="hover:text-black transition">Rental Yield Calculator</a></li>
                <li><a href="#manager" className="hover:text-black transition">Portfolio Manager</a></li>
                <li><a href="#heatmaps" className="hover:text-black transition">Market Heatmaps</a></li>
                <li><a href="#tax" className="hover:text-black transition">Tax Optimization</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-900 tracking-wider">Customers</h4>
              <ul className="space-y-2 text-xs text-gray-500">
                <li><a href="#stories" className="hover:text-black transition">Investor Success Stories</a></li>
                <li><a href="#guide" className="hover:text-black transition">Property Management Guide</a></li>
                <li><a href="#reports" className="hover:text-black transition">Market Reports</a></li>
                <li><a href="#webinars" className="hover:text-black transition">Webinars</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-900 tracking-wider">Company</h4>
              <ul className="space-y-2 text-xs text-gray-500">
                <li><a href="#about" className="hover:text-black transition">About Us</a></li>
                <li><a href="#partnership" className="hover:text-black transition">Partnership Program</a></li>
                <li><a href="#legal" className="hover:text-black transition">Legal Compliance</a></li>
                <li><a href="#careers" className="hover:text-black transition">Careers</a></li>
                <li><a href="#contact" className="hover:text-black transition">Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200/60 text-[11px] text-gray-400">
            <div className="flex items-center gap-6">
              <a href="#terms" className="hover:text-gray-600 transition">Terms of Use</a>
              <a href="#privacy" className="hover:text-gray-600 transition">Privacy Policy</a>
            </div>
            <div>
              © 2026 Estateo. All Rights Reserved.
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
