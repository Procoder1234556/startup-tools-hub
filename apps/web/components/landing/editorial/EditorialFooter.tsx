import Link from "next/link";

const LINKS = [
  { href: "/tools/", label: "Tools" },
  { href: "/tools/finance/", label: "Finance" },
  { href: "/blog/", label: "Blog" },
  { href: "/about/", label: "About" },
];

export default function EditorialFooter() {
  return (
    <footer className="bg-[#18191b] text-[#b7b9be] font-[family-name:var(--font-hanken)]">
      <div className="grid grid-cols-1 gap-2 px-5 py-6 text-[16px] sm:grid-cols-[1fr_auto_1fr] sm:items-baseline sm:px-8 sm:pb-8 sm:pt-16">
        <p>Free tools for founders</p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 sm:justify-center" aria-label="Footer">
          {LINKS.map((item) => (
            <Link key={item.href} href={item.href} className="text-[#eff0f1] hover:text-[#ff4a1f]">
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="sm:text-right">
          {new Date().getFullYear()}{" "}
          <Link href="/privacy/" className="text-[#eff0f1] hover:text-[#ff4a1f]">
            Privacy
          </Link>
        </p>
      </div>
    </footer>
  );
}
