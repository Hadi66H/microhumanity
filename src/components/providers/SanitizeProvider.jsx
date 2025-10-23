'use client';

import { useEffect } from 'react';
import { sanitize } from '@/lib/utils/sanitize';

/**
 * Provider component that makes sanitization functions available globally
 * This ensures the functions are available on the client side
 */
export function SanitizeProvider({ children }) {
  useEffect(() => {
    // Make sanitization functions available globally on the client
    if (typeof window !== 'undefined') {
      window.$sanitize = sanitize;
    }
  }, []);

  return <>{children}</>;
}
