import LandingQuickFeatures from "@/components/landing/LandingQuickFeatures";
import LandingOpenSourceStack from "@/components/landing/LandingOpenSourceStack";
import LandingStats from "@/components/landing/LandingStats";
import LandingTiers from "@/components/landing/LandingTiers";
import LandingTestimonials from "@/components/landing/LandingTestimonials";
import LandingFaq from "@/components/landing/LandingFaq";

type Props = { totalTools: number };

/** Wired sections from _vendor/saas-landing-template + AtotheY feature row. Header/footer/branding stay site-config. */
export default function LandingTemplateSections({ totalTools }: Props) {
  return (
    <div className="landing-marketing w-full">
      <LandingQuickFeatures />
      <LandingOpenSourceStack />
      <LandingStats totalTools={totalTools} />
      <LandingTiers />
      <LandingTestimonials />
      <LandingFaq />
    </div>
  );
}
