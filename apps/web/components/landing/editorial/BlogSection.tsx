import Link from "next/link";
import Image from "next/image";
import { getPostBySlug } from "@/lib/posts";
import { EDITORIAL_BLOG_SLUGS } from "@/lib/landing-editorial";
import { Eyebrow, EditorialContainer, SectionBlock, SerifHeading } from "./shared";

export default function BlogSection() {
  const posts = EDITORIAL_BLOG_SLUGS.map((slug) => getPostBySlug(slug)).filter(Boolean);

  return (
    <SectionBlock className="bg-[#E8E7EB]">
      <EditorialContainer>
        <div className="max-w-xl mb-10 lg:mb-14">
          <Eyebrow>Learn and build</Eyebrow>
          <SerifHeading as="h2" className="mt-4">
            Better decisions start
            <br />
            with better knowledge.
          </SerifHeading>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {posts.map((post) =>
            post ? (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-xl border border-[#D7D5DA] bg-white overflow-hidden transition hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-28px_rgba(17,17,17,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
              >
                <div className="relative aspect-[16/10] bg-[#E8E7EB]">
                  {post.cover ? (
                    <Image src={post.cover} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D8FF42]/30 to-[#F2A4C1]/25" />
                  )}
                </div>
                <div className="p-5">
                  {post.tags[0] ? (
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-[#89878E]">{post.tags[0]}</span>
                  ) : null}
                  <h3 className="mt-2 font-[family-name:var(--font-serif)] text-lg text-[#111111] leading-snug group-hover:underline decoration-[#D8FF42] underline-offset-4">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-[13px] text-[#57565B] line-clamp-3">{post.description}</p>
                  <p className="mt-4 text-[11px] text-[#89878E]">
                    {post.readingTime} · Read article →
                  </p>
                </div>
              </Link>
            ) : null
          )}
        </div>
      </EditorialContainer>
    </SectionBlock>
  );
}
