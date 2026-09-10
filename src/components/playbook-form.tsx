import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requestPlaybook } from "@/lib/forms.functions";

export function PlaybookForm() {
  const submit = useServerFn(requestPlaybook);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
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
        },
      });
      event.currentTarget.reset();
      setState("sent");
    } catch {
      setState("error");
    }
  }
  if (state === "sent")
    return (
      <div className="form-success" role="status">
        <CheckCircle2 />
        <h3>Your request is saved.</h3>
        <p>
          The original website does not expose a public guide file. The DEMAze team can send it to
          the email you provided.
        </p>
      </div>
    );
  return (
    <form className="playbook-form" onSubmit={handleSubmit}>
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
      <label className="honeypot" aria-hidden="true">
        Website
        <Input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      {state === "error" && (
        <p className="form-error" role="alert">
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
