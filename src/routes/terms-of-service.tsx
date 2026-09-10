import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, PageLayout } from "@/components/site-shell";

export const Route = createFileRoute("/terms-of-service")({
  head: () => ({
    meta: [
      { title: "Terms of Service | DEMAze" },
      { name: "description", content: "Terms governing use of the DEMAze Technologies website." },
      { property: "og:title", content: "Terms of Service | DEMAze" },
      {
        property: "og:description",
        content: "Terms governing use of the DEMAze Technologies website.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://www.demazetech.com/terms-of-service" }],
  }),
  component: TermsOfService,
});

function TermsOfService() {
  return (
    <PageLayout>
      <main id="main-content">
        <PageIntro
          eyebrow="Legal"
          title={
            <>
              Terms of <em>Service.</em>
            </>
          }
          copy="Effective September 10, 2026. This draft covers website use and should be reviewed by legal counsel before publication."
        />
        <article className="legal-copy section-wrap">
          <h2>Website use</h2>
          <p>
            You may use this website to learn about DEMAze Technologies, review our work, contact
            us, and request available resources. You must not misuse the website, attempt
            unauthorized access, or interfere with its operation.
          </p>
          <h2>Information and availability</h2>
          <p>
            Website content is provided for general information. We aim to keep it accurate and
            available, but do not guarantee that every detail is complete, current, or
            uninterrupted.
          </p>
          <h2>Intellectual property</h2>
          <p>
            The website design, writing, graphics, and brand materials belong to DEMAze Technologies
            or their respective owners. You may not reproduce or commercially reuse them without
            permission.
          </p>
          <h2>Project engagements</h2>
          <p>
            Website enquiries do not create a client relationship. Any project, estimate,
            confidentiality obligation, scope, or delivery commitment is governed by a separate
            written agreement.
          </p>
          <h2>Third-party services</h2>
          <p>
            Links to external platforms are provided for convenience. Those platforms operate under
            their own terms and privacy practices.
          </p>
          <h2>Liability and changes</h2>
          <p>
            To the extent permitted by law, DEMAze Technologies is not liable for indirect loss
            arising solely from use of this website. We may update these terms as the website
            evolves.
          </p>
          <h2>Contact</h2>
          <p>
            Questions about these terms can be sent to contact@demazetech.com. These terms are
            governed by applicable laws of India.
          </p>
        </article>
      </main>
    </PageLayout>
  );
}
