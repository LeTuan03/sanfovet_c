"use client";

import { useEffect } from 'react';

export default function ContentProtection() {
  useEffect(() => {
    // 1. Block right-click
    // const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    // document.addEventListener('contextmenu', handleContextMenu);

    // // 2. Block keyboard shortcuts
    // const handleKeyDown = (e: KeyboardEvent) => {
    //   const ctrl = e.ctrlKey || e.metaKey; // metaKey cho Mac
    //   const blocked =
    //     (ctrl && ['u','s','c','p','a'].includes(e.key.toLowerCase())) ||
    //     (ctrl && e.shiftKey && ['i','j','c','k'].includes(e.key.toLowerCase())) ||
    //     ['F12'].includes(e.key);
    //   if (blocked) e.preventDefault();
    // };
    // document.addEventListener('keydown', handleKeyDown);

    // 5. DevTools detection - use viewport heuristic because debugger timing is unreliable
    // let devtoolsInterval: ReturnType<typeof setInterval>;
    // const isMobile = () => /mobile|android|iphone|ipad|tablet/i.test(navigator.userAgent);
    // const detectDevTools = () => {
    //   if (isMobile()) return false; // Disable detection on mobile to avoid false positives
    //   const threshold = 160;
    //   const widthDiff = window.outerWidth - window.innerWidth;
    //   const heightDiff = window.outerHeight - window.innerHeight;
    //   return widthDiff > threshold || heightDiff > threshold;
    // };
    // devtoolsInterval = setInterval(() => {
    //   if (detectDevTools()) {
    //     globalThis.location.replace('/images/favicon.ico');
    //   }
    // }, 1000);

    return () => {
      // document.removeEventListener('contextmenu', handleContextMenu);
      // document.removeEventListener('keydown', handleKeyDown);
      // clearInterval(devtoolsInterval);
    };
  }, []);

  return null;
}