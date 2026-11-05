import Link from "next/link";
import { cn } from "@/lib/utils";

export function EditorialContainer({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-[1200px] px-[18px] sm:px-8 lg:px-12 xl:px-16", className)} {...props} />;
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.18em] text-[#89878E]", className)}>
      {children}
    </p>
  );
}

export function SerifHeading({
  as: Tag = "h2",
  className,
  children,
}: {
  as?: "h1" | "h2" | "h3";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "font-[family-name:var(--font-serif)] font-normal text-[#111111] tracking-tight leading-[1.08]",
        Tag === "h1" && "text-[2.35rem] sm:text-5xl lg:text-[4.25rem]",
        Tag === "h2" && "text-[2rem] sm:text-[2.35rem] lg:text-[2.75rem]",
        Tag === "h3" && "text-2xl lg:text-[1.75rem]",
        className
      )}
    >
      {children}
    </Tag>
  );
}

export function EditorialButton({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[13px] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2",
        variant === "primary" && "bg-[#111111] text-white hover:bg-[#111111]/90",
        variant === "outline" && "border border-[#D7D5DA] bg-white text-[#111111] hover:bg-[#FAFAFA]",
        className
      )}
    >
      {children}
    </Link>
  );
}

export function SectionBlock({
  className,
  children,
  id,
}: {
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-20 lg:py-24 xl:py-[7.5rem]", className)}>
      {children}
    </section>
  );
}
