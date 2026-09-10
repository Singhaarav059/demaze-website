CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  subject text NOT NULL DEFAULT '' CHECK (char_length(subject) <= 160),
  message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_submissions TO anon, authenticated;
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can submit contact enquiries"
ON public.contact_submissions FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(name) BETWEEN 1 AND 100
  AND char_length(email) BETWEEN 3 AND 255
  AND char_length(subject) <= 160
  AND char_length(message) BETWEEN 1 AND 2000
);

CREATE TABLE public.playbook_downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.playbook_downloads TO anon, authenticated;
GRANT ALL ON public.playbook_downloads TO service_role;
ALTER TABLE public.playbook_downloads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can request the playbook"
ON public.playbook_downloads FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(name) BETWEEN 1 AND 100
  AND char_length(email) BETWEEN 3 AND 255
);