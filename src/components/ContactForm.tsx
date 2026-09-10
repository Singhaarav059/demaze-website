"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { site } from "@/content/site";
import { serviceCategories } from "@/content/services";

type Draft = {
  name: string;
  company: string;
  email: string;
  service: string;
  message: string;
};

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const draftRef = useRef<HTMLElement>(null);
  const isHydrated = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const [draft, setDraft] = useState<Draft | null>(null);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle",
  );

  useEffect(() => {
    if (draft) draftRef.current?.focus();
  }, [draft]);

  const buildDraft = (): Draft => {
    const data = new FormData(formRef.current!);
    return {
      name: String(data.get("name")),
      company: String(data.get("company") || "Not provided"),
      email: String(data.get("email")),
      service: String(data.get("service") || "General enquiry"),
      message: String(data.get("message")),
    };
  };

  const emailText = (item: Draft) =>
    `Name: ${item.name}\nCompany: ${item.company}\nEmail: ${item.email}\nInterested in: ${item.service}\n\n${item.message}`;

  const prepare = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;

    setDraft(buildDraft());
    setCopyState("idle");
  };

  const openMail = () => {
    if (!draft) return;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `Project enquiry: ${draft.service}`,
    )}&body=${encodeURIComponent(emailText(draft))}`;
  };

  const copyDraft = async () => {
    if (!draft) return;

    try {
      await navigator.clipboard.writeText(emailText(draft));
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  };

  return (
    <>
      <form
        ref={formRef}
        method="post"
        onChange={() => setDraft(null)}
        onSubmit={prepare}
        className="contact-form"
      >
        <div className="contact-field-row">
          <label className="contact-field">
            <span>
              Name <b aria-hidden>*</b>
            </span>
            <input
              name="name"
              required
              minLength={2}
              maxLength={100}
              autoComplete="name"
              placeholder="Your name"
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
              maxLength={254}
              autoComplete="email"
              placeholder="you@company.com"
            />
          </label>
        </div>
        <label className="contact-field">
          <span>Company</span>
          <input
            name="company"
            maxLength={120}
            autoComplete="organization"
            placeholder="Optional"
          />
        </label>
        <label className="contact-field">
          <span>What are you looking for?</span>
          <select name="service" defaultValue={serviceCategories[0].name}>
            {serviceCategories.map((category) => (
              <option key={category.key} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label className="contact-field">
          <span>
            Message <b aria-hidden>*</b>
          </span>
          <textarea
            name="message"
            required
            minLength={20}
            maxLength={4000}
            rows={6}
            placeholder="What are you building, improving, or trying to understand?"
          />
        </label>
        <button className="pill-button" type="submit" disabled={!isHydrated}>
          Send message <span aria-hidden>-&gt;</span>
        </button>
      </form>
      <noscript>
        <p className="contact-noscript">
          Please email{" "}
          <a className="arrow-link" href={`mailto:${site.email}`}>
            {site.email}
          </a>{" "}
          directly with your project brief.
        </p>
      </noscript>
      {draft && (
        <section
          ref={draftRef}
          tabIndex={-1}
          className="contact-draft"
          aria-live="polite"
        >
          <div>
            <p className="eyebrow-dot">Draft preview</p>
            <p>
              Ready for <b>{site.email}</b>. Opening your mail app does not send
              it.
            </p>
          </div>
          <pre>{emailText(draft)}</pre>
          <div className="contact-draft-actions">
            <button type="button" className="pill-button" onClick={openMail}>
              Open email app <span aria-hidden>-&gt;</span>
            </button>
            <button
              type="button"
              className="contact-button-light"
              onClick={copyDraft}
            >
              Copy draft
            </button>
            {copyState === "copied" && (
              <p role="status">Copied to clipboard.</p>
            )}
            {copyState === "error" && (
              <p role="alert">
                We could not access your clipboard. Select the draft above to
                copy it.
              </p>
            )}
          </div>
        </section>
      )}
    </>
  );
}
