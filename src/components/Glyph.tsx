/**
 * The site's vector layer.
 *
 * Every visual on this site was a raster screenshot — zero SVGs against 28-133
 * on each of the reference sites, which is most of why it read as thinner than
 * them. These are the cheapest honest way to close that: eight marks, one
 * language, no icon library.
 *
 * Deliberately abstract geometry rather than pictograms. A drawn magnifying
 * glass or shopping cart is a stock icon with extra steps, and at this size the
 * literal versions all collapse into the same rounded blob. Each mark instead
 * diagrams what the step or practice actually does to a system — scattered
 * points resolving into a grid, a graph of connected nodes, a stack gaining a
 * layer — so it carries a little information rather than decorating.
 *
 * Stroke-only on `currentColor`, so one set works on ink and on paper and picks
 * up the accent on hover without a second copy.
 */
export type GlyphName =
  | "discover"
  | "design"
  | "build"
  | "scale"
  | "ai"
  | "app"
  | "commerce"
  | "cloud";

const paths: Record<GlyphName, React.ReactNode> = {
  // Scattered points with one ring drawn around the cluster: finding the shape
  // in a field of unsorted facts.
  discover: (
    <>
      <circle cx="19" cy="19" r="12.5" />
      <path d="M28 28 L41 41" />
      <circle cx="13.5" cy="16" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="21" cy="13" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="24" cy="22" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="15" cy="24" r="1.6" fill="currentColor" stroke="none" />
    </>
  ),
  // A frame with its columns ruled in: the wireframe before the pixels.
  design: (
    <>
      <rect x="7" y="9" width="34" height="30" rx="3" />
      <path d="M7 17 H41" />
      <path d="M19 17 V39" />
      <path d="M24 24 H35" />
      <path d="M24 30 H32" />
    </>
  ),
  // Three offset layers, the top one still landing: integration as stacking.
  build: (
    <>
      <path d="M24 33 L9 27 L24 21 L39 27 Z" />
      <path d="M9 33.5 L24 39.5 L39 33.5" />
      <path d="M24 7 V17" />
      <path d="M20 13.5 L24 17.5 L28 13.5" />
    </>
  ),
  // An ascending series that keeps going past the frame.
  scale: (
    <>
      <path d="M8 39 H40" />
      <path d="M13 39 V30" />
      <path d="M21 39 V24" />
      <path d="M29 39 V17" />
      <path d="M37 39 V10" />
      <path d="M32 13 L37 8.5 L41.5 13" />
    </>
  ),
  // A graph: inputs converging on a node, one inference leaving it.
  ai: (
    <>
      <circle cx="11" cy="14" r="3.2" />
      <circle cx="11" cy="34" r="3.2" />
      <circle cx="24" cy="24" r="4.2" />
      <circle cx="38" cy="24" r="3.2" />
      <path d="M13.6 16 L21 21.5" />
      <path d="M13.6 32 L21 26.5" />
      <path d="M28.2 24 H34.8" />
    </>
  ),
  // One product, two surfaces, sharing an edge.
  app: (
    <>
      <rect x="6" y="11" width="24" height="19" rx="2.5" />
      <path d="M6 17 H30" />
      <rect x="27" y="21" width="15" height="22" rx="2.5" />
      <path d="M27 27 H42" />
      <path d="M33 39.5 H36" />
    </>
  ),
  // A catalogue grid with one cell selected: merchandising is choosing.
  commerce: (
    <>
      <rect x="7" y="8" width="15" height="15" rx="2" />
      <rect x="26" y="8" width="15" height="15" rx="2" />
      <rect x="7" y="27" width="15" height="15" rx="2" />
      <rect x="26" y="27" width="15" height="15" rx="2" fill="currentColor" stroke="none" />
    </>
  ),
  // Rails of capacity with one node promoted off them.
  cloud: (
    <>
      <path d="M8 34 H40" />
      <path d="M8 27 H40" />
      <path d="M8 41 H40" />
      <circle cx="24" cy="13" r="4" />
      <path d="M24 17 V23" />
      <path d="M18 20 L24 14 L30 20" opacity="0.45" />
    </>
  ),
};

export default function Glyph({
  name,
  className = "",
}: {
  name: GlyphName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden
      focusable="false"
      className={className}
      fill="none"
      stroke="currentColor"
      /* Effective stroke is scaled by the rendered size over the 48 viewBox, so
         1.4 at 36px paints a 1.05px line — visibly weedy next to a 28px
         semibold heading. 1.9 at 44px lands near 1.75px, which holds. */
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
