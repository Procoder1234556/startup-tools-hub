"use client";

import React from "react";

export default function PipelineObjectionCard() {
  return (
    <section className="bg-[#FAF8F5] py-16 sm:py-20 border-b border-[#ECEAE7]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-200/90 bg-[#F4F3EF] p-8 sm:p-10 text-center shadow-2xs">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-950">
            &ldquo;Couldn&apos;t I just use 10 separate websites for this?&rdquo;
          </h3>
          <p className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-gray-700 max-w-xl mx-auto font-normal">
            Sure, if you want to pay $20/month for Adobe Acrobat, $15/month for background removal,
            $50/month for cap table software, and leak your sensitive investor pitch decks and financial
            numbers to random third-party clouds. Startup Tools Hub gives you everything in one unified,
            100% private, client-side toolkit.
          </p>
        </div>
      </div>
    </section>
  );
}
