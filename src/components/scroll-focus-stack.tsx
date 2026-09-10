import { Children, useEffect, useRef, type ReactNode } from "react";

export function ScrollFocusStack({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    const stages = Array.from(stack.querySelectorAll<HTMLElement>(":scope > .motion-stage"));
    const chapters = stages.map((stage) => stage.firstElementChild as HTMLElement | null);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactLayout = window.matchMedia("(max-width: 900px)");
    let frame = 0;
    let currentValues = stages.map(() => 0);
    let targetValues = stages.map(() => 0);

    const clearMotion = () =>
      chapters.forEach((chapter) => {
        chapter?.classList.remove("is-motion-active");
        chapter?.style.removeProperty("--chapter-focus");
        chapter?.style.removeProperty("--chapter-y");
      });

    const paint = () => {
      frame = 0;
      if (reducedMotion.matches || compactLayout.matches) {
        clearMotion();
        return;
      }

      let unsettled = false;
      currentValues = currentValues.map((value, index) => {
        const target = targetValues[index] ?? 0;
        const next = value + (target - value) * 0.12;
        if (Math.abs(target - next) > 0.001) unsettled = true;
        return Math.abs(target - next) <= 0.001 ? target : next;
      });

      let activeIndex = 0;
      let strongestFocus = currentValues[0] ?? 0;
      currentValues.forEach((value, index) => {
        if (value > strongestFocus) {
          strongestFocus = value;
          activeIndex = index;
        }
      });

      chapters.forEach((chapter, index) => {
        if (!chapter) return;
        const focus = currentValues[index] ?? 0;
        const bounds = stages[index]?.getBoundingClientRect();
        const direction = bounds && bounds.top > window.innerHeight * 0.45 ? 1 : -1;
        chapter.style.setProperty("--chapter-focus", focus.toFixed(3));
        chapter.style.setProperty("--chapter-y", `${(direction * (1 - focus) * 18).toFixed(2)}px`);
        chapter.classList.toggle("is-motion-active", index === activeIndex && focus > 0.42);
      });

      if (unsettled) frame = window.requestAnimationFrame(paint);
    };

    const measure = () => {
      if (reducedMotion.matches || compactLayout.matches) {
        clearMotion();
        return;
      }
      const viewportHeight = window.innerHeight;
      targetValues = stages.map((stage) => {
        const bounds = stage.getBoundingClientRect();
        const enter = Math.max(
          0,
          Math.min(1, (viewportHeight * 0.88 - bounds.top) / (viewportHeight * 0.58)),
        );
        const exit = Math.max(
          0,
          Math.min(1, (bounds.bottom - viewportHeight * 0.14) / (viewportHeight * 0.58)),
        );
        return Math.min(1, Math.min(enter, exit) * 1.85);
      });
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={stackRef} className={`motion-stack ${className}`.trim()}>
      {Children.map(children, (child, index) => (
        <div className={`motion-stage motion-stage-${index + 1}`}>{child}</div>
      ))}
    </div>
  );
}
