"use client";

import SavingsCalculator from "@/components/tools/port/toolstrek/savings-calculator/SavingsCalculator";

export default function FinanceSavingsTool() {
  return (
    <div className="py-8">
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
      <SavingsCalculator />
    </div>
  );
}
