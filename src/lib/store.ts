import { create } from "zustand";
import { Episode, episodes } from "../data/episodes";

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
  activeEpisode: episodes[0], // Default load first episode
  isPlaying: false,
  currentTime: 0,
  duration: 2882, // Default 48:02
  volume: 0.8,
  isExpanded: false,
  setActiveEpisode: (episode) => set({ activeEpisode: episode, isPlaying: true, currentTime: 0, isExpanded: true }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  setVolume: (volume) => set({ volume }),
  setIsExpanded: (expanded) => set({ isExpanded: expanded }),
  jumpToTimestamp: (seconds) => set({ currentTime: seconds, isPlaying: true, isExpanded: true }),
}));
