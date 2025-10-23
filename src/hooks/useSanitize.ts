import { useCallback } from 'react';
import { sanitize } from '@/lib/utils/sanitize';
import type { Config } from 'dompurify';

/**
 * Custom hook for sanitization functions
 * Provides easy access to sanitization utilities in React components
 */
export function useSanitize() {
  const $sanitize = useCallback((html: string, options?: Config) => {
    return sanitize(html, options);
  }, []);

  return {
    $sanitize,
  };
}
