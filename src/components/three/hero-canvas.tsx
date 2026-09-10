import { ClientCanvas } from "@/components/three/client-canvas";
import { HeroVideo } from "@/components/hero-video";

// Drop-in immersive hero backdrop. It wires the SSR-safe ClientCanvas boundary
// to the existing self-hosted hero video as its fallback, so:
//   - on the server / before hydration -> the video renders,
//   - when WebGL is unavailable or reduced motion is on -> the video renders,
//   - otherwise -> the R3F scene renders behind the content.
// The video already handles offscreen-pause + reduced-motion internally, so the
// hero is fully functional and accessible without WebGL. Importing this file
// pulls in NO three code at module scope (three lives behind ClientCanvas's
// dynamic import), so routes can import it without breaking SSR.

export function HeroCanvas({ poster, mp4 }: { poster: string; mp4: string }) {
  return <ClientCanvas fallback={<HeroVideo poster={poster} mp4={mp4} />} />;
}
