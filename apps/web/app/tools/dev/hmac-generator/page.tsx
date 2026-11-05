"use client";

import { useState, useEffect, useCallback } from "react";
import { Copy, Check, Key, ShieldCheck, Code, RefreshCw } from "lucide-react";

type Algorithm = "SHA-256" | "SHA-512" | "SHA-384" | "SHA-1";

export default function HmacGeneratorPage() {
  const [algorithm, setAlgorithm] = useState<Algorithm>("SHA-256");
  const [secret, setSecret] = useState<string>("whsec_sample_secret_key_12345");
  const [message, setMessage] = useState<string>(
    JSON.stringify({ event: "payment_intent.succeeded", amount: 4900, currency: "usd" }, null, 2)
  );
  const [hexDigest, setHexDigest] = useState<string>("");
  const [base64Digest, setBase64Digest] = useState<string>("");
  const [copied, setCopied] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateHmac = useCallback(async () => {
    if (!secret) {
      setHexDigest("");
      setBase64Digest("");
      return;
    }
    setError(null);

    try {
      const enc = new TextEncoder();
      const keyData = enc.encode(secret);
      const msgData = enc.encode(message);

      const cryptoKey = await window.crypto.subtle.importKey(
        "raw",
        keyData,
        { name: "HMAC", hash: { name: algorithm } },
        false,
        ["sign"]
      );

      const sigBuffer = await window.crypto.subtle.sign("HMAC", cryptoKey, msgData);
      const hashArray = Array.from(new Uint8Array(sigBuffer));

      // Hex
      const hex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      setHexDigest(hex);

      // Base64
      let binary = "";
      const bytes = new Uint8Array(sigBuffer);
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      setBase64Digest(btoa(binary));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to calculate HMAC.");
    }
  }, [algorithm, secret, message]);

  useEffect(() => {
    calculateHmac();
  }, [calculateHmac]);

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const nodeSnippet = `const crypto = require('crypto');
const signature = crypto
  .createHmac('${algorithm.toLowerCase().replace("-", "")}', '${secret}')
  .update(payload)
  .digest('hex');`;

  const pythonSnippet = `import hmac
import hashlib

signature = hmac.new(
    b'${secret}',
    payload.encode('utf-8'),
    hashlib.${algorithm.toLowerCase().replace("-", "")}
).hexdigest()`;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">HMAC Webhook &amp; API Signature Generator</h1>
        <p className="mt-3 text-gray-600">
          Compute cryptographic HMAC hashes for Stripe, GitHub, Shopify, and Slack webhooks. 100% client-side via Web Crypto API.
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-6 sm:p-8 shadow-sm border-gray-200 space-y-6">
        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Hash Algorithm
            </label>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value as Algorithm)}
              className="w-full rounded-xl border border-gray-300 p-2.5 text-sm focus:border-emerald-500 focus:outline-none"
            >
              <option value="SHA-256">HMAC-SHA256 (Stripe, GitHub, Shopify)</option>
              <option value="SHA-512">HMAC-SHA512 (High Security)</option>
              <option value="SHA-384">HMAC-SHA384</option>
              <option value="SHA-1">HMAC-SHA1 (Legacy AWS / Git)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Secret Key</span>
              <span className="text-[10px] text-emerald-600 font-normal">Never sent to any server</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="Enter secret key or webhook signing secret"
                className="w-full rounded-xl border border-gray-300 p-2.5 pl-9 text-sm font-mono focus:border-emerald-500 focus:outline-none"
              />
              <Key className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>
        </div>

        {/* Payload / Message input */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
            Payload / Message
          </label>
          <textarea
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Paste raw request body or string payload"
            className="w-full rounded-xl border border-gray-300 p-3 text-sm font-mono focus:border-emerald-500 focus:outline-none"
          />
        </div>

        {/* Results */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                Hex Digest (Lowercase)
              </span>
              <button
                onClick={() => copyText(hexDigest, "hex")}
                className="text-xs text-gray-500 hover:text-gray-900 flex items-center gap-1"
              >
                {copied === "hex" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                Copy Hex
              </button>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 font-mono text-xs sm:text-sm text-gray-800 break-all select-all">
              {hexDigest || <span className="text-gray-400">Enter secret key to compute hash</span>}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                Base64 Digest
              </span>
              <button
                onClick={() => copyText(base64Digest, "base64")}
                className="text-xs text-gray-500 hover:text-gray-900 flex items-center gap-1"
              >
                {copied === "base64" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                Copy Base64
              </button>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 font-mono text-xs sm:text-sm text-gray-800 break-all select-all">
              {base64Digest || <span className="text-gray-400">Enter secret key to compute hash</span>}
            </div>
          </div>
        </div>

        {/* Code Snippets */}
        <div className="pt-6 border-t border-gray-100">
          <p className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-1.5">
            <Code className="w-4 h-4 text-emerald-600" />
            Verification Snippets
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-gray-200 bg-gray-900 p-4 text-white">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-800">
                <span className="text-xs font-mono text-emerald-400">Node.js</span>
                <button
                  onClick={() => copyText(nodeSnippet, "code-node")}
                  className="text-xs text-gray-400 hover:text-white"
                >
                  {copied === "code-node" ? "Copied" : "Copy"}
                </button>
              </div>
              <pre className="text-[11px] font-mono overflow-x-auto text-gray-300">
                {nodeSnippet}
              </pre>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-900 p-4 text-white">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-800">
                <span className="text-xs font-mono text-emerald-400">Python</span>
                <button
                  onClick={() => copyText(pythonSnippet, "code-python")}
                  className="text-xs text-gray-400 hover:text-white"
                >
                  {copied === "code-python" ? "Copied" : "Copy"}
                </button>
              </div>
              <pre className="text-[11px] font-mono overflow-x-auto text-gray-300">
                {pythonSnippet}
              </pre>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-sm border border-rose-200">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
