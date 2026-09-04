import HeroSequence from "@/components/HeroSequence";
import WhyUs from "@/components/WhyUs";
import FlagshipSequence from "@/components/FlagshipSequence";
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
      <FlagshipSequence />
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
