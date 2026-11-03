"use client";

import DiscountCalculator from "@/components/tools/port/toolstrek/DiscountCalculator";

export default function CalcDiscountTool() {
  return (
    <div className="py-4">
      <p className="mb-6 text-sm text-gray-600">
        Ported from{" "}
        <a
          href="https://github.com/tasnimultas67/toolstrek"
          className="text-emerald-600 underline"
          target="_blank"
          rel="noreferrer"
        >
          tasnimultas67/toolstrek
        </a>{" "}
        (MIT).
      </p>
      <DiscountCalculator />
    </div>
  );
}
