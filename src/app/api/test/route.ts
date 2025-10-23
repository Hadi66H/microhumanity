import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/api-auth';
import { coreFunctionality } from '@/lib/be/core/myTable';

export async function GET(request: NextRequest) {
  try {
    const { user } = await requireAuth(request);

    const respone = await coreFunctionality();

    return NextResponse.json({
      success: true,
      message: 'Test route accessed successfully',
      data: {
        respone,
        user,
      },
    });
  } catch (error) {
    console.error('Test route error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
