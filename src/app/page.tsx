"use client";

import { useState, useEffect } from "react";
import { Play, Calendar, Clock, ArrowRight, X, ExternalLink, Headphones, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "../components/Header";
import MediaPlayer from "../components/MediaPlayer";
import { episodes, Episode } from "../data/episodes";
import { usePlayerStore } from "../lib/store";

// Inline SVG Youtube Icon to resolve lucide-react version incompatibilities
const YoutubeIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.524 3.545 12 3.545 12 3.545s-7.525 0-9.388.51a3.003 3.003 0 0 0-2.11 2.108C0 8.026 0 12 0 12s0 3.974.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.863.51 9.388.51 9.388.51s7.525 0 9.388-.51a3.003 3.003 0 0 0 2.11-2.108c.502-1.863.502-5.837.502-5.837s0-3.974-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export default function Home() {
  const { setActiveEpisode, activeEpisode, isPlaying, setIsPlaying, jumpToTimestamp } = usePlayerStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [readingEpisode, setReadingEpisode] = useState<Episode | null>(null);
  const [modalVideoSeconds, setModalVideoSeconds] = useState<number | null>(null);
  const [spotlightAttract, setSpotlightAttract] = useState(false);
  const [cardImageIndices, setCardImageIndices] = useState<Record<string, number>>({});

  const handlePrevSlide = (e: React.MouseEvent, epId: string, galleryLength: number) => {
    e.stopPropagation();
    setCardImageIndices((prev) => {
      const curr = prev[epId] || 0;
      const nextIdx = curr === 0 ? galleryLength - 1 : curr - 1;
      return { ...prev, [epId]: nextIdx };
    });
  };

  const handleNextSlide = (e: React.MouseEvent, epId: string, galleryLength: number) => {
    e.stopPropagation();
    setCardImageIndices((prev) => {
      const curr = prev[epId] || 0;
      const nextIdx = curr === galleryLength - 1 ? 0 : curr + 1;
      return { ...prev, [epId]: nextIdx };
    });
  };

  // Auto-hover "attract" pulse on the spotlight card — fires 0.5s after char animation ends (~1.5s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setSpotlightAttract(true);
      // Remove the attract class after 2s so it doesn't stick
      setTimeout(() => setSpotlightAttract(false), 2000);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenHighlights = (episode: Episode) => {
    setReadingEpisode(episode);
    setModalVideoSeconds(null);
  };

  // Filter episodes by category for the directory catalogue
  const filteredEpisodes = selectedCategory === "all"
    ? episodes
    : episodes.filter((ep) => ep.category === selectedCategory);

  // Pre-defined YouTube views mapping for ranking the Film Reel negatives
  const viewsMap: Record<string, number> = {
    "suman-chakraborty-1": 185000,
    "arpit": 142000,
    "nikhil": 98000,
    "ankur": 125000,
    "pranali": 89000,
    "saumaric-aditi": 76000,
    "imbesat": 156000,
    "peter": 112000,
  };

  // Curated featured episodes for the Film Reel showcase, ranked by YouTube views descending
  const featuredEpisodes = episodes
    .filter(
      (ep) =>
        ep.id === "suman-chakraborty-1" ||
        ep.id === "arpit" ||
        ep.id === "nikhil" ||
        ep.id === "ankur" ||
        ep.id === "pranali" ||
        ep.id === "saumaric-aditi" ||
        ep.id === "imbesat" ||
        ep.id === "peter"
    )
    .map((ep) => ({
      ...ep,
      views: ep.views || viewsMap[ep.id] || 0,
    }))
    .sort((a, b) => b.views - a.views);

  const handleSpotlightPlay = (episode: Episode) => {
    setActiveEpisode(episode);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-[#0F0606] text-white flex flex-col font-sans selection:bg-accent-orange selection:text-white">
      {/* 1. Header Navigation */}
      <Header />

      {/* 2. TWO-COLUMN HERO ZONE */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-10 md:py-20 flex flex-col-reverse lg:flex-row items-stretch lg:items-center justify-between gap-8 lg:gap-16 border-b border-white/[0.02]">
        
        {/* Left Column: Title & Editorial Text */}
        <div className="w-full lg:w-[44%] flex flex-col text-left justify-center py-0 lg:py-4">
          <div className="flex items-center gap-2.5 mb-4 md:mb-6 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-accent-orange animate-pulse" />
            <span className="text-xs tracking-[0.25em] font-mono text-accent-copper uppercase font-bold">
              EST. JUNE 2025 • 32 STORIES
            </span>
          </div>
          <h2 className="text-[2.5rem] md:text-6xl lg:text-7xl font-serif italic leading-[1.08] mb-5 md:mb-8 font-medium text-white" style={{ perspective: '600px' }}>
            {/* Part 1: Insights From */}
            {"Insights From ".split("").map((char, index) => (
              <span
                key={`p1-${index}`}
                className="animate-char-reveal"
                style={{ 
                  animationDelay: `${200 + index * 35}ms`,
                  whiteSpace: char === " " ? "pre" : "normal"
                }}
              >
                {char}
              </span>
            ))}
            {/* Line break between lines */}
            <br />
            {/* Part 2: IIT Alumni — each char carries its own gradient */}
            {"IIT Alumni".split("").map((char, index) => (
              <span
                key={`p2-${index}`}
                className="animate-char-reveal text-transparent bg-clip-text bg-gradient-to-r from-accent-orange via-accent-gold to-white"
                style={{ 
                  animationDelay: `${700 + index * 40}ms`,
                  whiteSpace: char === " " ? "pre" : "normal"
                }}
              >
                {char}
              </span>
            ))}
          </h2>
          <p className="hidden md:block text-base md:text-lg lg:text-xl text-stone-300 font-serif leading-relaxed italic mb-10 max-w-xl animate-fade-in-up" style={{ animationDelay: '850ms' }}>
            "Deconstructing life before the JEE, hostel fests, fiver-point struggles, campus placement diaries, and high-impact paths following graduation."
          </p>
          <div className="flex flex-wrap gap-3 md:gap-4 animate-fade-in-up" style={{ animationDelay: '1050ms' }}>
            <button
              onClick={() => handleSpotlightPlay(episodes[0])}
              className="flex items-center gap-2 px-5 py-3 md:px-6 md:py-4 rounded-full bg-accent-orange font-bold text-[10px] md:text-xs tracking-widest uppercase hover:bg-accent-orange/95 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-accent-orange/20 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Listen Latest</span>
            </button>
            <a
              href="#alumni-chronicle"
              className="flex items-center gap-2 px-5 py-3 md:px-6 md:py-4 rounded-full border border-stone-850 bg-white/[0.01] hover:bg-white/[0.04] font-bold text-[10px] md:text-xs tracking-widest uppercase text-stone-200 hover:text-white hover:border-stone-700 transition-all duration-300"
            >
              <span>Explore Reel</span>
            </a>
          </div>
        </div>

        {/* Right Column: Expanded Spotlight Card (Vertical aspect-video image layout on desktop) */}
        <div className="w-full lg:w-[50%] flex flex-col">
          <span className="text-xs tracking-[0.3em] font-mono text-accent-gold uppercase mb-3 block font-bold text-left animate-fade-in-up animation-delay-500">
            EPISODE SPOTLIGHT
          </span>
          {episodes.map((ep) => ep.id === "suman-chakraborty-1" && (
            <div
              key={ep.id}
              onClick={() => handleSpotlightPlay(ep)}
              className={`w-full group cursor-pointer backdrop-blur-md bg-card-bg/40 border border-white/[0.06] hover:border-accent-orange/30 p-0 md:p-8 rounded-2xl md:rounded-[36px] transition-all duration-500 shadow-2xl shadow-black/50 text-left hover:scale-[1.01] flex flex-col gap-0 md:gap-6 animate-scale-in-projector animation-delay-700 overflow-hidden ${spotlightAttract ? 'spotlight-attract' : ''}`}
            >
              {/* Premium Episode 0A (Prof Suman Part 1) Thumbnail Header - FULL WIDTH */}
              <div className="spotlight-thumb w-full aspect-video rounded-[4px] overflow-hidden border border-white/[0.08] relative group-hover:border-accent-orange/40 transition-all duration-500 shadow-[0_12px_40px_rgba(0,0,0,0.5)] animate-shine">
                <img 
                  src={ep.coverImage} 
                  alt={ep.title} 
                  className="w-full h-full object-cover scale-100 group-hover:scale-[1.03] transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                
                {/* Floating aesthetic label */}
                <div className="absolute top-4 left-4 z-20 bg-black/75 backdrop-blur-md border border-white/[0.08] px-3.5 py-1.5 rounded-full shadow-lg">
                  <span className="text-[8px] font-mono tracking-widest text-accent-gold uppercase font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-pulse" />
                    FEATURED EPISODE
                  </span>
                </div>
                
                <div className="spotlight-play-overlay absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <div className="w-14 h-14 rounded-full bg-accent-orange flex items-center justify-center shadow-lg shadow-accent-orange/40 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Play className="w-6 h-6 fill-white text-white translate-x-0.5" />
                  </div>
                </div>
              </div>

              {/* Textual Narrative details side */}
              <div className="w-full flex flex-col justify-between px-4 py-3 md:p-0">
                <div>
                  <div className="flex flex-wrap justify-between items-center gap-2 mb-3 md:mb-4">
                    <span className="px-2.5 py-1 rounded bg-[#2D1212] border border-accent-orange/15 text-[8.5px] font-mono tracking-widest text-accent-orange uppercase font-bold">
                      DIRECTOR SPECIAL
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-stone-300 uppercase font-bold">
                        EP. {ep.episodeNumber}{ep.episodeSub ? ep.episodeSub.toUpperCase() : ""}
                      </span>
                      <span className="text-stone-700 text-xs font-mono">•</span>
                      <span className="text-[9px] font-mono text-accent-copper uppercase font-bold">
                        {ep.releaseDate || "JUNE 2025"}
                      </span>
                    </div>
                  </div>
                  <h3 className="spotlight-title text-xl md:text-3xl font-serif italic leading-tight text-white group-hover:text-accent-orange transition-colors duration-300 mb-2 md:mb-3 font-medium">
                    {ep.title}
                  </h3>
                  <p className="hidden md:block text-sm text-stone-400 leading-relaxed mb-6 font-serif">
                    "{ep.description}"
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-white/[0.04] pt-4 text-xs text-stone-500 font-mono">
                  <div className="flex items-center gap-1.5 text-stone-400">
                    <Clock className="w-3.5 h-3.5 text-accent-gold" />
                    <span>{ep.duration} MINS</span>
                  </div>
                  <span className="spotlight-cta text-accent-orange group-hover:translate-x-1.5 transition-transform duration-300 font-bold tracking-widest uppercase flex items-center gap-1.5">
                    LISTEN NOW <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 3. ALUMNI CHRONICLE: HORIZONTAL RETRO FILM REEL GALLERY */}
      <section id="alumni-chronicle" className="w-full max-w-7xl mx-auto px-6 md:px-8 py-20 border-b border-white/[0.02] text-left relative overflow-hidden">
        
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col">
            <span className="text-xs tracking-[0.4em] font-mono text-accent-orange uppercase font-bold mb-3 block">
              ALUMNI CHRONICLE
            </span>
            <h2 className="text-3xl md:text-5xl font-serif italic leading-tight font-medium">
              Untold Stories Film Reel
            </h2>
          </div>
          <p className="text-sm text-stone-400 max-w-lg font-serif italic leading-relaxed">
            Drag or swipe through the horizontal 35mm film negatives to explore written editorial digests and key survival blueprints.
          </p>
        </header>

        {/* Horizontal Film Strip Track */}
        <div className="film-strip-track custom-scroll overflow-x-auto flex pb-8 select-none">
          {featuredEpisodes.map((ep, index) => (
            <div
              key={ep.id}
              className="film-cell projector-glow-hover flex-shrink-0 w-80 p-6 flex flex-col justify-between group rounded-sm"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex flex-col text-left">
                    <span className="text-[11px] font-mono tracking-wider text-stone-300 uppercase font-bold">
                      SLIDE / EP. {ep.episodeNumber}{ep.episodeSub ? ep.episodeSub.toUpperCase() : ""}
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[9px] font-mono text-accent-copper uppercase font-bold">
                        {ep.releaseDate || "JUNE 2025"}
                      </span>
                      <span className="text-stone-700 text-[8px] font-mono">•</span>
                      <span className="text-[9px] font-mono text-accent-gold uppercase font-bold">
                        {ep.views ? `${(ep.views / 1000).toFixed(0)}K views` : "0K views"}
                      </span>
                    </div>
                  </div>
                  <span className="w-6 h-6 rounded-full border border-stone-850 flex items-center justify-center font-mono text-[9px] text-stone-500">
                    {index + 1}
                  </span>
                </div>

                <div 
                  onClick={() => handleOpenHighlights(ep)}
                  className="w-full aspect-video rounded-[4px] bg-stone-900/90 mb-6 flex items-center justify-center relative overflow-hidden border border-white/[0.03] cursor-pointer group/carousel animate-shine"
                >
                  {ep.gallery && ep.gallery.length > 0 ? (
                    <>
                      {/* Interactive Gallery Slide Images */}
                      {ep.gallery.map((imgUrl, imgIdx) => (
                        <img 
                          key={imgIdx}
                          src={imgUrl} 
                          alt={`${ep.guestName} slide ${imgIdx + 1}`} 
                          className={`absolute inset-0 w-full h-full object-cover contrast-100 brightness-95 transition-all duration-700 ${
                            (cardImageIndices[ep.id] || 0) === imgIdx 
                              ? "opacity-100 scale-100 z-10" 
                              : "opacity-0 scale-95 z-0"
                          }`} 
                        />
                      ))}

                      {/* Interactive Nav Arrows on Hover */}
                      <button
                        onClick={(e) => handlePrevSlide(e, ep.id, ep.gallery!.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/60 hover:bg-accent-orange text-white hover:text-white flex items-center justify-center border border-white/10 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 active:scale-90"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <button
                        onClick={(e) => handleNextSlide(e, ep.id, ep.gallery!.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/60 hover:bg-accent-orange text-white hover:text-white flex items-center justify-center border border-white/10 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 active:scale-90"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      {/* Slide Indicator Dots */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
                        {ep.gallery.map((_, imgIdx) => (
                          <div 
                            key={imgIdx}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                              (cardImageIndices[ep.id] || 0) === imgIdx 
                                ? "bg-accent-orange w-3" 
                                : "bg-white/40"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  ) : ep.coverImage ? (
                    <img 
                      src={ep.coverImage} 
                      alt={ep.guestName} 
                      className="w-full h-full object-cover contrast-100 brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-all duration-700" 
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-tr from-accent-orange/10 to-transparent opacity-30" />
                      <span className="font-serif italic text-white/50 text-xl font-medium tracking-tight px-4 text-center">
                        {ep.guestName}
                      </span>
                    </>
                  )}
                  {/* Subtle projector beam effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none" />
                </div>

                <div className="flex items-center gap-1.5 mb-3">
                  <span className="text-xs tracking-wider font-mono text-accent-copper uppercase font-bold">
                    {ep.guestTitle}
                  </span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-serif italic leading-snug text-white group-hover:text-accent-orange transition-colors duration-300 mb-3">
                  {ep.title}
                </h3>
                
                <p className="text-sm text-stone-400 leading-relaxed font-serif mb-6 line-clamp-3">
                  "{ep.description}"
                </p>
              </div>

              {/* Multi-destination Playback Controls */}
              <div className="border-t border-white/[0.04] pt-4 mt-6 flex items-center justify-between">
                <button
                  onClick={() => handleOpenHighlights(ep)}
                  className="text-xs tracking-widest font-mono text-stone-300 group-hover:text-accent-orange transition-colors duration-300 font-bold uppercase flex items-center gap-1 cursor-pointer"
                >
                  Read highlights <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Direct Playback Redirect Toolbar */}
                <div className="flex items-center gap-3">
                  {/* On-Site Play */}
                  <button
                    onClick={() => handleSpotlightPlay(ep)}
                    className="p-1.5 rounded-full border border-stone-850 hover:border-accent-orange hover:bg-accent-orange/5 text-stone-400 hover:text-accent-orange transition-all duration-300"
                    title="Watch On-Site"
                  >
                    <Play className="w-3 h-3 fill-current" />
                  </button>
                  
                  {/* Watch on YouTube */}
                  <a
                    href={`https://www.youtube.com/watch?v=${ep.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-full border border-stone-850 hover:border-[#FF0000] hover:bg-[#FF0000]/5 text-stone-400 hover:text-[#FF0000] transition-all duration-300"
                    title="Watch on YouTube"
                  >
                    <YoutubeIcon className="w-3 h-3" />
                  </a>

                  {/* Listen on Spotify */}
                  {ep.spotifyUrl && (
                    <a
                      href="https://open.spotify.com/show/2OkRCNNTbwaAB2CElTDdYH"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-full border border-stone-850 hover:border-[#1DB954] hover:bg-[#1DB954]/5 text-stone-400 hover:text-[#1DB954] transition-all duration-300"
                      title="Listen on Spotify"
                    >
                      <Headphones className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 4. EPISODE CATALOGUE & DIRECTORY */}
      <section id="episodes" className="w-full max-w-7xl mx-auto px-6 md:px-8 py-20 pb-36 text-left relative">
        
        {/* Glowing timeline background thread for the catalog */}
        <div className="orange-thread-timeline">
          
          <header className="mb-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pl-10">
            <div className="flex flex-col">
              <span className="text-xs tracking-[0.4em] font-mono text-accent-gold uppercase font-bold mb-3 block">
                EPISODES CATALOGUE
              </span>
              <h2 className="text-3xl md:text-5xl font-serif italic leading-tight font-medium">
                Audio & Video Library
              </h2>
            </div>
            
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: "ALL" },
                { id: "placement", label: "PLACEMENTS" },
                { id: "academic", label: "ACADEMICS" },
                { id: "startup", label: "STARTUPS" },
                { id: "global", label: "GLOBAL DIARIES" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-4 py-2 rounded-full text-[9px] tracking-widest font-mono uppercase transition-all duration-300 cursor-pointer ${
                    selectedCategory === tab.id
                      ? "bg-accent-orange text-white font-bold"
                      : "border border-stone-850 text-stone-400 hover:text-stone-200 hover:border-stone-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </header>

          {/* Directory Row Entries */}
          <div className="flex flex-col gap-4 pl-10">
            {filteredEpisodes.map((ep) => (
              <div
                key={ep.id}
                className="group backdrop-blur-md bg-card-bg/10 border border-white/[0.02] hover:border-white/[0.06] px-6 py-5 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 transition-all duration-300 hover:scale-[1.005] relative"
              >
                {/* Visual node on the orange timeline thread */}
                <div className={`absolute left-[-26px] top-1/2 w-3.5 h-3.5 rounded-full border border-black group-hover:scale-125 transition-all duration-300 z-10 animate-pulse-glow ${
                  ep.category === "startup"
                    ? "bg-accent-orange text-accent-orange shadow-[0_0_10px_#FF5E36]"
                    : ep.category === "academic"
                    ? "bg-accent-gold text-accent-gold shadow-[0_0_10px_#FFAE19]"
                    : ep.category === "placement"
                    ? "bg-accent-copper text-accent-copper shadow-[0_0_10px_#C5A07F]"
                    : "bg-accent-bronze text-accent-bronze shadow-[0_0_10px_#D4AF37]"
                }`} />

                <div className="flex items-start md:items-center gap-4 md:gap-5 w-full md:w-3/5">
                  <span className="w-9 h-9 rounded-full border border-stone-850 flex items-center justify-center font-mono text-xs text-accent-orange font-bold shrink-0 mt-0.5 md:mt-0">
                    {ep.episodeNumber}{ep.episodeSub ? ep.episodeSub.toUpperCase() : ""}
                  </span>
                  <div className="flex flex-col text-left">
                    <h4 
                      onClick={() => handleOpenHighlights(ep)}
                      className="text-lg md:text-xl font-serif italic text-white hover:text-accent-orange transition-colors duration-300 cursor-pointer"
                    >
                      {ep.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className="text-[10px] tracking-wider text-[#C5A07F] font-mono uppercase bg-white/[0.03] px-2.5 py-0.5 rounded border border-white/[0.04] font-bold">
                        {ep.releaseDate || "JUNE 2025"}
                      </span>
                      <span className="text-stone-700 text-xs font-mono">•</span>
                      <span className="text-xs tracking-wider text-stone-400 uppercase font-mono">
                        {ep.guestName} • {ep.guestTitle}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-2/5 border-t border-white/[0.03] md:border-t-0 pt-4 md:pt-0">
                  <div className="flex items-center gap-4 text-xs font-mono text-stone-500 uppercase">
                    <span className={`px-3 py-1 rounded font-mono text-[9px] tracking-widest uppercase border ${
                      ep.category === "startup"
                        ? "bg-[#2D1212] text-accent-orange border-accent-orange/10"
                        : ep.category === "academic"
                        ? "bg-[#2D2412] text-accent-gold border-accent-gold/10"
                        : ep.category === "placement"
                        ? "bg-[#251E1A] text-accent-copper border-accent-copper/10"
                        : "bg-[#25251A] text-accent-bronze border-accent-bronze/10"
                    }`}>
                      {ep.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{ep.duration}</span>
                    </div>
                  </div>

                  {/* Multi-Destination Trigger Actions */}
                  <div className="flex items-center gap-2">
                    {/* Direct On-Site Play */}
                    <button
                      onClick={() => handleSpotlightPlay(ep)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-accent-orange/10 hover:bg-accent-orange text-accent-orange hover:text-white font-bold text-xs tracking-widest font-mono uppercase transition-all duration-300 cursor-pointer"
                    >
                      <span>Play</span>
                      <Play className="w-2.5 h-2.5 fill-current" />
                    </button>

                    {/* YouTube Outpost */}
                    <a
                      href={`https://www.youtube.com/watch?v=${ep.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-full border border-stone-850 hover:border-[#FF0000] hover:bg-[#FF0000]/10 text-stone-500 hover:text-[#FF0000] transition-colors"
                      title="Watch on YouTube"
                    >
                      <YoutubeIcon className="w-3.5 h-3.5" />
                    </a>

                    {/* Spotify Outpost */}
                    {ep.spotifyUrl && (
                      <a
                        href="https://open.spotify.com/show/2OkRCNNTbwaAB2CElTDdYH"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-full border border-stone-850 hover:border-[#1DB954] hover:bg-[#1DB954]/10 text-stone-500 hover:text-[#1DB954] transition-colors"
                        title="Listen on Spotify"
                      >
                        <Headphones className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>

      </section>

      {/* 4.5. ABOUT SECTION */}
      <section id="about" className="w-full border-t border-white/[0.02] bg-[#0F0606] relative overflow-hidden">
        {/* Subtle orange accent light underlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-accent-orange/[0.03] rounded-full blur-[180px] pointer-events-none" />

        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 py-28 flex flex-col lg:flex-row justify-between items-start gap-16 relative z-10">
          
          {/* Left Column: About the Podcast & Official Banner Art */}
          <div className="w-full lg:w-[52%] flex flex-col text-left justify-start">
            <span className="text-xs tracking-[0.4em] font-mono text-accent-orange uppercase font-bold mb-4 block">
              ABOUT THE PODCAST
            </span>
            <h2 className="text-3xl md:text-5xl font-serif italic leading-tight text-white mb-6 font-medium">
              Deconstructing the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange via-accent-gold to-white">
                IIT Legacy
              </span>
            </h2>
            <p className="text-sm md:text-base text-stone-400 font-serif leading-relaxed italic mb-8">
              "We unlock unfiltered, deeply human dialogues with the thinkers, builders, and administrators who shape the elite IIT corridors."
            </p>
            
            {/* Massive Square Channel Art Showcase */}
            <div className="w-full aspect-square rounded-[36px] overflow-hidden border border-white/[0.06] hover:border-accent-orange/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative group transition-all duration-500 bg-black/40 animate-shine">
              {/* Subtle top light overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-accent-orange/5 via-transparent to-white/5 pointer-events-none z-10" />
              
              <img 
                src="/about_banner.jpg" 
                alt="IIT Podcast Official Banner" 
                className="w-full h-full object-cover scale-100 group-hover:scale-[1.02] transition-transform duration-700 brightness-95 group-hover:brightness-100" 
              />
              
              {/* Floating aesthetic label */}
              <div className="absolute top-4 left-4 z-20 bg-black/75 backdrop-blur-md border border-white/[0.08] px-3.5 py-1.5 rounded-full shadow-lg">
                <span className="text-[8px] font-mono tracking-widest text-accent-gold uppercase font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-pulse" />
                  OFFICIAL CHANNEL ART
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: About Somenath (The Voice) */}
          <div className="w-full lg:w-[40%] flex flex-col text-left justify-start">
            <span className="text-xs tracking-[0.4em] font-mono text-accent-gold uppercase font-bold mb-4 block">
              THE VOICE
            </span>
            <h2 className="text-3xl md:text-5xl font-serif italic leading-tight text-white mb-8 font-medium">
              About the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-copper via-accent-gold to-white">
                Creator
              </span>
            </h2>

            {/* Embedded Creator Box */}
            <div className="backdrop-blur-xl bg-[#130707]/30 border border-white/[0.05] hover:border-accent-orange/20 p-8 md:p-10 rounded-[38px] shadow-[0_20px_50px_rgba(0,0,0,0.4)] w-full text-left hover:scale-[1.002] transition-all duration-500 relative overflow-hidden group">
              {/* Radial glow effect */}
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-accent-orange/10 rounded-full blur-3xl pointer-events-none group-hover:bg-accent-orange/15 transition-colors" />

              <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-16 rounded-[20px] bg-gradient-to-tr from-accent-orange to-accent-gold flex items-center justify-center text-white font-serif italic text-2xl shadow-lg font-bold flex-shrink-0">
                  SM
                </div>
                <div className="flex flex-col text-left">
                  <h3 className="text-2xl md:text-3xl font-serif italic font-medium text-white leading-tight">
                    Somenath Mondal
                  </h3>
                  <span className="text-xs font-mono text-accent-copper uppercase font-bold tracking-[0.15em] mt-1 block">
                    CREATOR & HOST, IIT PODCAST
                  </span>
                </div>
              </div>

              <p className="text-sm md:text-lg text-stone-200 leading-relaxed font-serif italic mb-8">
                "As an IIT alumnus, I built this space to host the raw, unpolished conversations I wish I had listened to during my own student years. This platform is a living journal of blueprints, resilience, and creative journeys."
              </p>

              <p className="text-xs md:text-base text-stone-400 leading-relaxed font-sans mb-10">
                Unlocking the personal files behind academic pressure, mental struggles, multi-hostel festival coordination, and the high-leverage careers post-graduation.
              </p>

              <div className="flex flex-wrap gap-4 border-t border-white/[0.04] pt-8">
                <a
                  href="https://somenath-portfolio-3d.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-accent-orange text-white font-bold text-xs tracking-widest uppercase hover:bg-accent-orange/95 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-accent-orange/20 cursor-pointer"
                >
                  <span>Explore 3D Portfolio</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. PERSISTENT MEDIA PLAYER */}
      <MediaPlayer />

      {/* 6. FULL STORY MODAL READ OVERLAY */}
      {readingEpisode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-[#140808] border border-white/[0.06] rounded-[32px] w-full max-w-4xl max-h-[85vh] flex flex-col shadow-[0_24px_60px_rgba(0,0,0,0.8)] overflow-hidden">
            
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-white/[0.03] flex justify-between items-center text-left">
              <div className="flex flex-col">
                <span className="text-xs tracking-widest font-mono text-accent-orange uppercase font-bold">
                  EPISODE {readingEpisode.episodeNumber}{readingEpisode.episodeSub ? readingEpisode.episodeSub.toUpperCase() : ""} CHRONICLE
                </span>
                <h3 className="text-xl md:text-2xl font-serif italic text-white mt-1 leading-tight">
                  {readingEpisode.title}
                </h3>
              </div>
              <button
                onClick={() => setReadingEpisode(null)}
                className="w-10 h-10 rounded-full border border-stone-850 hover:border-stone-600 flex items-center justify-center text-stone-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scroll Content */}
            <div className="flex-grow p-8 overflow-y-auto custom-scroll text-left">
              
              {/* Embedded On-Site YouTube Video Player */}
              <div className="w-full aspect-video rounded-3xl overflow-hidden bg-black border border-white/[0.05] mb-8 shadow-2xl relative">
                <iframe
                  src={`https://www.youtube.com/embed/${readingEpisode.youtubeId}?autoplay=${modalVideoSeconds !== null ? 1 : 0}&start=${modalVideoSeconds !== null ? modalVideoSeconds : 0}`}
                  title={readingEpisode.title}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Sync Playback Takeaways */}
              <div className="mb-10">
                <h4 className="text-[10px] tracking-[0.2em] font-mono text-accent-gold uppercase font-bold mb-4">
                  STITCHED SEGMENT KEY TAKEAWAYS (CLICK TO JUMP VIDEO)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {readingEpisode.takeaways.map((takeaway, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setModalVideoSeconds(takeaway.seconds);
                        handleSpotlightPlay(readingEpisode);
                        jumpToTimestamp(takeaway.seconds);
                      }}
                      className="cursor-pointer bg-card-bg/25 border border-white/[0.04] hover:border-accent-orange/30 p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                    >
                      <div className="flex justify-between items-center mb-2 font-mono text-xs">
                        <span className="text-accent-copper font-bold uppercase">TAKEAWAY 0{idx + 1}</span>
                        <span className="px-2 py-0.5 bg-[#2D1212] border border-accent-orange/10 rounded text-accent-orange flex items-center gap-1 font-bold">
                          <Play className="w-2.5 h-2.5 fill-accent-orange" /> {takeaway.time}
                        </span>
                      </div>
                      <h5 className="text-sm font-serif italic font-medium text-white mb-2">{takeaway.title}</h5>
                      <p className="text-xs text-stone-400 leading-relaxed font-serif">"{takeaway.text}"</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Narrative Article */}
              <div className="prose prose-invert prose-stone max-w-none prose-headings:font-serif prose-headings:italic prose-blockquote:font-serif prose-blockquote:italic border-t border-white/[0.03] pt-8">
                <span className="text-xs tracking-[0.2em] font-mono text-stone-500 uppercase block mb-6">
                  FULL HIGHLIGHTS DIARY
                </span>
                
                <div className="font-serif italic text-stone-200 text-sm leading-relaxed whitespace-pre-line prose-p:mb-4">
                  {readingEpisode.fullStoryMarkdown}
                </div>
              </div>

            </div>

            {/* Modal Footer with Multi-Destination Playback Options */}
            <div className="px-8 py-5 border-t border-white/[0.03] flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#0F0606]/60">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-accent-orange" />
                <span className="text-xs font-mono text-stone-300 uppercase font-bold">
                  RELEASED • {readingEpisode.releaseDate || "JUNE 2025"}
                </span>
              </div>
              
              {/* Playback Destinations Toolbar */}
              <div className="flex flex-wrap items-center gap-3">
                {/* On-Site player */}
                <button
                  onClick={() => {
                    handleSpotlightPlay(readingEpisode);
                    setReadingEpisode(null);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-accent-orange text-white font-bold text-[10px] tracking-widest uppercase hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg shadow-accent-orange/10"
                >
                  <Play className="w-3 h-3 fill-white" />
                  <span>Play On-Site</span>
                </button>

                {/* YouTube */}
                <a
                  href={`https://www.youtube.com/watch?v=${readingEpisode.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-stone-800 hover:border-[#FF0000] bg-black/40 text-stone-300 hover:text-white font-bold text-[10px] tracking-widest uppercase hover:scale-105 active:scale-95 transition-all"
                >
                  <YoutubeIcon className="w-3.5 h-3.5 text-[#FF0000]" />
                  <span>Watch on YouTube</span>
                </a>

                {/* Spotify */}
                {readingEpisode.spotifyUrl && (
                  <a
                    href="https://open.spotify.com/show/2OkRCNNTbwaAB2CElTDdYH"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-stone-800 hover:border-[#1DB954] bg-black/40 text-stone-300 hover:text-white font-bold text-[10px] tracking-widest uppercase hover:scale-105 active:scale-95 transition-all"
                  >
                    <Headphones className="w-3.5 h-3.5 text-[#1DB954]" />
                    <span>Listen on Spotify</span>
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
