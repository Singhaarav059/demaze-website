import { Hero } from "@/components/Hero";
import { WhoWeAre } from "@/components/WhoWeAre";
import { FlagshipProject } from "@/components/FlagshipProject";
import { ProjectsShowcase } from "@/components/ProjectsShowcase";
import { ServicesShowcase } from "@/components/ServicesShowcase";
import { TechMarquee } from "@/components/TechMarquee";
import { StatsSection } from "@/components/StatsSection";
import { ProcessSection } from "@/components/ProcessSection";
import { IndustriesSection } from "@/components/IndustriesSection";
import { ContactSection } from "@/components/ContactSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhoWeAre />
      <FlagshipProject />
      <ProjectsShowcase />
      <ServicesShowcase />
      <TechMarquee />
      <StatsSection />
      <ProcessSection />
      <IndustriesSection />
      <ContactSection />
    </main>
  );
}
