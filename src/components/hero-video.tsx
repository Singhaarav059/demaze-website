import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroVideo({ poster, mp4 }: { poster: string; mp4: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  // Tracks a pause the user triggered via the control button, so the
  // IntersectionObserver does not auto-resume a video they deliberately stopped.
  const userPausedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (reducedMotion.matches) {
        video.pause();
        return;
      }
      if (userPausedRef.current) return;
      void video
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    };
    apply();
    reducedMotion.addEventListener("change", apply);

    // Pause the looping video while it is scrolled off-screen so it stops
    // decoding, and resume when it returns (unless reduced motion is on or the
    // user manually paused it).
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (!entry.isIntersecting) {
          video.pause();
          return;
        }
        if (reducedMotion.matches || userPausedRef.current) return;
        void video
          .play()
          .then(() => setPlaying(true))
          .catch(() => setPlaying(false));
      },
      { threshold: 0.1 },
    );
    visibilityObserver.observe(video);

    // RedSun-inspired scroll-driven 3D perspective tilt & scale
    let scheduled = false;
    const handleScroll = () => {
      if (scheduled || !container || reducedMotion.matches) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        const scrollY = window.scrollY || window.pageYOffset;
        const maxScroll = 450;
        const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
        const tilt = (1 - progress) * 7.5; // from 7.5deg down to 0deg
        const scale = 0.94 + progress * 0.06; // from 0.94 up to 1.00
        container.style.setProperty("--hero-tilt", `${tilt.toFixed(2)}deg`);
        container.style.setProperty("--hero-scale", scale.toFixed(3));
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      reducedMotion.removeEventListener("change", apply);
      visibilityObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPausedRef.current = false;
      void video.play().then(() => setPlaying(true));
    } else {
      userPausedRef.current = true;
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <div ref={containerRef} className="hero-perspective-card hero-visual animate-visual">
      <video
        ref={videoRef}
        poster={poster}
        src={mp4}
        width={960}
        height={540}
        loop
        muted
        playsInline
        preload="metadata"
        aria-label="Animated illustration of DEMAze robots collaborating"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <Button
        className="video-control"
        variant="outline"
        size="icon"
        onClick={toggle}
        aria-label={playing ? "Pause animation" : "Play animation"}
      >
        {playing ? <Pause /> : <Play />}
      </Button>
    </div>
  );
}
