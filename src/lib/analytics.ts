import { track } from "@vercel/analytics";
import { sendGAEvent } from "@next/third-parties/google";
import { useAnalyticsStore } from "./store";

/**
 * Rich central analytics dispatcher. Logs to Vercel Analytics,
 * Google Analytics (via third-parties helper), and local Zustand store
 * for visual debugging overlays.
 */
export const trackEvent = (name: string, params?: Record<string, any>) => {
  // 1. Dispatch to Vercel Analytics
  try {
    track(name, params);
  } catch (err) {
    console.warn("Failed to track event on Vercel Analytics", err);
  }

  // 2. Dispatch to Google Analytics
  try {
    if (params) {
      sendGAEvent("event", name, params);
    } else {
      sendGAEvent("event", name);
    }
  } catch (err) {
    console.warn("Failed to track event on Google Analytics", err);
  }

  // 3. Dispatch to local visual debugger store
  try {
    useAnalyticsStore.getState().addEvent(name, params);
  } catch (err) {
    console.warn("Failed to update local analytics debug store", err);
  }
};
