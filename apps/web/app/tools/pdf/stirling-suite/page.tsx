"use client";

import { useState, useEffect } from "react";
import {
  Server,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  ExternalLink,
  RefreshCw,
  FileSearch,
  FileCheck,
  ShieldAlert,
  Wrench,
  ScanLine,
} from "lucide-react";
import { type StirlingStatus, getStirlingPdfUrl } from "@/lib/stirling";

const CAPABILITIES = [
  {
    icon: ScanLine,
    title: "OCR (Optical Character Recognition)",
    desc: "Extract text from scanned PDFs and images using Tesseract multilingual OCR engine.",
    endpoint: "/pipeline",
  },
  {
    icon: FileCheck,
    title: "PDF/A Archival Conversion",
    desc: "Convert standard documents into ISO-standardized PDF/A-1b, PDF/A-2b, or PDF/A-3b for legal archiving.",
    endpoint: "/pdf-to-pdfa",
  },
  {
    icon: Wrench,
    title: "Repair Corrupted PDFs",
    desc: "Fix damaged, broken or unreadable PDF files using Ghostscript and PDFBox repair pipelines.",
    endpoint: "/repair",
  },
  {
    icon: ShieldAlert,
    title: "Sanitize & Auto-Redact",
    desc: "Deep clean metadata, embedded javascript, hidden layers, and black-out regex patterns.",
    endpoint: "/sanitize-pdf",
  },
  {
    icon: FileSearch,
    title: "Auto-Split by Barcodes",
    desc: "Automatically split multi-invoice batches when QR codes or barcodes are encountered.",
    endpoint: "/split-by-barcode",
  },
];

export default function StirlingSuitePage() {
  const [status, setStatus] = useState<StirlingStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [serviceUrl, setServiceUrl] = useState<string>("http://localhost:8080");

  const dockerCommand = "docker compose -f docker-compose.stirling.yml up -d";

  const checkStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/pdf/stirling");
      if (res.ok) {
        const data = await res.json();
        setStatus(data);
        if (data.url) setServiceUrl(data.url);
      } else {
        setStatus({ available: false, url: serviceUrl, error: "HTTP check failed" });
      }
    } catch (err) {
      setStatus({ available: false, url: serviceUrl, error: String(err) });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const copyDockerCmd = () => {
    navigator.clipboard.writeText(dockerCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Stirling-PDF Companion Suite</h1>
        <p className="mt-3 text-gray-600">
          Heavy server-side PDF operations (OCR, PDF/A conversion, document repair, batch barcode splitting) powered by self-hosted Docker.
        </p>
      </div>

      {/* Connection Status Card */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm border-gray-200 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-xl ${
                status?.available ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
              }`}
            >
              <Server className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">Docker Service Status:</span>
                {loading ? (
                  <span className="text-xs text-gray-400">Checking connection...</span>
                ) : status?.available ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Online ({serviceUrl})
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Offline / Standby
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Target URL: <code className="font-mono text-gray-700">{serviceUrl}</code> (Configurable via{" "}
                <code>STIRLING_PDF_URL</code>)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={checkStatus}
              disabled={loading}
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              Recheck
            </button>
            {status?.available && (
              <a
                href={serviceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700 flex items-center gap-1.5 transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Open Stirling Console
              </a>
            )}
          </div>
        </div>

        {/* Quick Launch Instruction if Offline */}
        {!status?.available && !loading && (
          <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
              Start Local Container with 1 Command:
            </p>
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-900 text-white font-mono text-xs sm:text-sm">
              <code>{dockerCommand}</code>
              <button
                onClick={copyDockerCmd}
                className="text-xs text-gray-400 hover:text-white flex items-center gap-1 ml-3"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                Copy
              </button>
            </div>
            <p className="text-[11px] text-gray-500 mt-2">
              Runs Stirling-PDF isolated locally on port 8080 with zero telemetry.
            </p>
          </div>
        )}
      </div>

      {/* Available Heavy Operations */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Enterprise PDF Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CAPABILITIES.map((cap) => {
            const IconComponent = cap.icon;
            return (
              <div
                key={cap.title}
                className="p-5 rounded-2xl border border-gray-200 bg-white shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="p-2.5 w-fit rounded-xl bg-gray-50 border border-gray-100 text-emerald-600 mb-3">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">{cap.title}</h3>
                  <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{cap.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-gray-400">Endpoint: {cap.endpoint}</span>
                  {status?.available ? (
                    <a
                      href={`${serviceUrl}${cap.endpoint}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                    >
                      Run <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-[11px] text-gray-400">Requires Docker</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
