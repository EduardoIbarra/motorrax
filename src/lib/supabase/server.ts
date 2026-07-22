import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { supabaseConfig } from "@/lib/config";

/** Server-side Supabase client (anon key — respects RLS). */
export function createClient() {
  return createSupabaseClient(supabaseConfig.url, supabaseConfig.anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
