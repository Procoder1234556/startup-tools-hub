"use client";

import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { LANDING_OSS_STACK } from "@/lib/landing-content";

export default function LandingOpenSourceStack() {
  return (
    <section className="py-16 px-4">
      <motion.div
        initial={{ y: 16, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center mb-10"
      >
        <h2 className="text-xl font-semibold sm:text-2xl">Open-source stack</h2>
        <p className="mt-2 text-muted-foreground text-sm">Upstream projects vendored under _vendor/ — see docs/LINKAGE.md.</p>
      </motion.div>
      <TooltipProvider>
        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-3">
          {LANDING_OSS_STACK.map((item, index) => (
            <Tooltip key={item.name}>
              <TooltipTrigger asChild>
                <motion.span
                  initial={{ scale: 0.95, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm font-medium"
                >
                  {item.name}
                </motion.span>
              </TooltipTrigger>
              <TooltipContent>{item.hint}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </section>
  );
}
