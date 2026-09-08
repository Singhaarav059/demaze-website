"use client";

import { useEffect, useId, useState } from "react";
import VehicleInspection from "./VehicleInspection";

/**
 * The automotive platform, shown as one vehicle moving through the dealership.
 * The four stages are the tab list, so the pipeline strip visitors see is the
 * control they use; the stages auto-advance until the visitor interacts, at
 * which point control is theirs. Every stage describes the same car so the
 * numbers carry forward: the buy price set at valuation becomes the cost base
 * at sale. Figures are illustrative.
 */
const vehicle = {
  name: "2021 Range Rover Velar R-Dynamic",
};

const stages = [
  {
    key: "intake",
    tab: "Intake",
    heading: "Vehicle intake",
    status: "Bay 2 · 09:14",
    metric: "38",
    metricLabel: "Photographs captured and graded",
    lead: "Condition B+",
    footer: [
      ["Panels flagged", "2"],
      ["Tyre depth", "4.1 mm"],
      ["Service history", "Complete"],
    ],
  },
  {
    key: "valuation",
    tab: "Valuation",
    heading: "Used-car valuation",
    status: "Live market · 214 comparables",
    metric: "58.4L",
    metricLabel: "Suggested buy price, INR",
    lead: "Market median 61.2L",
    footer: [
      ["Comparables", "214"],
      ["Refurb estimate", "1.6L"],
      ["Target margin", "7.9%"],
    ],
  },
  {
    key: "workshop",
    tab: "Workshop",
    heading: "Reconditioning",
    status: "Bay 3 · Day 4 of 6",
    metric: "1.18L",
    metricLabel: "Approved reconditioning, under estimate",
    lead: "Ready for listing Friday",
    footer: [
      ["Paint", "2 panels"],
      ["Parts", "6 / 6 arrived"],
      ["Labour", "22 h"],
    ],
  },
  {
    key: "sale",
    tab: "Sale",
    heading: "Listing and finance",
    status: "Listed day 7 · 3 enquiries",
    metric: "64.9L",
    metricLabel: "List price, INR · 1.42L per month on finance",
    lead: "Margin at list 8.3%",
    footer: [
      ["Cost base", "59.6L"],
      ["EMI, 60 months", "1.42L"],
      ["Days to enquiry", "2"],
    ],
  },
];

export default function HeroSystem() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const id = useId();
  const stage = stages[active];

  // Advance on a timer until the visitor interacts; interaction hands control
  // over for good rather than fighting the visitor for it. Intake holds long
  // enough for the inspection module to walk the whole vehicle.
  useEffect(() => {
    if (paused) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setTimeout(
      () => setActive((current) => (current + 1) % stages.length),
      active === 0 ? 19_000 : 5200,
    );
    return () => clearTimeout(timer);
  }, [paused, active]);

  const select = (index: number) => {
    setActive(index);
    setPaused(true);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const last = stages.length - 1;
    const next =
      event.key === "ArrowRight"
        ? (active + 1) % stages.length
        : event.key === "ArrowLeft"
          ? (active + last) % stages.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    select(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  };

  return (
    <div className="system-study" data-animated-visual>
      <div className="system-meta">
        <span className="eyebrow">Product study / Automotive platform</span>
        <span className="eyebrow">One vehicle, intake to sale</span>
      </div>

      <div
        className="system-stages"
        role="tablist"
        aria-label="Vehicle journey stages"
        style={{ "--stage": active } as React.CSSProperties}
      >
        {stages.map((item, index) => (
          <button
            key={item.key}
            id={`${id}-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-controls={`${id}-panel`}
            tabIndex={index === active ? 0 : -1}
            data-done={index < active || undefined}
            onClick={() => select(index)}
            onKeyDown={onKeyDown}
          >
            <i aria-hidden />
            <span>{item.tab}</span>
          </button>
        ))}
        <span className="system-stages-track" aria-hidden>
          <span />
        </span>
      </div>

      <div className="system-window">
        <div className="system-toolbar">
          <span className="system-brand">
            dealer<span>OS</span>
          </span>
          <span className="system-toolbar-vehicle">{vehicle.name}</span>
          <span className="system-sample">Illustrative data</span>
        </div>
        <div
          className="system-panel"
          role="tabpanel"
          id={`${id}-panel`}
          aria-labelledby={`${id}-tab-${active}`}
          tabIndex={0}
        >
          <div className="system-panel-content" key={stage.key}>
            <div className="system-panel-heading">
              <span>{stage.heading}</span>
              <span>{stage.status}</span>
            </div>
            <VehicleInspection running stage={active} />
            <div className="system-metric">
              <div>
                <strong>{stage.metric}</strong>
                <p>{stage.metricLabel}</p>
              </div>
              <span className="system-metric-lead">{stage.lead}</span>
            </div>
            <div className="system-chart" aria-hidden>
              <svg viewBox="0 0 320 60" preserveAspectRatio="none">
                <path
                  className="chart-line"
                  d={chartPaths[active]}
                  fill="none"
                  stroke="#284ee8"
                  strokeWidth="1.5"
                />
              </svg>
              <div>
                {chartAxes[active].map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
            </div>
            <div className="system-finance">
              {stage.footer.map(([label, value]) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="system-caption">
        Original product study. Figures are illustrative, not client data.
      </p>
    </div>
  );
}

// Each stage plots what that stage is watching: photo coverage filling in,
// comparables converging on a price, work burning down, then enquiries.
const chartPaths = [
  "M0 54 C30 52 50 44 90 40 S150 30 190 24 S260 12 320 8",
  "M0 30 C40 18 70 46 110 32 S170 22 210 34 S270 30 320 31",
  "M0 8 C40 10 70 24 110 26 S170 40 210 44 S280 54 320 55",
  "M0 54 C50 54 90 50 130 44 S200 28 250 16 S300 6 320 4",
];
const chartAxes = [
  ["Exterior", "Interior", "Underbody", "Documents"],
  ["Low", "Comparables", "Suggested", "High"],
  ["Day 1", "Day 2", "Day 4", "Day 6"],
  ["Listed", "Day 2", "Day 5", "Day 7"],
];
