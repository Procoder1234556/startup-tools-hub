"use client";

import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import {
  Copy,
  Check,
  RefreshCw,
  Download,
  Sparkles,
  Sliders,
  ShieldCheck,
  Eye,
  SlidersHorizontal,
  Palette,
  Hash,
  Dices,
  Lock,
} from "lucide-react";
import { MarketplaceTool } from "@/lib/marketplace-tools";

interface GeneratorTemplateProps {
  tool: MarketplaceTool;
}

export default function GeneratorTemplate({ tool }: GeneratorTemplateProps) {
  const [copied, setCopied] = useState(false);

  // ── QR Code State ──────────────────────────────────────────────────
  const [qrText, setQrText] = useState("https://toolboxhub.org");
  const [qrSize, setQrSize] = useState(240);
  const [qrErrorLevel, setQrErrorLevel] = useState<"L" | "M" | "Q" | "H">("M");
  const [qrFgColor, setQrFgColor] = useState("#0F172A");
  const [qrBgColor, setQrBgColor] = useState("#FFFFFF");
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  // ── Password Generator State ───────────────────────────────────────
  const [passLength, setPassLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [avoidAmbiguous, setAvoidAmbiguous] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");

  // ── UUID Generator State ───────────────────────────────────────────
  const [uuidCount, setUuidCount] = useState(5);
  const [uuidUppercase, setUuidUppercase] = useState(false);
  const [uuidHyphens, setUuidHyphens] = useState(true);
  const [generatedUuids, setGeneratedUuids] = useState<string[]>([]);

  // ── Lorem Ipsum State ──────────────────────────────────────────────
  const [loremCount, setLoremCount] = useState(3);
  const [loremType, setLoremType] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [loremStartStandard, setLoremStartStandard] = useState(true);
  const [generatedLorem, setGeneratedLorem] = useState("");

  // ── Random Number State ────────────────────────────────────────────
  const [numMin, setNumMin] = useState(1);
  const [numMax, setNumMax] = useState(100);
  const [numCount, setNumCount] = useState(5);
  const [numUnique, setNumUnique] = useState(true);
  const [generatedNumbers, setGeneratedNumbers] = useState<number[]>([]);

  // ── Color Palette State ────────────────────────────────────────────
  const [colorPalette, setColorPalette] = useState<string[]>([
    "#2563EB",
    "#3B82F6",
    "#60A5FA",
    "#93C5FD",
    "#0F172A",
  ]);

  // Initial generation
  useEffect(() => {
    generateAll();
  }, [tool.slug]);

  // QR Code generator effect
  useEffect(() => {
    if (tool.slug.includes("qr")) {
      QRCode.toDataURL(qrText || "https://toolboxhub.org", {
        width: qrSize,
        margin: 2,
        errorCorrectionLevel: qrErrorLevel,
        color: {
          dark: qrFgColor,
          light: qrBgColor,
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error("QR Code error:", err));
    }
  }, [qrText, qrSize, qrErrorLevel, qrFgColor, qrBgColor, tool.slug]);

  // Master Generator dispatcher
  const generateAll = () => {
    if (tool.slug.includes("password")) {
      generatePassword();
    } else if (tool.slug.includes("uuid")) {
      generateUuids();
    } else if (tool.slug.includes("lorem")) {
      generateLorem();
    } else if (tool.slug.includes("random-number") || tool.slug.includes("number")) {
      generateNumbers();
    } else if (tool.slug.includes("color") || tool.slug.includes("palette")) {
      generateColors();
    }
  };

  // Password Generator Logic
  const generatePassword = () => {
    let chars = "";
    if (useUpper) chars += avoidAmbiguous ? "ABCDEFGHJKLMNPQRSTUVWXYZ" : "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useLower) chars += avoidAmbiguous ? "abcdefghijkmnopqrstuvwxyz" : "abcdefghijklmnopqrstuvwxyz";
    if (useNumbers) chars += avoidAmbiguous ? "23456789" : "0123456789";
    if (useSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!chars) chars = "abcdefghijklmnopqrstuvwxyz";

    let result = "";
    const array = new Uint32Array(passLength);
    crypto.getRandomValues(array);
    for (let i = 0; i < passLength; i++) {
      result += chars[array[i] % chars.length];
    }
    setGeneratedPassword(result);
  };

  // UUID Generator Logic
  const generateUuids = () => {
    const list: string[] = [];
    for (let i = 0; i < uuidCount; i++) {
      let u = crypto.randomUUID();
      if (!uuidHyphens) u = u.replace(/-/g, "");
      if (uuidUppercase) u = u.toUpperCase();
      list.push(u);
    }
    setGeneratedUuids(list);
  };

  // Lorem Ipsum Generator Logic
  const generateLorem = () => {
    const words = [
      "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
      "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
      "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
      "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
      "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
      "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
      "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
      "deserunt", "mollit", "anim", "id", "est", "laborum",
    ];

    const generateSentence = () => {
      const len = Math.floor(Math.random() * 8) + 8;
      const s = [];
      for (let i = 0; i < len; i++) {
        s.push(words[Math.floor(Math.random() * words.length)]);
      }
      return s.join(" ").charAt(0).toUpperCase() + s.join(" ").slice(1) + ".";
    };

    if (loremType === "words") {
      const wList = [];
      for (let i = 0; i < loremCount * 20; i++) {
        wList.push(words[Math.floor(Math.random() * words.length)]);
      }
      setGeneratedLorem(wList.join(" "));
      return;
    }

    if (loremType === "sentences") {
      const sList = [];
      for (let i = 0; i < loremCount; i++) {
        sList.push(generateSentence());
      }
      setGeneratedLorem(sList.join(" "));
      return;
    }

    // Paragraphs
    const pList = [];
    for (let p = 0; p < loremCount; p++) {
      const sentences = [];
      const sCount = Math.floor(Math.random() * 3) + 4;
      for (let s = 0; s < sCount; s++) {
        sentences.push(generateSentence());
      }
      pList.push(sentences.join(" "));
    }

    let finalStr = pList.join("\n\n");
    if (loremStartStandard && !finalStr.startsWith("Lorem ipsum")) {
      finalStr = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + finalStr;
    }
    setGeneratedLorem(finalStr);
  };

  // Random Number Generator Logic
  const generateNumbers = () => {
    const list: number[] = [];
    const min = Math.min(numMin, numMax);
    const max = Math.max(numMin, numMax);
    const range = max - min + 1;

    if (numUnique && numCount <= range) {
      const set = new Set<number>();
      while (set.size < numCount) {
        set.add(Math.floor(Math.random() * range) + min);
      }
      setGeneratedNumbers(Array.from(set));
    } else {
      for (let i = 0; i < numCount; i++) {
        list.push(Math.floor(Math.random() * range) + min);
      }
      setGeneratedNumbers(list);
    }
  };

  // Color Palette Generator Logic
  const generateColors = () => {
    const randHex = () =>
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
        .toUpperCase();
    setColorPalette([randHex(), randHex(), randHex(), randHex(), randHex()]);
  };

  // Strength calculation for password
  const getPasswordStrength = () => {
    let score = 0;
    if (passLength >= 12) score += 1;
    if (passLength >= 16) score += 1;
    if (useUpper) score += 1;
    if (useLower) score += 1;
    if (useNumbers) score += 1;
    if (useSymbols) score += 1;

    if (score <= 3) return { label: "Weak", color: "bg-rose-500", text: "text-rose-600" };
    if (score <= 4) return { label: "Moderate", color: "bg-amber-500", text: "text-amber-600" };
    if (score <= 5) return { label: "Strong", color: "bg-blue-600", text: "text-blue-600" };
    return { label: "Very Strong", color: "bg-emerald-600", text: "text-emerald-600" };
  };

  const copyResult = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadText = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#E2E8F0]">
      {/* ── Left Column: Generator Configuration (5 Cols) ───────────── */}
      <div className="lg:col-span-5 p-6 sm:p-8 space-y-6 bg-[#F8FAFC]/50">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-[#2563EB]" />
            Configuration
          </h3>
          <button
            onClick={generateAll}
            className="inline-flex items-center gap-1 rounded-md bg-white border border-[#E2E8F0] px-2.5 py-1 text-xs font-semibold text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
          >
            <RefreshCw className="h-3 w-3" />
            Regenerate
          </button>
        </div>

        {/* ── QR CODE CONTROLS ── */}
        {tool.slug.includes("qr") && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#0F172A]">
                QR Content (URL or Text):
              </label>
              <textarea
                value={qrText}
                onChange={(e) => setQrText(e.target.value)}
                rows={3}
                placeholder="https://example.com"
                className="w-full rounded-lg border border-[#E2E8F0] bg-white p-3 text-xs sm:text-sm text-[#0F172A] outline-none focus:border-[#2563EB]"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-[#0F172A]">
                <span>Resolution:</span>
                <span>{qrSize}px</span>
              </div>
              <input
                type="range"
                min="140"
                max="480"
                step="20"
                value={qrSize}
                onChange={(e) => setQrSize(Number(e.target.value))}
                className="w-full accent-[#2563EB]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#0F172A]">
                  Foreground:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={qrFgColor}
                    onChange={(e) => setQrFgColor(e.target.value)}
                    className="h-8 w-10 cursor-pointer rounded border border-[#E2E8F0]"
                  />
                  <span className="font-mono text-xs uppercase">{qrFgColor}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#0F172A]">
                  Background:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={qrBgColor}
                    onChange={(e) => setQrBgColor(e.target.value)}
                    className="h-8 w-10 cursor-pointer rounded border border-[#E2E8F0]"
                  />
                  <span className="font-mono text-xs uppercase">{qrBgColor}</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#0F172A]">
                Error Correction:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(["L", "M", "Q", "H"] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setQrErrorLevel(lvl)}
                    className={`rounded-md border py-1.5 text-xs font-bold transition-all ${
                      qrErrorLevel === lvl
                        ? "border-[#2563EB] bg-blue-50 text-[#2563EB]"
                        : "border-[#E2E8F0] bg-white text-[#475569] hover:bg-[#F1F5F9]"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── PASSWORD CONTROLS ── */}
        {tool.slug.includes("password") && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-[#0F172A]">
                <span>Password Length:</span>
                <span className="font-mono font-bold text-[#2563EB]">{passLength}</span>
              </div>
              <input
                type="range"
                min="6"
                max="64"
                value={passLength}
                onChange={(e) => {
                  setPassLength(Number(e.target.value));
                  generatePassword();
                }}
                className="w-full accent-[#2563EB]"
              />
            </div>

            <div className="space-y-2 pt-2 border-t border-[#E2E8F0]">
              <label className="flex items-center gap-2.5 text-xs font-medium text-[#334155] cursor-pointer">
                <input
                  type="checkbox"
                  checked={useUpper}
                  onChange={(e) => {
                    setUseUpper(e.target.checked);
                    generatePassword();
                  }}
                  className="rounded text-[#2563EB] focus:ring-[#2563EB]"
                />
                Uppercase Letters (A-Z)
              </label>

              <label className="flex items-center gap-2.5 text-xs font-medium text-[#334155] cursor-pointer">
                <input
                  type="checkbox"
                  checked={useLower}
                  onChange={(e) => {
                    setUseLower(e.target.checked);
                    generatePassword();
                  }}
                  className="rounded text-[#2563EB] focus:ring-[#2563EB]"
                />
                Lowercase Letters (a-z)
              </label>

              <label className="flex items-center gap-2.5 text-xs font-medium text-[#334155] cursor-pointer">
                <input
                  type="checkbox"
                  checked={useNumbers}
                  onChange={(e) => {
                    setUseNumbers(e.target.checked);
                    generatePassword();
                  }}
                  className="rounded text-[#2563EB] focus:ring-[#2563EB]"
                />
                Numbers (0-9)
              </label>

              <label className="flex items-center gap-2.5 text-xs font-medium text-[#334155] cursor-pointer">
                <input
                  type="checkbox"
                  checked={useSymbols}
                  onChange={(e) => {
                    setUseSymbols(e.target.checked);
                    generatePassword();
                  }}
                  className="rounded text-[#2563EB] focus:ring-[#2563EB]"
                />
                Special Symbols (!@#$%)
              </label>

              <label className="flex items-center gap-2.5 text-xs font-medium text-[#334155] cursor-pointer">
                <input
                  type="checkbox"
                  checked={avoidAmbiguous}
                  onChange={(e) => {
                    setAvoidAmbiguous(e.target.checked);
                    generatePassword();
                  }}
                  className="rounded text-[#2563EB] focus:ring-[#2563EB]"
                />
                Avoid Ambiguous (1, l, I, 0, O)
              </label>
            </div>
          </div>
        )}

        {/* ── UUID CONTROLS ── */}
        {tool.slug.includes("uuid") && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-[#0F172A]">
                <span>Quantity:</span>
                <span className="font-mono font-bold text-[#2563EB]">{uuidCount}</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                value={uuidCount}
                onChange={(e) => {
                  setUuidCount(Number(e.target.value));
                  generateUuids();
                }}
                className="w-full accent-[#2563EB]"
              />
            </div>

            <div className="space-y-2 pt-2 border-t border-[#E2E8F0]">
              <label className="flex items-center gap-2.5 text-xs font-medium text-[#334155] cursor-pointer">
                <input
                  type="checkbox"
                  checked={uuidUppercase}
                  onChange={(e) => {
                    setUuidUppercase(e.target.checked);
                    generateUuids();
                  }}
                  className="rounded text-[#2563EB] focus:ring-[#2563EB]"
                />
                Uppercase Format
              </label>

              <label className="flex items-center gap-2.5 text-xs font-medium text-[#334155] cursor-pointer">
                <input
                  type="checkbox"
                  checked={uuidHyphens}
                  onChange={(e) => {
                    setUuidHyphens(e.target.checked);
                    generateUuids();
                  }}
                  className="rounded text-[#2563EB] focus:ring-[#2563EB]"
                />
                Include Standard Hyphens
              </label>
            </div>
          </div>
        )}

        {/* ── LOREM CONTROLS ── */}
        {tool.slug.includes("lorem") && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#0F172A]">
                Generate By:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["paragraphs", "sentences", "words"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setLoremType(t);
                      generateLorem();
                    }}
                    className={`rounded-md border py-1.5 text-xs font-semibold capitalize transition-all ${
                      loremType === t
                        ? "border-[#2563EB] bg-blue-50 text-[#2563EB]"
                        : "border-[#E2E8F0] bg-white text-[#475569] hover:bg-[#F1F5F9]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-[#0F172A]">
                <span>Count:</span>
                <span className="font-mono font-bold text-[#2563EB]">{loremCount}</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                value={loremCount}
                onChange={(e) => {
                  setLoremCount(Number(e.target.value));
                  generateLorem();
                }}
                className="w-full accent-[#2563EB]"
              />
            </div>

            <label className="flex items-center gap-2.5 text-xs font-medium text-[#334155] cursor-pointer pt-2 border-t border-[#E2E8F0]">
              <input
                type="checkbox"
                checked={loremStartStandard}
                onChange={(e) => {
                  setLoremStartStandard(e.target.checked);
                  generateLorem();
                }}
                className="rounded text-[#2563EB] focus:ring-[#2563EB]"
              />
              Start with &quot;Lorem ipsum dolor sit amet...&quot;
            </label>
          </div>
        )}

        {/* ── RANDOM NUMBER CONTROLS ── */}
        {(tool.slug.includes("random-number") || tool.slug.includes("number")) && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#0F172A]">
                  Min Value:
                </label>
                <input
                  type="number"
                  value={numMin}
                  onChange={(e) => setNumMin(Number(e.target.value))}
                  className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs font-mono outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#0F172A]">
                  Max Value:
                </label>
                <input
                  type="number"
                  value={numMax}
                  onChange={(e) => setNumMax(Number(e.target.value))}
                  className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-xs font-mono outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-[#0F172A]">
                <span>Count:</span>
                <span className="font-mono font-bold text-[#2563EB]">{numCount}</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={numCount}
                onChange={(e) => setNumCount(Number(e.target.value))}
                className="w-full accent-[#2563EB]"
              />
            </div>

            <label className="flex items-center gap-2.5 text-xs font-medium text-[#334155] cursor-pointer pt-2 border-t border-[#E2E8F0]">
              <input
                type="checkbox"
                checked={numUnique}
                onChange={(e) => setNumUnique(e.target.checked)}
                className="rounded text-[#2563EB] focus:ring-[#2563EB]"
              />
              Unique Numbers (No Duplicates)
            </label>
          </div>
        )}

        {/* ── COLOR PALETTE CONTROLS ── */}
        {(tool.slug.includes("color") || tool.slug.includes("palette")) && (
          <div className="space-y-4">
            <p className="text-xs text-[#64748B] leading-relaxed">
              Generate 5 complementary HEX palette colors. Click any color block to copy its hex code directly to your clipboard.
            </p>
            <button
              onClick={generateColors}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#1D4ED8]"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Generate Fresh Palette
            </button>
          </div>
        )}
      </div>

      {/* ── Right Column: Live Output Preview (7 Cols) ─────────────── */}
      <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-white space-y-6">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
            <h3 className="text-base font-bold text-[#0F172A] flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#2563EB]" />
              Live Generated Preview
            </h3>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  let copyContent = "";
                  if (tool.slug.includes("qr")) copyContent = qrText;
                  else if (tool.slug.includes("password")) copyContent = generatedPassword;
                  else if (tool.slug.includes("uuid")) copyContent = generatedUuids.join("\n");
                  else if (tool.slug.includes("lorem")) copyContent = generatedLorem;
                  else if (tool.slug.includes("number")) copyContent = generatedNumbers.join(", ");
                  else if (tool.slug.includes("color")) copyContent = colorPalette.join(", ");
                  copyResult(copyContent);
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
                    <span>Copy All</span>
                  </>
                )}
              </button>

              {tool.slug.includes("qr") && qrDataUrl && (
                <a
                  href={qrDataUrl}
                  download="qrcode.png"
                  className="inline-flex items-center gap-1 rounded-lg bg-[#2563EB] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1D4ED8] transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download PNG
                </a>
              )}
            </div>
          </div>

          {/* ── Live Render Area ── */}
          <div className="pt-6">
            {/* QR Code Render */}
            {tool.slug.includes("qr") && (
              <div className="flex flex-col items-center justify-center space-y-4 py-6">
                <div className="p-4 rounded-xl border border-[#E2E8F0] bg-white shadow-xs">
                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt="Generated QR Code"
                      style={{ width: `${qrSize}px`, height: `${qrSize}px` }}
                      className="rounded"
                    />
                  ) : (
                    <div className="h-48 w-48 flex items-center justify-center text-xs text-[#64748B]">
                      Generating QR...
                    </div>
                  )}
                </div>
                <p className="text-xs text-[#64748B] text-center max-w-sm truncate">
                  Target: <strong className="text-[#0F172A]">{qrText}</strong>
                </p>
              </div>
            )}

            {/* Password Render */}
            {tool.slug.includes("password") && (
              <div className="space-y-6">
                <div className="relative rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 text-center">
                  <div className="font-mono text-xl sm:text-2xl font-bold tracking-wider text-[#0F172A] break-all select-all">
                    {generatedPassword || "Generating..."}
                  </div>
                </div>

                {/* Strength Meter */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#64748B]">Strength:</span>
                    <span className={`font-bold ${getPasswordStrength().text}`}>
                      {getPasswordStrength().label}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#E2E8F0] overflow-hidden">
                    <div
                      className={`h-full ${getPasswordStrength().color} transition-all duration-300`}
                      style={{
                        width:
                          getPasswordStrength().label === "Weak"
                            ? "25%"
                            : getPasswordStrength().label === "Moderate"
                            ? "50%"
                            : getPasswordStrength().label === "Strong"
                            ? "75%"
                            : "100%",
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* UUID Render */}
            {tool.slug.includes("uuid") && (
              <div className="space-y-2 max-h-[360px] overflow-y-auto">
                {generatedUuids.map((u, idx) => (
                  <div
                    key={idx}
                    onClick={() => copyResult(u)}
                    className="flex items-center justify-between p-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-blue-50/50 hover:border-[#2563EB] cursor-pointer transition-colors group"
                  >
                    <span className="font-mono text-xs sm:text-sm text-[#0F172A]">
                      {u}
                    </span>
                    <Copy className="h-3.5 w-3.5 text-[#94A3B8] group-hover:text-[#2563EB]" />
                  </div>
                ))}
              </div>
            )}

            {/* Lorem Ipsum Render */}
            {tool.slug.includes("lorem") && (
              <div className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] max-h-[380px] overflow-y-auto text-xs sm:text-sm text-[#334155] leading-relaxed whitespace-pre-line font-serif">
                {generatedLorem}
              </div>
            )}

            {/* Random Numbers Render */}
            {(tool.slug.includes("random-number") || tool.slug.includes("number")) && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2.5 max-h-[320px] overflow-y-auto">
                  {generatedNumbers.map((num, idx) => (
                    <div
                      key={idx}
                      className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-[#2563EB] text-white font-bold text-base sm:text-lg shadow-xs"
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Color Palette Render */}
            {(tool.slug.includes("color") || tool.slug.includes("palette")) && (
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {colorPalette.map((col, idx) => (
                  <div
                    key={idx}
                    onClick={() => copyResult(col)}
                    className="flex sm:flex-col items-center justify-between sm:justify-end rounded-xl border border-[#E2E8F0] p-4 cursor-pointer hover:scale-105 transition-all shadow-xs h-24 sm:h-48 group"
                    style={{ backgroundColor: col }}
                  >
                    <span className="rounded bg-black/60 px-2 py-1 font-mono text-xs font-bold text-white uppercase backdrop-blur-xs">
                      {col}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Footer Info ── */}
        <div className="flex items-center justify-between text-xs text-[#64748B] pt-4 border-t border-[#F1F5F9]">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>Cryptographically Generated in Browser</span>
          </div>
          <span>Free & Unlimited</span>
        </div>
      </div>
    </div>
  );
}
