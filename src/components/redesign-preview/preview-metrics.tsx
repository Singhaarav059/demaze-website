/**
 * The 4-up metrics band from the design bundle's home state. These are the
 * design's marketing figures (45+ / $10M+ / 35+ / 6+) and intentionally differ
 * from lib/site-data `metrics`, so they are hand-built here to match the bundle
 * exactly rather than reusing MetricsStrip.
 */
const PREVIEW_METRICS = [
  { value: "45+", label: "Projects Delivered" },
  { value: "$10M+", label: "Client Value Generated" },
  { value: "35+", label: "Expert Team Members" },
  { value: "6+", label: "Years of Excellence" },
] as const;

export function PreviewMetrics() {
  return (
    <div className="preview-metrics section-wrap">
      {PREVIEW_METRICS.map((metric) => (
        <div className="preview-metric" key={metric.label}>
          <strong className="preview-metric-value">{metric.value}</strong>
          <span className="preview-metric-label">{metric.label}</span>
          <i className="preview-metric-rule" aria-hidden="true" />
        </div>
      ))}
    </div>
  );
}
