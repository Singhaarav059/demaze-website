"use client";

import { useEffect, useRef } from "react";

/**
 * Hero background video, shown at its native aspect ratio (no crop, no
 * zoom) inside a rounded frame, with a legibility scrim between it and the
 * text. Wired into the same ambient-motion system as every other animated
 * visual on the site (see MotionControl.tsx): CSS can't pause a <video>,
 * so this reads the data-motion attribute directly instead.
 */
export default function HeroBackgroundVideo() {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const video = videoRef.current;
    if (!frame || !video) return;
    const reducedQuery = matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      const motionState = frame.getAttribute("data-motion");
      const paused = reducedQuery.matches || motionState === "off" || motionState === "paused";
      if (paused) video.pause();
      else video.play().catch(() => {});
    };

    sync();
    const observer = new MutationObserver(sync);
    observer.observe(frame, { attributes: true, attributeFilter: ["data-motion"] });
    reducedQuery.addEventListener("change", sync);

    return () => {
      observer.disconnect();
      reducedQuery.removeEventListener("change", sync);
    };
  }, []);

  return (
    <div className="hero-video-frame" ref={frameRef} data-animated-visual aria-hidden>
      <video
        ref={videoRef}
        className="hero-video"
        src="/hero-transform.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="hero-video-scrim" />
    </div>
  );
}
