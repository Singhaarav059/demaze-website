import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, PageLayout } from "@/components/site-shell";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | DEMAze" },
      {
        name: "description",
        content: "How DEMAze Technologies collects, uses, and protects personal information.",
      },
      { property: "og:title", content: "Privacy Policy | DEMAze" },
      {
        property: "og:description",
        content: "How DEMAze Technologies handles personal information.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://www.demazetech.com/privacy-policy" }],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <PageLayout>
      <main id="main-content">
        <PageIntro
          eyebrow="Legal"
          title={
            <>
              Privacy <em>Policy.</em>
            </>
          }
          copy="Draft effective January 1, 2025. This draft reflects the current website and should be reviewed by legal counsel before publication."
        />
        <article className="legal-copy section-wrap">
          <h2>Information we collect</h2>
          <p>
            When you submit an enquiry or request a resource, we collect the name, email address,
            subject, and message you provide. We may also collect anonymous website usage events
            only after you allow analytics.
          </p>
          <h2>How we use information</h2>
          <p>
            We use submitted information to respond to requests, provide resources, evaluate
            potential projects, maintain website security, and improve our services. We do not sell
            personal information.
          </p>
          <h2>Storage and sharing</h2>
          <p>
            Information is stored in our protected business systems. Access is limited to people who
            need it for the stated purposes. We may use service providers that process information
            on our behalf under appropriate safeguards.
          </p>
          <h2>Retention and your choices</h2>
          <p>
            We retain enquiries only as long as reasonably needed for business, legal, and security
            purposes. You may decline optional analytics at the website prompt. To request access,
            correction, or deletion, email contact@demazetech.com.
          </p>
          <h2>International visitors</h2>
          <p>
            DEMAze Technologies operates from Ahmedabad, India. Information submitted from another
            country may be processed in India and by service providers in other locations.
          </p>
          <h2>Updates</h2>
          <p>
            We may update this policy as our services or legal obligations change. The effective
            date above identifies the latest version.
          </p>
        </article>
      </main>
    </PageLayout>
  );
}
