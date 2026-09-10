import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageIntro, PageLayout } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { images } from "@/assets/images";
export const Route = createFileRoute("/blogs")({
  head: () => ({
    meta: [
      { title: "Thoughts & Ideas | DEMAze" },
      {
        name: "description",
        content:
          "Read DEMAze thinking on practical AI, product engineering, and intelligent software.",
      },
      { property: "og:title", content: "Thoughts & Ideas | DEMAze" },
      { property: "og:description", content: "Practical ideas from DEMAze Technologies." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.demazetech.com/blogs" }],
  }),
  component: BlogsPage,
});
function BlogsPage() {
  return (
    <PageLayout>
      <main id="main-content">
        <PageIntro
          eyebrow="Blogs"
          title={
            <>
              Thoughts and <em>ideas.</em>
            </>
          }
          copy="Notes from the work of designing, engineering, and applying AI to useful products."
        />
        <section className="content-section section-wrap">
          <article className="featured-article">
            <img
              {...images["project-investigation"]}
              alt="MedixCare AI triage platform interface"
              decoding="async"
            />
            <div>
              <p className="section-kicker">Healthcare · AI</p>
              <h2>MedixCare, AI Triage Assistant for Healthcare</h2>
              <p>
                We built a custom AI triage assistant that evaluates symptoms and routes patients to
                the appropriate care level.
              </p>
              <p className="article-byline">By Jeel</p>
              <Button variant="editorial" size="hero" asChild>
                <Link to="/inside-project">
                  Read full <ArrowUpRight />
                </Link>
              </Button>
            </div>
          </article>
        </section>
      </main>
    </PageLayout>
  );
}
