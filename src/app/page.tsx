import { Hero } from "@/components/Hero";
import { WhoWeAre } from "@/components/WhoWeAre";
import { FlagshipAutomotive } from "@/components/FlagshipAutomotive";
import { FlagshipInvestigative } from "@/components/FlagshipInvestigative";
import { FlagshipEcommerce } from "@/components/FlagshipEcommerce";
import { ProjectArchive } from "@/components/ProjectArchive";
import { ServicesShowcase } from "@/components/ServicesShowcase";
import { TechMarquee } from "@/components/TechMarquee";
import { ProcessSection } from "@/components/ProcessSection";
import { StatsSection } from "@/components/StatsSection";
import { IndustriesSection } from "@/components/IndustriesSection";
import { FounderSection } from "@/components/FounderSection";
import { ContactSection } from "@/components/ContactSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhoWeAre />
      <FlagshipAutomotive />
      <FlagshipInvestigative />
      <FlagshipEcommerce />
      <ProjectArchive />
      <ServicesShowcase />
      <TechMarquee />
      <ProcessSection />
      <StatsSection />
      <IndustriesSection />
      <FounderSection />
      <ContactSection />
    </main>
  );
}
