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
});

const playbookSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  website: z.string().max(0),
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
  .inputValidator((input) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const { website: _honeypot, ...submission } = data;
    const { error } = await publicClient().from("contact_submissions").insert(submission);
    if (error) throw new Error("We could not send your enquiry. Please try again.");
    return { ok: true };
  });

export const requestPlaybook = createServerFn({ method: "POST" })
  .inputValidator((input) => playbookSchema.parse(input))
  .handler(async ({ data }) => {
    const { website: _honeypot, ...submission } = data;
    const { error } = await publicClient().from("playbook_downloads").insert(submission);
    if (error) throw new Error("We could not save your request. Please try again.");
    return { ok: true };
  });
