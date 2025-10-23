import { createSupabaseServerClient, createSupabaseServiceClient, serverAuth } from '../../supabase.server';
import { SupabaseClient } from '@supabase/supabase-js';

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private client: SupabaseClient | null = null;

  private constructor() {}

  static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  async getConnection(): Promise<SupabaseClient | null> {
    try {
      const { data: { user }, error } = await serverAuth.getUser();
      
      if (error || !user) return null;

      if (!this.client) {
        this.client = await createSupabaseServerClient();
      }
      
      return this.client;
    } catch (cookieError: any) {
      // If cookies are not available (e.g., during signup), return null
      // This allows the calling code to handle the case gracefully
      if (cookieError.message.includes('cookieError')) {
        console.log('Cookie error in getConnection, returning null:', cookieError.message);
        return null;
      }
      // Re-throw other errors
      throw cookieError;
    }
  }

  getServiceConnection(): SupabaseClient {
    return createSupabaseServiceClient();
  }

  clearConnection(): void {
    this.client = null;
  }
}

export const dbConnection = DatabaseConnection.getInstance();
export const getAuthenticatedConnection = () => dbConnection.getConnection();
export const getServiceConnection = () => dbConnection.getServiceConnection();