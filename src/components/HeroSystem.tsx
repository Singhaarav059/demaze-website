"use client";

import { useEffect, useId, useState } from "react";

/**
 * The automotive platform, shown as three panels a visitor can step through.
 * It is a working tab set rather than a slideshow: arrow keys move between
 * panels, the selected panel is announced, and the whole thing degrades to the
 * first panel without JavaScript. The figures are illustrative.
 */
const panels = [
  {
    key: "valuation",
    tab: "Valuation",
    heading: "Used-car valuation",
    status: "Live market · 214 comparables",
    vehicle: "2021 Range Rover Velar R-Dynamic",
    metric: "58.4L",
    metricLabel: "Suggested buy price, INR",
    detail: ["Condition B+", "Delhi region", "Odometer 31k"],
    footer: [
      ["Market median", "61.2L"],
      ["Refurb estimate", "1.6L"],
      ["Margin at list", "7.9%"],
    ],
  },
  {
    key: "emi",
    tab: "Finance",
    heading: "New-car EMI",
    status: "Rates refreshed 09:00",
    vehicle: "2024 BMW X5 xDrive40i",
    metric: "1.42L",
    metricLabel: "Monthly, 60 months",
    detail: ["20% down", "8.4% p.a.", "Zero processing"],
    footer: [
      ["On-road price", "1.14Cr"],
      ["Loan amount", "91.2L"],
      ["Total interest", "21.0L"],
    ],
  },
  {
    key: "refurb",
    tab: "Workshop",
    heading: "Refurbishment",
    status: "Bay 3 · Day 4 of 6",
    vehicle: "2019 Mercedes-Benz E 220d",
    metric: "1.18L",
    metricLabel: "Approved reconditioning",
    detail: ["Paint: 2 panels", "Tyres: 4", "Detailing"],
    footer: [
      ["Parts ordered", "6 / 6"],
      ["Labour hours", "22"],
      ["Ready for listing", "Fri"],
    ],
  },
];

export default function HeroSystem() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const id = useId();
  const panel = panels[active];

  // Advance on a timer until the visitor interacts; interaction hands control
  // over for good rather than fighting the visitor for it.
  useEffect(() => {
    if (paused) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(
      () => setActive((current) => (current + 1) % panels.length),
      5200,
    );
    return () => clearInterval(timer);
  }, [paused]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    const delta =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (active + delta + panels.length) % panels.length;
    setActive(next);
    setPaused(true);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  };

  return (
    <div className="system-study" data-animated-visual>
      <div className="system-meta">
        <span className="eyebrow">Product study / Automotive platform</span>
        <span className="system-dot" aria-hidden />
      </div>
      <div className="system-flow" aria-hidden>
        <span>Intake</span>
        <i />
        <span>Valuation</span>
        <i />
        <span>Reconditioning</span>
        <i />
        <span>Sale</span>
      </div>
      <div className="system-window">
        <div className="system-toolbar">
          <span className="system-brand">
            dealer<span>OS</span>
          </span>
          <span className="system-sample">Illustrative data</span>
        </div>
        <div
          className="system-panel"
          role="tabpanel"
          id={`${id}-panel`}
          aria-labelledby={`${id}-tab-${active}`}
          tabIndex={0}
        >
          <div className="system-panel-content" key={panel.key}>
            <div className="system-panel-heading">
              <span>{panel.heading}</span>
              <span>{panel.status}</span>
            </div>
            <div className="system-vehicle">
              <div className="system-vehicle-art" aria-hidden>
                <VehicleArt variant={active} />
              </div>
              <div>
                <span className="eyebrow">Vehicle</span>
                <strong>{panel.vehicle}</strong>
                <span className="system-status">{panel.detail.join(" · ")}</span>
              </div>
            </div>
            <div className="system-metric">
              <div>
                <strong>{panel.metric}</strong>
                <p>{panel.metricLabel}</p>
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
                <span>Jan</span>
                <span>Apr</span>
                <span>Jul</span>
                <span>Oct</span>
              </div>
            </div>
            <div className="system-finance">
              {panel.footer.map(([label, value]) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="system-tabs" role="tablist" aria-label="Platform modules">
        {panels.map((item, index) => (
          <button
            key={item.key}
            id={`${id}-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-controls={`${id}-panel`}
            tabIndex={index === active ? 0 : -1}
            onClick={() => {
              setActive(index);
              setPaused(true);
            }}
            onKeyDown={onKeyDown}
          >
            <span>0{index + 1}</span>
            {item.tab}
          </button>
        ))}
      </div>
      <p className="system-caption">
        Original product study. Figures are illustrative, not client data.
      </p>
    </div>
  );
}

const chartPaths = [
  "M0 44 C40 42 60 30 100 32 S160 18 200 22 S270 8 320 12",
  "M0 50 C50 48 80 46 120 40 S200 30 250 26 S300 22 320 20",
  "M0 20 C40 22 70 36 110 34 S170 44 210 40 S280 30 320 34",
];

function VehicleArt({ variant }: { variant: number }) {
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
      {variant === 0 && (
        <g className="system-scan" stroke="#284ee8" strokeWidth="1" fill="none">
          <path d="M20 40 H200" strokeDasharray="3 4" />
          <rect x="34" y="38" width="170" height="50" rx="2" strokeDasharray="4 3" />
        </g>
      )}
      {variant === 1 && (
        <g fill="#284ee8" fontFamily="var(--font-mono)" fontSize="8">
          <text x="14" y="20">
            EMI · 60 mo
          </text>
          <rect x="14" y="26" width="90" height="3" rx="1.5" opacity="0.4" />
          <rect x="14" y="26" width="58" height="3" rx="1.5" />
        </g>
      )}
      {variant === 2 && (
        <g fill="none" stroke="#284ee8" strokeWidth="1.25">
          <circle cx="90" cy="52" r="7" />
          <path d="M90 45 V38 M97 52 H104" />
          <circle cx="150" cy="86" r="14" strokeDasharray="3 3" />
        </g>
      )}
    </svg>
  );
}
