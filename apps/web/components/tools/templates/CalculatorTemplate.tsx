"use client";

import React, { useState, useMemo } from "react";
import {
  Calculator,
  RefreshCw,
  Copy,
  Check,
  TrendingUp,
  Percent,
  DollarSign,
  Scale,
  Calendar,
  Layers,
  ArrowRight,
  Info,
  ShieldCheck,
} from "lucide-react";
import { MarketplaceTool } from "@/lib/marketplace-tools";

interface CalculatorTemplateProps {
  tool: MarketplaceTool;
}

export default function CalculatorTemplate({ tool }: CalculatorTemplateProps) {
  const [copied, setCopied] = useState(false);

  // ── Percentage Calculator State ────────────────────────────────────
  const [pctMode, setPctMode] = useState<"of" | "whatPct" | "diff">("of");
  const [pctX, setPctX] = useState<number>(15);
  const [pctY, setPctY] = useState<number>(200);

  // ── GST Calculator State ───────────────────────────────────────────
  const [gstAmount, setGstAmount] = useState<number>(5000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [gstType, setGstType] = useState<"exclusive" | "inclusive">("exclusive");

  // ── Runway Calculator State ────────────────────────────────────────
  const [runwayCash, setRunwayCash] = useState<number>(250000);
  const [runwayRevenue, setRunwayRevenue] = useState<number>(12000);
  const [runwayExpenses, setRunwayExpenses] = useState<number>(32000);

  // ── Loan / EMI Calculator State ────────────────────────────────────
  const [loanPrincipal, setLoanPrincipal] = useState<number>(100000);
  const [loanRate, setLoanRate] = useState<number>(7.5);
  const [loanYears, setLoanYears] = useState<number>(5);

  // ── Profit Margin State ────────────────────────────────────────────
  const [cogs, setCogs] = useState<number>(60);
  const [sellingPrice, setSellingPrice] = useState<number>(100);

  // ── Unit Converter State ───────────────────────────────────────────
  const [unitCategory, setUnitCategory] = useState<"length" | "weight" | "storage">("length");
  const [unitVal, setUnitVal] = useState<number>(100);
  const [unitFrom, setUnitFrom] = useState<string>("m");
  const [unitTo, setUnitTo] = useState<string>("ft");

  // ── Discount Calculator State ──────────────────────────────────────
  const [discOriginal, setDiscOriginal] = useState<number>(120);
  const [discPercent, setDiscPercent] = useState<number>(25);
  const [discTax, setDiscTax] = useState<number>(8);

  // ── BMI Calculator State ───────────────────────────────────────────
  const [bmiHeight, setBmiHeight] = useState<number>(175); // cm
  const [bmiWeight, setBmiWeight] = useState<number>(70); // kg

  // ── Age Calculator State ───────────────────────────────────────────
  const [birthDate, setBirthDate] = useState<string>("1998-05-15");

  // Formatter helper
  const fmt = (num: number, maxDec = 2) =>
    num.toLocaleString("en-US", {
      maximumFractionDigits: maxDec,
      minimumFractionDigits: Number.isInteger(num) ? 0 : 2,
    });

  const fmtCurrency = (num: number) =>
    "$" +
    num.toLocaleString("en-US", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });

  // Copy helper
  const copyValue = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculations
  const percentageResult = useMemo(() => {
    if (pctMode === "of") {
      const res = (pctX / 100) * pctY;
      return {
        value: res,
        text: `${pctX}% of ${pctY} = ${fmt(res)}`,
        formula: `(${pctX} ÷ 100) × ${pctY} = ${fmt(res)}`,
      };
    }
    if (pctMode === "whatPct") {
      const res = pctY !== 0 ? (pctX / pctY) * 100 : 0;
      return {
        value: res,
        text: `${pctX} is ${fmt(res)}% of ${pctY}`,
        formula: `(${pctX} ÷ ${pctY}) × 100 = ${fmt(res)}%`,
      };
    }
    // diff
    const diff = pctY - pctX;
    const res = pctX !== 0 ? (diff / pctX) * 100 : 0;
    const type = diff >= 0 ? "increase" : "decrease";
    return {
      value: res,
      text: `${fmt(Math.abs(res))}% ${type} from ${pctX} to ${pctY}`,
      formula: `((${pctY} - ${pctX}) ÷ ${pctX}) × 100 = ${fmt(res)}%`,
    };
  }, [pctMode, pctX, pctY]);

  const gstResult = useMemo(() => {
    if (gstType === "exclusive") {
      const tax = (gstAmount * gstRate) / 100;
      const total = gstAmount + tax;
      return {
        net: gstAmount,
        cgst: tax / 2,
        sgst: tax / 2,
        totalTax: tax,
        gross: total,
      };
    }
    // inclusive
    const net = (gstAmount * 100) / (100 + gstRate);
    const tax = gstAmount - net;
    return {
      net,
      cgst: tax / 2,
      sgst: tax / 2,
      totalTax: tax,
      gross: gstAmount,
    };
  }, [gstAmount, gstRate, gstType]);

  const runwayResult = useMemo(() => {
    const netBurn = runwayExpenses - runwayRevenue;
    if (netBurn <= 0) {
      return {
        netBurn: 0,
        months: Infinity,
        days: Infinity,
        status: "Profitable / Cash Flow Positive",
      };
    }
    const months = runwayCash / netBurn;
    const days = Math.round(months * 30.4);
    return {
      netBurn,
      months: Number(months.toFixed(1)),
      days,
      status: months < 6 ? "Critical (< 6 Mo)" : months < 12 ? "Warning (6-12 Mo)" : "Healthy (12+ Mo)",
    };
  }, [runwayCash, runwayRevenue, runwayExpenses]);

  const loanResult = useMemo(() => {
    const r = loanRate / 100 / 12;
    const n = loanYears * 12;
    if (r === 0) {
      const emi = loanPrincipal / n;
      return { emi, totalPayment: loanPrincipal, totalInterest: 0 };
    }
    const emi = (loanPrincipal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - loanPrincipal;
    return { emi, totalPayment, totalInterest };
  }, [loanPrincipal, loanRate, loanYears]);

  const profitResult = useMemo(() => {
    const grossProfit = sellingPrice - cogs;
    const margin = sellingPrice > 0 ? (grossProfit / sellingPrice) * 100 : 0;
    const markup = cogs > 0 ? (grossProfit / cogs) * 100 : 0;
    return { grossProfit, margin, markup };
  }, [cogs, sellingPrice]);

  const discountResult = useMemo(() => {
    const savings = (discOriginal * discPercent) / 100;
    const discountedPrice = discOriginal - savings;
    const taxAmount = (discountedPrice * discTax) / 100;
    const finalPrice = discountedPrice + taxAmount;
    return { savings, discountedPrice, taxAmount, finalPrice };
  }, [discOriginal, discPercent, discTax]);

  const bmiResult = useMemo(() => {
    const heightM = bmiHeight / 100;
    if (heightM <= 0) return { bmi: 0, category: "N/A", color: "text-slate-500" };
    const bmi = bmiWeight / (heightM * heightM);
    let category = "Normal";
    let color = "text-emerald-600";
    if (bmi < 18.5) {
      category = "Underweight";
      color = "text-blue-600";
    } else if (bmi >= 25 && bmi < 30) {
      category = "Overweight";
      color = "text-amber-600";
    } else if (bmi >= 30) {
      category = "Obese";
      color = "text-rose-600";
    }
    return { bmi: Number(bmi.toFixed(1)), category, color };
  }, [bmiHeight, bmiWeight]);

  const ageResult = useMemo(() => {
    const birth = new Date(birthDate);
    const now = new Date();
    if (isNaN(birth.getTime())) return { years: 0, months: 0, days: 0, totalDays: 0, totalHours: 0 };

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const diffMs = now.getTime() - birth.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));

    return { years, months, days, totalDays, totalHours };
  }, [birthDate]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#E2E8F0]">
      {/* ── Left Column: Calculator Inputs (5 Cols) ─────────────────── */}
      <div className="lg:col-span-5 p-6 sm:p-8 space-y-6 bg-[#F8FAFC]/50">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
            <Calculator className="h-4 w-4 text-[#2563EB]" />
            Calculator Parameters
          </h3>
          <span className="text-xs font-semibold text-[#64748B]">Live Calculation</span>
        </div>

        {/* ── PERCENTAGE CALCULATOR INPUTS ── */}
        {(tool.slug.includes("percentage") || tool.slug.includes("percent")) && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#0F172A]">Mode:</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setPctMode("of")}
                  className={`rounded-md border py-1.5 px-2 text-xs font-semibold ${
                    pctMode === "of"
                      ? "border-[#2563EB] bg-blue-50 text-[#2563EB]"
                      : "border-[#E2E8F0] bg-white text-[#475569]"
                  }`}
                >
                  X% of Y
                </button>
                <button
                  onClick={() => setPctMode("whatPct")}
                  className={`rounded-md border py-1.5 px-2 text-xs font-semibold ${
                    pctMode === "whatPct"
                      ? "border-[#2563EB] bg-blue-50 text-[#2563EB]"
                      : "border-[#E2E8F0] bg-white text-[#475569]"
                  }`}
                >
                  X is ?% of Y
                </button>
                <button
                  onClick={() => setPctMode("diff")}
                  className={`rounded-md border py-1.5 px-2 text-xs font-semibold ${
                    pctMode === "diff"
                      ? "border-[#2563EB] bg-blue-50 text-[#2563EB]"
                      : "border-[#E2E8F0] bg-white text-[#475569]"
                  }`}
                >
                  % Change
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#0F172A]">
                  Value X {pctMode === "of" ? "(%)" : ""}:
                </label>
                <input
                  type="number"
                  value={pctX}
                  onChange={(e) => setPctX(Number(e.target.value))}
                  className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#0F172A]">
                  Value Y:
                </label>
                <input
                  type="number"
                  value={pctY}
                  onChange={(e) => setPctY(Number(e.target.value))}
                  className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>
          </div>
        )}

        {/* ── GST CALCULATOR INPUTS ── */}
        {tool.slug.includes("gst") && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#0F172A]">Calculation Type:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setGstType("exclusive")}
                  className={`rounded-md border py-2 text-xs font-semibold ${
                    gstType === "exclusive"
                      ? "border-[#2563EB] bg-blue-50 text-[#2563EB]"
                      : "border-[#E2E8F0] bg-white text-[#475569]"
                  }`}
                >
                  GST Exclusive (Add Tax)
                </button>
                <button
                  onClick={() => setGstType("inclusive")}
                  className={`rounded-md border py-2 text-xs font-semibold ${
                    gstType === "inclusive"
                      ? "border-[#2563EB] bg-blue-50 text-[#2563EB]"
                      : "border-[#E2E8F0] bg-white text-[#475569]"
                  }`}
                >
                  GST Inclusive (Remove Tax)
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#0F172A]">Amount ($):</label>
              <input
                type="number"
                value={gstAmount}
                onChange={(e) => setGstAmount(Number(e.target.value))}
                className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-[#2563EB]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#0F172A]">GST Rate (%):</label>
              <div className="grid grid-cols-4 gap-2">
                {[5, 12, 18, 28].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setGstRate(rate)}
                    className={`rounded-md border py-1.5 text-xs font-bold ${
                      gstRate === rate
                        ? "border-[#2563EB] bg-blue-50 text-[#2563EB]"
                        : "border-[#E2E8F0] bg-white text-[#475569]"
                    }`}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── RUNWAY CALCULATOR INPUTS ── */}
        {(tool.slug.includes("runway") || tool.slug.includes("burn")) && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#0F172A]">
                Cash Balance ($):
              </label>
              <input
                type="number"
                value={runwayCash}
                onChange={(e) => setRunwayCash(Number(e.target.value))}
                className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-[#2563EB]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#0F172A]">
                  Monthly Expenses ($):
                </label>
                <input
                  type="number"
                  value={runwayExpenses}
                  onChange={(e) => setRunwayExpenses(Number(e.target.value))}
                  className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#0F172A]">
                  Monthly Revenue ($):
                </label>
                <input
                  type="number"
                  value={runwayRevenue}
                  onChange={(e) => setRunwayRevenue(Number(e.target.value))}
                  className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>
          </div>
        )}

        {/* ── LOAN / EMI CALCULATOR INPUTS ── */}
        {(tool.slug.includes("loan") || tool.slug.includes("emi")) && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#0F172A]">
                Principal Amount ($):
              </label>
              <input
                type="number"
                value={loanPrincipal}
                onChange={(e) => setLoanPrincipal(Number(e.target.value))}
                className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-[#2563EB]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#0F172A]">
                  Interest Rate (% / yr):
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={loanRate}
                  onChange={(e) => setLoanRate(Number(e.target.value))}
                  className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#0F172A]">
                  Loan Term (Years):
                </label>
                <input
                  type="number"
                  value={loanYears}
                  onChange={(e) => setLoanYears(Number(e.target.value))}
                  className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>
          </div>
        )}

        {/* ── PROFIT MARGIN INPUTS ── */}
        {tool.slug.includes("profit") && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#0F172A]">
                Cost of Goods Sold ($):
              </label>
              <input
                type="number"
                value={cogs}
                onChange={(e) => setCogs(Number(e.target.value))}
                className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-[#2563EB]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#0F172A]">
                Selling Price ($):
              </label>
              <input
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(Number(e.target.value))}
                className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-[#2563EB]"
              />
            </div>
          </div>
        )}

        {/* ── DISCOUNT CALCULATOR INPUTS ── */}
        {tool.slug.includes("discount") && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#0F172A]">
                Original Price ($):
              </label>
              <input
                type="number"
                value={discOriginal}
                onChange={(e) => setDiscOriginal(Number(e.target.value))}
                className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-[#2563EB]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#0F172A]">
                  Discount (%):
                </label>
                <input
                  type="number"
                  value={discPercent}
                  onChange={(e) => setDiscPercent(Number(e.target.value))}
                  className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#0F172A]">
                  Sales Tax (%):
                </label>
                <input
                  type="number"
                  value={discTax}
                  onChange={(e) => setDiscTax(Number(e.target.value))}
                  className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>
          </div>
        )}

        {/* ── BMI CALCULATOR INPUTS ── */}
        {tool.slug.includes("bmi") && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#0F172A]">
                  Height (cm):
                </label>
                <input
                  type="number"
                  value={bmiHeight}
                  onChange={(e) => setBmiHeight(Number(e.target.value))}
                  className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#0F172A]">
                  Weight (kg):
                </label>
                <input
                  type="number"
                  value={bmiWeight}
                  onChange={(e) => setBmiWeight(Number(e.target.value))}
                  className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>
          </div>
        )}

        {/* ── AGE CALCULATOR INPUTS ── */}
        {tool.slug.includes("age") && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#0F172A]">
                Date of Birth:
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-[#2563EB]"
              />
            </div>
          </div>
        )}

        {/* Default generic inputs fallback */}
        {!tool.slug.includes("percentage") &&
          !tool.slug.includes("gst") &&
          !tool.slug.includes("runway") &&
          !tool.slug.includes("burn") &&
          !tool.slug.includes("loan") &&
          !tool.slug.includes("emi") &&
          !tool.slug.includes("profit") &&
          !tool.slug.includes("discount") &&
          !tool.slug.includes("bmi") &&
          !tool.slug.includes("age") && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#0F172A]">Base Value:</label>
                <input
                  type="number"
                  value={pctX}
                  onChange={(e) => setPctX(Number(e.target.value))}
                  className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>
          )}
      </div>

      {/* ── Right Column: Prominent Result & Breakdown (7 Cols) ─────── */}
      <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-white space-y-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
            <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#2563EB]" />
              Calculated Breakdown
            </h3>

            <button
              onClick={() => {
                let copyText = "";
                if (tool.slug.includes("percentage")) copyText = percentageResult.text;
                else if (tool.slug.includes("gst"))
                  copyText = `Gross: ${fmtCurrency(gstResult.gross)}, Tax: ${fmtCurrency(
                    gstResult.totalTax
                  )}`;
                else if (tool.slug.includes("runway"))
                  copyText = `Runway: ${runwayResult.months} months (${runwayResult.status})`;
                else if (tool.slug.includes("loan"))
                  copyText = `Monthly EMI: ${fmtCurrency(loanResult.emi)}`;
                else if (tool.slug.includes("profit"))
                  copyText = `Gross Margin: ${fmt(profitResult.margin)}%`;
                else if (tool.slug.includes("bmi"))
                  copyText = `BMI: ${bmiResult.bmi} (${bmiResult.category})`;
                else if (tool.slug.includes("age"))
                  copyText = `Age: ${ageResult.years} years, ${ageResult.months} months`;
                copyValue(copyText);
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs font-semibold text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#16A34A]" />
                  <span className="text-[#16A34A]">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-[#64748B]" />
                  <span>Copy Result</span>
                </>
              )}
            </button>
          </div>

          {/* ── PERCENTAGE RESULT DISPLAY ── */}
          {(tool.slug.includes("percentage") || tool.slug.includes("percent")) && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50/60 to-white p-6 sm:p-8 text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                  Result
                </span>
                <div className="text-4xl sm:text-5xl font-extrabold text-[#0F172A]">
                  {fmt(percentageResult.value)}
                </div>
                <p className="text-sm font-semibold text-[#475569]">
                  {percentageResult.text}
                </p>
              </div>

              <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-xs font-mono text-[#475569]">
                <span className="text-[#64748B]">Formula: </span>
                <strong className="text-[#0F172A]">{percentageResult.formula}</strong>
              </div>
            </div>
          )}

          {/* ── GST RESULT DISPLAY ── */}
          {tool.slug.includes("gst") && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50/60 to-white p-6 sm:p-8 text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                  Total Gross Amount
                </span>
                <div className="text-4xl sm:text-5xl font-extrabold text-[#0F172A]">
                  {fmtCurrency(gstResult.gross)}
                </div>
                <p className="text-xs text-[#64748B]">
                  Net: {fmtCurrency(gstResult.net)} + GST: {fmtCurrency(gstResult.totalTax)}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-[#E2E8F0] bg-white p-3.5 text-center">
                  <div className="text-[11px] text-[#64748B] font-medium">Net Pre-Tax</div>
                  <div className="text-base font-bold text-[#0F172A] mt-1">
                    {fmtCurrency(gstResult.net)}
                  </div>
                </div>
                <div className="rounded-xl border border-[#E2E8F0] bg-white p-3.5 text-center">
                  <div className="text-[11px] text-[#64748B] font-medium">CGST ({gstRate / 2}%)</div>
                  <div className="text-base font-bold text-[#0F172A] mt-1">
                    {fmtCurrency(gstResult.cgst)}
                  </div>
                </div>
                <div className="rounded-xl border border-[#E2E8F0] bg-white p-3.5 text-center">
                  <div className="text-[11px] text-[#64748B] font-medium">SGST ({gstRate / 2}%)</div>
                  <div className="text-base font-bold text-[#0F172A] mt-1">
                    {fmtCurrency(gstResult.sgst)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── RUNWAY RESULT DISPLAY ── */}
          {(tool.slug.includes("runway") || tool.slug.includes("burn")) && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50/60 to-white p-6 sm:p-8 text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                  Runway Remaining
                </span>
                <div className="text-4xl sm:text-5xl font-extrabold text-[#0F172A]">
                  {runwayResult.months === Infinity ? "∞" : `${runwayResult.months} Mo`}
                </div>
                <p className="text-sm font-semibold text-emerald-700">
                  {runwayResult.status} ({runwayResult.days} Days)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#E2E8F0] bg-white p-4">
                  <div className="text-xs text-[#64748B] font-medium">Monthly Net Burn</div>
                  <div className="text-lg font-bold text-rose-600 mt-1">
                    {fmtCurrency(runwayResult.netBurn)}/mo
                  </div>
                </div>
                <div className="rounded-xl border border-[#E2E8F0] bg-white p-4">
                  <div className="text-xs text-[#64748B] font-medium">Gross Cash Buffer</div>
                  <div className="text-lg font-bold text-[#0F172A] mt-1">
                    {fmtCurrency(runwayCash)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── LOAN RESULT DISPLAY ── */}
          {(tool.slug.includes("loan") || tool.slug.includes("emi")) && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50/60 to-white p-6 sm:p-8 text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                  Monthly EMI Payment
                </span>
                <div className="text-4xl sm:text-5xl font-extrabold text-[#0F172A]">
                  {fmtCurrency(loanResult.emi)}
                </div>
                <p className="text-xs text-[#64748B]">Per month for {loanYears * 12} installments</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#E2E8F0] bg-white p-4">
                  <div className="text-xs text-[#64748B] font-medium">Total Interest</div>
                  <div className="text-lg font-bold text-rose-600 mt-1">
                    {fmtCurrency(loanResult.totalInterest)}
                  </div>
                </div>
                <div className="rounded-xl border border-[#E2E8F0] bg-white p-4">
                  <div className="text-xs text-[#64748B] font-medium">Total Outflow</div>
                  <div className="text-lg font-bold text-[#0F172A] mt-1">
                    {fmtCurrency(loanResult.totalPayment)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── PROFIT RESULT DISPLAY ── */}
          {tool.slug.includes("profit") && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50/60 to-white p-6 sm:p-8 text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                  Gross Profit Margin
                </span>
                <div className="text-4xl sm:text-5xl font-extrabold text-[#0F172A]">
                  {fmt(profitResult.margin)}%
                </div>
                <p className="text-sm font-semibold text-emerald-700">
                  Gross Profit: {fmtCurrency(profitResult.grossProfit)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#E2E8F0] bg-white p-4">
                  <div className="text-xs text-[#64748B] font-medium">Markup Percentage</div>
                  <div className="text-lg font-bold text-[#0F172A] mt-1">
                    {fmt(profitResult.markup)}%
                  </div>
                </div>
                <div className="rounded-xl border border-[#E2E8F0] bg-white p-4">
                  <div className="text-xs text-[#64748B] font-medium">Profit per Unit</div>
                  <div className="text-lg font-bold text-emerald-600 mt-1">
                    {fmtCurrency(profitResult.grossProfit)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── DISCOUNT RESULT DISPLAY ── */}
          {tool.slug.includes("discount") && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50/60 to-white p-6 sm:p-8 text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                  Final Price
                </span>
                <div className="text-4xl sm:text-5xl font-extrabold text-[#0F172A]">
                  {fmtCurrency(discountResult.finalPrice)}
                </div>
                <p className="text-sm font-semibold text-emerald-700">
                  You Save: {fmtCurrency(discountResult.savings)} ({discPercent}% off)
                </p>
              </div>
            </div>
          )}

          {/* ── BMI RESULT DISPLAY ── */}
          {tool.slug.includes("bmi") && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50/60 to-white p-6 sm:p-8 text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                  Body Mass Index
                </span>
                <div className="text-4xl sm:text-5xl font-extrabold text-[#0F172A]">
                  {bmiResult.bmi}
                </div>
                <p className={`text-base font-bold ${bmiResult.color}`}>
                  {bmiResult.category}
                </p>
              </div>
            </div>
          )}

          {/* ── AGE RESULT DISPLAY ── */}
          {tool.slug.includes("age") && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50/60 to-white p-6 sm:p-8 text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                  Chronological Age
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
                  {ageResult.years} Years, {ageResult.months} Months
                </div>
                <p className="text-sm text-[#64748B]">and {ageResult.days} Days</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 text-center">
                  <div className="text-xs text-[#64748B]">Total Days Lived</div>
                  <div className="text-lg font-bold text-[#0F172A] mt-1">
                    {fmt(ageResult.totalDays)} Days
                  </div>
                </div>
                <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 text-center">
                  <div className="text-xs text-[#64748B]">Total Hours Lived</div>
                  <div className="text-lg font-bold text-[#0F172A] mt-1">
                    {fmt(ageResult.totalHours)} Hours
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Footer Info ── */}
        <div className="flex items-center justify-between text-xs text-[#64748B] pt-4 border-t border-[#F1F5F9]">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>High Precision IEEE 754 Arithmetic Engine</span>
          </div>
          <span>Instant & Private</span>
        </div>
      </div>
    </div>
  );
}
