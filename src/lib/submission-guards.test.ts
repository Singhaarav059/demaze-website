import { beforeEach, describe, expect, it } from "vitest";
import {
  SubmissionRejected,
  assertHumanTiming,
  enforceRateLimit,
  resetRateLimit,
} from "./submission-guards";

const T0 = 1_800_000_000_000;

describe("enforceRateLimit", () => {
  beforeEach(resetRateLimit);

  it("allows five submissions then rejects the sixth", () => {
    for (let i = 0; i < 5; i++) expect(() => enforceRateLimit("1.2.3.4", T0 + i)).not.toThrow();
    expect(() => enforceRateLimit("1.2.3.4", T0 + 5)).toThrow(SubmissionRejected);
  });

  it("counts each address separately", () => {
    for (let i = 0; i < 5; i++) enforceRateLimit("1.2.3.4", T0 + i);
    expect(() => enforceRateLimit("5.6.7.8", T0)).not.toThrow();
  });

  it("lets the window expire", () => {
    for (let i = 0; i < 5; i++) enforceRateLimit("1.2.3.4", T0 + i);
    expect(() => enforceRateLimit("1.2.3.4", T0 + 10 * 60_000)).not.toThrow();
  });
});

describe("assertHumanTiming", () => {
  it("rejects a form posted the instant it rendered", () => {
    expect(() => assertHumanTiming(T0, T0 + 100)).toThrow(SubmissionRejected);
  });

  it("rejects a page that has been open for over an hour", () => {
    expect(() => assertHumanTiming(T0, T0 + 3_600_001)).toThrow(SubmissionRejected);
  });

  it("accepts a plausible fill time", () => {
    expect(() => assertHumanTiming(T0, T0 + 30_000)).not.toThrow();
  });
});
