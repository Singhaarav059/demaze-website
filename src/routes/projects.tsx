import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, PageLayout } from "@/components/site-shell";
import { ProjectsGrid } from "@/components/content-sections";
export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "AI & Software Projects | DEMAze" },
      {
        name: "description",
        content:
          "Explore DEMAze projects across AI, commerce, fintech, automotive, healthcare, education, and enterprise software.",
      },
      { property: "og:title", content: "AI & Software Projects | DEMAze" },
      {
        property: "og:description",
        content: "A portfolio of scalable digital products built by DEMAze Technologies.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.demazetech.com/projects" }],
  }),
  component: ProjectsPage,
});
function ProjectsPage() {
  return (
    <PageLayout>
      <main id="main-content">
        <PageIntro
          eyebrow="Our work"
          title={
            <>
              Products built for <em>real operations.</em>
            </>
          }
          copy="AI systems, marketplaces, business platforms, and customer experiences designed to solve substantial problems."
        />
        <section className="content-section section-wrap" aria-labelledby="all-projects">
          {/* The cards are h3, so without this the outline jumps h1 -> h3. */}
          <h2 id="all-projects" className="sr-only">
            All projects
          </h2>
          <ProjectsGrid />
        </section>
      </main>
    </PageLayout>
  );
}
