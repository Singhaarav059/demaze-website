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
      service: String(data.get("service")),
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
        className="sp-contact-form"
      >
        <div className="sp-field-row">
          <label>
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
          <label>
            <span>Company</span>
            <input
              name="company"
              maxLength={120}
              autoComplete="organization"
              placeholder="Optional"
            />
          </label>
        </div>
        <label>
          <span>
            Email <b aria-hidden>*</b>
          </span>
          <input
            name="email"
            aria-label="Email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            placeholder="you@company.com"
          />
        </label>
        <fieldset>
          <legend>
            What are you looking for? <b aria-hidden>*</b>
          </legend>
          <div className="sp-radio-grid">
            {serviceCategories.map((category, index) => (
              <label key={category.key}>
                <input
                  type="radio"
                  name="service"
                  value={category.name}
                  defaultChecked={index === 0}
                />
                <span>{category.name}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <label>
          <span>
            Project <b aria-hidden>*</b>
          </span>
          <textarea
            name="message"
            required
            minLength={20}
            maxLength={4000}
            rows={6}
            placeholder="What are you building, and what is in the way?"
          />
        </label>
        <button className="button" type="submit" disabled={!isHydrated}>
          Prepare email <span aria-hidden>→</span>
        </button>
      </form>
      <noscript>
        <p className="sp-noscript">
          Please email{" "}
          <a className="text-link" href={`mailto:${site.email}`}>
            {site.email}
          </a>{" "}
          directly with your project brief.
        </p>
      </noscript>
      {draft && (
        <section
          ref={draftRef}
          tabIndex={-1}
          className="sp-draft"
          aria-live="polite"
        >
          <div>
            <p className="eyebrow">Draft preview</p>
            <p>
              Ready for <b>{site.email}</b>. Opening your mail app does not send
              it.
            </p>
          </div>
          <pre>{emailText(draft)}</pre>
          <div className="sp-draft-actions">
            <button type="button" className="button" onClick={openMail}>
              Open email app <span aria-hidden>↗</span>
            </button>
            <button type="button" className="button-light" onClick={copyDraft}>
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
