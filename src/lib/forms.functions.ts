import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";
import { assertHumanTiming, enforceRateLimit } from "./submission-guards";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().max(160),
  message: z.string().trim().min(1).max(2000),
  website: z.string().max(0),
  startedAt: z.number().int().positive(),
});

const playbookSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  website: z.string().max(0),
  startedAt: z.number().int().positive(),
});

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`)
          headers.delete("Authorization");
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}

// Railway terminates TLS upstream, so the socket address is always the proxy.
function clientIp(): string {
  const headers = getRequest()?.headers;
  const forwarded = headers?.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headers?.get("x-real-ip") || "unknown";
}

// Fires a notification email through Resend when RESEND_API_KEY and NOTIFY_EMAIL are
// set. The row is already saved by this point, so a failure here is logged, never
// surfaced to the visitor.
async function notify(subject: string, lines: Record<string, string>) {
  const apiKey = process.env["RESEND_API_KEY"];
  const to = process.env["NOTIFY_EMAIL"];
  if (!apiKey || !to) return;

  const body = Object.entries(lines)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
      body: JSON.stringify({
        from: process.env["NOTIFY_FROM"] ?? "DEMAze site <onboarding@resend.dev>",
        to,
        subject,
        text: body,
        ...(lines["Email"] ? { reply_to: lines["Email"] } : {}),
      }),
    });
    if (!response.ok)
      console.error(`Resend responded ${response.status}: ${await response.text()}`);
  } catch (error) {
    console.error(error);
  }
}

export const submitContact = createServerFn({ method: "POST" })
  .validator((input) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    assertHumanTiming(data.startedAt);
    enforceRateLimit(clientIp());
    const { website: _honeypot, startedAt: _startedAt, ...submission } = data;
    const { error } = await publicClient().from("contact_submissions").insert(submission);
    if (error) throw new Error("We could not send your enquiry. Please try again.");
    await notify(`New enquiry from ${submission.name}`, {
      Name: submission.name,
      Email: submission.email,
      Subject: submission.subject || "(none)",
      Message: submission.message,
    });
    return { ok: true };
  });

export const requestPlaybook = createServerFn({ method: "POST" })
  .validator((input) => playbookSchema.parse(input))
  .handler(async ({ data }) => {
    assertHumanTiming(data.startedAt);
    enforceRateLimit(clientIp());
    const { website: _honeypot, startedAt: _startedAt, ...submission } = data;
    const { error } = await publicClient().from("playbook_downloads").insert(submission);
    if (error) throw new Error("We could not save your request. Please try again.");
    await notify(`Playbook request from ${submission.name}`, {
      Name: submission.name,
      Email: submission.email,
    });
    return { ok: true };
  });
