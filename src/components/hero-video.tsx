import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroVideo({ poster, webm, mp4 }: { poster: string; webm: string; mp4: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }
    void video
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
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
    <div className="hero-visual animate-visual" aria-label="Animated DEMAze robot studio">
      <video
        ref={videoRef}
        poster={poster}
        loop
        muted
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={webm} type="video/webm" />
        <source src={mp4} type="video/mp4" />
      </video>
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
