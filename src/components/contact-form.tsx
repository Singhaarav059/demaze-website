import { useState } from "react";
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
        },
      });
      event.currentTarget.reset();
      setState("sent");
    } catch {
      setError("We could not send your enquiry. Please check your details and try again.");
      setState("error");
    }
  }
  if (state === "sent")
    return (
      <div className="form-success" role="status">
        <CheckCircle2 />
        <h3>Thank you. Your enquiry is with us.</h3>
        <p>Our team will respond using the email address you provided.</p>
      </div>
    );
  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        Name
        <Input name="name" required maxLength={100} autoComplete="name" placeholder="Jane Smith" />
      </label>
      <label>
        Email
        <Input
          name="email"
          type="email"
          required
          maxLength={255}
          autoComplete="email"
          placeholder="jane@company.com"
        />
      </label>
      <label>
        Subject of interest
        <Input name="subject" maxLength={160} placeholder="Regarding a project" />
      </label>
      <label className="form-wide">
        How may we assist you?
        <Textarea name="message" required maxLength={2000} rows={5} />
      </label>
      <label className="honeypot" aria-hidden="true">
        Website
        <Input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      {state === "error" && (
        <p className="form-error" role="alert">
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
