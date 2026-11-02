"use client";

import { motion } from "framer-motion";
import { LANDING_TESTIMONIALS } from "@/lib/landing-content";

export default function LandingTestimonials() {
  return (
    <section className="py-16 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold">Founders on the hub</h2>
          <p className="mt-2 text-muted-foreground">What builders say about consolidating free tools in one hub.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-6">
          {LANDING_TESTIMONIALS.map((t, index) => (
            <motion.blockquote
              key={t.name}
              initial={{ y: 12, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="rounded-xl border border-border bg-card p-6 text-sm"
            >
              <p className="text-muted-foreground leading-relaxed">&ldquo;{t.content}&rdquo;</p>
              <footer className="mt-4 font-semibold">
                {t.name}
                <span className="block text-xs font-normal text-muted-foreground">{t.role}</span>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
