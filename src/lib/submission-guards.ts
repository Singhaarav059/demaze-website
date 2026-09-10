// Pure spam guards for the public forms. Kept out of forms.functions.ts so they
// can be tested without booting the server runtime.

// ponytail: in-process fixed window, fine for the single Railway instance this
// runs on. Move to Postgres or Redis if the service is ever scaled past one replica.
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;
const MAX_TRACKED_KEYS = 5000;

const hits = new Map<string, number[]>();

export class SubmissionRejected extends Error {}

/** Throws once a key has submitted MAX_PER_WINDOW times inside WINDOW_MS. */
export function enforceRateLimit(key: string, now = Date.now()) {
  const recent = (hits.get(key) ?? []).filter((at) => now - at < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW)
    throw new SubmissionRejected("Too many submissions. Please try again later.");
  recent.push(now);
  hits.set(key, recent);

  // Drop fully expired buckets so the map cannot grow without bound.
  if (hits.size > MAX_TRACKED_KEYS)
    for (const [other, times] of hits)
      if (times.every((at) => now - at >= WINDOW_MS)) hits.delete(other);
}

/**
 * Rejects submissions that arrive implausibly fast (bots posting the form the
 * instant it renders) or from a page that has been open for over an hour.
 */
export function assertHumanTiming(startedAt: number, now = Date.now()) {
  const elapsed = now - startedAt;
  if (elapsed < 1800 || elapsed > 3_600_000)
    throw new SubmissionRejected("Invalid submission timing.");
}

/** Test seam: forget every tracked key. */
export function resetRateLimit() {
  hits.clear();
}
