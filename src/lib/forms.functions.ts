import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

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

export const submitContact = createServerFn({ method: "POST" })
  .validator((input) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    if (Date.now() - data.startedAt < 1800 || Date.now() - data.startedAt > 3_600_000)
      throw new Error("Invalid submission timing.");
    const { website: _honeypot, startedAt: _startedAt, ...submission } = data;
    const { error } = await publicClient().from("contact_submissions").insert(submission);
    if (error) throw new Error("We could not send your enquiry. Please try again.");
    return { ok: true };
  });

export const requestPlaybook = createServerFn({ method: "POST" })
  .validator((input) => playbookSchema.parse(input))
  .handler(async ({ data }) => {
    if (Date.now() - data.startedAt < 1800 || Date.now() - data.startedAt > 3_600_000)
      throw new Error("Invalid submission timing.");
    const { website: _honeypot, startedAt: _startedAt, ...submission } = data;
    const { error } = await publicClient().from("playbook_downloads").insert(submission);
    if (error) throw new Error("We could not save your request. Please try again.");
    return { ok: true };
  });
