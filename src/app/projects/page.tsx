import type { Metadata } from "next";
import ProjectsGallery from "@/components/ProjectsGallery";
import WorkCard from "@/components/WorkCard";
import { projects } from "@/content/projects";
import { projectEditorial } from "@/content/editorial";
import { pageMeta } from "@/content/site";
import "./projects.css";

export const metadata: Metadata = pageMeta(
  "Projects",
  "Explore 16 product engagements across AI, automotive, commerce, finance, healthcare, and more. The context, capabilities, and thinking behind the work.",
  "/projects",
);

export default function ProjectsPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <header className="shell projects-header">
        <div className="project-header-label">
          <p className="eyebrow">
            The work / {projects.length} selected engagements
          </p>
          <span className="eyebrow">A portfolio of possibilities</span>
        </div>
        <h1>
          Real complexity.
          <br />
          <em>Thoughtfully resolved.</em>
        </h1>
        <div className="projects-header-bottom">
          <p>
            Different industries. Different challenges. Explore the products
            we’ve built and the thinking that connects them.
          </p>
          <span className="projects-header-symbol" aria-hidden>
            ↙
          </span>
        </div>
      </header>
      <ProjectsGallery
        entries={projects.map((project, index) => ({
          slug: project.slug,
          sector: project.sector,
          search: [
            project.title,
            project.description,
            project.sector,
            project.tags.join(" "),
            projectEditorial[project.slug].title,
          ].join(" "),
          card: <WorkCard project={project} index={index} heading="h2" />,
        }))}
      />
    </main>
  );
}
