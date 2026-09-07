"use client";

import Link from "next/link";
import { useState } from "react";

const artefacts = [
  { icon: "▤", name: "Bank statement", meta: "PDF · 14 pages" },
  { icon: "▣", name: "CCTV still", meta: "JPG · 02:14:07" },
  { icon: "▥", name: "Email thread", meta: "EML · 9 messages" },
  { icon: "▦", name: "Field notes", meta: "TXT · 2 entries" },
];

/**
 * The investigative platform, reduced to its one idea: four unrelated files
 * become one connected case the moment they are linked. The visitor makes that
 * happen with a button, which is the whole point of the product. Everything is
 * anonymised and illustrative.
 */
export default function EvidenceStory() {
  const [connected, setConnected] = useState(false);

  return (
    <section
      className={`evidence-story${connected ? " is-connected" : ""}`}
      aria-labelledby="evidence-title"
    >
      <div className="shell">
        <div className="section-kicker">
          <span className="eyebrow">02 / Investigative case management</span>
          <span className="eyebrow">Interactive study</span>
        </div>
        <div className="evidence-grid">
          <div>
            <h2 className="section-heading" id="evidence-title">
              Evidence is only useful
              <br />
              once it is <em>connected.</em>
            </h2>
            <p>
              Investigators held cases across folders, inboxes and notebooks.
              The relationships between pieces of evidence lived in one person’s
              head. We built a case file where every artefact is a typed record
              and the links between them are the product.
            </p>
            <Link className="text-link" href="/projects/investigative-case-management">
              Read the case study <span aria-hidden>↗</span>
            </Link>
          </div>
          <div className="evidence-demo" data-animated-visual>
            <div className="evidence-demo-top">
              <span className="eyebrow">Case 0417 / Anonymised</span>
              <span className="eyebrow">
                {connected ? "4 artefacts · 1 entity" : "4 artefacts · unlinked"}
              </span>
            </div>
            <div className="evidence-canvas" aria-hidden>
              <svg className="evidence-paths" viewBox="0 0 400 315" preserveAspectRatio="none">
                <g fill="none" stroke="currentColor" strokeWidth="1.25">
                  <path pathLength="320" d="M85 62 Q140 140 200 157" />
                  <path pathLength="320" d="M315 62 Q260 140 200 157" />
                  <path pathLength="320" d="M85 253 Q140 175 200 157" />
                  <path pathLength="320" d="M315 253 Q260 175 200 157" />
                </g>
              </svg>
              {artefacts.map((artefact, i) => (
                <div className={`evidence-node evidence-node-${i}`} key={artefact.name}>
                  <span className="evidence-file-icon">{artefact.icon}</span>
                  <strong>{artefact.name}</strong>
                  <span>{artefact.meta}</span>
                </div>
              ))}
              <div className="evidence-hub">
                <span>E-1</span>
                <strong>Entity of interest</strong>
                <small>4 linked artefacts</small>
              </div>
            </div>
            <div className="evidence-result" aria-live="polite">
              {connected ? (
                <>
                  <strong>Timeline assembled from four sources.</strong>
                  <p>
                    A transfer on the statement matches the CCTV timestamp; the
                    email thread names the counterparty the notes describe.
                  </p>
                </>
              ) : (
                <>
                  <strong>Four files, no relationships.</strong>
                  <p>
                    Each artefact is catalogued and searchable, but nothing yet
                    says how they relate. Link them to see the case take shape.
                  </p>
                </>
              )}
            </div>
            <button
              type="button"
              className="evidence-toggle"
              aria-pressed={connected}
              onClick={() => setConnected((state) => !state)}
            >
              {connected ? "Unlink artefacts" : "Link the artefacts"}
              <span aria-hidden>{connected ? "↺" : "↗"}</span>
            </button>
            <p className="evidence-caption">
              Illustrative case. Names, media and figures are invented.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
