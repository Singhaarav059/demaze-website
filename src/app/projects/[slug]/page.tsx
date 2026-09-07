import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectVisual from "@/components/ProjectVisual";
import WorkCard from "@/components/WorkCard";
import { projectEditorial } from "@/content/editorial";
import { projects } from "@/content/projects";
import { pageMeta } from "@/content/site";
import "../projects.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  const editorial = projectEditorial[slug];
  return pageMeta(editorial.title, editorial.summary, `/projects/${slug}`);
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const editorial = projectEditorial[slug];

  // Two neighbours from a different sector where possible, so the trail keeps
  // showing the range of the work rather than more of the same.
  const related = [...projects.slice(index + 1), ...projects.slice(0, index)]
    .sort(
      (a, b) =>
        Number(a.sector === project.sector) -
        Number(b.sector === project.sector),
    )
    .slice(0, 2);

  return (
    <main id="main-content" tabIndex={-1} className="project-page">
      <header className="shell project-hero">
        <div className="project-crumbs">
          <p className="eyebrow">
            <Link href="/projects">The work</Link> /{" "}
            {String(index + 1).padStart(2, "0")}
          </p>
          <p className="eyebrow">{project.sector}</p>
        </div>
        <h1>{editorial.title}</h1>
        <div className="project-hero-row">
          <p>{editorial.summary}</p>
          <dl className="project-facts">
            <div>
              <dt>Engagement</dt>
              <dd>{project.title}</dd>
            </div>
            <div>
              <dt>Sector</dt>
              <dd>{project.sector}</dd>
            </div>
            <div>
              <dt>Study</dt>
              <dd style={{ textTransform: "capitalize" }}>
                {editorial.visual.kind} interface
              </dd>
            </div>
            <div>
              <dt>Practice</dt>
              <dd>Product, engineering, AI</dd>
            </div>
          </dl>
        </div>
      </header>

      <section className="shell" aria-label="Product study">
        <div className="project-stage">
          <ProjectVisual visual={editorial.visual} size="hero" />
        </div>
        <p className="visual-disclosure">
          Original product study for {editorial.visual.brand}. Interface and
          figures are illustrative, not client screenshots or audited results.
        </p>
      </section>

      <section className="shell project-body" aria-labelledby="context-title">
        <h2 id="context-title" className="eyebrow">
          The situation
        </h2>
        <p>{editorial.context}</p>
      </section>
      <section className="shell project-body" aria-labelledby="approach-title">
        <h2 id="approach-title" className="eyebrow">
          How we approached it
        </h2>
        <div>
          {editorial.approach.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
      <section className="shell project-body" aria-labelledby="outcome-title">
        <h2 id="outcome-title" className="eyebrow">
          What changed
        </h2>
        <ul className="project-outcomes">
          {editorial.outcome.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="shell project-body" aria-labelledby="scope-title">
        <h2 id="scope-title" className="eyebrow">
          Capabilities delivered
        </h2>
        <div>
          <p>{project.description}</p>
          <ul className="project-tags" style={{ marginTop: 20 }}>
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </section>

      <div className="shell">
        <div className="project-cta">
          <p>Have an operation that has outgrown its spreadsheets?</p>
          <Link href="/contact-us" className="button">
            Start a conversation <span aria-hidden>↗</span>
          </Link>
        </div>
      </div>

      <section className="shell project-next" aria-labelledby="next-title">
        <div className="section-kicker" style={{ borderTop: 0, paddingTop: 0 }}>
          <span className="eyebrow" id="next-title">
            More of the work
          </span>
          <Link className="text-link" href="/projects">
            All {projects.length} projects <span aria-hidden>↗</span>
          </Link>
        </div>
        <div className="work-grid">
          {related.map((item) => (
            <WorkCard
              key={item.slug}
              project={item}
              index={projects.indexOf(item) + 1}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
