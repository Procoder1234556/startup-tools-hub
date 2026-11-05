"use client";

import React from "react";
import PipelineNavbar from "./PipelineNavbar";
import PipelineHero from "./PipelineHero";
import PipelinePressLogos from "./PipelinePressLogos";
import PipelineSerpentineMap from "./PipelineSerpentineMap";
import PipelineLessonsGrid from "./PipelineLessonsGrid";
import PipelineShippedShowcase from "./PipelineShippedShowcase";
import PipelineObjectionCard from "./PipelineObjectionCard";
import PipelinePricingCTA from "./PipelinePricingCTA";
import PipelineFooter from "./PipelineFooter";
import Liquid from "@/components/canvasui/Liquid";

export default function LandingPagePipeline() {
  const scrollToTools = () => {
    const el = document.getElementById("pipeline");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#FAF8F5] text-gray-950 font-sans selection:bg-sky-500 selection:text-white">
      {/* Navbar matching reference */}
      <PipelineNavbar onCtaClick={scrollToTools} />

      {/* Hero with interactive Liquid Canvas UI element */}
      <div className="relative">
        <Liquid intensity={0.25} className="w-full">
          <PipelineHero onCtaClick={scrollToTools} />
        </Liquid>
      </div>

      {/* Press / Social Proof Logos */}
      <PipelinePressLogos />

      {/* The Serpentine Pipeline Roadmap */}
      <PipelineSerpentineMap />

      {/* The 8 Alternating Tool Suite Cards */}
      <PipelineLessonsGrid />

      {/* Shipped in This Repo Live Browser Frames */}
      <PipelineShippedShowcase />

      {/* Objection Handling Card */}
      <PipelineObjectionCard />

      {/* Final CTA Strip */}
      <PipelinePricingCTA onCtaClick={scrollToTools} />

      {/* Footer & Floating Help Pill */}
      <PipelineFooter />
    </div>
  );
}
