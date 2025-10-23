import DOMPurify from 'dompurify';
import type { Config } from 'dompurify';

/**
 * Global sanitization utility using DOMPurify
 * This function sanitizes HTML content to prevent XSS attacks
 */
export function sanitize(html: string, options: Config = {}) {
  if (!window) {
    return html;
  }

  return DOMPurify.sanitize(html, {
    ...(options as Config),
  });
}
