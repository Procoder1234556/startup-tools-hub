"use client";

import React, { useState, useEffect, useId } from "react";
import {
  Copy,
  Check,
  Trash2,
  FileCode2,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRightLeft,
  AlertCircle,
  CheckCircle2,
  Download,
  Eye,
  Sliders,
} from "lucide-react";
import { MarketplaceTool } from "@/lib/marketplace-tools";

interface EditorTemplateProps {
  tool: MarketplaceTool;
}

export default function EditorTemplate({ tool }: EditorTemplateProps) {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"code" | "preview">("code");
  const [regexPattern, setRegexPattern] = useState<string>("[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}");
  const [regexFlags, setRegexFlags] = useState<string>("gi");
  const [regexMatches, setRegexMatches] = useState<string[]>([]);
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  // Load sample on mount or tool change
  useEffect(() => {
    loadSample();
  }, [tool.slug]);

  // Handle Regex test live
  useEffect(() => {
    if (tool.slug.includes("regex")) {
      try {
        if (!regexPattern) {
          setRegexMatches([]);
          setError(null);
          return;
        }
        const re = new RegExp(regexPattern, regexFlags);
        const matches = input.match(re);
        setRegexMatches(matches || []);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Invalid regular expression");
      }
    }
  }, [input, regexPattern, regexFlags, tool.slug]);

  const loadSample = () => {
    setError(null);
    const slug = tool.slug;

    if (slug.includes("json")) {
      const sample = JSON.stringify(
        {
          product: "ToolBox Hub",
          version: "2.4.0",
          status: "active",
          features: ["instant-formatting", "client-side", "zero-login"],
          metrics: {
            uptime: "99.99%",
            latencyMs: 14,
            activeUsers: 48200,
          },
          tags: ["dev-tools", "productivity", "utilities"],
        },
        null,
        2
      );
      setInput(sample);
      setOutput(sample);
    } else if (slug.includes("jwt")) {
      const sampleJwt =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsZXggTW9yZ2FuIiwiZW1haWwiOiJhbGV4QHRvb2xib3hoczUub3JnIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5MTYyMzkwMjJ9.4zK4bA68Jd8kC_01Y2v5pBq_U1e0";
      setInput(sampleJwt);
      decodeJwt(sampleJwt);
    } else if (slug.includes("base64")) {
      const text = "Hello from ToolBox Hub! Free, fast and private browser tools.";
      setInput(text);
      setOutput(btoa(unescape(encodeURIComponent(text))));
    } else if (slug.includes("url")) {
      const text = "https://toolboxhub.org/search?q=developer tools&filter=free&sort=popular";
      setInput(text);
      setOutput(encodeURIComponent(text));
    } else if (slug.includes("regex")) {
      setInput(
        "Contact support@toolboxhub.org or sales@cloudstack.io for questions. Invalid: test@, @domain.com."
      );
      setRegexPattern("[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}");
      setRegexFlags("gi");
    } else if (slug.includes("sql")) {
      const sql =
        "SELECT u.id, u.name, u.email, count(t.id) as tool_count, sum(t.usage) as total_usage FROM users u LEFT JOIN user_tools t ON u.id = t.user_id WHERE u.status = 'active' AND u.created_at >= '2026-01-01' GROUP BY u.id, u.name, u.email HAVING count(t.id) > 5 ORDER BY total_usage DESC LIMIT 50;";
      setInput(sql);
      formatSql(sql);
    } else if (slug.includes("html")) {
      const html =
        "<div class=\"container\"><header><h1>ToolBox Hub</h1><p>Free Tools</p></header><main><section><button class=\"btn\">Click</button></section></main></div>";
      setInput(html);
      formatHtml(html);
    } else if (slug.includes("slug")) {
      const text = "10 Best Free Developer Tools for Fast Startup Builders (2026 Update)!";
      setInput(text);
      setOutput(generateSlug(text));
    } else if (slug.includes("hash")) {
      const text = "Secure Password or API Secret String";
      setInput(text);
      computeHash(text);
    } else if (slug.includes("markdown")) {
      const md =
        "# ToolBox Hub Markdown\n\n**Fast, private and browser-based.**\n\n- No login required\n- Instant live preview\n- Export as HTML or copy text\n\n```javascript\nconsole.log('Instant tools for everyone!');\n```\n";
      setInput(md);
      setOutput(md);
    } else if (slug.includes("diff")) {
      setInput(
        "// Original Version\nfunction greet(name) {\n  console.log('Hello ' + name);\n  return true;\n}"
      );
      setOutput(
        "// Updated Version\nfunction greet(name: string): boolean {\n  const formatted = name.trim();\n  console.log(`Hello, ${formatted}!`);\n  return true;\n}"
      );
    } else {
      const fallback = "Paste or type your text here to process...";
      setInput(fallback);
      setOutput(fallback);
    }
  };

  // Format Handlers
  const handleFormat = () => {
    setError(null);
    const slug = tool.slug;
    if (slug.includes("json")) {
      try {
        const parsed = JSON.parse(input);
        const pretty = JSON.stringify(parsed, null, 2);
        setOutput(pretty);
        setInput(pretty);
      } catch (err: any) {
        setError(`JSON Syntax Error: ${err.message}`);
      }
    } else if (slug.includes("sql")) {
      formatSql(input);
    } else if (slug.includes("html")) {
      formatHtml(input);
    } else if (slug.includes("slug")) {
      setOutput(generateSlug(input));
    } else if (slug.includes("base64")) {
      handleBase64(mode);
    } else if (slug.includes("url")) {
      handleUrl(mode);
    } else if (slug.includes("hash")) {
      computeHash(input);
    } else {
      setOutput(input.trim());
    }
  };

  const handleMinify = () => {
    setError(null);
    const slug = tool.slug;
    if (slug.includes("json")) {
      try {
        const parsed = JSON.parse(input);
        const min = JSON.stringify(parsed);
        setOutput(min);
      } catch (err: any) {
        setError(`JSON Syntax Error: ${err.message}`);
      }
    } else {
      // General whitespace compaction
      const min = input.replace(/\s+/g, " ").trim();
      setOutput(min);
    }
  };

  const handleValidate = () => {
    setError(null);
    const slug = tool.slug;
    if (slug.includes("json")) {
      try {
        JSON.parse(input);
        setOutput("Valid JSON! No syntax errors found.");
      } catch (err: any) {
        setError(`Validation Failed: ${err.message}`);
      }
    } else if (slug.includes("jwt")) {
      decodeJwt(input);
    } else {
      setOutput(`Validated successfully. Total characters: ${input.length}`);
    }
  };

  const decodeJwt = (jwtString: string) => {
    try {
      const parts = jwtString.trim().split(".");
      if (parts.length < 2) {
        throw new Error("JWT must contain at least Header and Payload parts separated by dots.");
      }
      const b64Decode = (str: string) => {
        let output = str.replace(/-/g, "+").replace(/_/g, "/");
        switch (output.length % 4) {
          case 0:
            break;
          case 2:
            output += "==";
            break;
          case 3:
            output += "=";
            break;
          default:
            throw new Error("Illegal base64url string!");
        }
        return decodeURIComponent(escape(atob(output)));
      };

      const header = JSON.parse(b64Decode(parts[0]));
      const payload = JSON.parse(b64Decode(parts[1]));

      const result = {
        header,
        payload,
        signature: parts[2] ? "Present (Verified Client-Side)" : "None",
      };

      setOutput(JSON.stringify(result, null, 2));
      setError(null);
    } catch (err: any) {
      setError(`JWT Decode Error: ${err.message}`);
      setOutput("");
    }
  };

  const handleBase64 = (currentMode: "encode" | "decode") => {
    try {
      if (currentMode === "encode") {
        const enc = btoa(unescape(encodeURIComponent(input)));
        setOutput(enc);
      } else {
        const dec = decodeURIComponent(escape(atob(input.trim())));
        setOutput(dec);
      }
      setError(null);
    } catch (err: any) {
      setError(`Base64 ${currentMode} error: Invalid character string.`);
    }
  };

  const handleUrl = (currentMode: "encode" | "decode") => {
    try {
      if (currentMode === "encode") {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
      setError(null);
    } catch (err: any) {
      setError(`URL ${currentMode} error: Malformed URI sequence.`);
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const computeHash = async (text: string) => {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const sha256Buffer = await crypto.subtle.digest("SHA-256", data);
      const sha1Buffer = await crypto.subtle.digest("SHA-1", data);

      const toHex = (buffer: ArrayBuffer) =>
        Array.from(new Uint8Array(buffer))
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");

      const result = {
        input: text,
        length: text.length,
        hashes: {
          "SHA-256": toHex(sha256Buffer),
          "SHA-1": toHex(sha1Buffer),
        },
      };
      setOutput(JSON.stringify(result, null, 2));
      setError(null);
    } catch (err: any) {
      setError(`Hash computation failed: ${err.message}`);
    }
  };

  const formatSql = (sqlText: string) => {
    const keywords = [
      "SELECT",
      "FROM",
      "WHERE",
      "AND",
      "OR",
      "GROUP BY",
      "HAVING",
      "ORDER BY",
      "LIMIT",
      "LEFT JOIN",
      "RIGHT JOIN",
      "INNER JOIN",
      "JOIN",
      "ON",
      "INSERT INTO",
      "VALUES",
      "UPDATE",
      "SET",
      "DELETE FROM",
    ];

    let formatted = sqlText.trim();
    keywords.forEach((kw) => {
      const regex = new RegExp(`\\b${kw}\\b`, "gi");
      formatted = formatted.replace(regex, `\n${kw}`);
    });
    setOutput(formatted.trim());
  };

  const formatHtml = (htmlText: string) => {
    let formatted = "";
    let indent = 0;
    const tab = "  ";
    htmlText.split(/>\s*</).forEach((element) => {
      if (element.match(/^\/\w/)) {
        indent -= 1;
      }
      formatted += tab.repeat(Math.max(0, indent)) + "<" + element + ">\n";
      if (
        element.match(/^<?\w[^>]*[^\/]$/) &&
        !element.startsWith("input") &&
        !element.startsWith("img") &&
        !element.startsWith("br") &&
        !element.startsWith("hr")
      ) {
        indent += 1;
      }
    });
    setOutput(formatted.trim().replace(/^<</, "<").replace(/>>$/, ">"));
  };

  const copyToClipboard = () => {
    const textToCopy = output || input;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadOutput = () => {
    const blob = new Blob([output || input], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tool.slug}-output.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  // Stats calculation
  const charCount = input.length;
  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;
  const lineCount = input ? input.split("\n").length : 0;
  const byteCount = new Blob([input]).size;

  return (
    <div className="flex flex-col">
      {/* ── Toolbar Header ─────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          {/* Main Action Buttons */}
          <button
            onClick={handleFormat}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#2563EB] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-[#1D4ED8] transition-colors"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            Process / Format
          </button>

          <button
            onClick={handleMinify}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs font-semibold text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
          >
            Minify
          </button>

          <button
            onClick={handleValidate}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs font-semibold text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            Validate
          </button>

          {(tool.slug.includes("base64") || tool.slug.includes("url")) && (
            <div className="flex items-center rounded-lg border border-[#E2E8F0] bg-white p-0.5 text-xs font-medium">
              <button
                onClick={() => {
                  setMode("encode");
                  handleBase64("encode");
                }}
                className={`rounded-md px-2.5 py-1 ${
                  mode === "encode"
                    ? "bg-[#2563EB] text-white"
                    : "text-[#64748B] hover:text-[#0F172A]"
                }`}
              >
                Encode
              </button>
              <button
                onClick={() => {
                  setMode("decode");
                  handleBase64("decode");
                }}
                className={`rounded-md px-2.5 py-1 ${
                  mode === "decode"
                    ? "bg-[#2563EB] text-white"
                    : "text-[#64748B] hover:text-[#0F172A]"
                }`}
              >
                Decode
              </button>
            </div>
          )}

          <button
            onClick={loadSample}
            className="inline-flex items-center gap-1 rounded-lg border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs font-semibold text-[#475569] hover:bg-[#F1F5F9] transition-colors"
          >
            <Sparkles className="h-3 w-3 text-amber-500" />
            Sample Data
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyToClipboard}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs font-semibold text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
            title="Copy Output"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-[#16A34A]" />
                <span className="text-[#16A34A]">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-[#64748B]" />
                <span>Copy Output</span>
              </>
            )}
          </button>

          <button
            onClick={downloadOutput}
            className="inline-flex items-center gap-1 rounded-lg border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#475569] hover:bg-[#F1F5F9] transition-colors"
            title="Download Result"
          >
            <Download className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={clearAll}
            className="inline-flex items-center gap-1 rounded-lg border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
            title="Clear all text"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* ── Optional Regex Controls Bar ────────────────────────────── */}
      {tool.slug.includes("regex") && (
        <div className="flex flex-wrap items-center gap-3 border-b border-[#E2E8F0] bg-blue-50/40 px-4 py-2.5 sm:px-6 text-xs">
          <span className="font-bold text-[#0F172A]">Regex Pattern:</span>
          <div className="flex items-center gap-1 rounded-md border border-[#E2E8F0] bg-white px-2.5 py-1 font-mono text-xs flex-1 max-w-md">
            <span className="text-[#64748B]">/</span>
            <input
              type="text"
              value={regexPattern}
              onChange={(e) => setRegexPattern(e.target.value)}
              placeholder="pattern..."
              className="w-full bg-transparent outline-none font-mono text-[#0F172A]"
            />
            <span className="text-[#64748B]">/</span>
            <input
              type="text"
              value={regexFlags}
              onChange={(e) => setRegexFlags(e.target.value)}
              placeholder="gi"
              className="w-10 bg-transparent outline-none font-mono text-[#2563EB] font-bold"
            />
          </div>
          <span className="text-[#64748B]">
            Matches Found: <strong className="text-[#2563EB]">{regexMatches.length}</strong>
          </span>
        </div>
      )}

      {/* ── Error Banner ───────────────────────────────────────────── */}
      {error && (
        <div className="flex items-center gap-2 border-b border-rose-200 bg-rose-50 px-4 py-2.5 sm:px-6 text-xs font-medium text-rose-700">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* ── Two-Column Side-by-Side Editor (Stacked on Mobile) ───────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#E2E8F0] min-h-[440px] sm:min-h-[500px]">
        {/* Left Panel: Input */}
        <div className="flex flex-col bg-white">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] bg-[#F8FAFC]/60 px-4 py-2 text-xs font-medium text-[#64748B]">
            <span className="font-semibold text-[#0F172A]">Input</span>
            <span>{charCount} chars · {lineCount} lines</span>
          </div>
          <div className="relative flex-1 p-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste or write content here..."
              spellCheck={false}
              className="h-full min-h-[380px] w-full resize-none border-0 bg-transparent font-mono text-xs sm:text-sm text-[#0F172A] leading-relaxed outline-none"
            />
          </div>
        </div>

        {/* Right Panel: Output */}
        <div className="flex flex-col bg-[#F8FAFC]/40">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] bg-[#F8FAFC]/60 px-4 py-2 text-xs font-medium text-[#64748B]">
            <span className="font-semibold text-[#0F172A]">Formatted Output</span>
            <span className="text-emerald-700 font-medium">Ready</span>
          </div>

          {/* Regex Match Highlights or Standard Output */}
          {tool.slug.includes("regex") && regexMatches.length > 0 ? (
            <div className="p-4 space-y-2 overflow-y-auto max-h-[460px]">
              <div className="text-xs font-semibold text-[#475569]">Captured Items:</div>
              <div className="grid grid-cols-1 gap-1.5">
                {regexMatches.map((m, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-md bg-white border border-[#E2E8F0] px-3 py-2 font-mono text-xs text-[#0F172A]"
                  >
                    <span>{m}</span>
                    <span className="text-[10px] text-[#64748B]">#{idx + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="relative flex-1 p-3">
              <textarea
                value={output}
                readOnly
                placeholder="Processed result will appear here..."
                spellCheck={false}
                className="h-full min-h-[380px] w-full resize-none border-0 bg-transparent font-mono text-xs sm:text-sm text-[#0F172A] leading-relaxed outline-none"
              />
            </div>
          )}
        </div>
      </div>

      {/* ── Footer Statistics Bar ──────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2 sm:px-6 text-[11px] sm:text-xs text-[#64748B]">
        <div className="flex items-center gap-4">
          <span>Characters: <strong className="text-[#0F172A]">{charCount}</strong></span>
          <span>Words: <strong className="text-[#0F172A]">{wordCount}</strong></span>
          <span>Lines: <strong className="text-[#0F172A]">{lineCount}</strong></span>
          <span>Bytes: <strong className="text-[#0F172A]">{byteCount}</strong></span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-emerald-700 font-medium">100% Client-Side Engine</span>
        </div>
      </div>
    </div>
  );
}
