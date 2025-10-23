declare global {
  /**
   * Global sanitization function
   * Usage: $sanitize(htmlString)
   */
  const $sanitize: (html: string, options?: import('dompurify').Config) => string;
  
}

export {};
