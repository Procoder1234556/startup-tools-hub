"use client";

import Link from "next/link";
import { useState } from "react";
import { Github, Menu } from "lucide-react";
import { SITE_NAME, SOCIAL } from "@/lib/site-config";
import { EditorialButton, EditorialContainer } from "./shared";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NAV = [
  { href: "/tools", label: "Tools" },
  { href: "/tools/finance", label: "Startup Finance" },
  { href: "/tools/pdf", label: "PDF" },
  { href: "/tools/dev", label: "Developer" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

function LogoMark() {
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#111111] text-[#D8FF42]">
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
        <path fill="currentColor" d="M4 8h6v8H4V8zm10 0h6v5h-6V8zm0 7h6v5h-6v-5z" />
      </svg>
    </span>
  );
}

export default function EditorialNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#E8E7EB]/80 backdrop-blur-md border-b border-[#D7D5DA]/80">
      <EditorialContainer className="flex h-14 sm:h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded-md">
          <LogoMark />
          <span className="text-sm sm:text-[15px] font-medium tracking-tight text-[#111111]">{SITE_NAME}</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[13px] text-[#57565B]" aria-label="Primary">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-[#111111] transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {SOCIAL.github ? (
            <a
              href={SOCIAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D7D5DA] bg-white text-[#57565B] hover:text-[#111111] transition"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          ) : null}
          <EditorialButton href="/tools" className="hidden sm:inline-flex !py-2.5 !px-5 !text-xs">
            Explore tools
          </EditorialButton>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#D7D5DA] bg-white text-[#111111]">
              <Menu className="w-4 h-4" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#E8E7EB]">
              <p className="font-medium text-[#111111] pt-2">{SITE_NAME}</p>
              <nav className="flex flex-col gap-3 mt-6 text-[15px]" aria-label="Mobile">
                {NAV.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="text-[#111111]">
                    {item.label}
                  </Link>
                ))}
              </nav>
              <Link href="/tools" onClick={() => setOpen(false)} className="inline-flex w-full items-center justify-center rounded-full bg-[#111111] px-6 py-3 text-[13px] font-medium text-white">
                Explore tools
              </Link>
            </SheetContent>
          </Sheet>
        </div>
      </EditorialContainer>
    </header>
  );
}
