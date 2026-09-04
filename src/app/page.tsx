import HeroSequence from "@/components/HeroSequence";
import WhyUs from "@/components/WhyUs";
import FlagshipAutomotive from "@/components/FlagshipAutomotive";
import FlagshipInvestigative from "@/components/FlagshipInvestigative";
import FlagshipEcommerce from "@/components/FlagshipEcommerce";
import ProjectArchive from "@/components/ProjectArchive";
import ServicesStack from "@/components/ServicesStack";
import TechMarquee from "@/components/TechMarquee";
import ProcessTrack from "@/components/ProcessTrack";
import ProofSection from "@/components/ProofSection";
import IndustriesSection from "@/components/IndustriesSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main>
      <HeroSequence />
      <WhyUs />
      <FlagshipAutomotive />
      <FlagshipInvestigative />
      <FlagshipEcommerce />
      <ProjectArchive />
      <ServicesStack />
      <TechMarquee />
      <ProcessTrack />
      <ProofSection />
      <IndustriesSection />
      <ContactSection />
    </main>
  );
}
