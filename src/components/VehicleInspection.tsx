"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import "./VehicleInspection.css";

/**
 * The dealerOS inspection module. The Range Rover Velar assets are the
 * content: the platform opens the record, enters inspection, separates the
 * exterior, exposes the internal systems, analyses, and reassembles. Each
 * view is one supplied asset shown faithfully; the module only decides which
 * view is on stage and what the surrounding readout says about it.
 */
const views = [
  {
    key: "assembled",
    src: "/vehicle/velar-assembled.webp",
    width: 1600,
    height: 874,
    mode: "Vehicle record",
    status: "Record opened",
    readout: [
      ["Exterior", "38 photos"],
      ["Condition", "B+"],
      ["Odometer", "31,400 km"],
    ],
  },
  {
    key: "exterior",
    src: "/vehicle/velar-exterior-breakdown.webp",
    width: 1600,
    height: 897,
    mode: "Inspection · Exterior",
    status: "42 components separated",
    readout: [
      ["Panels flagged", "2"],
      ["Glass", "OK"],
      ["Lamps", "OK"],
    ],
  },
  {
    key: "shell",
    src: "/vehicle/velar-shell-chassis.webp",
    width: 810,
    height: 310,
    mode: "Inspection · Body shell",
    status: "Structure, no repair history",
    readout: [
      ["Chassis", "Straight"],
      ["Pillars", "Original"],
      ["Sills", "OK"],
    ],
  },
  {
    key: "engine",
    src: "/vehicle/velar-engine-powertrain.webp",
    width: 586,
    height: 300,
    mode: "Inspection · Powertrain",
    status: "Service history complete",
    readout: [
      ["Engine", "OK"],
      ["Gearbox", "OK"],
      ["Cooling", "Advisory"],
    ],
  },
  {
    key: "interior",
    src: "/vehicle/velar-interior-cabin.webp",
    width: 560,
    height: 264,
    mode: "Inspection · Cabin",
    status: "Wear consistent with mileage",
    readout: [
      ["Seats", "Light wear"],
      ["Console", "OK"],
      ["Electronics", "OK"],
    ],
  },
  {
    key: "drivetrain",
    src: "/vehicle/velar-suspension-drivetrain.webp",
    width: 800,
    height: 264,
    mode: "Inspection · Drivetrain",
    status: "Analysing 214 comparables",
    readout: [
      ["Tyres", "4.1 mm"],
      ["Brakes", "OK"],
      ["Suspension", "OK"],
    ],
  },
  {
    key: "reassembled",
    src: "/vehicle/velar-assembled.webp",
    width: 1600,
    height: 874,
    mode: "Inspection complete",
    status: "Suggested buy 58.4L",
    readout: [
      ["Condition", "B+"],
      ["Refurb estimate", "1.6L"],
      ["Valuation", "58.4L"],
    ],
  },
] as const;

const DWELL = 2600;

export default function VehicleInspection({
  running,
  stage,
}: {
  running: boolean;
  stage: number;
}) {
  // Outside the intake stage the module rests on the assembled vehicle with
  // that stage's own summary; inside it the inspection walks the views. The
  // walk restarts from the record each time intake becomes active.
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (stage !== 0 || !running) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setTick((t) => t + 1), DWELL);
    return () => {
      clearInterval(timer);
      // Leaving intake: fall back to the record so re-entry starts clean.
      setTick(0);
    };
  }, [running, stage]);

  const view = stage === 0 ? tick % views.length : 0;
  const current = views[view];
  const inspecting = stage === 0 && view > 0 && view < views.length - 1;

  return (
    <div
      className="inspection"
      data-view={current.key}
      data-inspecting={inspecting || undefined}
    >
      <div className="inspection-bar">
        <span className="inspection-mode">
          <i aria-hidden />
          {stage === 0 ? current.mode : stageModes[stage]}
        </span>
        <span className="inspection-status">
          {stage === 0 ? current.status : stageStatus[stage]}
        </span>
      </div>
      <div className="inspection-stage">
        {views.map((item, i) => {
          const shown = stage === 0 ? i === view : i === 0;
          // The assembled render serves both ends of the loop; render it once.
          if (item.key === "reassembled") return null;
          const active =
            shown || (stage === 0 && view === views.length - 1 && i === 0);
          return (
            <Image
              key={item.key}
              src={item.src}
              alt=""
              width={item.width}
              height={item.height}
              sizes="(max-width: 700px) 90vw, 560px"
              priority={i === 0}
              className="inspection-asset"
              data-active={active || undefined}
            />
          );
        })}
        <div className="inspection-grid" aria-hidden />
        <div className="inspection-scan" aria-hidden />
      </div>
      <ul className="inspection-readout">
        {(stage === 0 ? current.readout : stageReadout[stage]).map(
          ([label, value]) => (
            <li key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

const stageModes = [
  "",
  "Valuation · Live market",
  "Workshop · Bay 3",
  "Listing · Finance ready",
];
const stageStatus = ["", "214 comparables", "Day 4 of 6", "3 enquiries"];
const stageReadout: [string, string][][] = [
  [],
  [
    ["Market median", "61.2L"],
    ["Condition adj.", "−1.9L"],
    ["Suggested buy", "58.4L"],
  ],
  [
    ["Paint", "2 panels"],
    ["Parts", "6 / 6"],
    ["Ready", "Friday"],
  ],
  [
    ["List price", "64.9L"],
    ["EMI, 60 mo", "1.42L"],
    ["Margin", "8.3%"],
  ],
];
