// @vitest-environment node
import { describe, expect, it } from "vitest";
import { prefersReducedMotion, supportsWebGL } from "./motion";

// These two helpers are the SSR-safe capability probes the immersive layer
// relies on to decide between the live WebGL/motion experience and the static
// fallback. This suite pins their server-side contract: with no `window` /
// `document` (the Node environment, matching SSR), they must return the
// conservative, motion-free, no-WebGL defaults so the server always renders the
// accessible fallback. The React hooks (useReducedMotion/useHasMounted) are not
// exercised here because they require a DOM environment; their server contract
// is "start false", which these primitives already encode.

describe("motion SSR-safe capability probes", () => {
  it("has no DOM globals in this environment (SSR parity)", () => {
    // Guards the assumptions below: if a DOM ever leaks in, these assertions
    // would need revisiting rather than silently passing for the wrong reason.
    expect(typeof window).toBe("undefined");
    expect(typeof document).toBe("undefined");
  });

  it("prefersReducedMotion() returns false without a window", () => {
    expect(prefersReducedMotion()).toBe(false);
  });

  it("supportsWebGL() returns false without a document", () => {
    expect(supportsWebGL()).toBe(false);
  });
});
