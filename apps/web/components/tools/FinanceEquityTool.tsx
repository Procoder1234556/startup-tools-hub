"use client";

import "@/styles/equity-studio.css";

import { EquityStudio } from "@/components/tools/equity/EquityStudio";

export default function FinanceEquityTool() {
  return (
    <div className="equity-port py-4">
      <p className="mb-4 text-sm text-[var(--ink-soft)]">
        UI and math from{" "}
        <a
          href="https://github.com/qbzenker/startupequitycalculator"
          className="underline text-[var(--green-deep)]"
          target="_blank"
          rel="noreferrer"
        >
          qbzenker/startupequitycalculator
        </a>{" "}
        (MIT). Educational estimate only — not legal or tax advice.
      </p>
      <EquityStudio />
    </div>
  );
}
