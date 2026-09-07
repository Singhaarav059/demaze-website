import type { Metadata } from "next";
import Link from "next/link";
import { industries } from "@/content/industries";
import { process } from "@/content/about";
import {
  serviceCategories,
  platformTabs,
  techStackFlat,
} from "@/content/services";
import { pageMeta } from "@/content/site";
import "@/components/StudioPages.css";

export const metadata: Metadata = pageMeta(
  "Services",
  "AI and ML, web, mobile and SaaS, e-commerce, and cloud engineering.",
  "/services",
);

const relatedWork = [
  "luxury-car-dealer-software",
  "investigative-case-management",
  "luxury-ecommerce-platform",
  "food-grocery-delivery-app",
];

export default function ServicesPage() {
  return (
    <main id="main-content" tabIndex={-1} className="sp-page">
      <header className="sp-hero">
        <div className="shell sp-hero-grid">
          <div>
            <p className="eyebrow">Capabilities / 01 to 04</p>
            <h1>
              Systems that <em>hold together.</em>
            </h1>
            <p className="sp-intro">
              AI, product engineering, commerce and cloud work better when they
              are designed as one operating system, not a sequence of vendors
              and handoffs.
            </p>
          </div>
          <aside className="sp-hero-note">
            <span>Operating model</span>
            <strong>
              One senior team
              <br />
              from problem to production.
            </strong>
            <ul>
              {platformTabs.map((tab) => (
                <li key={tab}>{tab}</li>
              ))}
            </ul>
          </aside>
        </div>
      </header>

      <section
        className="shell sp-section sp-architecture"
        aria-labelledby="architecture-title"
      >
        <div className="sp-section-top">
          <div>
            <p className="eyebrow">The integrated system</p>
            <h2 id="architecture-title">
              The useful parts are
              <br />
              <em>connected.</em>
            </h2>
          </div>
          <p>
            We design the boundaries as carefully as the features: a clear
            product surface, dependable services beneath it, and feedback from
            real usage back into the next decision.
          </p>
        </div>
        <div
          className="sp-system-diagram"
          data-animated-visual
          role="img"
          aria-label="Diagram showing product experience, intelligence, operations, commerce and cloud foundation connected in one system"
        >
          <svg viewBox="0 0 920 330" aria-hidden="true">
            <path d="M111 164H809M316 77V252M577 77V164" />
            <path
              className="sp-system-signal"
              pathLength="100"
              d="M111 164H809M316 77V252M577 77V164"
            />
            <circle cx="111" cy="164" r="43" />
            <circle cx="316" cy="77" r="43" />
            <circle cx="316" cy="252" r="43" />
            <circle cx="577" cy="77" r="43" />
            <circle cx="809" cy="164" r="43" />
            <g className="sp-system-glyphs">
              {/* Experience: screen */}
              <rect x="93" y="150" width="36" height="24" rx="3" />
              <path d="M104 181h14" />
              {/* Intelligence: node cluster */}
              <circle cx="316" cy="77" r="5" />
              <circle cx="300" cy="66" r="3" />
              <circle cx="332" cy="66" r="3" />
              <circle cx="316" cy="95" r="3" />
              <path d="M316 77L300 66M316 77L332 66M316 77V95" />
              {/* Operations: stepped flow */}
              <path d="M298 240h10v8h10v8h10v8h8" />
              <circle cx="298" cy="240" r="2.5" />
              <circle cx="336" cy="264" r="2.5" />
              {/* Commerce: tag */}
              <path d="M563 66h16l14 14-14 14h-16z" />
              <circle cx="569" cy="80" r="2.5" />
              {/* Foundation: layers */}
              <path d="M791 156h36M791 164h36M791 172h36" />
              <path d="M797 148h24" />
            </g>
          </svg>
          <div className="sp-system-label system-a">
            <b>Experience</b>
            <span>Web · mobile · UX</span>
          </div>
          <div className="sp-system-label system-b">
            <b>Intelligence</b>
            <span>Models · data · insights</span>
          </div>
          <div className="sp-system-label system-c">
            <b>Operations</b>
            <span>Workflows · integrations</span>
          </div>
          <div className="sp-system-label system-d">
            <b>Commerce</b>
            <span>Catalog · checkout · fulfilment</span>
          </div>
          <div className="sp-system-label system-e">
            <b>Foundation</b>
            <span>Cloud · security · observability</span>
          </div>
        </div>
        <div className="sp-principles">
          <p>
            <b>01 / Useful by design</b>We start from the decision, task or
            transaction that has to work.
          </p>
          <p>
            <b>02 / Built for change</b>We separate the parts that should evolve
            from the parts that must stay reliable.
          </p>
          <p>
            <b>03 / Measured in use</b>Instrumentation, observability and
            handover are delivery work, not afterthoughts.
          </p>
        </div>
      </section>

      <section className="sp-practices" aria-labelledby="practices-title">
        <div className="shell">
          <div className="sp-section-top">
            <div>
              <p className="eyebrow">Four practices</p>
              <h2 id="practices-title">Depth where it matters.</h2>
            </div>
            <p>
              Bring us a contained need or a connected business problem. The
              practice changes; the standard of delivery does not.
            </p>
          </div>
          <ol>
            {serviceCategories.map((category, index) => (
              <li id={category.key} key={category.key} className="sp-practice">
                <div className="sp-practice-number">0{index + 1}</div>
                <div>
                  <h3>{category.name}</h3>
                  <p>{category.summary}</p>
                </div>
                <ul>
                  {category.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link
                  className="text-link"
                  href={`/projects/${relatedWork[index]}`}
                >
                  Related work <span aria-hidden>↗</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="shell sp-section sp-delivery"
        aria-labelledby="delivery-title"
      >
        <div className="sp-section-top">
          <div>
            <p className="eyebrow">How we work</p>
            <h2 id="delivery-title">
              A delivery rhythm
              <br />
              you can <em>see.</em>
            </h2>
          </div>
          <p>
            Work moves in deliberate stages with a tangible artifact at each
            handoff. That makes progress clear before code becomes expensive to
            change.
          </p>
        </div>
        <ol>
          {process.map(({ step, title, description }) => (
            <li key={step}>
              <span>0{step}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
        <div className="sp-cta">
          <p>Have a system with a difficult middle?</p>
          <Link href="/contact-us" className="button">
            Scope the work <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      <section
        className="shell sp-industries"
        aria-labelledby="industries-title"
      >
        <div>
          <p className="eyebrow">Where we apply it</p>
          <h2 id="industries-title">Industry context matters.</h2>
        </div>
        <p>
          We bring our product and engineering practice to varied operating
          environments, adapting to the systems, regulations and people around
          the work.
        </p>
        <ul>
          {industries.map((industry) => (
            <li key={industry.name}>{industry.name}</li>
          ))}
        </ul>
      </section>

      <section className="sp-stack">
        <div className="shell">
          <p className="eyebrow">Tools, selected for the job</p>
          <ul>
            {techStackFlat.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
