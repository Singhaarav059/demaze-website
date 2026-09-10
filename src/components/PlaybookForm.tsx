"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { site } from "@/content/site";

/**
 * Playbook request form. There is no submission endpoint in this app by
 * design, so this mirrors ContactForm's client-only approach: it validates the
 * fields, opens the visitor's mail client with a pre-filled request to
 * {site.email}, and then shows the success state. A hidden honeypot ("website")
 * catches naive bots, and the button stays disabled until hydration so a
 * scripts-off native POST cannot fire against a route that does not exist
 * (a noscript mailto fallback is offered instead). The status region mirrors
 * the prior site's sending / sent / error copy.
 */
export default function PlaybookForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const isHydrated = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [startedAt] = useState(() => Date.now());

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formEl = event.currentTarget;
    if (!formEl.reportValidity()) return;

    const data = new FormData(formEl);
    // Honeypot: a real person never fills a field hidden from them, and a
    // near-instant submission is almost certainly automated.
    const trap = String(data.get("website") ?? "");
    const tooFast = Date.now() - startedAt < 800;
    if (trap || tooFast) {
      setState("error");
      requestAnimationFrame(() => statusRef.current?.focus());
      return;
    }

    setState("sending");
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    try {
      const body = `Name: ${name}\nEmail: ${email}\n\nPlease send me the Complete AI-Powered Development Pipeline Playbook.`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        "Playbook request: AI Development Pipeline",
      )}&body=${encodeURIComponent(body)}`;
      formEl.reset();
      setState("sent");
      requestAnimationFrame(() => statusRef.current?.focus());
    } catch {
      setState("error");
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }

  if (state === "sent") {
    return (
      <div ref={statusRef} tabIndex={-1} className="playbook-success" role="status">
        <h3>Your request is in.</h3>
        <p>
          We will email the playbook to the address you gave us, usually within
          one working day.
        </p>
      </div>
    );
  }

  return (
    <>
      <form
        ref={formRef}
        method="post"
        onSubmit={handleSubmit}
        className="contact-form playbook-form"
        aria-busy={state === "sending"}
      >
        <label className="contact-field">
          <span>
            Name <b aria-hidden>*</b>
          </span>
          <input
            name="name"
            required
            minLength={1}
            maxLength={100}
            autoComplete="name"
            placeholder="Jane Smith"
          />
        </label>
        <label className="contact-field">
          <span>
            Email <b aria-hidden>*</b>
          </span>
          <input
            name="email"
            type="email"
            required
            maxLength={255}
            autoComplete="email"
            placeholder="jane@company.com"
          />
        </label>
        {/* Honeypot: hidden from people, tempting to bots. */}
        <label className="honeypot" aria-hidden>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
        {state === "error" && (
          <p
            ref={statusRef}
            tabIndex={-1}
            className="playbook-error"
            role="alert"
          >
            We could not save your request. Please try again.
          </p>
        )}
        <button
          className="pill-button"
          type="submit"
          disabled={!isHydrated || state === "sending"}
        >
          {state === "sending" ? "Submitting..." : "Submit to download"}{" "}
          <span aria-hidden>-&gt;</span>
        </button>
      </form>
      <noscript>
        <p className="contact-noscript">
          Please email{" "}
          <a className="arrow-link" href={`mailto:${site.email}`}>
            {site.email}
          </a>{" "}
          to request the AI Development Pipeline Playbook.
        </p>
      </noscript>
    </>
  );
}
