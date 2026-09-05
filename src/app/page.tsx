import HeroSequence from "@/components/HeroSequence";
import FlagshipAutomotive from "@/components/FlagshipAutomotive";
import FlagshipInvestigative from "@/components/FlagshipInvestigative";
import FlagshipEcommerce from "@/components/FlagshipEcommerce";
import ProjectArchive from "@/components/ProjectArchive";
import ServicesStack from "@/components/ServicesStack";
import TechMarquee from "@/components/TechMarquee";
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
 *
 * ProcessTrack went too. Discover / Design / Build / Launch is what every
 * agency site says, and it was spending a pinned full-screen horizontal track
 * and five headings to say it. The four phases still exist in full on
 * /services under "How an engagement runs", which is where someone actually
 * asking how we work will look — the homepage does not have to answer a
 * question nobody has asked yet.
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
      <ProofSection />
      <ContactSection />
    </main>
  );
}
