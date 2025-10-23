import { sanitize } from './utils/sanitize';

/**
 * Initialize global sanitization functions
 * This should be called once when the app starts
 */
export function initializeGlobals() {
  if (typeof window !== 'undefined') {
    window.$sanitize = sanitize;
  }
}

/**
 * Initialize globals automatically
 */
if (typeof window !== 'undefined') {
  initializeGlobals();
}
