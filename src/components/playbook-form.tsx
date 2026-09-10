import { useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requestPlaybook } from "@/lib/forms.functions";

export function PlaybookForm() {
  const submit = useServerFn(requestPlaybook);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const statusRef = useRef<HTMLDivElement>(null);
  const [startedAt] = useState(() => Date.now());
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    const form = new FormData(event.currentTarget);
    try {
      await submit({
        data: {
          name: String(form.get("name") ?? ""),
          email: String(form.get("email") ?? ""),
          website: String(form.get("website") ?? ""),
          startedAt,
        },
      });
      event.currentTarget.reset();
      setState("sent");
      requestAnimationFrame(() => statusRef.current?.focus());
    } catch {
      setState("error");
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }
  if (state === "sent")
    return (
      <div ref={statusRef} tabIndex={-1} className="form-success" role="status">
        <CheckCircle2 />
        <h3>Your request is saved.</h3>
        <p>The DEMAze team will send the guide to the email you provided.</p>
      </div>
    );
  return (
    <form className="playbook-form" onSubmit={handleSubmit} aria-busy={state === "sending"}>
      <div className="form-field">
        <label htmlFor="playbook-name">Name</label>
        <Input
          id="playbook-name"
          name="name"
          required
          minLength={1}
          maxLength={100}
          autoComplete="name"
          placeholder="Jane Smith"
        />
      </div>
      <div className="form-field">
        <label htmlFor="playbook-email">Email</label>
        <Input
          id="playbook-email"
          name="email"
          type="email"
          required
          maxLength={255}
          autoComplete="email"
          placeholder="jane@company.com"
        />
      </div>
      <label className="honeypot" aria-hidden="true">
        Website
        <Input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      {state === "error" && (
        <p ref={statusRef} tabIndex={-1} className="form-error" role="alert">
          We could not save your request. Please try again.
        </p>
      )}
      <Button variant="editorial" size="hero" disabled={state === "sending"}>
        {state === "sending" ? "Submitting..." : "Submit to download"}
        <Download />
      </Button>
    </form>
  );
}
