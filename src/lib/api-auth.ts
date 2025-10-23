import { NextRequest, NextResponse } from 'next/server';
import { serverAuth } from './supabase.server';

export async function requireAuth(request: NextRequest) {
  const { data: { user }, error } = await serverAuth.getUser();
  
  if (error || !user) {
    return {
      user: null,
      response: NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    };
  }
  
  return { user, response: null };
}