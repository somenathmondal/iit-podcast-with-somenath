"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

// Safe layout effect to prevent Next.js SSR warnings
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function TransitionDirectionTracker() {
  const pathname = usePathname();
  const historyRef = useRef<string[]>([pathname]);

  useIsomorphicLayoutEffect(() => {
    const history = historyRef.current;
    const prevPath = history[history.length - 1];

    if (pathname !== prevPath) {
      // 1. Detect if navigating backward to the second-to-last entry in history (browser back button)
      const isBackHistory = history.length > 1 && history[history.length - 2] === pathname;
      
      // 2. Detect if navigating to a shallower folder hierarchy
      const prevDepth = prevPath.split("/").filter(Boolean).length;
      const currentDepth = pathname.split("/").filter(Boolean).length;
      const isBackDepth = currentDepth < prevDepth || (prevPath.startsWith("/blog/") && pathname === "/blog") || (prevPath === "/blog" && pathname === "/");

      const isBack = isBackHistory || isBackDepth;

      if (isBack) {
        document.documentElement.classList.add("back-transition");
        if (isBackHistory) {
          // Pop the current page off the history stack since we traversed back
          history.pop();
        } else {
          // If we went back but it wasn't the immediate stack match, add it
          history.push(pathname);
        }
      } else {
        document.documentElement.classList.remove("back-transition");
        history.push(pathname);
      }

      // Limit stack size to prevent unbounded memory growth
      if (history.length > 50) {
        history.shift();
      }

      // Reset the back transition state after animation finishes (400ms + buffer)
      const timer = setTimeout(() => {
        document.documentElement.classList.remove("back-transition");
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return null;
}
