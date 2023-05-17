import { createClient } from "@supabase/supabase-js";
// const supabaseUrl = process.env.PUBLIC_SUPABASE_URL!;
// const supabaseKey = process.env.PUBLIC_SUPABASE_API_KEY!;
// export const supabase = createClient(supabaseUrl, supabaseKey);

export const supabase = createClient(
  "https://fcvitlaqeajaobskxzie.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjdml0bGFxZWFqYW9ic2t4emllIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQyNjYwMDEsImV4cCI6MTk5OTg0MjAwMX0.m10MY1KwlLnetCFSsjYjPPw35KUb6bt9CYQzr1gYzA4"
);
