import { withSupabase } from '../withSupabase';

// Filename here should be same as table name but in CamelCase
// Example: Table name = my_table
//          File name  = myTable.js
const TABLE_NAME = 'my_table';

export const insertInMYTable = async (userId, data) => {
  return await withSupabase(async (supabase) => {
    const insertData = {
      data,
    };

    return supabase.from(TABLE_NAME).insert(insertData).select();
  });
};

export const updateUserPlan = async (userId, data) => {
  return await withSupabase(async (supabase) => {
    const updateData = {
      data,
      updated_at: new Date().toISOString(),
    };

    return supabase
      .from(TABLE_NAME)
      .update(updateData)
      .eq('user_id', userId)
      .select();
  });
};

export const getFromMyTable = async () => {
  return await withSupabase(async (supabase) => {
    return supabase
      .from(TABLE_NAME)
      .select()
      .order('created_at', { ascending: false });
  });
};

export const testFunction = async () => {
  return 'testFunction';
};