export function RunwayPreview() {
  return (
    <div className="rounded-lg border border-[#D7D5DA] bg-[#FAFAFA] p-3 text-[10px] font-mono text-[#57565B]">
      <div className="flex justify-between mb-2">
        <span>Cash</span>
        <span className="text-[#111111]">$842,000</span>
      </div>
      <div className="h-16 rounded-md bg-gradient-to-r from-[#D8FF42]/40 to-[#F2A4C1]/30 border border-[#D7D5DA]/60 mb-2 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#111111]/10" style={{ clipPath: "polygon(0 100%, 100% 40%, 100% 100%)" }} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded bg-white border border-[#D7D5DA]/80 p-2">
          <div className="text-[#89878E]">Burn</div>
          <div className="text-[#111111] font-semibold">$68k/mo</div>
        </div>
        <div className="rounded bg-white border border-[#D7D5DA]/80 p-2">
          <div className="text-[#89878E]">Runway</div>
          <div className="text-[#111111] font-semibold">12.4 mo</div>
        </div>
      </div>
    </div>
  );
}

export function SafePreview() {
  return (
    <div className="rounded-lg border border-[#D7D5DA] bg-white p-3 text-[10px]">
      <div className="text-[#89878E] mb-2">SAFE scenario</div>
      <div className="space-y-1.5">
        {[
          ["Cap", "$12M"],
          ["Discount", "20%"],
          ["Ownership", "4.8%"],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between border-b border-[#D7D5DA]/50 pb-1">
            <span className="text-[#57565B]">{k}</span>
            <span className="font-medium text-[#111111]">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CapTablePreview() {
  return (
    <div className="rounded-lg border border-[#D7D5DA] bg-white p-3 text-[10px]">
      <div className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-1.5 text-[#57565B]">
        <span>Founders</span>
        <span className="text-[#111111] font-medium">62%</span>
        <span>Option pool</span>
        <span className="text-[#111111] font-medium">15%</span>
        <span>Investors</span>
        <span className="text-[#111111] font-medium">23%</span>
      </div>
      <div className="mt-2 h-2 rounded-full overflow-hidden flex">
        <div className="bg-[#111111] w-[62%]" />
        <div className="bg-[#D8FF42] w-[15%]" />
        <div className="bg-[#F2A4C1] w-[23%]" />
      </div>
    </div>
  );
}

export function PdfPreview() {
  return (
    <div className="rounded-lg border border-[#D7D5DA] bg-white p-3">
      <div className="rounded-md border border-dashed border-[#D7D5DA] bg-[#FAFAFA] px-3 py-4 text-center text-[10px] text-[#89878E] mb-2">
        Drop PDF files
      </div>
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-14 flex-1 rounded border border-[#D7D5DA] bg-[#F6ED75]/20" />
        ))}
      </div>
    </div>
  );
}

export function ImagePreview() {
  return (
    <div className="rounded-lg border border-[#D7D5DA] bg-[#111111]/5 p-3 relative overflow-hidden">
      <div className="aspect-[4/3] rounded-md bg-gradient-to-br from-[#F2A4C1]/40 to-[#D8FF42]/30 border border-[#D7D5DA]" />
      <div className="absolute bottom-4 left-4 right-4 rounded-md bg-white/90 backdrop-blur border border-[#D7D5DA] px-2 py-1 text-[10px] text-[#57565B]">
        Background removed
      </div>
    </div>
  );
}

export function JsonPreview() {
  return (
    <div className="rounded-lg border border-[#D7D5DA] bg-[#111111] p-3 text-[9px] font-mono text-[#E8FF79] leading-relaxed">
      <div className="text-[#89878E] mb-1">// formatted</div>
      <pre>{`{
  "name": "Startup Tools Hub",
  "tools": 600,
  "signup": false
}`}</pre>
    </div>
  );
}

export function FinanceDashboardMock() {
  return (
    <div className="rounded-2xl border border-[#D7D5DA] bg-white shadow-[0_24px_60px_-40px_rgba(17,17,17,0.25)] overflow-hidden">
      <div className="flex items-center gap-1.5 border-b border-[#D7D5DA] px-4 py-3 bg-[#FAFAFA]">
        <span className="h-2.5 w-2.5 rounded-full bg-[#F2A4C1]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#F6ED75]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#D8FF42]" />
        <span className="ml-2 text-[11px] text-[#89878E]">Finance dashboard</span>
      </div>
      <div className="p-5 sm:p-6 grid sm:grid-cols-2 gap-4 text-[12px]">
        <div className="rounded-xl border border-[#D7D5DA] p-4">
          <p className="text-[#89878E] text-[10px] uppercase tracking-wide">Cash balance</p>
          <p className="text-2xl font-[family-name:var(--font-serif)] text-[#111111] mt-1">$842,000</p>
        </div>
        <div className="rounded-xl border border-[#D7D5DA] p-4">
          <p className="text-[#89878E] text-[10px] uppercase tracking-wide">Monthly burn</p>
          <p className="text-2xl font-[family-name:var(--font-serif)] text-[#111111] mt-1">$68,000</p>
        </div>
        <div className="rounded-xl border border-[#D7D5DA] p-4 sm:col-span-2">
          <p className="text-[#89878E] text-[10px] uppercase tracking-wide mb-3">Estimated runway</p>
          <div className="h-24 rounded-lg bg-gradient-to-r from-[#D8FF42]/50 via-[#F6ED75]/40 to-[#F2A4C1]/40 border border-[#D7D5DA]/60" />
          <div className="mt-3 flex flex-wrap gap-4 text-[#57565B]">
            <span>
              Runway <strong className="text-[#111111]">12.4 mo</strong>
            </span>
            <span>
              SAFE cap <strong className="text-[#111111]">$12M</strong>
            </span>
            <span>
              Founder ownership <strong className="text-[#111111]">62%</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PdfDashboardMock() {
  return (
    <div className="rounded-2xl border border-[#D7D5DA] bg-white shadow-[0_20px_50px_-35px_rgba(17,17,17,0.2)] overflow-hidden">
      <div className="border-b border-[#D7D5DA] px-4 py-3 bg-[#FAFAFA] text-[11px] text-[#89878E]">PDF workspace</div>
      <div className="p-5 space-y-4">
        <div className="rounded-xl border border-dashed border-[#D7D5DA] bg-[#FAFAFA] py-8 text-center text-sm text-[#57565B]">
          Upload PDF, Word, or images
        </div>
        <div className="grid grid-cols-3 gap-2">
          {["Merge", "Split", "Compress"].map((label) => (
            <button key={label} type="button" className="rounded-lg border border-[#D7D5DA] py-2 text-[11px] text-[#57565B] bg-white">
              {label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 flex-1 rounded-md border border-[#D7D5DA] bg-[#F6ED75]/15" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function DevDashboardMock() {
  return (
    <div className="rounded-2xl border border-[#D7D5DA] overflow-hidden shadow-[0_20px_50px_-35px_rgba(17,17,17,0.2)]">
      <div className="flex items-center justify-between border-b border-[#D7D5DA] bg-[#FAFAFA] px-4 py-2 text-[11px]">
        <span className="text-[#89878E]">JSON Formatter</span>
        <span className="rounded-full bg-[#D8FF42]/40 px-2 py-0.5 text-[#111111]">Valid</span>
      </div>
      <div className="grid md:grid-cols-2">
        <div className="bg-[#111111] p-4 text-[10px] font-mono text-[#E8FF79] min-h-[180px]">{`{"ok":true}`}</div>
        <div className="bg-white p-4 text-[10px] font-mono text-[#57565B] min-h-[180px] border-l border-[#D7D5DA]">{`{
  "ok": true
}`}</div>
      </div>
      <div className="flex gap-2 border-t border-[#D7D5DA] bg-white p-3">
        {["Format", "Minify", "Copy"].map((b) => (
          <span key={b} className="rounded-full border border-[#D7D5DA] px-3 py-1 text-[10px] text-[#57565B]">
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}

export function CreativeDashboardMock() {
  return (
    <div className="rounded-2xl border border-[#D7D5DA] bg-white overflow-hidden shadow-[0_20px_50px_-35px_rgba(17,17,17,0.15)]">
      <div className="aspect-[16/10] bg-gradient-to-br from-[#F2A4C1]/30 to-[#D8FF42]/20 border-b border-[#D7D5DA] relative">
        <div className="absolute inset-4 grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-white/80 border border-[#D7D5DA]" />
          <div className="rounded-lg bg-[#111111]/10 border border-[#D7D5DA]" />
        </div>
      </div>
      <div className="p-4 flex flex-wrap gap-2 text-[10px] text-[#57565B]">
        {["Upscale", "Remove BG", "Summarize", "Translate"].map((t) => (
          <span key={t} className="rounded-md border border-[#D7D5DA] px-2 py-1 bg-[#FAFAFA]">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
