"use client";

import { useState } from "react";
import { Shield, ExternalLink, Maximize2, Minimize2, Sparkles, Terminal } from "lucide-react";

const QUICK_RECIPES = [
  { name: "Base64 Encode/Decode", hash: "#recipe=To_Base64('A-Za-z0-9%2B/%3D')&input=SGVsbG8gU3RhcnR1cCE" },
  { name: "Hex Dump", hash: "#recipe=To_Hexdump(16,false,false,false)&input=StartupToolsHub" },
  { name: "URL Decode", hash: "#recipe=URL_Decode()&input=https%3A%2F%2Fstartuptools.hub%3Fquery%3Dsuccess" },
  { name: "JSON Beautify", hash: "#recipe=JSON_Beautify('%20%20%20%20',false,true)&input=%7B%22status%22:%22ok%22,%22code%22:200%7D" },
  { name: "Extract URLs", hash: "#recipe=Extract_URLs(false,false,false)" },
  { name: "SHA256 & SHA512", hash: "#recipe=SHA2('256',64,160)&input=founder_secret" },
];

export default function CyberChefPage() {
  const [currentHash, setCurrentHash] = useState<string>("");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const chefBaseUrl = "https://gchq.github.io/CyberChef/";
  const iframeSrc = currentHash ? `${chefBaseUrl}${currentHash}` : chefBaseUrl;

  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all ${isFullscreen ? "fixed inset-0 z-50 bg-white p-4" : "max-w-7xl"}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              CyberChef — The Cyber Swiss Army Knife
            </h1>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
              Apache 2.0
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-600">
            Over 300 client-side operations: encryption, encoding, decompression, hashing, forensics, and data analysis.
          </p>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </button>

          <a
            href={iframeSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-900 text-white text-xs font-medium hover:bg-gray-800 transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Open Standalone
          </a>
        </div>
      </div>

      {/* Quick Recipes Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
        <span className="text-xs font-semibold text-gray-500 whitespace-nowrap flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Quick Recipes:
        </span>
        {QUICK_RECIPES.map((r) => (
          <button
            key={r.name}
            onClick={() => setCurrentHash(r.hash)}
            className="text-xs whitespace-nowrap px-2.5 py-1 rounded-md border border-gray-200 bg-white hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-900 transition text-gray-700"
          >
            {r.name}
          </button>
        ))}
      </div>

      {/* Privacy guarantee bar */}
      <div className="mb-4 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/60 flex items-center gap-2 text-xs text-emerald-800">
        <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>100% Client-Side: CyberChef runs entirely in your browser sandbox. None of your input data or keys leave your device.</span>
      </div>

      {/* Iframe Container */}
      <div className={`rounded-2xl border border-gray-200 overflow-hidden shadow-sm bg-gray-900 ${isFullscreen ? "h-[calc(100vh-140px)]" : "h-[750px]"}`}>
        <iframe
          key={iframeSrc}
          src={iframeSrc}
          title="CyberChef Workspace"
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin allow-forms allow-downloads"
        />
      </div>
    </div>
  );
}
