import Link from "next/link";
import { SITE_NAME, SITE_TAGLINE, SOCIAL } from "@/lib/site-config";
import { EditorialContainer } from "./shared";
import { Github } from "lucide-react";

export default function EditorialFooter() {
  return (
    <footer className="border-t border-[#D7D5DA] bg-[#E8E7EB] mt-0">
      <EditorialContainer className="py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#111111] text-[#D8FF42] text-xs font-bold">
                ST
              </span>
              <span className="font-medium text-[#111111]">{SITE_NAME}</span>
            </Link>
            <p className="mt-3 text-[13px] text-[#57565B] max-w-xs">{SITE_TAGLINE}</p>
            <p className="mt-3 text-[12px] text-[#89878E] leading-relaxed max-w-sm">
              Free browser tools for founders — finance, documents, code, and creative utilities in one hub.
            </p>
            {SOCIAL.github ? (
              <a
                href={SOCIAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-[12px] text-[#57565B] hover:text-[#111111]"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
            ) : null}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-[12px]">
            <div>
              <p className="font-semibold text-[#111111] mb-3">Explore</p>
              <ul className="space-y-2 text-[#57565B]">
                <li><Link href="/tools/" className="hover:text-[#111111]">All Tools</Link></li>
                <li><Link href="/tools/finance/" className="hover:text-[#111111]">Startup Finance</Link></li>
                <li><Link href="/tools/pdf/" className="hover:text-[#111111]">PDF Tools</Link></li>
                <li><Link href="/tools/image/" className="hover:text-[#111111]">Image Tools</Link></li>
                <li><Link href="/tools/dev/" className="hover:text-[#111111]">Developer Tools</Link></li>
                <li><Link href="/tools/ai/" className="hover:text-[#111111]">AI Tools</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-[#111111] mb-3">Resources</p>
              <ul className="space-y-2 text-[#57565B]">
                <li><Link href="/blog/" className="hover:text-[#111111]">Blog</Link></li>
                <li><Link href="/authors/" className="hover:text-[#111111]">Authors</Link></li>
                <li><Link href="/about/" className="hover:text-[#111111]">About</Link></li>
                <li><Link href="/methodology/" className="hover:text-[#111111]">Methodology</Link></li>
                <li><Link href="/contact/" className="hover:text-[#111111]">Contact</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-[#111111] mb-3">Legal</p>
              <ul className="space-y-2 text-[#57565B]">
                <li><Link href="/privacy/" className="hover:text-[#111111]">Privacy Policy</Link></li>
                <li><Link href="/terms/" className="hover:text-[#111111]">Terms</Link></li>
                <li><Link href="/disclosure/" className="hover:text-[#111111]">Disclosure</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#D7D5DA] flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-[11px] text-[#89878E]">
          <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy/" className="hover:text-[#111111]">Privacy</Link>
            <Link href="/terms/" className="hover:text-[#111111]">Terms</Link>
            <Link href="/disclosure/" className="hover:text-[#111111]">Disclosure</Link>
          </div>
        </div>
      </EditorialContainer>
    </footer>
  );
}
