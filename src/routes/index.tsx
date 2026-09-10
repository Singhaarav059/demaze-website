import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FounderStory,
  FaqSection,
  IndustryGrid,
  MetricsStrip,
  ProcessGrid,
  ProjectsGrid,
  SectionHeading,
  TechnologyBand,
  ValuesGrid,
} from "@/components/content-sections";
import { PageLayout } from "@/components/site-shell";
import { Magnetic } from "@/components/motion/magnetic";
import { ScrollFocusStack } from "@/components/scroll-focus-stack";
import { PinnedServicesShowcase } from "@/components/pinned-services-showcase";
import robotsVideo from "@/assets/demaze-robot-studio.mp4";
import robotsPoster from "@/assets/demaze-robot-studio-poster.webp";
import { HeroVideo } from "@/components/hero-video";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Product Development Company | DEMAze" },
      {
        name: "description",
        content:
          "DEMAze is an AI-first product studio. We pair software engineering with AI and automation to design, build, and scale digital products that hold up in production.",
      },
      { property: "og:title", content: "AI Product Development Company | DEMAze" },
      {
        property: "og:description",
        content:
          "An AI-first engineering partner that designs, builds, and scales digital products, and stays for the long run.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.demazetech.com/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <div>
      <PageLayout overlayHeader>
        <main id="main-content">
          <section className="home-hero section-wrap immersive-hero-section">
            {/* Aurora mesh backdrop: a soft, brand-tinted gradient composition
                that fills the hero behind the copy and perspective card. It is a
                decorative, pointer-events:none layer. */}
            <div className="aurora-mesh-container" aria-hidden="true">
              <div className="aurora-blob aurora-blob-1" />
              <div className="aurora-blob aurora-blob-2" />
              <div className="aurora-blob aurora-blob-3" />
            </div>
            <div className="hero-copy animate-rise">
              <div className="badge-dual-pill">
                <span className="badge-kicker">AI-first studio</span>
                <Link to="/services" className="badge-text">
                  <span>Architecture · Engineering · Scale</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
              <h1>
                We design and ship{" "}
                <em className="shimmer-text">AI products that scale.</em>
              </h1>
              <p className="intro">
                DEMAze pairs software engineering with AI and automation to turn ambitious ideas
                into products that hold up in production. We work as a long-term partner, from first
                prototype to the systems your business runs on.
              </p>
              <div className="hero-actions">
                <Link to="/contact-us" className="pill-button button-glow">
                  Start a project <ArrowUpRight />
                </Link>
                <Link to="/services" className="button-glass">
                  See what we build <ArrowRight />
                </Link>
              </div>
            </div>
            <div className="hero-perspective-stage">
              <div className="ambient-halo" aria-hidden="true" />
              <div className="hero-floating-badge badge-top" aria-hidden="true">
                <span className="floating-badge-dot" />
                <span className="floating-badge-text">
                  <strong>Production-ready</strong> · Built to scale
                </span>
              </div>
              <HeroVideo poster={robotsPoster} mp4={robotsVideo} />
              <div className="hero-floating-badge badge-bottom" aria-hidden="true">
                <span className="floating-badge-icon">⚡</span>
                <span className="floating-badge-text">
                  <strong>Senior AI &amp; product engineers</strong> · End to end
                </span>
              </div>
            </div>
          </section>
          <MetricsStrip />
          <ScrollFocusStack className="home-stack">
            <section className="content-section motion-chapter-long stack-work">
              <div className="section-wrap">
                <span className="chapter-doodle" aria-hidden="true" />
                <SectionHeading
                  eyebrow="Our work"
                  title="Hard problems, products people use."
                  copy="Platforms built around real operations, real customers, and room to grow."
                />
                <ProjectsGrid limit={4} />
                <div className="section-action">
                  <Magnetic strength={14}>
                    <Button variant="editorial" size="hero" asChild>
                      <Link to="/projects">
                        View all work <ArrowUpRight />
                      </Link>
                    </Button>
                  </Magnetic>
                </div>
              </div>
            </section>
            <section className="content-section motion-chapter-long cinema-services-section stack-services">
              <div className="section-wrap">
                <span className="chapter-doodle" aria-hidden="true" />
                <SectionHeading
                  eyebrow="Services"
                  title="Apps, platforms, and AI."
                  copy="End-to-end engineering, applied AI, and product craft, matched to what your business actually needs."
                />
                <PinnedServicesShowcase />
              </div>
            </section>
            <section className="content-section stack-chapter stack-tools">
              <div className="section-wrap">
                <span className="chapter-doodle" aria-hidden="true" />
                <SectionHeading
                  eyebrow="Platforms & partners"
                  title="The stack we build on."
                />
                <TechnologyBand />
              </div>
            </section>
            <section className="content-section stack-chapter stack-industries">
              <div className="section-wrap">
                <span className="chapter-doodle" aria-hidden="true" />
                <SectionHeading
                  eyebrow="Industries"
                  title="Context that shapes the build."
                  copy="We pair engineering depth with a working understanding of the systems, customers, and constraints in each sector."
                />
                {/* All 19 sit on /services. Eight here keeps the homepage scannable. */}
                <IndustryGrid limit={8} />
                <div className="section-action">
                  <Magnetic strength={14}>
                    <Button variant="editorial" size="hero" asChild>
                      <Link to="/services">
                        See all industries <ArrowUpRight />
                      </Link>
                    </Button>
                  </Magnetic>
                </div>
              </div>
            </section>
            <section className="content-section stack-chapter dark-band">
              <div className="section-wrap">
                <span className="chapter-doodle" aria-hidden="true" />
                <SectionHeading eyebrow="Why choose us" title="Built to last, built with you." />
                <ValuesGrid />
              </div>
            </section>
            <section className="content-section stack-chapter stack-story">
              <div className="section-wrap">
                <span className="chapter-doodle" aria-hidden="true" />
                <SectionHeading
                  eyebrow="Who we are"
                  title="Engineers who think in outcomes."
                  copy="A team of builders and strategists who turn complex technical possibilities into results the business can feel."
                />
                <FounderStory />
              </div>
            </section>
            <section className="content-section stack-chapter stack-process">
              <div className="section-wrap">
                <span className="chapter-doodle" aria-hidden="true" />
                <SectionHeading eyebrow="How we work" title="A clear path from idea to scale." />
                <ProcessGrid />
              </div>
            </section>
            <section className="content-section stack-chapter stack-faq">
              <div className="section-wrap faq-section">
                <span className="chapter-doodle" aria-hidden="true" />
                <SectionHeading eyebrow="FAQ" title="Straight answers to common questions." />
                <FaqSection />
              </div>
            </section>
          </ScrollFocusStack>
        </main>
      </PageLayout>
    </div>
  );
}
