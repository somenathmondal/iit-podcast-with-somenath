import { create } from "zustand";
import { Episode } from "../data/episodes";

interface PlayerState {
  activeEpisode: Episode | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isExpanded: boolean;
  setActiveEpisode: (episode: Episode | null) => void;
  setIsPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  setIsExpanded: (expanded: boolean) => void;
  jumpToTimestamp: (seconds: number) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  activeEpisode: null, // Start hidden by default for non-blocking premium UX
  isPlaying: false,
  currentTime: 0,
  duration: 2882, // Default 48:02
  volume: 0.8,
  isExpanded: false,
  setActiveEpisode: (episode) => set({ activeEpisode: episode, isPlaying: true, currentTime: 0, isExpanded: false }), // Keep collapsed by default to not cover blog text
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  setVolume: (volume) => set({ volume }),
  setIsExpanded: (expanded) => set({ isExpanded: expanded }),
  jumpToTimestamp: (seconds) => set({ currentTime: seconds, isPlaying: true, isExpanded: false }), // Keep collapsed by default
}));

export interface AnalyticsEvent {
  id: string;
  name: string;
  params?: Record<string, any>;
  timestamp: string;
}

interface AnalyticsState {
  events: AnalyticsEvent[];
  eventCounts: Record<string, number>;
  addEvent: (name: string, params?: Record<string, any>) => void;
  clearEvents: () => void;
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  events: [],
  eventCounts: {},
  addEvent: (name, params) => set((state) => {
    const newEvent: AnalyticsEvent = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      params,
      timestamp: new Date().toLocaleTimeString(),
    };
    
    const nextEvents = [newEvent, ...state.events].slice(0, 50); // Limit to last 50 events
    const nextCounts = { ...state.eventCounts };
    nextCounts[name] = (nextCounts[name] || 0) + 1;
    
    // Also track card specific counts
    if (params && params.episode_id) {
      const cardKey = `card:${params.episode_id}`;
      nextCounts[cardKey] = (nextCounts[cardKey] || 0) + 1;
    } else if (params && params.blog_id) {
      const cardKey = `card:${params.blog_id}`;
      nextCounts[cardKey] = (nextCounts[cardKey] || 0) + 1;
    }
    
    return {
      events: nextEvents,
      eventCounts: nextCounts,
    };
  }),
  clearEvents: () => set({ events: [], eventCounts: {} }),
}));
