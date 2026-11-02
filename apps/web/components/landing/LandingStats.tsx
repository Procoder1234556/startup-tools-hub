"use client";

import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { landingStats } from "@/lib/landing-content";

type Props = { totalTools: number };

export default function LandingStats({ totalTools }: Props) {
  const [animate, setAnimate] = useState(false);
  const stats = landingStats(totalTools);

  return (
    <section className="py-16 px-4 border-t border-border">
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8"
        onViewportEnter={() => setAnimate(true)}
        viewport={{ once: true, amount: 0.3 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ y: 16, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="text-center"
          >
            <div className="text-3xl md:text-4xl font-bold mb-2 text-emerald-700 dark:text-emerald-400">
              <NumberFlow
                value={animate ? stat.value : 0}
                format={{ maximumFractionDigits: stat.value % 1 === 0 ? 0 : 1 }}
              />
              {stat.suffix}
            </div>
            <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
