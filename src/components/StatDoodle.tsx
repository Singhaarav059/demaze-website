import "./StatDoodle.css";

/** Abstract hand-drawn network: scattered pieces connecting into one hub. */
export function NetworkDoodle() {
  return (
    <svg className="stat-doodle" data-animated-visual viewBox="0 0 200 120" fill="none" aria-hidden>
      <path className="doodle-line d1" d="M24,88 C42,64 56,46 88,44" />
      <path className="doodle-line d2" d="M150,28 C128,38 110,40 88,44" />
      <path className="doodle-line d3" d="M158,80 C136,66 112,54 88,44" />
      <path className="doodle-line d4" d="M66,102 C74,80 80,60 88,44" />
      <circle className="doodle-node hub" cx="88" cy="44" r="5.5" />
      <circle className="doodle-node n1" cx="24" cy="88" r="4" />
      <circle className="doodle-node n2" cx="150" cy="28" r="4" />
      <circle className="doodle-node n3 accent" cx="158" cy="80" r="4" />
      <circle className="doodle-node n4" cx="66" cy="102" r="4" />
    </svg>
  );
}

/** Abstract hand-drawn upward trajectory with a small annotation at its tip. */
export function GrowthDoodle() {
  return (
    <svg className="stat-doodle" data-animated-visual viewBox="0 0 200 120" fill="none" aria-hidden>
      <path
        className="doodle-line doodle-growth"
        d="M18,98 C46,90 58,76 74,70 C92,63 100,42 118,30 C134,20 146,14 172,4"
      />
      <path className="doodle-mark mark1" d="M146,14 L160,6" />
      <circle className="doodle-node accent mark2" cx="172" cy="4" r="4.5" />
    </svg>
  );
}
