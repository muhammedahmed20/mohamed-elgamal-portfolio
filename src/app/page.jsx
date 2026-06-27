import { FeatureSection } from "@/components/sectionComponents/featureSection/feature-section";
import MouseGlow from "@/components/publicConponents/MouseGlow";
import HeroSection from "@/components/sectionComponents/heroSection/HeroSection";
import TechSection from "@/components/sectionComponents/techSection/TechSection";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background dark:bg-black">
      {/* Background layers */}
      <BackgroundRippleEffect />
      <MouseGlow />

      {/* Content */}
      <main className="relative z-10">
        <HeroSection />
        <TechSection />
        <FeatureSection />
      </main>
    </div>
  );
}
