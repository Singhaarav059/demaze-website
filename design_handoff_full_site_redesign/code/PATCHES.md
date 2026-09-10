# Exact edits

## 1. `src/components/site-shell.tsx`
Import the new progress bar:
```tsx
import { ScrollProgress } from "@/components/scroll-progress";
```
In `SiteHeader`, add a ref + rAF-gated scroll listener toggling `.is-condensed` (same pattern already used in `scroll-focus-stack.tsx`):
```tsx
const headerRef = useRef<HTMLElement>(null);

useEffect(() => {
  const header = headerRef.current;
  if (!header) return;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reducedMotion.matches) return;
  let scheduled = 0;
  const onScroll = () => {
    if (scheduled) return;
    scheduled = window.requestAnimationFrame(() => {
      scheduled = 0;
      header.classList.toggle("is-condensed", window.scrollY > 40);
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => {
    window.removeEventListener("scroll", onScroll);
    if (scheduled) window.cancelAnimationFrame(scheduled);
  };
}, []);
```
Attach `ref={headerRef}` to the `<header className={...}>` element.

In `PageLayout`, mount `<ScrollProgress />` right after `<div ref={pageRef} className="site-page">` opens — it should render above everything on every route.

## 2. `src/components/content-sections.tsx`
**Count-up metrics** — replace the `.map` body of `MetricsStrip` with a `Metric` sub-component:
```tsx
function Metric({ value, label, index }: { value: string; label: string; index: number }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const target = parseFloat(value.replace(/[^0-9.]/g, ""));
    const prefix = value.match(/^\D*/)?.[0].replace(/[0-9]/g, "") ?? "";
    const suffix = value.match(/\D*$/)?.[0] ?? "";
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        if (reducedMotion.matches) { el.textContent = value; return; }
        const start = performance.now();
        const step = (t: number) => {
          const p = Math.min(1, (t - start) / 1100);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = `${prefix}${Math.round(target * eased)}${suffix}`;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return (
    <div>
      <small>0{index + 1}</small>
      <strong ref={ref}>0</strong>
      <span>{label}</span>
    </div>
  );
}

export function MetricsStrip() {
  return (
    <div className="metrics-strip section-wrap">
      {metrics.map(([value, label], i) => (
        <Metric key={label} value={value} label={label} index={i} />
      ))}
    </div>
  );
}
```

**Infinite tech marquee** — wrap `TechnologyBand`'s items in a duplicated `.tech-band-track`:
```tsx
export function TechnologyBand() {
  const Row = () => (
    <>
      {technologies.map(([name, image]) => (
        <div key={name}>
          <img {...image} alt={`${name} logo`} loading="lazy" decoding="async" />
          <span>{name}</span>
        </div>
      ))}
    </>
  );
  return (
    <div className="tech-band">
      <div className="tech-band-track"><Row /><Row /></div>
    </div>
  );
}
```

## 3. `src/routes/index.tsx` (homepage)
```tsx
import { PinnedServicesShowcase } from "@/components/pinned-services-showcase";
```
Replace `<ServicesGrid />` inside the `stack-services` chapter with `<PinnedServicesShowcase />`. Everything else in that chapter (heading, CTA) stays.

## 4. `src/routes/projects.tsx`
```tsx
import { ProjectsShowcaseGrid } from "@/components/projects-showcase-grid";
```
Replace:
```tsx
<ProjectsGrid />
```
with:
```tsx
<ProjectsShowcaseGrid limit={8} />
```
(Drop the now-unused `ProjectsGrid` import from this file only — it's still used on the homepage.)

## 5. `src/components/hero-video.tsx` (optional, only if exposing an autoplay toggle)
No change required for the redesign itself — the reference DC's "autoplay hero video" tweak maps to the existing `reducedMotion` check already in this file. Leave as-is unless product wants a manual toggle exposed in the UI.

## Not changed
- `/services` and `/about-us` already run their content through `PageLayout`'s generic `.scroll-reveal` `IntersectionObserver` (see `site-shell.tsx`), which already covers `.service-card`, `.values-grid article`, `.industry-grid article`, `.founder-story`, `.contact-options > a`, `.contact-form`, etc. No structural change needed there — only the small hover-lift CSS in `styles-additions.css`.
