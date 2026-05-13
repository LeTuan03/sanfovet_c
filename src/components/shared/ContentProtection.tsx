"use client";

import { useEffect } from 'react';

export default function ContentProtection() {
  useEffect(() => {
    // 1. Block right-click
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);

    // 2. Block keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      const ctrl = e.ctrlKey || e.metaKey; // metaKey cho Mac
      const blocked =
        (ctrl && ['u','s','c','p','a'].includes(e.key.toLowerCase())) ||
        (ctrl && e.shiftKey && ['i','j','c','k'].includes(e.key.toLowerCase())) ||
        ['F12'].includes(e.key);
      if (blocked) e.preventDefault();
    };
    document.addEventListener('keydown', handleKeyDown);

    // 3. Block drag
    const handleDragStart = (e: DragEvent) => e.preventDefault();
    document.addEventListener('dragstart', handleDragStart);

    // 4. Disable selection via JS (CSS nên set riêng)
    const handleSelectStart = (e: Event) => e.preventDefault();
    document.addEventListener('selectstart', handleSelectStart);

    // 5. DevTools detection - dùng debugger trick (đáng tin hơn)
    let devtoolsInterval: ReturnType<typeof setInterval>;
    const detectDevTools = () => {
      const start = performance.now();
      // eslint-disable-next-line no-debugger
      debugger;
      if (performance.now() - start > 100) {
        globalThis.location.replace('/');
      }
    };
    devtoolsInterval = setInterval(detectDevTools, 1000);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('selectstart', handleSelectStart);
      clearInterval(devtoolsInterval);
    };
  }, []);

  return null;
}