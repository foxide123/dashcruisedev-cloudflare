// supabase/edge.ts

import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export function createClient(
  env: { SUPABASE_URL: string; SUPABASE_ANON_KEY: string },
  token?: string
) {
  return createSupabaseClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    global: {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
    },
  });
}
