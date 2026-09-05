import HeroSequence from "@/components/HeroSequence";
import FlagshipAutomotive from "@/components/FlagshipAutomotive";
import FlagshipInvestigative from "@/components/FlagshipInvestigative";
import FlagshipEcommerce from "@/components/FlagshipEcommerce";
import ProjectArchive from "@/components/ProjectArchive";
import ServicesStack from "@/components/ServicesStack";
import TechMarquee from "@/components/TechMarquee";
import ProcessTrack from "@/components/ProcessTrack";
import ProofSection from "@/components/ProofSection";
import ContactSection from "@/components/ContactSection";

/**
 * Statement, then work, then what the work proves.
 *
 * WhyUs and IndustriesSection used to sit here as sections of their own. WhyUs
 * asserted, two screens before any evidence, what ProofSection corroborates, so
 * it merged into it; Industries spent a headline, a paragraph and a surface
 * change on one wrapped line of names, so it became a strip inside
 * ServicesStack. Both were beats that restated a neighbour rather than adding
 * one.
 */
export default function Home() {
  return (
    <main>
      <HeroSequence />
      <FlagshipAutomotive />
      <FlagshipInvestigative />
      <FlagshipEcommerce />
      <ProjectArchive />
      <ServicesStack />
      <TechMarquee />
      <ProcessTrack />
      <ProofSection />
      <ContactSection />
    </main>
  );
}
