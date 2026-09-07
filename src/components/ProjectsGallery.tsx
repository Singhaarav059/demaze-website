"use client";

import { useId, useMemo, useState, type ReactNode } from "react";

type Entry = {
  slug: string;
  sector: string;
  search: string;
  card: ReactNode;
};

/**
 * Search and sector filtering over cards rendered by the server. The cards
 * arrive as children so the gallery never re-renders their visuals; it only
 * decides which are shown. Without JavaScript every card is visible and the
 * controls stay hidden (see projects.css), which is the right fallback for a
 * portfolio.
 */
export default function ProjectsGallery({ entries }: { entries: Entry[] }) {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState("All");
  const id = useId();

  const sectors = useMemo(() => {
    const counts = new Map<string, number>();
    for (const entry of entries) {
      counts.set(entry.sector, (counts.get(entry.sector) ?? 0) + 1);
    }
    return [
      ["All", entries.length] as const,
      ...Array.from(counts.entries()).sort(
        (a, b) => b[1] - a[1] || a[0].localeCompare(b[0]),
      ),
    ];
  }, [entries]);

  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const visible = entries.filter((entry) => {
    if (sector !== "All" && entry.sector !== sector) return false;
    const haystack = entry.search.toLowerCase();
    return terms.every((term) => haystack.includes(term));
  });

  return (
    <div className="shell gallery">
      <div className="gallery-controls">
        <div
          className="gallery-filters"
          role="group"
          aria-label="Filter by sector"
        >
          {sectors.map(([name, count]) => (
            <button
              key={name}
              type="button"
              aria-pressed={sector === name}
              onClick={() => setSector(name)}
            >
              {name} <span>{count}</span>
            </button>
          ))}
        </div>
        <label className="gallery-search">
          <span className="eyebrow" id={`${id}-label`}>
            Search the work
          </span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Sector, capability, keyword"
            aria-labelledby={`${id}-label`}
          />
        </label>
      </div>
      <p className="gallery-count" role="status">
        {visible.length === entries.length
          ? `Showing all ${entries.length} projects`
          : `Showing ${visible.length} of ${entries.length} projects`}
      </p>
      <p className="visual-disclosure">
        Original animated product studies with illustrative data, not client
        screenshots or audited results.
      </p>
      {visible.length ? (
        <div className="work-grid gallery-grid">
          {visible.map((entry) => (
            <div key={entry.slug}>{entry.card}</div>
          ))}
        </div>
      ) : (
        <div className="gallery-empty">
          <p>Nothing matches that combination.</p>
          <button
            type="button"
            className="text-link"
            onClick={() => {
              setQuery("");
              setSector("All");
            }}
          >
            Clear the filters <span aria-hidden>↺</span>
          </button>
        </div>
      )}
    </div>
  );
}
