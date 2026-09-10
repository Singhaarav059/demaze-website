import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroVideo({ poster, mp4 }: { poster: string; mp4: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (reducedMotion.matches) {
        video.pause();
        return;
      }
      void video
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    };
    apply();
    // Honour the setting being toggled after load, not just at mount.
    reducedMotion.addEventListener("change", apply);
    return () => reducedMotion.removeEventListener("change", apply);
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play().then(() => setPlaying(true));
    else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="hero-visual animate-visual">
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
