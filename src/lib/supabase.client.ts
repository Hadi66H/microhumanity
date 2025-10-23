import { createBrowserClient } from '@supabase/ssr';
import { Country } from '@/components/ui/country-dropdown';

export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export const auth = {
  signUp: async (userData: {
    email: string;
    password: string;
    fullName: string;
    country: Country;
    zipCode?: string;
    phoneNumber?: string;
  }) => {
    const supabase = createSupabaseBrowserClient();
    return supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          full_name: userData.fullName,
          country: userData.country,
          zip_code: userData.zipCode,
          phone_number: userData.phoneNumber,
        },
      },
    });
  },

  signIn: async (email: string, password: string) => {
    const supabase = createSupabaseBrowserClient();
    return supabase.auth.signInWithPassword({ email, password });
  },

  signOut: async () => {
    const supabase = createSupabaseBrowserClient();
    return supabase.auth.signOut();
  },

  getUser: async () => {
    const supabase = createSupabaseBrowserClient();
    return supabase.auth.getUser();
  },

  getSession: async () => {
    const supabase = createSupabaseBrowserClient();
    return supabase.auth.getSession();
  },
};

export const supabase = createSupabaseBrowserClient();
