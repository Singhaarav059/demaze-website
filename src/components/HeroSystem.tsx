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

/**
 * The vehicle is drawn as separable parts so the intake stage can pull it
 * into an exploded view (bonnet, doors, tailgate, bumpers and wheels drift
 * apart and settle back), the way an inspection walks a car panel by panel.
 * Other stages keep the parts assembled and overlay their own marks.
 */
function VehicleArt({ stage }: { stage: number }) {
  const exploded = stage === 0;
  return (
    <svg
      viewBox="0 0 220 115"
      preserveAspectRatio="xMidYMid slice"
      className={exploded ? "system-car system-car-exploded" : "system-car"}
    >
      <rect width="220" height="115" fill="#e0e8de" />
      <path d="M0 98 H220" stroke="#c6d1c3" strokeWidth="1" />
      <g
        fill="#f3f5f0"
        stroke="#19241f"
        strokeWidth="1.5"
        strokeLinejoin="round"
      >
        {/* Lower body with wheel arches; the fixed shell everything hangs off */}
        <path
          className="car-body"
          d="M28 88 V70 Q28 62 36 60 L56 56 L68 40 Q72 34 82 33 L136 32 Q148 32 156 40 L168 54 L194 60 Q202 62 202 70 V88 H188 A17 17 0 0 0 154 88 H86 A17 17 0 0 0 52 88 Z"
        />
        {/* Glasshouse */}
        <path className="car-glass" d="M72 42 L64 56 H96 L98 40 Z" />
        <path className="car-glass" d="M104 40 L104 56 H128 L127 38 Z" />
        <path className="car-glass" d="M133 38 L134 56 H158 L150 44 Z" />
        {/* Separable panels, drawn in place */}
        <path
          className="car-part car-roof"
          d="M70 36 L82 31 H138 L148 36 L136 34 H84 Z"
        />
        <path
          className="car-part car-bonnet"
          d="M156 42 L170 54 L194 60 L188 54 L164 46 Z"
        />
        <path className="car-part car-door-front" d="M102 58 H130 V86 H102 Z" />
        <path className="car-part car-door-rear" d="M66 58 H100 V86 H66 Z" />
        <path
          className="car-part car-tailgate"
          d="M28 70 Q28 62 36 60 L56 56 V86 H28 Z"
        />
        <path
          className="car-part car-bumper-front"
          d="M194 76 H208 Q211 76 211 79 V88 H194 Z"
        />
        <path
          className="car-part car-bumper-rear"
          d="M17 76 H28 V88 H17 Q14 88 14 85 V79 Q14 76 17 76 Z"
        />
      </g>
      <g className="car-part car-wheel car-wheel-rear">
        <circle
          cx="69"
          cy="90"
          r="13"
          fill="#d3dbd1"
          stroke="#19241f"
          strokeWidth="1.5"
        />
        <circle
          cx="69"
          cy="90"
          r="5"
          fill="#f3f5f0"
          stroke="#19241f"
          strokeWidth="1"
        />
      </g>
      <g className="car-part car-wheel car-wheel-front">
        <circle
          cx="171"
          cy="90"
          r="13"
          fill="#d3dbd1"
          stroke="#19241f"
          strokeWidth="1.5"
        />
        <circle
          cx="171"
          cy="90"
          r="5"
          fill="#f3f5f0"
          stroke="#19241f"
          strokeWidth="1"
        />
      </g>
      {stage === 0 && (
        <g className="system-scan" stroke="#284ee8" strokeWidth="1" fill="none">
          <path
            d="M10 14 h8 M10 14 v8 M210 14 h-8 M210 14 v8 M10 108 h8 M10 108 v-8 M210 108 h-8 M210 108 v-8"
            strokeWidth="2"
          />
          <g
            className="car-callouts"
            fill="#284ee8"
            stroke="none"
            fontFamily="var(--font-mono)"
            fontSize="6"
          >
            <text x="14" y="28">
              PANEL 2 · FLAG
            </text>
            <text x="160" y="28">
              BONNET · OK
            </text>
            <text x="14" y="112">
              TYRES 4.1 MM
            </text>
          </g>
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
