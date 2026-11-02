"use client";

import { ArrowUpDown, Lock, Timer } from "lucide-react";
import { motion } from "framer-motion";
import { LANDING_QUICK_FEATURES } from "@/lib/landing-content";

const icons = [Timer, ArrowUpDown, Lock];

export default function LandingQuickFeatures() {
  return (
    <section className="py-16 border-t border-border">
      <div className="max-w-4xl mx-auto text-center mb-12 px-4">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Quick solutions, less friction</h2>
        <p className="mt-3 text-muted-foreground">Finance, PDF, and dev utilities in one place—most run locally in your browser.</p>
      </div>
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12 px-4">
        {LANDING_QUICK_FEATURES.map((item, index) => {
          const Icon = icons[index] ?? Timer;
          return (
            <motion.div
              key={item.headline}
              initial={{ y: 16, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex flex-col gap-4 md:items-start items-center text-center md:text-left max-w-sm mx-auto"
            >
              <div className="py-3 px-3 rounded-lg border border-border bg-card">
                <Icon className="w-6 h-6 text-emerald-600" aria-hidden />
              </div>
              <h3 className="text-xl font-semibold">{item.headline}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
