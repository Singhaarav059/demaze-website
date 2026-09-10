import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/site-shell";
import { SectionHeading, TechnologyBand } from "@/components/content-sections";
import { ProjectsShowcaseGrid } from "@/components/projects-showcase-grid";
import { PreviewHero } from "@/components/redesign-preview/preview-hero";
import { PreviewMetrics } from "@/components/redesign-preview/preview-metrics";
import { PreviewProjectsGallery } from "@/components/redesign-preview/preview-projects-gallery";
import { PreviewServices } from "@/components/redesign-preview/preview-services";
import {
  PreviewFounderQuote,
  PreviewProcessBand,
  PreviewValuesBand,
} from "@/components/redesign-preview/preview-sections";

export const Route = createFileRoute("/website-redesign-preview")({
  head: () => ({
    meta: [
      { title: "Website Redesign Preview" },
      {
        name: "description",
        content:
          "A preview rebuild of the DEMAze home page redesign, assembled from the shared site components as React and Tailwind sections.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WebsiteRedesignPreview,
});

function WebsiteRedesignPreview() {
  return (
    <div className="redesign-preview">
      <PageLayout overlayHeader>
        <main id="main-content">
          <PreviewHero />
          <PreviewMetrics />
          <PreviewProjectsGallery />
          <PreviewServices />
          <section className="preview-tech section-wrap">
            <SectionHeading eyebrow="Platforms & partners" title="Tools and technologies." />
            <TechnologyBand />
          </section>
          <PreviewValuesBand />
          <PreviewFounderQuote />
          <PreviewProcessBand />
          <section className="preview-all-work section-wrap">
            <SectionHeading
              eyebrow="More work"
              title="Explore the full project portfolio."
              copy="The same projects rendered through the shared showcase grid."
            />
            <ProjectsShowcaseGrid limit={6} />
          </section>
        </main>
      </PageLayout>
    </div>
  );
}
