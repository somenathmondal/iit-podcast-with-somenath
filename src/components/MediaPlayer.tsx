"use client";

import { useEffect, useRef, useState, memo } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize2, Minimize2, X } from "lucide-react";
import { usePlayerStore } from "../lib/store";
import { usePathname } from "next/navigation";

interface Particle {
  x: number;
  y: number;
  size: number;
  vy: number;
  vx: number;
  alpha: number;
}

const ProjectorVisualizer = memo(function ProjectorVisualizer({ isPlaying }: { isPlaying: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particles = useRef<Particle[]>([]);

  // Initialize particles once
  useEffect(() => {
    const arr: Particle[] = [];
    for (let i = 0; i < 30; i++) {
      arr.push({
        x: Math.random() * 200 - 100, // relative to center
        y: Math.random() * 180,       // from bottom (lens) to top
        size: Math.random() * 1.5 + 0.5,
        vy: Math.random() * 0.4 + 0.2, // speed upwards
        vx: (Math.random() - 0.5) * 0.15,
        alpha: Math.random() * 0.5 + 0.3,
      });
    }
    particles.current = arr;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let localBeamIntensity = isPlaying ? 1 : 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth intensity transition
      if (isPlaying) {
        localBeamIntensity += (1 - localBeamIntensity) * 0.1;
      } else {
        localBeamIntensity += (0 - localBeamIntensity) * 0.1;
      }

      if (localBeamIntensity > 0.01) {
        const time = Date.now() * 0.001;
        
        // Realistic analog bulb flicker
        const flicker = 0.85 + Math.sin(time * 30) * 0.05 + (Math.random() - 0.5) * 0.07;
        const currentIntensity = localBeamIntensity * flicker;

        // Draw Projector Lens at the bottom center
        const cx = canvas.width / 2;
        const cy = canvas.height;

        // Draw golden light beam widening upwards using a linear gradient for a full volumetric look
        const gradient = ctx.createLinearGradient(cx, cy, cx, 0);
        gradient.addColorStop(0, `rgba(255, 94, 54, ${0.5 * currentIntensity})`);
        gradient.addColorStop(0.4, `rgba(255, 174, 25, ${0.2 * currentIntensity})`);
        gradient.addColorStop(1, "rgba(255, 174, 25, 0)");

        // Pulse the beam width
        const pulseWidth = 100 + Math.sin(time * 6) * 12;

        ctx.beginPath();
        ctx.moveTo(cx - 3, cy); // Lens left
        ctx.lineTo(cx - pulseWidth, 0); // Top left
        ctx.lineTo(cx + pulseWidth, 0); // Top right
        ctx.lineTo(cx + 3, cy); // Lens right
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw drifting dust particles inside the light beam
        particles.current.forEach((p) => {
          p.y -= p.vy;
          p.x += p.vx;

          // Drifting particle constraint: keep inside expanding beam triangle
          const beamLimitAtY = (p.y / canvas.height) * (pulseWidth - 3) + 3;
          if (Math.abs(p.x) > beamLimitAtY) {
            p.x = (Math.random() - 0.5) * beamLimitAtY;
          }

          // Reset when particle floats off the top
          if (p.y < 0) {
            p.y = canvas.height;
            p.x = (Math.random() - 0.5) * 8; // start close to lens
            p.size = Math.random() * 1.5 + 0.5;
          }

          const px = cx + p.x;
          const py = p.y;

          // Draw a performant glows/halo manually using concentric transparent circles
          // (Gaussian shadowBlur/shadowColor drops frames on retina displays/laptops)
          ctx.beginPath();
          ctx.arc(px, py, p.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 174, 25, ${p.alpha * 0.25 * currentIntensity})`;
          ctx.fill();

          // Draw the solid dust particle core
          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * currentIntensity})`;
          ctx.fill();
        });

        // Draw Lens Flare using ultra-performant overlapping concentric gradient circles
        const flareRadius = 10 + Math.sin(time * 20) * 1.5;
        
        // Outer faint flare
        ctx.beginPath();
        ctx.arc(cx, cy, flareRadius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 94, 54, ${0.15 * currentIntensity})`;
        ctx.fill();

        // Middle soft flare
        ctx.beginPath();
        ctx.arc(cx, cy, flareRadius * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 94, 54, ${0.4 * currentIntensity})`;
        ctx.fill();

        // Core bright flare
        ctx.beginPath();
        ctx.arc(cx, cy, flareRadius * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * currentIntensity})`;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={200}
      className="w-[500px] h-[200px]"
    />
  );
});

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

  const pathname = usePathname();

  const [isDismissed, setIsDismissed] = useState(false);

  // Automatically restore player bar when a new episode is selected
  useEffect(() => {
    if (activeEpisode) {
      setIsDismissed(false);
    }
  }, [activeEpisode?.id]);

  const progressRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const lastProgressTime = useRef(0);

  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Simulate audio player timing when playing using store-driven state polling
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        const state = usePlayerStore.getState();
        const curTime = state.currentTime;
        const dur = state.duration;

        if (curTime < dur) {
          state.setCurrentTime(curTime + 1);
        } else {
          state.setIsPlaying(false);
          state.setCurrentTime(0);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Sync custom play/pause button state with the native YouTube player
  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const command = isPlaying ? "playVideo" : "pauseVideo";
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: command, args: "" }),
        "*"
      );
    }
  }, [isPlaying, activeEpisode?.id]);

  // Performant manual seek (jumps) using postMessage to avoid iframe reloads
  useEffect(() => {
    if (Math.abs(currentTime - lastProgressTime.current) > 1.5) {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: "command", func: "seekTo", args: [Math.floor(currentTime), true] }),
          "*"
        );
      }
    }
    lastProgressTime.current = currentTime;
  }, [currentTime]);

  if (!activeEpisode) return null;

  // Hide global player if currently reading this specific episode's blog page to prevent duplicate iframe playback
  if (pathname === `/blog/${activeEpisode.id}`) {
    return null;
  }

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
    <>
      {/* 1. Main persistent media player console card with smooth slide-down sliding animation */}
      <div 
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-50 transition-all duration-500 ease-in-out ${
          isDismissed ? "translate-y-36 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
        }`}
      >
        
        {/* 1.1. Retro Projector visualizer container (only show when NOT expanded to avoid visual overlap!) */}
        {!isExpanded && (
          <div className="absolute top-[-192px] left-1/2 -translate-x-1/2 w-[500px] h-[200px] pointer-events-none flex flex-col items-center justify-end z-[-1]">
            <ProjectorVisualizer isPlaying={isPlaying} />
          </div>
        )}

        {/* 1.2. Unified Premium Glassmorphic Console Card (Expands smoothly like a sliding drawer!) */}
        <div className="backdrop-blur-xl bg-[#1A0D0D]/65 border border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.6)] rounded-3xl overflow-hidden transition-all duration-500 ease-in-out flex flex-col w-full">
          
          {/* Dynamic sliding drawer for YouTube Video */}
          <div 
            className="transition-all duration-500 ease-in-out overflow-hidden w-full flex items-center justify-center bg-black/30 border-b border-white/[0.04]"
            style={{ 
              height: isExpanded ? "380px" : "0px",
              maxHeight: isExpanded ? "380px" : "0px",
              opacity: isExpanded ? 1 : 0,
              pointerEvents: isExpanded ? "auto" : "none"
            }}
          >
            {activeEpisode && (
              <iframe
                ref={iframeRef}
                src={`https://www.youtube.com/embed/${activeEpisode.youtubeId}?enablejsapi=1&autoplay=1`}
                title={activeEpisode.title}
                className="w-full h-full border-0 py-4 px-6 rounded-3xl"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          {/* Controls Row */}
          <div className="px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 w-full relative">
            
            {/* Absolute positioned close button inside controls row to prevent overlap */}
            <button 
              onClick={() => setIsDismissed(true)}
              className="absolute top-2 right-2 md:top-3 md:right-3 text-stone-500 hover:text-white hover:bg-white/[0.04] p-1.5 rounded-full transition-all cursor-pointer active:scale-95 z-20"
              title="Minimize Player"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            
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

        </div>
      </div>

      {/* 2. Tiny Floating Circular Play/Pause Toggle (Appears in bottom-right corner when player is dismissed) */}
      <div 
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ease-in-out transform ${
          isDismissed 
            ? "translate-y-0 scale-100 opacity-100" 
            : "translate-y-20 scale-75 opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={() => setIsDismissed(false)}
          className="w-12 h-12 rounded-full bg-accent-orange hover:bg-accent-orange/95 text-white flex items-center justify-center shadow-lg shadow-accent-orange/30 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer border border-accent-orange/20"
          title="Restore Player"
        >
          {isPlaying ? (
            <span className="relative flex h-5 w-5 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
              <Pause className="w-3.5 h-3.5 fill-white text-white relative" />
            </span>
          ) : (
            <Play className="w-3.5 h-3.5 fill-white text-white translate-x-[1px]" />
          )}
        </button>
      </div>
    </>
  );
}
