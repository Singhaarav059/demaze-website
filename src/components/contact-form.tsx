import { useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContact } from "@/lib/forms.functions";

export function ContactForm() {
  const submit = useServerFn(submitContact);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const statusRef = useRef<HTMLDivElement>(null);
  const [startedAt] = useState(() => Date.now());
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      await submit({
        data: {
          name: String(form.get("name") ?? ""),
          email: String(form.get("email") ?? ""),
          subject: String(form.get("subject") ?? ""),
          message: String(form.get("message") ?? ""),
          website: String(form.get("website") ?? ""),
          startedAt,
        },
      });
      event.currentTarget.reset();
      setState("sent");
      requestAnimationFrame(() => statusRef.current?.focus());
    } catch {
      setError("We could not send your enquiry. Please check your details and try again.");
      setState("error");
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }
  if (state === "sent")
    return (
      <div ref={statusRef} tabIndex={-1} className="form-success" role="status">
        <CheckCircle2 />
        <h3>Thank you. Your enquiry is with us.</h3>
        <p>Our team will respond using the email address you provided.</p>
      </div>
    );
  return (
    <form className="contact-form" onSubmit={handleSubmit} aria-busy={state === "sending"}>
      <div className="form-field">
        <label htmlFor="contact-name">Name</label>
        <Input
          id="contact-name"
          name="name"
          required
          minLength={1}
          maxLength={100}
          autoComplete="name"
          placeholder="Jane Smith"
        />
      </div>
      <div className="form-field">
        <label htmlFor="contact-email">Email</label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          required
          maxLength={255}
          autoComplete="email"
          placeholder="jane@company.com"
        />
      </div>
      <div className="form-field">
        <label htmlFor="contact-subject">Subject of interest</label>
        <Input
          id="contact-subject"
          name="subject"
          maxLength={160}
          placeholder="Regarding a project"
        />
      </div>
      <div className="form-field form-wide">
        <label htmlFor="contact-message">How may we assist you?</label>
        <Textarea
          id="contact-message"
          name="message"
          required
          minLength={1}
          maxLength={2000}
          rows={5}
        />
      </div>
      <label className="honeypot" aria-hidden="true">
        Website
        <Input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      {state === "error" && (
        <p ref={statusRef} tabIndex={-1} className="form-error" role="alert">
          {error}
        </p>
      )}
      <Button variant="editorial" size="hero" disabled={state === "sending"}>
        {" "}
        {state === "sending" ? "Sending..." : "Submit enquiry"}
        <ArrowUpRight />
      </Button>
    </form>
  );
}
