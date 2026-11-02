"use client";

import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LANDING_FAQ } from "@/lib/landing-content";
import { SITE_URL } from "@/lib/site-config";

export default function LandingFaq() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: LANDING_FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section className="py-16 px-4 border-t border-border">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <motion.div
        initial={{ y: 16, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-lg mx-auto"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">FAQ</h2>
        <Accordion type="multiple" className="w-full">
          {LANDING_FAQ.map((item, index) => (
            <AccordionItem key={item.q} value={`faq-${index}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          More detail on the{" "}
          <a href={`${SITE_URL}/methodology/`} className="text-emerald-600 hover:underline">
            methodology page
          </a>
          .
        </p>
      </motion.div>
    </section>
  );
}
