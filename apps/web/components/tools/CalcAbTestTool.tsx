"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { analyze, formatPercent } from "@/lib/marketing/ab-test-stats";

export default function CalcAbTestTool() {
  const [convA, setConvA] = useState("100");
  const [visA, setVisA] = useState("1000");
  const [convB, setConvB] = useState("130");
  const [visB, setVisB] = useState("1000");
  const [confidence, setConfidence] = useState<90 | 95 | 99>(95);
  const [copied, setCopied] = useState(false);
  const hydrated = useRef(false);

  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    const h = window.location.hash.replace(/^#/, "");
    if (!h) return;
    try {
      const s = JSON.parse(atob(h)) as { cA?: string; vA?: string; cB?: string; vB?: string; c?: 90 | 95 | 99 };
      if (s.cA) setConvA(s.cA);
      if (s.vA) setVisA(s.vA);
      if (s.cB) setConvB(s.cB);
      if (s.vB) setVisB(s.vB);
      if (s.c === 90 || s.c === 95 || s.c === 99) setConfidence(s.c);
    } catch {
      /* ignore */
    }
  }, []);

  const result = useMemo(
    () =>
      analyze({
        conversionsA: Number(convA),
        visitorsA: Number(visA),
        conversionsB: Number(convB),
        visitorsB: Number(visB),
        confidence,
      }),
    [convA, visA, convB, visB, confidence],
  );

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname}#${btoa(JSON.stringify({ cA: convA, vA: visA, cB: convB, vB: visB, c: confidence }))}`
      : "";

  const copyShare = async () => {
    if (!shareUrl) return;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6 py-8">
      <header>
        <h1 className="text-2xl font-bold">A/B test significance calculator</h1>
        <p className="mt-2 text-sm text-gray-600">
          Stats from{" "}
          <a
            href="https://github.com/AndonyEmmanuelVelazquez/bytefork-tools"
            className="text-emerald-600 underline"
            target="_blank"
            rel="noreferrer"
          >
            bytefork-tools
          </a>{" "}
          (MIT). Two-proportion z-test for conversion experiments.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <fieldset className="rounded-xl border border-gray-200 p-4">
          <legend className="px-1 text-sm font-semibold text-emerald-700">Variant A (control)</legend>
          <label className="mt-2 block text-sm">
            Conversions
            <input
              type="number"
              min={0}
              className="mt-1 w-full rounded border px-3 py-2"
              value={convA}
              onChange={(e) => setConvA(e.target.value)}
            />
          </label>
          <label className="mt-3 block text-sm">
            Visitors
            <input
              type="number"
              min={1}
              className="mt-1 w-full rounded border px-3 py-2"
              value={visA}
              onChange={(e) => setVisA(e.target.value)}
            />
          </label>
          {result && (
            <p className="mt-3 text-sm">
              Rate: <strong>{formatPercent(result.rateA)}</strong>
            </p>
          )}
        </fieldset>

        <fieldset className="rounded-xl border border-gray-200 p-4">
          <legend className="px-1 text-sm font-semibold text-emerald-700">Variant B (test)</legend>
          <label className="mt-2 block text-sm">
            Conversions
            <input
              type="number"
              min={0}
              className="mt-1 w-full rounded border px-3 py-2"
              value={convB}
              onChange={(e) => setConvB(e.target.value)}
            />
          </label>
          <label className="mt-3 block text-sm">
            Visitors
            <input
              type="number"
              min={1}
              className="mt-1 w-full rounded border px-3 py-2"
              value={visB}
              onChange={(e) => setVisB(e.target.value)}
            />
          </label>
          {result && (
            <p className="mt-3 text-sm">
              Rate: <strong>{formatPercent(result.rateB)}</strong>
            </p>
          )}
        </fieldset>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-gray-600">Confidence:</span>
        {([90, 95, 99] as const).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setConfidence(c)}
            className={`rounded-full px-3 py-1 font-medium ${confidence === c ? "bg-emerald-600 text-white" : "border border-gray-300 text-gray-700"}`}
          >
            {c}%
          </button>
        ))}
      </div>

      {!result ? (
        <p className="text-sm text-red-600">
          Invalid input. Conversions must be between 0 and visitors; visitors must be positive.
        </p>
      ) : (
        <div className="space-y-3 rounded-xl border border-cyan-200 bg-cyan-50/80 p-4 text-sm">
          <p className="font-semibold text-gray-900">
            {result.isSignificant
              ? `✓ ${result.winner === "B" ? "B wins" : result.winner === "A" ? "A wins" : "Tie"} (significant at ${confidence}%)`
              : `✗ Not significant at ${confidence}%`}
          </p>
          <table className="w-full">
            <tbody>
              <tr className="border-b border-cyan-100">
                <td className="py-2 text-gray-600">Absolute difference</td>
                <td className="py-2 font-mono">{formatPercent(result.diff, 2)}</td>
              </tr>
              <tr className="border-b border-cyan-100">
                <td className="py-2 text-gray-600">Relative lift (B vs A)</td>
                <td className="py-2 font-mono">
                  {Number.isFinite(result.relativeLift) ? formatPercent(result.relativeLift, 1) : "—"}
                </td>
              </tr>
              <tr className="border-b border-cyan-100">
                <td className="py-2 text-gray-600">z-score</td>
                <td className="py-2 font-mono">{result.zScore.toFixed(3)}</td>
              </tr>
              <tr className="border-b border-cyan-100">
                <td className="py-2 text-gray-600">p-value (two-tailed)</td>
                <td className="py-2 font-mono">{result.pValue.toFixed(4)}</td>
              </tr>
              <tr>
                <td className="py-2 text-gray-600">{confidence}% CI (diff)</td>
                <td className="py-2 font-mono">
                  [{formatPercent(result.ciLow, 2)}, {formatPercent(result.ciHigh, 2)}]
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={copyShare}
          className="rounded-full border border-gray-300 px-4 py-2 text-sm hover:border-emerald-600 hover:text-emerald-700"
        >
          {copied ? "Copied!" : "Copy share link"}
        </button>
      </div>
    </div>
  );
}
