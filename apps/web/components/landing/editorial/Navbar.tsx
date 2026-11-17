"use client";

import Link from "next/link";
import { useState } from "react";
import { SITE_NAME, SOCIAL } from "@/lib/site-config";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NAV = [
  { href: "/tools", label: "Tools" },
  { href: "/tools/finance", label: "Finance" },
  { href: "/tools/pdf", label: "PDF" },
  { href: "/blog", label: "Blog" },
];

export default function EditorialNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#18191b] text-[#eff0f1]">
      <div className="mx-auto flex h-16 w-full items-center justify-between gap-4 px-8">
        <Link
          href="/"
          className="text-[15px] font-medium tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#ff4a1f]"
        >
          {SITE_NAME}
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-[15px]" aria-label="Primary">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-[#ff4a1f]">
              {item.label}
            </Link>
          ))}
          {SOCIAL.github ? (
            <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#ff4a1f]">
              GitHub
            </a>
          ) : null}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/tools"
            className="hidden sm:inline-flex h-10 items-center px-4 text-[15px] font-medium hover:bg-[#ff643f]"
            style={{ background: "#ff4a1f", color: "#18191b" }}
          >
            Open tools
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="lg:hidden inline-flex h-10 items-center bg-[#222427] px-3 text-[15px] text-[#eff0f1]">
              Menu
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#18191b] text-[#eff0f1] border-0">
              <p className="pt-2 text-[15px]">{SITE_NAME}</p>
              <nav className="mt-6 flex flex-col gap-4 text-[17px]" aria-label="Mobile">
                {NAV.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                    {item.label}
                  </Link>
                ))}
                {SOCIAL.github ? (
                  <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                ) : null}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
