import "./StudioVisual.css";

/**
 * An original engineering-studio illustration for the company introduction.
 * It is not a portrait and not the physical office: a data model at the left,
 * a product surface at the right, and the connections between them, because
 * that is the work.
 */
export default function StudioVisual() {
  return (
    <div
      className="studio-visual"
      data-animated-visual
      role="img"
      aria-label="Illustration of a data model connected to a product interface, representing the studio's work from data to software"
    >
      <svg viewBox="0 0 420 300" aria-hidden>
        <g
          className="sv-grid"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.18"
        >
          {Array.from({ length: 13 }, (_, i) => (
            <path key={`v${i}`} d={`M${i * 35} 0 V300`} />
          ))}
          {Array.from({ length: 9 }, (_, i) => (
            <path key={`h${i}`} d={`M0 ${i * 37.5} H420`} />
          ))}
        </g>
        <g
          className="sv-schema"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
        >
          <rect x="36" y="60" width="96" height="30" rx="2" />
          <rect x="36" y="112" width="96" height="30" rx="2" />
          <rect x="36" y="164" width="96" height="30" rx="2" />
          <rect x="36" y="216" width="96" height="30" rx="2" />
          <path
            d="M84 90 V112 M84 142 V164 M84 194 V216"
            strokeDasharray="2 3"
          />
        </g>
        <g className="sv-wires" fill="none" stroke="#284ee8" strokeWidth="1.25">
          <path
            pathLength="100"
            d="M132 75 H180 Q200 75 200 95 V140 Q200 160 220 160 H260"
          />
          <path
            pathLength="100"
            d="M132 127 H190 Q200 127 200 137 V150 Q200 160 210 160 H260"
          />
          <path
            pathLength="100"
            d="M132 179 H190 Q200 179 200 170 Q200 160 210 160 H260"
          />
          <path
            pathLength="100"
            d="M132 231 H180 Q200 231 200 211 V180 Q200 160 220 160 H260"
          />
        </g>
        <g className="sv-surface">
          <rect
            x="260"
            y="70"
            width="124"
            height="180"
            rx="4"
            fill="#f6f5f0"
            stroke="currentColor"
            strokeWidth="1.25"
          />
          <rect
            x="272"
            y="84"
            width="60"
            height="8"
            rx="1"
            fill="currentColor"
            opacity="0.7"
          />
          <rect x="272" y="100" width="100" height="42" rx="2" fill="#284ee8" />
          <path
            d="M280 132 C292 128 300 116 312 118 S340 108 364 112"
            fill="none"
            stroke="#f6f5f0"
            strokeWidth="1.5"
          />
          <rect
            x="272"
            y="152"
            width="100"
            height="6"
            rx="1"
            fill="currentColor"
            opacity="0.25"
          />
          <rect
            x="272"
            y="166"
            width="72"
            height="6"
            rx="1"
            fill="currentColor"
            opacity="0.25"
          />
          <rect
            x="272"
            y="180"
            width="88"
            height="6"
            rx="1"
            fill="currentColor"
            opacity="0.25"
          />
          <rect
            x="272"
            y="204"
            width="100"
            height="30"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <rect
            x="280"
            y="216"
            width="40"
            height="6"
            rx="1"
            fill="currentColor"
            opacity="0.5"
          />
        </g>
        <g
          className="sv-labels"
          fill="currentColor"
          fontFamily="var(--font-mono)"
          fontSize="8"
          letterSpacing="0.6"
        >
          <text x="36" y="50">
            DATA MODEL
          </text>
          <text x="260" y="60">
            PRODUCT
          </text>
          <text x="164" y="290">
            FROM THE SCHEMA TO THE SCREEN
          </text>
        </g>
        <circle className="sv-pulse" cx="200" cy="160" r="4" fill="#284ee8" />
      </svg>
    </div>
  );
}
