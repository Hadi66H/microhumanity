import { createBrowserClient } from '@supabase/ssr';


export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );
}

export const auth = {
  signUp: async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    company?: string;
    country: string;
    phoneNumber?: string;
  }) => {
    const supabase = createSupabaseBrowserClient();
    return supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          first_name: userData.firstName,
          last_name: userData.lastName,
          company: userData.company,
          country: userData.country,
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
