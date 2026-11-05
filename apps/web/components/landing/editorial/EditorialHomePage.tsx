import Link from "next/link";
import Image from "next/image";
import {
  Calculator,
  ChartNoAxesCombined,
  FileSpreadsheet,
  FileText,
  Wallet,
  Zap,
  Code2,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react";
import ToolSearchBar from "@/components/ToolSearchBar";
import ToolPersonalizationStrip from "@/components/ToolPersonalizationStrip";
import { listCategories } from "@/lib/categories";
import { UNSPLASH } from "@/lib/landing-editorial";
import GradientRings from "./GradientRings";
import FeaturedToolsGallery from "./FeaturedToolsGallery";
import CategoryGrid from "./CategoryGrid";
import BlogSection from "./BlogSection";
import {
  CreativeDashboardMock,
  DevDashboardMock,
  FinanceDashboardMock,
  PdfDashboardMock,
} from "./ProductPreviews";
import { EditorialButton, EditorialContainer, Eyebrow, SectionBlock, SerifHeading } from "./shared";

type Props = {
  totalTools: number;
  categoryCount: number;
};

export default function EditorialHomePage({ totalTools, categoryCount }: Props) {
  const categories = listCategories();

  return (
    <div className="bg-[#E8E7EB] text-[#111111]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#D7D5DA]/60">
        <GradientRings />
        <EditorialContainer className="relative grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-6 items-center py-16 sm:py-20 lg:py-28 min-h-[520px] lg:min-h-[620px]">
          <div className="max-w-xl">
            <Eyebrow>The toolkit for building startups</Eyebrow>
            <SerifHeading as="h1" className="mt-5">
              Everything you need
              <br />
              to build, launch
              <br />
              and grow.
            </SerifHeading>
            <p className="mt-6 text-[14px] sm:text-[15px] leading-relaxed text-[#57565B] max-w-lg">
              From startup finance and business calculators to PDF, AI, image and developer utilities. {totalTools}+ practical tools to help founders move faster, make smarter decisions and build better businesses.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <EditorialButton href="/tools">Explore all tools →</EditorialButton>
              <EditorialButton href="/tools/finance/" variant="outline">
                Explore finance tools
              </EditorialButton>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[11px] sm:text-xs text-[#57565B]">
              <li>{totalTools}+ free tools</li>
              <li>{categoryCount} tool categories</li>
              <li>No signup required for most tools</li>
            </ul>
            <div className="mt-8 max-w-md [&_input]:rounded-full [&_input]:border-[#D7D5DA] [&_input]:text-sm">
              <ToolSearchBar totalTools={totalTools} />
            </div>
          </div>
          <div className="relative hidden lg:block min-h-[420px]" aria-hidden>
            <GradientRings className="scale-110" />
          </div>
        </EditorialContainer>
      </section>

      <ToolPersonalizationStrip />

      {/* Category strip */}
      <SectionBlock className="py-10 sm:py-12 lg:py-14 border-b border-[#D7D5DA]/60">
        <EditorialContainer>
          <Eyebrow className="text-center mb-6">Tools for every stage of building</Eyebrow>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[12px] sm:text-[13px] text-[#57565B]">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/tools/${cat.slug}/`} className="inline-flex items-center gap-2 hover:text-[#111111] transition">
                <CategoryIconMini id={cat.id} />
                {cat.name.replace(" Tools", "").replace("Startup ", "")}
              </Link>
            ))}
          </div>
        </EditorialContainer>
      </SectionBlock>

      {/* Featured tools */}
      <SectionBlock>
        <EditorialContainer>
          <Eyebrow>Featured utilities</Eyebrow>
          <SerifHeading as="h2" className="mt-3 mb-8 max-w-lg">
            Tools founders reach for first.
          </SerifHeading>
          <FeaturedToolsGallery />
        </EditorialContainer>
      </SectionBlock>

      {/* Platform intro */}
      <SectionBlock className="border-t border-[#D7D5DA]/60">
        <EditorialContainer className="text-center max-w-2xl">
          <Eyebrow className="text-center">One platform. Multiple possibilities.</Eyebrow>
          <SerifHeading as="h2" className="mt-4 text-center">
            Everything a founder needs.
            <br />
            All in one place.
          </SerifHeading>
          <p className="mt-5 text-[14px] text-[#57565B] leading-relaxed">
            Whether you&apos;re validating an idea, managing your startup finances, creating assets, or shipping code, Startup Tools Hub brings practical utilities together in one simple ecosystem.
          </p>
        </EditorialContainer>
      </SectionBlock>

      {/* How it works */}
      <SectionBlock className="pt-0">
        <EditorialContainer>
          <div className="grid md:grid-cols-3 gap-4 lg:gap-5">
            {[
              {
                n: "01",
                title: "Find the right tool",
                body: "Discover tools organized around real startup and productivity needs.",
              },
              {
                n: "02",
                title: "Get things done",
                body: "Use practical browser-based tools without unnecessary account creation.",
              },
              {
                n: "03",
                title: "Move faster",
                body: "Make informed decisions and save time with tools designed for everyday workflows.",
              },
            ].map((card, i) => (
              <div key={card.n} className="rounded-xl border border-[#D7D5DA] bg-white p-6 flex flex-col">
                <Eyebrow>{card.n}</Eyebrow>
                <h3 className="mt-3 font-[family-name:var(--font-serif)] text-2xl text-[#111111]">{card.title}</h3>
                <p className="mt-3 text-[13px] text-[#57565B] leading-relaxed flex-1">{card.body}</p>
                <div className="mt-6 rounded-lg border border-[#D7D5DA] bg-[#FAFAFA] p-3 min-h-[100px] flex items-center justify-center text-[11px] text-[#89878E]">
                  {i === 0 && "Category hub · Search · Filters"}
                  {i === 1 && "Interactive calculator UI"}
                  {i === 2 && "Metrics · Exports · Decisions"}
                </div>
              </div>
            ))}
          </div>
        </EditorialContainer>
      </SectionBlock>

      {/* Finance */}
      <SectionBlock className="bg-[#D8FF42]">
        <EditorialContainer className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <Eyebrow className="text-[#111111]/70">Startup finance</Eyebrow>
            <SerifHeading as="h2" className="mt-4">
              Know your numbers.
              <br />
              Build with confidence.
            </SerifHeading>
            <p className="mt-5 text-[14px] text-[#111111]/80 leading-relaxed max-w-md">
              Make smarter financial decisions with practical tools designed for founders, early-stage startups and growing businesses.
            </p>
            <ul className="mt-8 space-y-5">
              {[
                { icon: Wallet, title: "Startup runway calculator", desc: "Estimate how long your cash will last." },
                { icon: ChartNoAxesCombined, title: "SAFE calculator", desc: "Understand startup fundraising scenarios." },
                { icon: FileSpreadsheet, title: "Cap table tools", desc: "Model ownership and equity distribution." },
                { icon: Calculator, title: "TAM / SAM / SOM", desc: "Estimate and understand your market opportunity." },
              ].map(({ icon: Icon, title, desc }) => (
                <li key={title} className="flex gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#111111] text-[#D8FF42]">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span>
                    <p className="text-[14px] font-medium text-[#111111]">{title}</p>
                    <p className="text-[13px] text-[#111111]/75">{desc}</p>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <EditorialButton href="/tools/finance/">Explore finance tools →</EditorialButton>
            </div>
          </div>
          <FinanceDashboardMock />
        </EditorialContainer>
      </SectionBlock>

      {/* PDF */}
      <SectionBlock>
        <EditorialContainer className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-6 bg-[radial-gradient(circle,#F2A4C1_0%,transparent_55%),radial-gradient(circle_at_80%_20%,#F6ED75_0%,transparent_50%)] blur-2xl opacity-60 -z-10" aria-hidden />
            <PdfDashboardMock />
          </div>
          <div>
            <Eyebrow>PDF and document tools</Eyebrow>
            <SerifHeading as="h2" className="mt-4">
              Work with documents.
              <br />
              Without the busywork.
            </SerifHeading>
            <p className="mt-5 text-[14px] text-[#57565B] leading-relaxed">
              Merge, split, compress, convert and manage documents with a practical collection of browser-based and server-powered PDF utilities.
            </p>
            <ul className="mt-6 space-y-3 text-[13px] text-[#57565B]">
              <li>· Merge and split PDFs</li>
              <li>· Compress and optimize files</li>
              <li>· Convert PDF, Word, PowerPoint and other formats</li>
              <li>· Extract PDF content into Markdown</li>
            </ul>
            <Link href="/tools/pdf/" className="mt-8 inline-flex text-[13px] font-medium underline underline-offset-4">
              Browse PDF tools →
            </Link>
          </div>
        </EditorialContainer>
      </SectionBlock>

      {/* Developer */}
      <SectionBlock className="border-t border-[#D7D5DA]/60">
        <EditorialContainer className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <Eyebrow>Developer utilities</Eyebrow>
            <SerifHeading as="h2" className="mt-4">
              Less repetitive work.
              <br />
              More time to build.
            </SerifHeading>
            <p className="mt-5 text-[14px] text-[#57565B] leading-relaxed">
              Simple utilities for developers who want to format, inspect, convert and transform data without opening another complicated application.
            </p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-2 text-[13px] text-[#57565B]">
              {[
                "JSON formatter and validator",
                "JWT decoder and Base64 utilities",
                "Regex tester",
                "Hash generators and UUID",
                "Timestamp converters",
                "SQL formatter and YAML/JSON conversion",
              ].map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
          </div>
          <div className="order-1 lg:order-2">
            <DevDashboardMock />
          </div>
        </EditorialContainer>
      </SectionBlock>

      {/* Creative / AI */}
      <SectionBlock className="bg-[#D8FF42]">
        <EditorialContainer className="grid lg:grid-cols-2 gap-12 items-center">
          <CreativeDashboardMock />
          <div>
            <Eyebrow className="text-[#111111]/70">AI and creative tools</Eyebrow>
            <SerifHeading as="h2" className="mt-4">
              Create more.
              <br />
              Edit faster.
              <br />
              Stay focused.
            </SerifHeading>
            <p className="mt-5 text-[14px] text-[#111111]/80 leading-relaxed">
              From image optimization and background removal to AI-assisted writing, translation and summarization, access practical tools that help you get more done.
            </p>
            <div className="mt-8 divide-y divide-[#111111]/15 border-t border-b border-[#111111]/15">
              {[
                "Image optimization and conversion",
                "Background removal and image upscaling",
                "AI summarization and translation",
                "Chat with PDF and document tools",
              ].map((row) => (
                <p key={row} className="py-3 text-[13px] text-[#111111]/85">
                  {row}
                </p>
              ))}
            </div>
          </div>
        </EditorialContainer>
      </SectionBlock>

      <CategoryGrid />
      <BlogSection />

      {/* Final CTA */}
      <SectionBlock className="relative overflow-hidden">
        <GradientRings className="opacity-70" />
        <EditorialContainer className="relative">
          <div className="rounded-2xl border border-[#D7D5DA] bg-white p-8 sm:p-10 lg:p-12 grid lg:grid-cols-2 gap-10 items-center shadow-[0_24px_80px_-50px_rgba(17,17,17,0.25)]">
            <div>
              <Eyebrow>Build smarter. Move faster.</Eyebrow>
              <SerifHeading as="h2" className="mt-4">
                Stop switching tools.
                <br />
                Start building
                <br />
                something great.
              </SerifHeading>
              <p className="mt-5 text-[14px] text-[#57565B] leading-relaxed">
                Your next calculation, document conversion, developer utility or AI workflow is just a few clicks away. Explore practical tools built to help you move forward.
              </p>
              <div className="mt-8">
                <EditorialButton href="/tools">Explore all free tools →</EditorialButton>
              </div>
              <p className="mt-4 text-[11px] text-[#89878E]">No signup required for most tools.</p>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-[#D7D5DA] bg-[#F2A4C1]/20 aspect-[4/3] shadow-[0_20px_50px_-30px_rgba(17,17,17,0.2)]">
              <Image src={UNSPLASH.finalCta} alt="Laptop showing a SaaS tools catalog on screen" fill className="object-cover" sizes="(max-width:1024px) 100vw, 500px" />
            </div>
          </div>
        </EditorialContainer>
      </SectionBlock>
    </div>
  );
}

function CategoryIconMini({ id }: { id: string }) {
  const cls = "w-4 h-4 text-[#89878E]";
  switch (id) {
    case "finance":
      return <Calculator className={cls} />;
    case "pdf":
      return <FileText className={cls} />;
    case "image":
      return <ImageIcon className={cls} />;
    case "dev":
      return <Code2 className={cls} />;
    case "text":
      return <FileText className={cls} />;
    case "calc":
      return <Calculator className={cls} />;
    case "ai":
      return <Sparkles className={cls} />;
    default:
      return <Zap className={cls} />;
  }
}
