import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, PageLayout } from "@/components/site-shell";
import projectImage from "@/assets/original/project-investigation.png";
import { ScrollFocusStack } from "@/components/scroll-focus-stack";
export const Route = createFileRoute("/inside-project")({
  head: () => ({
    meta: [
      { title: "MedixCare AI Triage Project | DEMAze" },
      {
        name: "description",
        content: "How DEMAze built MedixCare, a custom AI triage assistant for healthcare.",
      },
      { property: "og:title", content: "MedixCare AI Triage Project | DEMAze" },
      {
        property: "og:description",
        content:
          "A custom AI assistant that evaluates symptoms and routes patients to the appropriate level of care.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.demazetech.com/inside-project" }],
  }),
  component: InsideProject,
});
function InsideProject() {
  return (
    <PageLayout>
      <main id="main-content">
        <PageIntro
          eyebrow="React · Node.js"
          title={
            <>
              MedixCare, AI Triage Assistant for <em>Healthcare.</em>
            </>
          }
          copy="A custom AI triage assistant that evaluates symptoms and routes patients to the appropriate care level."
        />
        <ScrollFocusStack className="interior-motion-stack">
          <section className="case-visual section-wrap motion-chapter">
            <img src={projectImage} alt="MedixCare AI triage product interface" />
          </section>
          <section className="case-content section-wrap motion-chapter">
            <div className="case-metrics">
              <div>
                <strong>12 min</strong>
                <span>Engagement</span>
              </div>
              <div>
                <strong>4.5/5</strong>
                <span>User Satisfaction</span>
              </div>
            </div>
            <div className="case-columns">
              <article>
                <p className="section-kicker">Other updates</p>
                <h2>A clearer care workflow.</h2>
                <ul>
                  <li>Introduced notifications before usage limits are reached.</li>
                  <li>Improved the dashboard interface for better usability and performance.</li>
                </ul>
              </article>
              <article>
                <p className="section-kicker">Fixes</p>
                <h2>Refined across devices.</h2>
                <ul>
                  <li>Fixed mobile layout inconsistencies.</li>
                  <li>Resolved interaction color mismatches.</li>
                  <li>Improved animation smoothness.</li>
                  <li>Addressed data syncing issues.</li>
                  <li>Enhanced screen-reader accessibility.</li>
                </ul>
              </article>
              <article>
                <p className="section-kicker">What’s new?</p>
                <h2>Connected, current data.</h2>
                <ul>
                  <li>Enhanced integrations simplify connected workflows.</li>
                  <li>Live data sync keeps connected tools current.</li>
                </ul>
              </article>
            </div>
          </section>
        </ScrollFocusStack>
      </main>
    </PageLayout>
  );
}
