import type { Metadata } from "next";
import { pageMeta } from "@/content/site";

const title = "Privacy Policy | DEMAze";
export const metadata: Metadata = {
  ...pageMeta(
    title,
    "How DEMAze Technologies collects, uses, and protects personal information.",
    "/privacy-policy",
  ),
  // Absolute title so the layout's `%s` template does not append the site name;
  // this mirrors the prior site's exact <title>.
  title: { absolute: title },
};

export default function PrivacyPolicyPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      {/* HERO ------------------------------------------------------------ */}
      <section className="legal-hero">
        <div className="legal-hero-inner" data-reveal>
          <p className="eyebrow-dot">Legal</p>
          <h1 className="legal-hero-title">
            Privacy <em>Policy.</em>
          </h1>
          <p className="legal-hero-sub">
            Effective September 10, 2026. This draft reflects the current
            website and should be reviewed by legal counsel before publication.
          </p>
        </div>
      </section>

      {/* BODY ------------------------------------------------------------ */}
      <article className="legal-copy" data-reveal>
        <h2>Information we collect</h2>
        <p>
          When you submit an enquiry or request a resource, we collect the name,
          email address, subject, and message you provide. We may also collect
          anonymous website usage events only after you allow analytics.
        </p>
        <h2>How we use information</h2>
        <p>
          We use submitted information to respond to requests, provide
          resources, evaluate potential projects, maintain website security, and
          improve our services. We do not sell personal information.
        </p>
        <h2>Storage and sharing</h2>
        <p>
          Information is stored in our protected business systems. Access is
          limited to people who need it for the stated purposes. We may use
          service providers that process information on our behalf under
          appropriate safeguards.
        </p>
        <h2>Retention and your choices</h2>
        <p>
          We retain enquiries only as long as reasonably needed for business,
          legal, and security purposes. You may decline optional analytics at
          the website prompt. To request access, correction, or deletion, email
          contact@demazetech.com.
        </p>
        <h2>International visitors</h2>
        <p>
          DEMAze Technologies operates from Ahmedabad, India. Information
          submitted from another country may be processed in India and by
          service providers in other locations.
        </p>
        <h2>Updates</h2>
        <p>
          We may update this policy as our services or legal obligations change.
          The effective date above identifies the latest version.
        </p>
      </article>
    </main>
  );
}
