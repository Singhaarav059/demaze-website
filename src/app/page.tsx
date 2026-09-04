import HeroSequence from "@/components/HeroSequence";
import WhyUs from "@/components/WhyUs";
import ChapterAutomotive from "@/components/ChapterAutomotive";
import ChapterInvestigative from "@/components/ChapterInvestigative";
import ChapterEcommerce from "@/components/ChapterEcommerce";
import ProjectArchive from "@/components/ProjectArchive";
import ServicesStack from "@/components/ServicesStack";
import TechMarquee from "@/components/TechMarquee";
import ProcessSection from "@/components/ProcessSection";
import StatsSection from "@/components/StatsSection";
import IndustriesSection from "@/components/IndustriesSection";
import FounderSection from "@/components/FounderSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main>
      <HeroSequence />
      <WhyUs />
      <ChapterAutomotive />
      <ChapterInvestigative />
      <ChapterEcommerce />
      <ProjectArchive />
      <ServicesStack />
      <TechMarquee />
      <ProcessSection />
      <StatsSection />
      <IndustriesSection />
      <FounderSection />
      <ContactSection />
    </main>
  );
}
