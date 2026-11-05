"use client";

import { useState } from "react";
import { Copy, Check, Terminal, ShieldAlert, KeyRound, Folder } from "lucide-react";

interface PermGroup {
  read: boolean;
  write: boolean;
  execute: boolean;
}

export default function ChmodCalculatorPage() {
  const [owner, setOwner] = useState<PermGroup>({ read: true, write: true, execute: true });
  const [group, setGroup] = useState<PermGroup>({ read: true, write: false, execute: true });
  const [others, setOthers] = useState<PermGroup>({ read: true, write: false, execute: true });
  const [targetName, setTargetName] = useState<string>("script.sh");
  const [copied, setCopied] = useState<string | null>(null);

  const getGroupOctal = (p: PermGroup): number => {
    return (p.read ? 4 : 0) + (p.write ? 2 : 0) + (p.execute ? 1 : 0);
  };

  const ownerOctal = getGroupOctal(owner);
  const groupOctal = getGroupOctal(group);
  const othersOctal = getGroupOctal(others);
  const octalString = `${ownerOctal}${groupOctal}${othersOctal}`;

  const getGroupSymbolic = (p: PermGroup): string => {
    return `${p.read ? "r" : "-"}${p.write ? "w" : "-"}${p.execute ? "x" : "-"}`;
  };

  const symbolicString = `-${getGroupSymbolic(owner)}${getGroupSymbolic(group)}${getGroupSymbolic(others)}`;
  const chmodCommand = `chmod ${octalString} ${targetName}`;
  const chmodRecursive = `chmod -R ${octalString} ${targetName}`;

  const setFromOctal = (val: string) => {
    if (val.length === 3 && /^[0-7]{3}$/.test(val)) {
      const o = parseInt(val[0]);
      const g = parseInt(val[1]);
      const u = parseInt(val[2]);

      setOwner({ read: (o & 4) !== 0, write: (o & 2) !== 0, execute: (o & 1) !== 0 });
      setGroup({ read: (g & 4) !== 0, write: (g & 2) !== 0, execute: (g & 1) !== 0 });
      setOthers({ read: (u & 4) !== 0, write: (u & 2) !== 0, execute: (u & 1) !== 0 });
    }
  };

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const PRESETS = [
    { label: "755 — Standard Executable / Directory", octal: "755", desc: "Owner full control, group & others can read and execute" },
    { label: "644 — Standard Web File", octal: "644", desc: "Owner can read/write; others can read only (HTML, CSS, JSON)" },
    { label: "600 — SSH Key / Secret .env", octal: "600", desc: "Strictly private: only owner can read and write (id_rsa, secrets)" },
    { label: "700 — Private Directory", octal: "700", desc: "Only owner can read, write, and enter directory (~/.ssh)" },
    { label: "400 — Read-only Key", octal: "400", desc: "Owner read-only (AWS .pem files, prevents accidental overwrite)" },
    { label: "777 — Full Public Access", octal: "777", desc: "Warning: Anyone can read, write, and execute" },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Linux Permissions (chmod) Calculator</h1>
        <p className="mt-3 text-gray-600">
          Calculate Unix octal numbers, symbolic notation (rwxr-xr-x), and shell commands interactively.
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-6 sm:p-8 shadow-sm border-gray-200">
        {/* Output banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-2xl bg-gray-900 text-white">
          <div className="flex flex-col justify-center">
            <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">Octal Notation</span>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-4xl font-mono font-bold tracking-widest">{octalString}</span>
              <button
                onClick={() => copyText(octalString, "octal")}
                className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs transition"
              >
                {copied === "octal" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-800 md:pl-6 pt-3 md:pt-0">
            <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Symbolic Notation</span>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-2xl sm:text-3xl font-mono text-emerald-300">{symbolicString}</span>
              <button
                onClick={() => copyText(symbolicString, "symbolic")}
                className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs transition"
              >
                {copied === "symbolic" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Permissions Matrix */}
        <div className="mt-8">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Permission Matrix</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Owner */}
            <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-gray-200">
                <span className="font-semibold text-gray-900 text-sm">Owner (User)</span>
                <span className="font-mono text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  {ownerOctal}
                </span>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={owner.read}
                    onChange={(e) => setOwner({ ...owner, read: e.target.checked })}
                    className="rounded accent-emerald-600"
                  />
                  <span>Read (r = 4)</span>
                </label>
                <label className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={owner.write}
                    onChange={(e) => setOwner({ ...owner, write: e.target.checked })}
                    className="rounded accent-emerald-600"
                  />
                  <span>Write (w = 2)</span>
                </label>
                <label className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={owner.execute}
                    onChange={(e) => setOwner({ ...owner, execute: e.target.checked })}
                    className="rounded accent-emerald-600"
                  />
                  <span>Execute (x = 1)</span>
                </label>
              </div>
            </div>

            {/* Group */}
            <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-gray-200">
                <span className="font-semibold text-gray-900 text-sm">Group</span>
                <span className="font-mono text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  {groupOctal}
                </span>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={group.read}
                    onChange={(e) => setGroup({ ...group, read: e.target.checked })}
                    className="rounded accent-emerald-600"
                  />
                  <span>Read (r = 4)</span>
                </label>
                <label className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={group.write}
                    onChange={(e) => setGroup({ ...group, write: e.target.checked })}
                    className="rounded accent-emerald-600"
                  />
                  <span>Write (w = 2)</span>
                </label>
                <label className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={group.execute}
                    onChange={(e) => setGroup({ ...group, execute: e.target.checked })}
                    className="rounded accent-emerald-600"
                  />
                  <span>Execute (x = 1)</span>
                </label>
              </div>
            </div>

            {/* Others */}
            <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-gray-200">
                <span className="font-semibold text-gray-900 text-sm">Others (Public)</span>
                <span className="font-mono text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  {othersOctal}
                </span>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={others.read}
                    onChange={(e) => setOthers({ ...others, read: e.target.checked })}
                    className="rounded accent-emerald-600"
                  />
                  <span>Read (r = 4)</span>
                </label>
                <label className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={others.write}
                    onChange={(e) => setOthers({ ...others, write: e.target.checked })}
                    className="rounded accent-emerald-600"
                  />
                  <span>Write (w = 2)</span>
                </label>
                <label className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={others.execute}
                    onChange={(e) => setOthers({ ...others, execute: e.target.checked })}
                    className="rounded accent-emerald-600"
                  />
                  <span>Execute (x = 1)</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Command generator */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-emerald-600" />
              Shell Command
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Target file:</span>
              <input
                type="text"
                value={targetName}
                onChange={(e) => setTargetName(e.target.value)}
                className="rounded-lg border border-gray-300 px-2 py-1 text-xs font-mono focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200 font-mono text-sm">
              <code>{chmodCommand}</code>
              <button
                onClick={() => copyText(chmodCommand, "cmd")}
                className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1 px-2 py-1 rounded bg-white border border-gray-200"
              >
                {copied === "cmd" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                Copy
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200 font-mono text-sm">
              <code>{chmodRecursive}</code>
              <button
                onClick={() => copyText(chmodRecursive, "cmd-rec")}
                className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1 px-2 py-1 rounded bg-white border border-gray-200"
              >
                {copied === "cmd-rec" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                Copy
              </button>
            </div>
          </div>
        </div>

        {/* Security Warning for 777 */}
        {octalString === "777" && (
          <div className="mt-6 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <p className="text-xs text-rose-800">
              <strong>Caution (Security Risk):</strong> <code>777</code> grants unrestricted read, write, and execute permissions to anyone on the machine. Never use 777 in production servers, cloud instances, or web roots.
            </p>
          </div>
        )}

        {/* Common Presets */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-sm font-semibold text-gray-900 mb-3">Quick Presets</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {PRESETS.map((p) => (
              <button
                key={p.octal}
                onClick={() => setFromOctal(p.octal)}
                className={`text-left p-3 rounded-xl border transition ${
                  octalString === p.octal
                    ? "border-emerald-600 bg-emerald-50/50"
                    : "border-gray-200 hover:border-gray-300 bg-gray-50/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-900">{p.label}</span>
                </div>
                <p className="text-[11px] text-gray-500 mt-1">{p.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
