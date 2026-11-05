import Link from "next/link";
import { Megaphone } from "lucide-react";
import { EditorialContainer } from "./shared";

export default function AnnouncementBar({ toolCount }: { toolCount: number }) {
  return (
    <div className="bg-[#D8FF42] text-[#111111] border-b border-[#c8ef3a]">
      <EditorialContainer className="flex h-9 sm:h-10 items-center justify-between gap-3 text-[11px] sm:text-xs">
        <p className="flex items-center gap-2 min-w-0 truncate">
          <Megaphone className="w-3.5 h-3.5 shrink-0" aria-hidden />
          <span className="truncate">Building something great? Start with the right tools. Explore {toolCount}+ free utilities.</span>
        </p>
        <Link
          href="/tools"
          className="shrink-0 rounded-full bg-[#111111] px-3 py-1 text-[10px] sm:text-[11px] font-medium text-white hover:bg-[#111111]/90 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 focus-visible:ring-offset-[#D8FF42]"
        >
          Explore tools →
        </Link>
      </EditorialContainer>
    </div>
  );
}
