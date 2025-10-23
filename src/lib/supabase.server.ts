import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export async function createSupabaseServerClient() {
  try {
    const cookieStore = await cookies();
    
    return createServerClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: (cookiesToSet) => {
            try {
              cookiesToSet.forEach(({ name, value, options }) => 
                cookieStore.set(name, value, options)
              );
            } catch {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      }
    );
  } catch (cookieError: any) {
    // If cookies() is called outside a request scope (e.g., during signup),
    // throw a specific error that can be caught and handled
    throw new Error(`cookieError: ${cookieError.message}`);
  }
}

export function createSupabaseServiceClient() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );
}

export const serverAuth = {
  getUser: async () => {
    const supabase = await createSupabaseServerClient();
    return supabase.auth.getUser();
  },

  getSession: async () => {
    const supabase = await createSupabaseServerClient();
    return supabase.auth.getSession();
  },
};