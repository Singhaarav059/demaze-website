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
    // Tracks whether the whole stack is currently within (or near) the viewport.
    // While it is fully off-screen, scroll events do no layout reads and schedule
    // no rAF, so scrolling the rest of the page stays cheap.
    let stackVisible = true;

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

      // Batch all layout reads BEFORE any style writes. Reading a
      // getBoundingClientRect() after a style write in the previous iteration
      // would force a synchronous reflow every step (layout thrash), so gather
      // every stage's top edge up front, then write in a second pass.
      const viewportHeight = window.innerHeight;
      const directions = stages.map((stage) =>
        stage.getBoundingClientRect().top > viewportHeight * 0.45 ? 1 : -1,
      );

      chapters.forEach((chapter, index) => {
        if (!chapter) return;
        const focus = currentValues[index] ?? 0;
        const direction = directions[index] ?? -1;
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

    // measure() reads getBoundingClientRect for every stage, which forces layout.
    // Scroll fires more often than the compositor paints, so coalesce to one read
    // per frame instead of one per event.
    let scheduled = 0;
    const onScroll = () => {
      // Skip all work while the entire stack is scrolled out of view: no layout
      // read, no rAF scheduled. The IntersectionObserver below flips stackVisible.
      if (!stackVisible || scheduled) return;
      scheduled = window.requestAnimationFrame(() => {
        scheduled = 0;
        measure();
      });
    };

    // Observe the stack itself so we only run the scroll pipeline when it is on
    // (or near) screen. A generous rootMargin keeps the spring warmed up just
    // before the stack scrolls into view so there is no visible pop-in.
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        stackVisible = entry.isIntersecting;
        if (stackVisible) {
          measure();
        } else if (scheduled) {
          window.cancelAnimationFrame(scheduled);
          scheduled = 0;
        }
      },
      { rootMargin: "40% 0px 40% 0px" },
    );
    visibilityObserver.observe(stack);

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      visibilityObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (scheduled) window.cancelAnimationFrame(scheduled);
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
