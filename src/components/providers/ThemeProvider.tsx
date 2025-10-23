'use client';

import { useEffect } from 'react';

/**
 * Theme provider that automatically switches between light and dark themes
 * based on the system preference
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const updateTheme = () => {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const html = document.documentElement;
      
      if (isDark) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    };

    // Set initial theme
    updateTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateTheme);

    // Cleanup listener on unmount
    return () => {
      mediaQuery.removeEventListener('change', updateTheme);
    };
  }, []);

  return <>{children}</>;
}
