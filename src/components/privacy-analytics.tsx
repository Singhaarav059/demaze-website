import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const CONSENT_KEY = "demaze-analytics-consent";

export function PrivacyAnalytics() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [consent, setConsent] = useState<"yes" | "no" | null>(null);
  const [trackerPresent, setTrackerPresent] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(CONSENT_KEY);
    if (saved === "yes" || saved === "no") setConsent(saved);

    // The only analytics sink is the one lovable.js injects inside the editor
    // preview. On the self-hosted deploy it never appears, so asking for consent
    // there would be asking permission for something that cannot happen. Give the
    // script a tick to install itself, then decide whether the banner is honest.
    const timer = window.setTimeout(
      () => setTrackerPresent(typeof window.__lovableEvents?.track === "function"),
      1200,
    );
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (consent === "yes") window.__lovableEvents?.track?.("page_view", { path: pathname });
  }, [consent, pathname]);

  const decide = (value: "yes" | "no") => {
    window.localStorage.setItem(CONSENT_KEY, value);
    setConsent(value);
  };

  if (consent !== null || !trackerPresent) return null;
  return (
    <aside className="consent-banner" aria-label="Analytics preference">
      <p>
        <strong>Your privacy matters.</strong> Allow anonymous usage analytics to help us improve
        this website. No advertising profiles are created.
      </p>
      <div>
        <Button variant="outline" onClick={() => decide("no")}>
          Decline
        </Button>
        <Button onClick={() => decide("yes")}>Allow analytics</Button>
      </div>
    </aside>
  );
}
