"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/content/site";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const body = `${message}\n\nFrom ${name} (${email})`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject || "New inquiry",
    )}&body=${encodeURIComponent(body)}`;
  }

  const inputClass =
    "border-b border-paper/20 bg-transparent py-3 text-paper placeholder:text-paper-dim focus:border-accent focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <input
        required
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={inputClass}
      />
      <input
        required
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClass}
      />
      <input
        placeholder="Subject of interest"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className={inputClass}
      />
      <textarea
        required
        rows={4}
        placeholder="How may we assist you?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={inputClass}
      />
      <button
        type="submit"
        className="mt-2 w-fit rounded-full bg-accent px-7 py-3 font-display text-sm text-ink transition-transform hover:scale-105"
      >
        Submit
      </button>
    </form>
  );
}
