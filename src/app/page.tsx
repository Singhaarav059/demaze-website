import HeroSequence from "@/components/HeroSequence";
import WhyUs from "@/components/WhyUs";
import FlagshipSequence from "@/components/FlagshipSequence";
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
      <FlagshipSequence />
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
