import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { listCategories } from "@/lib/categories";
import { getToolsByCategory } from "@/lib/tools";
import { CategoryIcon } from "@/components/ToolIcon";
import { Eyebrow, EditorialContainer, SectionBlock, SerifHeading } from "./shared";

export default function CategoryGrid() {
  const categories = listCategories();

  return (
    <SectionBlock className="bg-[#E8E7EB]">
      <EditorialContainer>
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <Eyebrow className="text-center">Explore the ecosystem</Eyebrow>
          <SerifHeading as="h2" className="mt-4 text-center">
            One hub.
            <br />
            Seven ways to get more done.
          </SerifHeading>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const count = getToolsByCategory(cat.id).length;
            const emphasized = cat.id === "finance";
            return (
              <Link
                key={cat.id}
                href={`/tools/${cat.slug}/`}
                className={`group rounded-xl border bg-white p-5 sm:p-6 transition hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-28px_rgba(17,17,17,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] ${
                  emphasized ? "border-[#D8FF42] ring-1 ring-[#D8FF42]/50" : "border-[#D7D5DA]"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-lg ${emphasized ? "bg-[#D8FF42] text-[#111111]" : "bg-[#E8E7EB] text-[#57565B]"}`}
                  >
                    <CategoryIcon category={cat.id} className="w-5 h-5" />
                  </span>
                  <span className="text-[11px] text-[#89878E]">{count} tools</span>
                </div>
                <h3 className="mt-4 font-[family-name:var(--font-serif)] text-xl text-[#111111]">{cat.name}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#57565B] line-clamp-3">{cat.tagline}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-[12px] font-medium text-[#111111]">
                  View category <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            );
          })}
        </div>
      </EditorialContainer>
    </SectionBlock>
  );
}
