"use client";

import { useEffect, useId, useState } from "react";

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
  meta: ["Odometer 31,400 km", "Delhi region", "Single owner"],
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
  // over for good rather than fighting the visitor for it.
  useEffect(() => {
    if (paused) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(
      () => setActive((current) => (current + 1) % stages.length),
      5200,
    );
    return () => clearInterval(timer);
  }, [paused]);

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
            <div className="system-vehicle">
              <div className="system-vehicle-art" aria-hidden>
                <VehicleArt stage={active} />
              </div>
              <div>
                <span className="eyebrow">Stage {active + 1} of 4</span>
                <strong>{stage.lead}</strong>
                <span className="system-status">
                  {vehicle.meta.join(" · ")}
                </span>
              </div>
            </div>
            <div className="system-metric">
              <div>
                <strong>{stage.metric}</strong>
                <p>{stage.metricLabel}</p>
              </div>
              <span className="system-metric-symbol" aria-hidden>
                ↗
              </span>
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

function VehicleArt({ stage }: { stage: number }) {
  return (
    <svg viewBox="0 0 220 115" preserveAspectRatio="xMidYMid slice">
      <rect width="220" height="115" fill="#e0e8de" />
      <path d="M0 92 H220" stroke="#c6d1c3" strokeWidth="1" />
      <g fill="none" stroke="#19241f" strokeWidth="1.5" strokeLinejoin="round">
        <path d="M26 82 L38 56 Q46 44 62 42 L128 40 Q150 40 166 54 L188 66 Q198 70 198 80 L198 84 H26 Z" />
        <path d="M62 44 L58 60 H108 L110 44" />
        <path d="M120 42 L124 60 H160 L146 46" />
      </g>
      <g fill="#e0e8de" stroke="#19241f" strokeWidth="1.5">
        <circle cx="62" cy="86" r="11" />
        <circle cx="162" cy="86" r="11" />
      </g>
      {stage === 0 && (
        <g className="system-scan" stroke="#284ee8" strokeWidth="1" fill="none">
          <rect
            x="30"
            y="36"
            width="176"
            height="54"
            rx="2"
            strokeDasharray="4 3"
          />
          <path
            d="M30 36 h8 M30 36 v8 M206 36 h-8 M206 36 v8 M30 90 h8 M30 90 v-8 M206 90 h-8 M206 90 v-8"
            strokeWidth="2"
          />
          <path className="system-scan-line" d="M30 40 H206" />
        </g>
      )}
      {stage === 1 && (
        <g fill="#284ee8">
          {[38, 72, 106, 140, 174].map((x, i) => (
            <rect
              key={x}
              x={x}
              y={30 - [6, 12, 18, 10, 4][i]}
              width="14"
              height={[6, 12, 18, 10, 4][i]}
              rx="1"
              opacity={i === 2 ? 1 : 0.45}
            />
          ))}
          <path d="M113 34 V38" stroke="#284ee8" strokeWidth="1" />
        </g>
      )}
      {stage === 2 && (
        <g fill="none" stroke="#284ee8" strokeWidth="1.25">
          <circle cx="90" cy="52" r="7" />
          <path d="M90 45 V38 M97 52 H104" />
          <circle cx="150" cy="52" r="7" />
          <path d="M150 45 V38" />
          <circle cx="162" cy="86" r="14" strokeDasharray="3 3" />
        </g>
      )}
      {stage === 3 && (
        <g fontFamily="var(--font-mono)" fontSize="9" fill="#284ee8">
          <rect x="14" y="12" width="92" height="18" rx="2" fill="#284ee8" />
          <text x="20" y="25" fill="#ffffff">
            LISTED · 64.9L
          </text>
          <circle cx="190" cy="24" r="3" />
          <circle cx="200" cy="24" r="3" opacity="0.6" />
          <circle cx="210" cy="24" r="3" opacity="0.3" />
        </g>
      )}
    </svg>
  );
}
