"use client";

import { useEffect, useMemo, useState } from "react";
import { Copy, Check, Shield } from "lucide-react";
import type { MicroToolDef } from "@/lib/micro-tools/types";
import { TEXT_TRANSFORM_FNS } from "@/lib/micro-tools/generators/text";
import { recordRecentTool } from "@/lib/tool-personalization";
import ToolFavoriteButton from "@/components/ToolFavoriteButton";

type Props = { tool: MicroToolDef };

function formatNumber(n: number) {
  if (!Number.isFinite(n)) return "—";
  if (Math.abs(n) > 1e12 || (Math.abs(n) < 1e-6 && n !== 0)) return n.toExponential(6);
  return n.toLocaleString(undefined, { maximumFractionDigits: 8 });
}

export default function MicroToolView({ tool }: Props) {
  useEffect(() => {
    recordRecentTool(tool.category, tool.slug);
  }, [tool.category, tool.slug]);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      <header className="mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-medium text-orange-700 bg-orange-50 border border-orange-100 rounded-full px-3 py-1 mb-3">
            <Shield className="w-3.5 h-3.5" aria-hidden />
            Runs in your browser · No upload
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">{tool.name}</h1>
          <p className="mt-3 text-gray-600 leading-relaxed max-w-2xl">{tool.description}</p>
        </div>
        <ToolFavoriteButton category={tool.category} slug={tool.slug} name={tool.name} />
      </header>

      {tool.kind === "unit-convert" && tool.unitConvert && <UnitConvertPanel config={tool.unitConvert} />}
      {tool.kind === "text-transform" && tool.textTransform && (
        <TextTransformPanel transformId={tool.textTransform.transformId} />
      )}
      {tool.kind === "math-formula" && tool.mathFormula && <MathFormulaPanel config={tool.mathFormula} />}
      {tool.kind === "number-base" && tool.numberBase && <NumberBasePanel config={tool.numberBase} />}
      {tool.kind === "color-convert" && tool.colorConvert && <ColorConvertPanel mode={tool.colorConvert.mode} />}
    </div>
  );
}

function UnitConvertPanel({ config }: { config: NonNullable<MicroToolDef["unitConvert"]> }) {
  const [value, setValue] = useState("1");
  const output = useMemo(() => {
    const n = parseFloat(value);
    if (!Number.isFinite(n)) return "";
    const fn = config.convert ?? ((v: number) => v * config.factor);
    return formatNumber(fn(n));
  }, [value, config]);

  return (
    <Panel>
      <label className="text-sm font-semibold text-gray-900 block mb-2">{config.fromLabel}</label>
      <input
        type="number"
        inputMode="decimal"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full rounded-xl border px-4 py-3 text-lg font-mono focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500"
        style={{ borderColor: "var(--color-border)" }}
      />
      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">{config.toLabel}</p>
        <CopyBlock text={output} />
      </div>
    </Panel>
  );
}

function TextTransformPanel({ transformId }: { transformId: string }) {
  const [input, setInput] = useState("");
  const fn = TEXT_TRANSFORM_FNS[transformId];
  const output = useMemo(() => (fn ? fn(input) : ""), [input, fn]);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Panel>
        <label className="text-sm font-semibold text-gray-900 block mb-2">Input</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full min-h-[320px] rounded-xl border p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          style={{ borderColor: "var(--color-border)" }}
          spellCheck={false}
        />
      </Panel>
      <Panel>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold text-gray-900">Output</label>
          <CopyButton text={output} />
        </div>
        <pre
          className="w-full min-h-[320px] rounded-xl border p-4 font-mono text-sm bg-slate-50 whitespace-pre-wrap break-words overflow-auto"
          style={{ borderColor: "var(--color-border)" }}
        >
          {output || <span className="text-gray-400 italic">Output appears as you type…</span>}
        </pre>
      </Panel>
    </div>
  );
}

function MathFormulaPanel({ config }: { config: NonNullable<MicroToolDef["mathFormula"]> }) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(config.inputs.map((i) => [i.id, String(i.defaultValue ?? 0)]))
  );

  const result = useMemo(() => {
    const nums: Record<string, number> = {};
    for (const input of config.inputs) {
      const n = parseFloat(values[input.id] ?? "0");
      nums[input.id] = Number.isFinite(n) ? n : 0;
    }
    return config.compute(nums);
  }, [values, config]);

  return (
    <Panel>
      <div className="grid gap-4 sm:grid-cols-2">
        {config.inputs.map((input) => (
          <div key={input.id}>
            <label className="text-sm font-medium text-gray-800 block mb-1">
              {input.label}
              {input.unit ? <span className="text-gray-400 ml-1">({input.unit})</span> : null}
            </label>
            <input
              type="number"
              inputMode="decimal"
              value={values[input.id] ?? ""}
              onChange={(e) => setValues((v) => ({ ...v, [input.id]: e.target.value }))}
              className="w-full rounded-xl border px-3 py-2.5 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              style={{ borderColor: "var(--color-border)" }}
            />
          </div>
        ))}
      </div>
      <div className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-orange-50 border border-indigo-100">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-800/80">{config.resultLabel}</p>
        <p className="mt-2 text-3xl font-bold text-slate-900 font-mono">
          {formatNumber(result)}
          {config.resultUnit ? <span className="text-lg font-semibold text-gray-500 ml-2">{config.resultUnit}</span> : null}
        </p>
      </div>
    </Panel>
  );
}

function NumberBasePanel({ config }: { config: NonNullable<MicroToolDef["numberBase"]> }) {
  const [input, setInput] = useState("");
  const output = useMemo(() => {
    const trimmed = input.trim();
    if (!trimmed) return "";
    try {
      const asInt = parseInt(trimmed.replace(/\s/g, ""), config.fromBase);
      if (!Number.isFinite(asInt)) return "Invalid input";
      return asInt.toString(config.toBase).toUpperCase();
    } catch {
      return "Invalid input";
    }
  }, [input, config]);

  return (
    <Panel>
      <label className="text-sm font-semibold block mb-2">Input (base {config.fromBase})</label>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full rounded-xl border px-4 py-3 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/30"
        style={{ borderColor: "var(--color-border)" }}
        spellCheck={false}
      />
      <div className="mt-6">
        <p className="text-xs font-semibold uppercase text-gray-500 mb-2">Output (base {config.toBase})</p>
        <CopyBlock text={output} />
      </div>
    </Panel>
  );
}

function ColorConvertPanel({ mode }: { mode: NonNullable<MicroToolDef["colorConvert"]>["mode"] }) {
  const [input, setInput] = useState("#FF8FC7");
  const output = useMemo(() => convertColor(mode, input), [mode, input]);

  return (
    <Panel>
      <label className="text-sm font-semibold block mb-2">Input</label>
      <div className="flex gap-3 items-center">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 rounded-xl border px-4 py-3 font-mono focus:outline-none focus:ring-2 focus:ring-violet-500/30"
          style={{ borderColor: "var(--color-border)" }}
        />
        <span
          className="h-12 w-12 rounded-xl border shrink-0"
          style={{ background: previewColor(input, mode), borderColor: "var(--color-border)" }}
          aria-hidden
        />
      </div>
      <div className="mt-6">
        <p className="text-xs font-semibold uppercase text-gray-500 mb-2">Result</p>
        <CopyBlock text={output} />
      </div>
    </Panel>
  );
}

function convertColor(mode: NonNullable<MicroToolDef["colorConvert"]>["mode"], raw: string): string {
  const hex = parseHex(raw);
  if (!hex && mode.startsWith("hex")) return "Invalid hex color";
  if (mode === "hex-rgb" && hex) return `rgb(${hex.r}, ${hex.g}, ${hex.b})`;
  if (mode === "hex-hsl" && hex) {
    const { h, s, l } = rgbToHsl(hex.r, hex.g, hex.b);
    return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  }
  if (mode === "rgb-hex") {
    const m = raw.match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    if (!m) return "Use rgb(r,g,b) format";
    return `#${[m[1], m[2], m[3]].map((x) => clampByte(parseInt(x, 10)).toString(16).padStart(2, "0")).join("")}`;
  }
  if (mode === "hsl-hex") {
    const m = raw.match(/([\d.]+)\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?/);
    if (!m) return "Use hsl(h,s,l) format";
    const rgb = hslToRgb(parseFloat(m[1]), parseFloat(m[2]) / 100, parseFloat(m[3]) / 100);
    return `#${[rgb.r, rgb.g, rgb.b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
  }
  return "";
}

function previewColor(input: string, mode: string) {
  if (mode.startsWith("hex")) return input.startsWith("#") ? input : `#${input}`;
  const out = convertColor(mode === "rgb-hex" ? "rgb-hex" : "hsl-hex", input);
  return out.startsWith("#") ? out : "#cccccc";
}

function parseHex(raw: string) {
  let s = raw.trim();
  if (!s.startsWith("#")) s = `#${s}`;
  if (!/^#[0-9a-fA-F]{6}$/.test(s)) return null;
  return {
    r: parseInt(s.slice(1, 3), 16),
    g: parseInt(s.slice(3, 5), 16),
    b: parseInt(s.slice(5, 7), 16),
  };
}

function clampByte(n: number) {
  return Math.max(0, Math.min(255, Math.round(n)));
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h /= 6;
  }
  return { h: h * 360, s, l };
}

function hslToRgb(h: number, s: number, l: number) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hp = h / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let r1 = 0;
  let g1 = 0;
  let b1 = 0;
  if (hp >= 0 && hp < 1) [r1, g1, b1] = [c, x, 0];
  else if (hp < 2) [r1, g1, b1] = [x, c, 0];
  else if (hp < 3) [r1, g1, b1] = [0, c, x];
  else if (hp < 4) [r1, g1, b1] = [0, x, c];
  else if (hp < 5) [r1, g1, b1] = [x, 0, c];
  else [r1, g1, b1] = [c, 0, x];
  const m = l - c / 2;
  return {
    r: clampByte((r1 + m) * 255),
    g: clampByte((g1 + m) * 255),
    b: clampByte((b1 + m) * 255),
  };
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-white p-5 sm:p-6 shadow-sm" style={{ borderColor: "var(--color-border)" }}>
      {children}
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      type="button"
      onClick={copy}
      disabled={!text}
      className="text-xs inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border bg-white hover:border-orange-400 disabled:opacity-40 cursor-pointer"
      style={{ borderColor: "var(--color-border)" }}
    >
      {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function CopyBlock({ text }: { text: string }) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-xl border bg-slate-50 px-4 py-3" style={{ borderColor: "var(--color-border)" }}>
      <code className="font-mono text-sm break-all text-slate-800">{text || "—"}</code>
      <CopyButton text={text} />
    </div>
  );
}
