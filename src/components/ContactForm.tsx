"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { serviceCategories } from "@/content/services";

/**
 * Composes a mailto: draft. There is no backend or API route in this project,
 * so a real submit endpoint would be a lie about where the message goes.
 */
export default function ContactForm() {
  const [service, setService] = useState(serviceCategories[0].name);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = [
      `Name: ${data.get("name")}`,
      `Company: ${data.get("company") || "n/a"}`,
      `Email: ${data.get("email")}`,
      `Interested in: ${data.get("service")}`,
      "",
      String(data.get("message") ?? ""),
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `Project enquiry: ${data.get("service")}`,
    )}&body=${encodeURIComponent(body)}`;
  };

  const field =
    "border-line focus:border-accent w-full rounded-[14px] border bg-white/60 px-4 py-3 text-sm font-semibold outline-none transition-colors placeholder:text-muted/60";

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="label text-muted">Name</span>
          <input name="name" required autoComplete="name" placeholder="Your name" className={field} />
        </label>
        <label className="grid gap-2">
          <span className="label text-muted">Company</span>
          <input name="company" autoComplete="organization" placeholder="Optional" className={field} />
        </label>
      </div>

      <label className="grid gap-2">
        <span className="label text-muted">Email</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className={field}
        />
      </label>

      <fieldset className="grid gap-2">
        <legend className="label text-muted mb-2">What do you need</legend>
        <input type="hidden" name="service" value={service} />
        <div className="flex flex-wrap gap-2">
          {serviceCategories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setService(cat.name)}
              aria-pressed={service === cat.name}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                service === cat.name
                  ? "border-accent bg-accent text-white"
                  : "border-line text-muted hover:border-ink"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="grid gap-2">
        <span className="label text-muted">Project</span>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="What are you building, and what is in the way?"
          className={`${field} resize-y`}
        />
      </label>

      <button
        type="submit"
        className="bg-accent hover:bg-accent-deep mt-2 justify-self-start rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-colors"
      >
        Send enquiry
      </button>
      <p className="text-muted text-xs font-semibold">
        This opens a pre-filled draft in your own mail client, addressed to {site.email}.
      </p>
    </form>
  );
}
