import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Middleware for protecting routes
 *
 * PROTECTED ROUTES:
 * - All /dashboard/* routes (redirects to /auth/login if not authenticated)
 * - All /api/* routes (returns 401 if not authenticated)
 *
 * OPT-OUT MECHANISM:
 * To exclude specific API routes from protection, add them to the `unprotectedRoutes` array below.
 * Example: '/api/health', '/api/public', '/api/webhooks'
 *
 * AUTH PAGES:
 * - /auth/login and /auth/signup redirect authenticated users to /dashboard
 */

export async function middleware(request: NextRequest) {
  console.log('Middleware executed for:', request.nextUrl.pathname);

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Define routes that should be excluded from protection
  // Add routes here that don't need authentication
  const unprotectedRoutes: string[] = [
    // '/api/health',  Example: health check endpoint
  ];

  // Check if the current route should be protected
  const isProtectedRoute =
    request.nextUrl.pathname.startsWith('/dashboard') ||
    request.nextUrl.pathname.startsWith('/api/');

  // Check if the current API route is in the unprotected list
  const isUnprotectedApiRoute = unprotectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Check if user is accessing login page
  const isLoginOrSignupPage =
    request.nextUrl.pathname === '/auth/login' ||
    request.nextUrl.pathname === '/auth/signup';

  // Skip protection for unprotected routes
  if (isUnprotectedApiRoute) {
    console.log(
      'Middleware: Skipping protection for unprotected route:',
      request.nextUrl.pathname
    );
    return response;
  }

  if (isProtectedRoute) {
    console.log(
      'Middleware: Checking protected route access for:',
      request.nextUrl.pathname
    );

    // Get the current user session
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    // If no user or error, handle based on route type
    if (!user || error) {
      console.log('Middleware: User not authenticated');

      // For API routes, return 401 Unauthorized
      if (request.nextUrl.pathname.startsWith('/api/')) {
        return NextResponse.json(
          {
            error: 'Unauthorized - Please log in to access this resource',
            code: 'UNAUTHORIZED',
            message: 'Authentication required',
          },
          { status: 401 }
        );
      }

      // For dashboard pages, redirect to login
      console.log(
        'Middleware: Redirecting to login - no user or error present'
      );
      const loginUrl = new URL('/auth/login', request.url);
      // Add the current URL as a redirect parameter so user can return after login
      loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    console.log(
      'Middleware: User authenticated, allowing access to protected route'
    );
  }

  // Handle login page access for authenticated users
  if (isLoginOrSignupPage) {
    console.log('Middleware: Checking login page access');

    // Get the current user session
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // If user is already logged in, redirect to dashboard
    if (user) {
      console.log(
        'Middleware: User already logged in, redirecting to dashboard'
      );
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/login',
    '/auth/signup',
    '/api/:path*', // Protect all API routes
  ],
};
