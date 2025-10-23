import { getAuthenticatedConnection, getServiceConnection } from './connection';

/**
 * Higher-order function that provides a Supabase client to the callback function
 * This provides a centralized way to get the Supabase client for all database operations
 * and avoid checking error/data on each call separately
 * @param {Function} callback - Function that receives the Supabase client
 * @returns {Promise} - Result of the callback function
 */
export const withSupabase = async (callback) => {
  try {
    const supabase = await getAuthenticatedConnection();

    if (!supabase) {
      throw new Error('User is not authenticated. Please login and retry.');
    }
    return await callback(supabase);
  } catch (error) {
    console.error('Database connection failed:', error);
    throw new Error(
      `Database connection failed: ${error.message}. Please try again later.`
    );
  }
};
