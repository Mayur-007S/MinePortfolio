import { useEffect } from 'react';

/**
 * Hook to protect the web app from inspection mode and devtools shortcuts.
 * 
 * To enable inspection (e.g. during development/debugging),
 * set VITE_ENABLE_INSPECT=true in your .env file or Netlify environment variables.
 */
export function useInspectProtection() {
  useEffect(() => {
    // If inspect is explicitly enabled via environment variable, do not apply protection
    if (import.meta.env.VITE_ENABLE_INSPECT === 'true') {
      return;
    }

    // 1. Disable Right Click Context Menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Disable DevTools and View Source keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      // F12 key
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+Shift+I / Cmd+Option+I (Inspect)
      // Ctrl+Shift+J / Cmd+Option+J (Console)
      // Ctrl+Shift+C / Cmd+Option+C (Inspect Element)
      if (
        cmdOrCtrl &&
        e.shiftKey &&
        (e.key === 'I' || e.key === 'i' ||
         e.key === 'J' || e.key === 'j' ||
         e.key === 'C' || e.key === 'c' ||
         e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+U / Cmd+U (View Page Source)
      if (
        cmdOrCtrl &&
        (e.key === 'U' || e.key === 'u' || e.keyCode === 85)
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl+S / Cmd+S (Save Page)
      if (
        cmdOrCtrl &&
        (e.key === 'S' || e.key === 's' || e.keyCode === 83)
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown, true);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, []);
}
