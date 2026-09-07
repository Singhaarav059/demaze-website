import type { ProjectEditorial } from "@/content/editorial";
import "./ProjectVisual.css";

type Props = {
  visual: ProjectEditorial["visual"];
  /** Larger type and spacing for the detail page hero. */
  size?: "card" | "hero";
};

/**
 * Authored product studies, one per visual kind. Every study is CSS and inline
 * SVG so it ships as markup: no screenshots, no image decode, and the motion
 * pauses through the same `data-animated-visual` hook as the rest of the site.
 * Figures are illustrative and the card beneath says so.
 */
export default function ProjectVisual({ visual, size = "card" }: Props) {
  const { kind, tone, brand, labels, figure, figureLabel } = visual;
  return (
    <div
      className={`pv pv-${kind} pv-${tone} pv-${size}`}
      data-animated-visual
      role="img"
      aria-label={`${brand}: illustrative ${kind} interface showing ${labels.join(", ")}`}
    >
      <div className="pv-bar">
        <span className="pv-brand">{brand}</span>
        <span className="pv-dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
      </div>
      <Scene kind={kind} labels={labels} figure={figure} figureLabel={figureLabel} />
    </div>
  );
}

type SceneProps = {
  kind: ProjectEditorial["visual"]["kind"];
  labels: string[];
  figure: string;
  figureLabel: string;
};

function Scene({ kind, labels, figure, figureLabel }: SceneProps) {
  switch (kind) {
    case "dashboard":
      return (
        <div className="pv-body">
          <div className="pv-figure">
            <strong>{figure}</strong>
            <span>{figureLabel}</span>
          </div>
          <svg className="pv-chart" viewBox="0 0 300 90" aria-hidden>
            <path className="pv-area" d="M0 70 C40 66 60 40 100 44 S160 22 200 30 S260 10 300 18 V90 H0Z" />
            <path className="pv-line" pathLength="100" d="M0 70 C40 66 60 40 100 44 S160 22 200 30 S260 10 300 18" />
            <circle className="pv-marker" cx="200" cy="30" r="3.5" />
          </svg>
          <ul className="pv-stats">
            {labels.map((label, i) => (
              <li key={label} style={{ "--i": i } as React.CSSProperties}>
                <span>{label}</span>
                <i style={{ "--w": `${42 + ((i * 23) % 50)}%` } as React.CSSProperties} />
              </li>
            ))}
          </ul>
        </div>
      );
    case "flow":
      return (
        <div className="pv-body">
          <svg className="pv-wires" viewBox="0 0 300 160" aria-hidden>
            <path pathLength="100" d="M40 32 H120 Q150 32 150 62 V80" />
            <path pathLength="100" d="M260 32 H180 Q150 32 150 62 V80" />
            <path pathLength="100" d="M40 128 H120 Q150 128 150 98 V80" />
            <path pathLength="100" d="M260 128 H180 Q150 128 150 98 V80" />
          </svg>
          {labels.map((label, i) => (
            <span className={`pv-node pv-node-${i}`} key={label} style={{ "--i": i } as React.CSSProperties}>
              <b aria-hidden>{["01", "02", "03", "04"][i]}</b>
              {label}
            </span>
          ))}
          <div className="pv-hub">
            <strong>{figure}</strong>
            <span>{figureLabel}</span>
          </div>
        </div>
      );
    case "grid":
      return (
        <div className="pv-body">
          <div className="pv-figure pv-figure-top">
            <strong>{figure}</strong>
            <span>{figureLabel}</span>
          </div>
          <div className="pv-tiles">
            {labels.map((label, i) => (
              <div className="pv-tile" key={label} style={{ "--i": i } as React.CSSProperties}>
                <svg viewBox="0 0 80 60" aria-hidden>
                  <rect x="12" y="8" width="56" height="44" rx="3" />
                  <path d="M12 44 L34 26 L48 38 L58 30 L68 40" />
                </svg>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      );
    case "mobile":
      return (
        <div className="pv-body">
          <div className="pv-phone">
            <div className="pv-phone-head">
              <strong>{figure}</strong>
              <span>{figureLabel}</span>
            </div>
            <ul>
              {labels.map((label, i) => (
                <li key={label} style={{ "--i": i } as React.CSSProperties}>
                  <i aria-hidden />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="pv-phone pv-phone-back" aria-hidden>
            <div className="pv-phone-head">
              <strong>&nbsp;</strong>
            </div>
            <ul>
              <li />
              <li />
              <li />
            </ul>
          </div>
        </div>
      );
    case "board":
      return (
        <div className="pv-body">
          <div className="pv-columns">
            {labels.map((label, col) => (
              <div className="pv-column" key={label}>
                <span>{label}</span>
                {Array.from({ length: 3 - (col % 2) }, (_, row) => (
                  <i key={row} style={{ "--i": col * 3 + row } as React.CSSProperties} />
                ))}
              </div>
            ))}
          </div>
          <div className="pv-figure pv-figure-foot">
            <strong>{figure}</strong>
            <span>{figureLabel}</span>
          </div>
        </div>
      );
    case "document":
      return (
        <div className="pv-body">
          <div className="pv-sheet">
            <div className="pv-sheet-title">
              <span>{labels[0]}</span>
              <strong>
                {figure} <small>{figureLabel}</small>
              </strong>
            </div>
            <table aria-hidden>
              <tbody>
                {labels.slice(1).map((label, i) => (
                  <tr key={label} style={{ "--i": i } as React.CSSProperties}>
                    <td>{label}</td>
                    <td>
                      <i style={{ "--w": `${55 + ((i * 17) % 35)}%` } as React.CSSProperties} />
                    </td>
                    <td>
                      <i style={{ "--w": `${30 + ((i * 29) % 50)}%` } as React.CSSProperties} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    case "frames":
      return (
        <div className="pv-body">
          <div className="pv-strip">
            {labels.map((label, i) => (
              <figure key={label} style={{ "--i": i } as React.CSSProperties}>
                <svg viewBox="0 0 120 68" aria-hidden>
                  <rect x="0" y="0" width="120" height="68" />
                  <circle cx={30 + i * 18} cy="30" r="9" />
                  <path d={`M0 58 Q ${40 + i * 10} 40 120 56 V68 H0Z`} />
                </svg>
                <figcaption>{label}</figcaption>
              </figure>
            ))}
          </div>
          <div className="pv-figure pv-figure-foot">
            <strong>{figure}</strong>
            <span>{figureLabel}</span>
          </div>
        </div>
      );
  }
}
