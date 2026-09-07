import Link from "next/link";
import ProjectVisual from "@/components/ProjectVisual";
import { projectEditorial } from "@/content/editorial";
import type { Project } from "@/content/projects";

type Props = {
  project: Project;
  index: number;
  heading?: "h2" | "h3";
};

export default function WorkCard({ project, index, heading = "h3" }: Props) {
  const editorial = projectEditorial[project.slug];
  const Heading = heading;
  return (
    <article className="work-card" id={project.slug}>
      <Link className="work-card-link" href={`/projects/${project.slug}`}>
        <div className="work-visual">
          <ProjectVisual visual={editorial.visual} />
          <span className="work-open" aria-hidden>
            ↗
          </span>
        </div>
        <div className="work-card-meta">
          <span>
            {String(index).padStart(2, "0")} / {project.sector}
          </span>
          <span>{editorial.visual.kind}</span>
        </div>
        <Heading>{editorial.title}</Heading>
      </Link>
      <p>{editorial.summary}</p>
    </article>
  );
}
