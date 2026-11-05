import { cn } from "@/lib/utils";

export default function GradientRings({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div className="absolute top-[8%] right-[-8%] h-[min(90vw,640px)] w-[min(90vw,640px)] rounded-full bg-[radial-gradient(circle,#F6ED75_0%,transparent_62%)] blur-3xl opacity-80 motion-safe:animate-pulse" style={{ animationDuration: "12s" }} />
      <div className="absolute top-[18%] right-[8%] h-[min(70vw,520px)] w-[min(70vw,520px)] rounded-full bg-[radial-gradient(circle,#D8FF42_0%,transparent_65%)] blur-2xl opacity-70" />
      <div className="absolute top-[32%] right-[22%] h-[min(55vw,420px)] w-[min(55vw,420px)] rounded-full bg-[radial-gradient(circle,#F2A4C1_0%,transparent_68%)] blur-3xl opacity-60" />
      <div className="absolute top-[12%] right-[35%] h-[min(45vw,360px)] w-[min(45vw,360px)] rounded-full bg-[radial-gradient(circle,#FFD6A5_0%,transparent_70%)] blur-2xl opacity-50" />
      <div className="absolute inset-[20%] rounded-full border border-[#D7D5DA]/30" />
      <div className="absolute inset-[28%] rounded-full border border-[#D7D5DA]/20" />
      <div className="absolute inset-[36%] rounded-full border border-[#D7D5DA]/15" />
    </div>
  );
}
