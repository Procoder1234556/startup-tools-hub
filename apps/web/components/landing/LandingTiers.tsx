"use client";

import Link from "next/link";
import { CheckIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LANDING_TIERS } from "@/lib/landing-content";

export default function LandingTiers() {
  return (
    <section id="pricing" className="mx-auto w-full max-w-6xl px-4 py-16 sm:py-20">
      <motion.div
        initial={{ y: 16, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <h2 className="text-2xl sm:text-3xl font-bold">How you use the hub</h2>
        <p className="mt-2 text-muted-foreground max-w-xl mx-auto">Browser-first tools, labeled server jobs, and open-source lineage—always free to use.</p>
      </motion.div>
      <div className="grid gap-6 md:grid-cols-3">
        {LANDING_TIERS.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ y: 16, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className={plan.isMostPop ? "md:scale-[1.02]" : ""}
          >
            <Card className={`h-full ${plan.isMostPop ? "border-2 border-emerald-500 shadow-md" : ""}`}>
              {plan.isMostPop && (
                <div className="text-center pt-4">
                  <span className="text-xs font-medium rounded-full border border-emerald-500 px-3 py-1">Most used</span>
                </div>
              )}
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold text-center">{plan.name}</h3>
                <p className="text-sm text-muted-foreground text-center mt-2">{plan.desc}</p>
                <div className="text-center mt-4 text-3xl font-bold">${plan.price}</div>
                <Separator className="my-6" />
                <ul className="space-y-2.5 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckIcon className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" variant={plan.isMostPop ? "default" : "outline"}>
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
