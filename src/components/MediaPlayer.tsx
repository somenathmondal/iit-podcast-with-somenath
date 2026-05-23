"use client";

import { useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize2, Minimize2 } from "lucide-react";
import { usePlayerStore } from "../lib/store";

export default function MediaPlayer() {
  const {
    activeEpisode,
    isPlaying,
    currentTime,
    duration,
    volume,
    isExpanded,
    setIsPlaying,
    setCurrentTime,
    setVolume,
    setIsExpanded,
  } = usePlayerStore();

  const progressRef = useRef<HTMLDivElement>(null);

  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Simulate audio player timing when playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        if (currentTime < duration) {
          setCurrentTime(currentTime + 1);
        } else {
          setIsPlaying(false);
          setCurrentTime(0);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, duration, setCurrentTime, setIsPlaying]);

  if (!activeEpisode) return null;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const percentage = clickX / width;
      setCurrentTime(percentage * duration);
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-50 transition-all duration-500">
      {/* Outer Floating Glassmorphic bar */}
      <div className="backdrop-blur-xl bg-[#1A0D0D]/65 border border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.6)] px-6 py-4 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Section: Video Embed / Cover Thumbnail & Title */}
        <div className="flex items-center gap-4 w-full md:w-1/3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-accent-orange to-accent-gold flex items-center justify-center flex-shrink-0 text-white font-serif italic text-lg shadow-md font-bold">
            EP{activeEpisode.episodeNumber}
          </div>
          <div className="flex flex-col text-left overflow-hidden">
            <span className="text-[10px] tracking-widest text-accent-copper uppercase font-mono">
              NOW PLAYING: EPISODE {activeEpisode.episodeNumber}
            </span>
            <span className="text-xs font-serif italic text-white font-medium truncate">
              {activeEpisode.title}
            </span>
            <span className="text-[9px] text-stone-400 truncate">
              {activeEpisode.guestName} ({activeEpisode.guestTitle})
            </span>
          </div>
        </div>

        {/* Center Section: Core Controls & Duration bar */}
        <div className="flex flex-col items-center gap-2 w-full md:w-1/3">
          {/* Main Playback Buttons */}
          <div className="flex items-center gap-5">
            <button className="text-stone-400 hover:text-white transition-colors">
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-accent-orange text-white flex items-center justify-center shadow-lg shadow-accent-orange/20 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white translate-x-[1px]" />}
            </button>
            <button className="text-stone-400 hover:text-white transition-colors">
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Time & Custom Slider Progress bar */}
          <div className="w-full flex items-center gap-3">
            <span className="text-[9px] text-stone-400 font-mono min-w-[30px] text-right">
              {formatTime(currentTime)}
            </span>
            <div
              ref={progressRef}
              onClick={handleProgressClick}
              className="flex-grow h-1.5 rounded-full bg-stone-800 cursor-pointer overflow-hidden relative"
            >
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent-orange to-accent-gold transition-all duration-100"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <span className="text-[9px] text-stone-400 font-mono min-w-[30px] text-left">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Right Section: Volume & Mode controls */}
        <div className="flex items-center justify-end gap-5 w-full md:w-1/3">
          {/* YouTube Video View Toggle */}
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-full text-[9px] tracking-widest font-mono uppercase transition-all duration-300 ${
              isExpanded 
                ? 'border-accent-orange text-accent-orange bg-accent-orange/5' 
                : 'border-stone-800 text-stone-400 hover:text-white hover:border-stone-600'
            }`}
          >
            {isExpanded ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
            <span>{isExpanded ? "Close Video" : "Watch Video"}</span>
          </button>

          {/* Volume Control */}
          <div className="hidden lg:flex items-center gap-2">
            <Volume2 className="w-3.5 h-3.5 text-stone-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-16 accent-accent-orange cursor-pointer bg-stone-800 h-1 rounded-lg"
            />
          </div>
        </div>

      </div>

      {/* Picture-in-Picture Floating Youtube Video Container (if Expanded) */}
      {isExpanded && (
        <div className="absolute bottom-24 right-0 w-80 aspect-video rounded-2xl border border-white/[0.08] bg-black shadow-[0_12px_40px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500 transform animate-in slide-in-from-bottom-5">
          <iframe
            src={`https://www.youtube.com/embed/${activeEpisode.youtubeId}?autoplay=1&start=${Math.floor(currentTime)}`}
            title={activeEpisode.title}
            className="w-full h-full border-0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}
