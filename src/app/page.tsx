import Image from "next/image";
import Link from "next/link";
import HeroSystem from "@/components/HeroSystem";
import WorkCard from "@/components/WorkCard";
import EvidenceStory from "@/components/EvidenceStory";
import ScrollStory from "@/components/ScrollStory";
import { homeCopy } from "@/content/editorial";
import { projects } from "@/content/projects";
import { serviceCategories } from "@/content/services";
import { site } from "@/content/site";

const selected = [projects[1], projects[2], projects[3], projects[13]];

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="shell hero-section">
        <div className="hero-topline">
          <p className="eyebrow">AI & software engineering studio</p>
          <p className="eyebrow">
            Ahmedabad, India <span aria-hidden>↗</span> Worldwide
          </p>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-small">{homeCopy.eyebrow}</p>
            <h1>
              Complexity,
              <br />
              made <em>useful.</em>
            </h1>
            <p className="hero-intro">{homeCopy.intro}</p>
            <div className="hero-actions">
              <Link className="button" href="/projects">
                Explore our work <span aria-hidden>↗</span>
              </Link>
              <Link className="text-link" href="/contact-us">
                Have a challenge?
              </Link>
            </div>
            <div className="hero-footnote">
              <span className="hero-footnote-mark" aria-hidden>
                ↗
              </span>
              <p>
                Deep in the details.
                <br />
                Focused on the bigger picture.
              </p>
            </div>
          </div>
          <HeroSystem />
        </div>
        <div className="hero-bottomline">
          <span>Strategy → Design → Engineering → Evolution</span>
          <Link href="/projects/luxury-car-dealer-software">
            Inside the automotive platform <span aria-hidden>↗</span>
          </Link>
        </div>
      </section>

      <ScrollStory />

      <section className="shell home-work" id="selected-work">
        <div className="section-kicker">
          <span className="eyebrow">Selected work / In motion</span>
          <span className="eyebrow">Built around the real world</span>
        </div>
        <div className="section-heading-row">
          <h2 className="section-heading">
            Different worlds.
            <br />
            Same depth of <em>thinking.</em>
          </h2>
          <div>
            <p>{homeCopy.workIntro}</p>
            <Link className="text-link" href="/projects">
              Explore all {projects.length} projects <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>
        <p className="visual-disclosure">
          Original animated product studies. Illustrative data, not client
          screenshots.
        </p>
        <div className="work-grid">
          {selected.map((project, i) => (
            <WorkCard project={project} index={i + 1} key={project.slug} />
          ))}
        </div>
      </section>

      <EvidenceStory />

      <section className="shell home-expertise">
        <div className="section-kicker">
          <span className="eyebrow">03 / Connected expertise</span>
          <Link className="text-link" href="/services">
            How we can help <span aria-hidden>↗</span>
          </Link>
        </div>
        <div className="expertise-grid">
          <div>
            <h2 className="section-heading">
              The whole system.
              <br />
              <em>Not just a piece.</em>
            </h2>
            <p>
              Good products don’t happen in silos. We bring the data, the
              experience, and the infrastructure into the same conversation.
            </p>
            <div className="expertise-mark" aria-hidden>
              <span>Think</span>
              <span>Make</span>
              <span>Connect</span>
              <svg viewBox="0 0 300 120">
                <path
                  d="M15 20H110L155 60H280M15 100H110L155 60M200 20L240 60L200 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
          <div className="expertise-list">
            {serviceCategories.map((service, i) => (
              <Link href={`/services#${service.key}`} key={service.key}>
                <span className="eyebrow">0{i + 1}</span>
                <div>
                  <h3>{service.name}</h3>
                  <p>{service.items.slice(0, 3).join(" · ")}</p>
                </div>
                <span aria-hidden>↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-studio">
        <div className="shell home-studio-grid">
          <div className="home-portrait">
            <Image
              src={site.founder.photo}
              alt="Krupal Chaudhary, founder of Demaze Technologies"
              width={895}
              height={980}
              sizes="(max-width: 700px) 90vw, 380px"
            />
            <span className="eyebrow">Krupal Chaudhary / Founder & CEO</span>
          </div>
          <div>
            <p className="eyebrow">04 / People behind the systems</p>
            <h2 className="section-heading">
              Technology is complex.
              <br />
              Working together
              <br />
              shouldn’t <em>be.</em>
            </h2>
            <p>
              We’re a team of engineers, designers, and strategic thinkers based
              in Ahmedabad. Curious about the problem. Invested in the people.
              Accountable for what we build.
            </p>
            <Link className="text-link" href="/about-us">
              Get to know Demaze <span aria-hidden>↗</span>
            </Link>
            <div className="home-stats">
              {[site.stats[0], site.stats[2], site.stats[3]].map((stat) => (
                <div key={stat.label}>
                  <strong>
                    {stat.value}
                    {stat.suffix}
                  </strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
