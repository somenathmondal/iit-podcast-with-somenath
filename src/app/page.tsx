"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Play, Calendar, Clock, ArrowRight, X, ExternalLink, Headphones } from "lucide-react";
import { track } from "@vercel/analytics";
import { sendGAEvent } from '@next/third-parties/google';
import Header from "../components/Header";
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
  const { setActiveEpisode, activeEpisode, isPlaying, setIsPlaying, setIsExpanded, jumpToTimestamp } = usePlayerStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [readingEpisode, setReadingEpisode] = useState<Episode | null>(null);
  const [modalVideoSeconds, setModalVideoSeconds] = useState<number | null>(null);
  const [spotlightAttract, setSpotlightAttract] = useState(false);


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



  const handleSpotlightPlay = (episode: Episode) => {
    setActiveEpisode(episode);
    setIsPlaying(true);
    setIsExpanded(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-accent-orange selection:text-white">
      {/* Google PodcastSeries Structured JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "PodcastSeries",
            "name": "IIT Podcast with Somenath",
            "description": "Deconstructing life before the JEE, Kota coachings, hostel fests, fiver-point struggles, campus placement diaries, and high-impact paths following graduation.",
            "url": "https://iit-podcast-with-somenath.vercel.app",
            "author": {
              "@type": "Person",
              "name": "Somenath Mondal"
            },
            "publisher": {
              "@type": "Organization",
              "name": "IIT Podcast Network"
            },
            "sameAs": [
              "https://open.spotify.com/show/2OkRCNNTbwaAB2CElTDdYH"
            ]
          })
        }}
      />

      {/* 1. Header Navigation */}
      <Header />

      {/* 2. TWO-COLUMN HERO ZONE */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-12 md:py-20 flex flex-col-reverse lg:flex-row items-stretch lg:items-center justify-between gap-6 md:gap-8 lg:gap-16 border-b border-border-light">
        
        {/* Left Column: Title & Editorial Text */}
        <div className="w-full lg:w-[44%] flex flex-col text-center lg:text-left items-center lg:items-start justify-center py-2 lg:py-4">
          <div className="flex items-center gap-2.5 mb-3 md:mb-6 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-accent-orange animate-pulse" />
            <span className="text-xs tracking-[0.25em] font-mono text-accent-copper uppercase font-bold">
              EST. JUNE 2025 • 32 STORIES
            </span>
          </div>
          <h2 className="text-[2.2rem] sm:text-[2.5rem] md:text-6xl lg:text-7xl font-sans font-black tracking-tight leading-[1.08] mb-4 md:mb-8 text-foreground" style={{ perspective: '600px' }}>
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
            {/* Part 2: IIT Alumni — gradient on the whole phrase */}
            <span
              className="animate-char-reveal inline-block text-transparent bg-clip-text bg-gradient-to-r from-accent-orange via-accent-gold to-foreground"
              style={{ animationDelay: '700ms' }}
            >
              IIT Alumni
            </span>
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-stone-400 font-sans leading-[1.7] md:leading-[1.9] mb-6 md:mb-10 max-w-sm mx-auto lg:mx-0 animate-fade-in-up" style={{ animationDelay: '850ms' }}>
            <span className="hidden sm:block mb-2">
              Is the JEE grind actually worth it?<br />
              What really happens inside IIT —<br />
              the pressure, the breakthroughs,<br />
              the careers nobody talks about.
            </span>
            <span className="text-stone-200 font-medium">Hear it raw, from the people who lived it.</span>
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-2.5 md:gap-4 animate-fade-in-up" style={{ animationDelay: '1050ms' }}>
            <Link
              href="/blog"
              className="group flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 rounded-2xl bg-accent-orange text-white font-black text-sm md:text-base tracking-wide uppercase hover:bg-[#ff4a1f] hover:scale-[1.03] active:scale-95 transition-all duration-200 shadow-[0_6px_0_#c43d1a] hover:shadow-[0_3px_0_#c43d1a] hover:translate-y-[3px] active:shadow-none active:translate-y-[6px] cursor-pointer"
            >
              <BookOpen className="w-5 h-5 animate-float" />
              <span>Read Journal</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Expanded Spotlight Card (Vertical aspect-video image layout on desktop) */}
        <div className="w-full lg:w-[50%] flex flex-col mt-2 md:mt-0">
          <span className="text-xs tracking-[0.3em] font-mono text-accent-gold uppercase mb-3 block font-bold text-left animate-fade-in-up animation-delay-500">
            EPISODE SPOTLIGHT
          </span>
          {episodes.map((ep) => ep.id === "suman-chakraborty-1" && (
            <div key={ep.id} className="relative group/glow w-full">
              {/* Ambient Glow Underlay */}
              <div className={`absolute -inset-1.5 rounded-3xl md:rounded-[38px] bg-gradient-to-r from-accent-orange/15 to-accent-gold/15 opacity-0 group-hover/glow:opacity-100 blur-xl transition-opacity duration-700 pointer-events-none z-0 ${spotlightAttract ? 'opacity-100 scale-102' : ''}`} />
              
              <div
                onClick={() => handleSpotlightPlay(ep)}
                className={`relative z-10 w-full group cursor-pointer backdrop-blur-md bg-card-elevated/80 border-2 border-card-shadow hover:border-accent-orange/80 p-0 rounded-[28px] md:rounded-[32px] transition-all duration-300 shadow-[0_6px_0_0_var(--card-shadow)] hover:shadow-[0_8px_0_0_#FF6B00] hover:-translate-y-1 active:translate-y-[6px] active:shadow-[0_0px_0_0_#FF6B00] text-left flex flex-col justify-between animate-scale-in-projector animation-delay-700 overflow-hidden ${spotlightAttract ? 'spotlight-attract' : ''}`}
              >
                {/* Premium Episode 0A (Prof Suman Part 1) Thumbnail Header - FULL WIDTH */}
                <div className="spotlight-thumb w-full aspect-video overflow-hidden border-b border-border-light relative group-hover:border-accent-orange/20 transition-all duration-500 animate-shine">
                  <img 
                    src={ep.coverImage} 
                    alt={ep.title} 
                    className="w-full h-full object-cover scale-100 group-hover:scale-[1.03] transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                  
                  {/* Floating aesthetic label */}
                  <div className="absolute top-4 left-4 z-20 bg-black/75 backdrop-blur-md border border-border-medium px-3.5 py-1.5 rounded-full shadow-lg">
                    <span className="text-[8px] font-mono tracking-widest text-accent-gold uppercase font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-pulse" />
                      FEATURED EPISODE
                    </span>
                  </div>
                  
                  <div className="spotlight-play-overlay absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div className="relative w-14 h-14 flex items-center justify-center">
                      {/* Sonar Ring */}
                      <div className={`absolute inset-0 rounded-full bg-accent-orange/30 opacity-0 group-hover:opacity-100 group-hover:animate-ping pointer-events-none ${spotlightAttract ? 'opacity-100 animate-ping' : ''}`} />
                      
                      <div className="w-14 h-14 rounded-full bg-accent-orange flex items-center justify-center shadow-lg shadow-accent-orange/40 transform scale-90 group-hover:scale-100 transition-transform duration-300 relative z-10">
                        <Play className="w-6 h-6 fill-white text-white translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Textual Narrative details side */}
                <div className="w-full flex flex-col justify-between p-6 md:p-8">
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
                    <h3 className="spotlight-title text-xl md:text-3xl font-sans font-bold leading-tight text-foreground group-hover:text-accent-orange transition-colors duration-300 mb-2 md:mb-3">
                      {ep.title}
                    </h3>
                    <p className="hidden md:block text-sm text-stone-400 leading-relaxed mb-6 font-sans">
                      {ep.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-border-light pt-3 md:pt-4 pb-1 md:pb-0 text-xs text-stone-500 font-mono">
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
            </div>
          ))}
        </div>

      </section>



      {/* 4. EPISODE CATALOGUE & DIRECTORY */}
      <section id="episodes" className="hidden md:block w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 pb-20 md:pb-36 text-left relative">
        
        {/* Glowing timeline background thread for the catalog */}
        <div className="orange-thread-timeline">
          
          <header className="mb-8 md:mb-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 md:gap-6 pl-8 md:pl-10">
            <div className="flex flex-col">
              <span className="text-xs tracking-[0.4em] font-mono text-accent-gold uppercase font-bold mb-3 block">
                EPISODES CATALOGUE
              </span>
              <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight leading-tight">
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
          <div className="flex flex-col gap-3 md:gap-4 pl-8 md:pl-10">
            {filteredEpisodes.map((ep) => (
              <div
                key={ep.id}
                className="group backdrop-blur-md bg-card-bg/10 border border-border-light hover:border-border-medium px-4 md:px-6 py-4 md:py-5 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 md:gap-6 transition-all duration-300 hover:scale-[1.005] relative"
              >
                {/* Visual node on the orange timeline thread */}
                <div className={`absolute left-[-18px] md:left-[-26px] top-1/2 w-3.5 h-3.5 rounded-full border border-black group-hover:scale-125 transition-all duration-300 z-10 animate-pulse-glow ${
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
                      className="text-lg md:text-xl font-sans font-bold text-foreground hover:text-accent-orange transition-colors duration-300 cursor-pointer"
                    >
                      {ep.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className="text-[10px] tracking-wider text-[#C5A07F] font-mono uppercase bg-card-glow-bg px-2.5 py-0.5 rounded border border-border-light font-bold">
                        {ep.releaseDate || "JUNE 2025"}
                      </span>
                      <span className="text-stone-700 text-xs font-mono">•</span>
                      <span className="text-xs tracking-wider text-stone-400 uppercase font-mono">
                        {ep.guestName} • {ep.guestTitle}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-2/5 border-t border-border-light md:border-t-0 pt-4 md:pt-0">
                  <div className="flex items-center gap-4 text-xs font-mono text-stone-500 uppercase">
                    <span className={`px-3 py-1 rounded font-mono text-[9px] tracking-widest uppercase border ${
                      ep.category === "startup"
                        ? "bg-pill-orange text-accent-orange border-accent-orange/10"
                        : ep.category === "academic"
                        ? "bg-pill-gold text-accent-gold border-accent-gold/10"
                        : ep.category === "placement"
                        ? "bg-pill-copper text-accent-copper border-accent-copper/10"
                        : "bg-pill-bronze text-accent-bronze border-accent-bronze/10"
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
      <section id="about" className="w-full border-t border-border-light bg-background relative overflow-hidden">
        {/* Subtle orange accent light underlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-accent-orange/[0.03] rounded-full blur-[180px] pointer-events-none" />

        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-28 flex flex-col lg:flex-row justify-between items-start gap-10 md:gap-16 relative z-10">
          
          {/* Left Column: About the Podcast & Official Banner Art */}
          <div className="flex w-full lg:w-[52%] flex-col text-left justify-start">
            {/* Heading — desktop only */}
            <span className="hidden lg:block text-xs tracking-[0.4em] font-mono text-accent-orange uppercase font-bold mb-4">
              ABOUT THE PODCAST
            </span>
            <h2 className="hidden lg:block text-3xl md:text-5xl font-sans font-bold tracking-tight leading-tight text-foreground mb-6">
              Deconstructing the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange via-accent-gold to-foreground">
                IIT Legacy
              </span>
            </h2>
            <p className="hidden lg:block text-sm md:text-base text-stone-400 font-sans leading-relaxed mb-8">
              We unlock unfiltered, deeply human dialogues with the thinkers, builders, and administrators who shape the elite IIT corridors.
            </p>
            
            {/* Channel Art — landscape on mobile, square on desktop */}
            <div className="w-full aspect-square rounded-2xl lg:rounded-[36px] overflow-hidden border border-border-medium hover:border-accent-orange/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative group transition-all duration-500 bg-black/40 animate-shine">
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

          {/* Right Column: About Somenath (The Voice) — full-width on mobile */}
          <div className="w-full lg:w-[40%] flex flex-col text-left justify-start">
            <span className="text-xs tracking-[0.4em] font-mono text-accent-gold uppercase font-bold mb-3 md:mb-4 block">
              THE VOICE
            </span>
            <h2 className="text-2xl md:text-5xl font-sans font-bold tracking-tight leading-tight text-foreground mb-5 md:mb-8">
              About the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-copper via-accent-gold to-foreground">
                Creator
              </span>
            </h2>

            {/* Embedded Creator Box */}
            <div className="backdrop-blur-xl bg-card-glow-bg/30 border border-border-light hover:border-accent-orange/20 p-6 md:p-10 rounded-[28px] md:rounded-[38px] shadow-[0_20px_50px_rgba(0,0,0,0.4)] w-full text-left transition-all duration-500 relative overflow-hidden group">
              {/* Radial glow effect */}
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-accent-orange/10 rounded-full blur-3xl pointer-events-none group-hover:bg-accent-orange/15 transition-colors" />

              <div className="flex items-center gap-4 md:gap-5 mb-5 md:mb-8">
                <div className="w-16 h-16 rounded-[20px] bg-gradient-to-tr from-accent-orange to-accent-gold flex items-center justify-center text-white font-sans text-2xl shadow-lg font-bold flex-shrink-0">
                  SM
                </div>
                <div className="flex flex-col text-left">
                  <h3 className="text-2xl md:text-3xl font-sans font-bold text-foreground leading-tight">
                    Somenath Mondal
                  </h3>
                  <span className="text-xs font-mono text-accent-copper uppercase font-bold tracking-[0.15em] mt-1 block">
                    CREATOR & HOST, IIT PODCAST
                  </span>
                </div>
              </div>

              <p className="text-sm md:text-lg text-stone-200 leading-relaxed font-sans mb-4 md:mb-8">
                As an IIT alumnus, I built this space to host the raw, unpolished conversations I wish I had listened to during my own student years. This platform is a living journal of blueprints, resilience, and creative journeys.
              </p>

              <p className="hidden md:block text-xs md:text-base text-stone-400 leading-relaxed font-sans mb-10">
                Unlocking the personal files behind academic pressure, mental struggles, multi-hostel festival coordination, and the high-leverage careers post-graduation.
              </p>

              <div className="flex flex-col gap-3 border-t border-border-light pt-5 md:pt-8">
                <a
                  href="https://www.linkedin.com/in/somenath-mondal-xr-tech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    track('LinkedIn Click', { location: 'creator_card' });
                    sendGAEvent('event', 'clicked_linkedin_profile', { location: 'creator_card' });
                  }}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl border-2 border-stone-700 bg-background hover:bg-stone-900 text-stone-300 hover:text-foreground hover:border-accent-orange font-bold text-[10px] tracking-widest uppercase transition-all duration-200 shadow-[0_4px_0_0_var(--card-shadow)] hover:shadow-[0_4px_0_0_rgba(234,88,12,1)] active:shadow-none hover:-translate-y-1 active:translate-y-1 cursor-pointer w-full whitespace-nowrap"
                >
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href="https://somenath-portfolio-3d.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl border-2 border-accent-orange bg-accent-orange text-white font-bold text-[10px] tracking-widest uppercase hover:bg-[#E85D10] hover:-translate-y-1 active:translate-y-1 transition-all duration-200 shadow-[0_4px_0_0_rgba(194,65,12,1)] active:shadow-none cursor-pointer w-full whitespace-nowrap"
                >
                  <span>Explore 3D Portfolio</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>



      {/* 6. FULL STORY MODAL READ OVERLAY */}
      {readingEpisode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-card-elevated border border-border-medium rounded-[32px] w-full max-w-4xl max-h-[85vh] flex flex-col shadow-[0_24px_60px_rgba(0,0,0,0.8)] overflow-hidden">
            
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-border-light flex justify-between items-center text-left">
              <div className="flex flex-col">
                <span className="text-xs tracking-widest font-mono text-accent-orange uppercase font-bold">
                  EPISODE {readingEpisode.episodeNumber}{readingEpisode.episodeSub ? readingEpisode.episodeSub.toUpperCase() : ""} CHRONICLE
                </span>
                <h3 className="text-xl md:text-2xl font-sans font-bold text-foreground mt-1 leading-tight">
                  {readingEpisode.title}
                </h3>
              </div>
              <button
                onClick={() => setReadingEpisode(null)}
                className="w-10 h-10 rounded-full border border-stone-850 hover:border-stone-500 flex items-center justify-center text-stone-400 hover:text-foreground transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scroll Content */}
            <div className="flex-grow p-8 overflow-y-auto custom-scroll text-left">
              
              {/* Embedded On-Site YouTube Video Player */}
              <div className="w-full aspect-video rounded-3xl overflow-hidden bg-black border border-border-light mb-8 shadow-2xl relative">
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
                <h4 className="text-xs tracking-[0.2em] font-mono text-accent-gold uppercase font-bold mb-4">
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
                      className="cursor-pointer bg-card-bg/25 border border-border-light hover:border-accent-orange/30 p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                    >
                      <div className="flex justify-between items-center mb-2 font-mono text-xs">
                        <span className="text-accent-copper font-bold uppercase">TAKEAWAY 0{idx + 1}</span>
                        <span className="px-2 py-0.5 bg-pill-orange border border-accent-orange/10 rounded text-accent-orange flex items-center gap-1 font-bold">
                          <Play className="w-2.5 h-2.5 fill-accent-orange" /> {takeaway.time}
                        </span>
                      </div>
                      <h5 className="text-base font-sans font-bold text-foreground mb-2">{takeaway.title}</h5>
                      <p className="text-sm text-stone-300 leading-relaxed font-sans">"{takeaway.text}"</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Narrative Article */}
              <div className="prose prose-invert prose-stone max-w-none border-t border-border-light pt-8">
                <span className="text-xs tracking-[0.2em] font-mono text-stone-500 uppercase block mb-6">
                  FULL HIGHLIGHTS DIARY
                </span>
                
                <div className="font-sans text-stone-200 text-base md:text-[18px] leading-[1.8] whitespace-pre-line prose-p:mb-6">
                  {readingEpisode.fullStoryMarkdown}
                </div>
              </div>

            </div>

            {/* Modal Footer with Multi-Destination Playback Options */}
            <div className="px-8 py-5 border-t border-border-light flex flex-col sm:flex-row justify-between items-center gap-4 bg-background/60">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-accent-orange" />
                <span className="text-xs font-mono text-stone-300 uppercase font-bold">
                  RELEASED • {readingEpisode.releaseDate || "JUNE 2025"}
                </span>
              </div>
              
              {/* Playback Destinations Toolbar */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    handleSpotlightPlay(readingEpisode);
                    setReadingEpisode(null);
                  }}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl border-2 border-accent-orange bg-accent-orange font-bold text-[10px] tracking-widest uppercase text-white hover:bg-[#E85D10] hover:-translate-y-1 active:translate-y-1 shadow-[0_4px_0_0_rgba(194,65,12,1)] active:shadow-none transition-all duration-200 cursor-pointer whitespace-nowrap"
                >
                  <Play className="w-3 h-3 fill-white" />
                  <span>Play On-Site</span>
                </button>

                {/* YouTube */}
                <a
                  href={`https://www.youtube.com/watch?v=${readingEpisode.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl border-2 border-[#FF0000] bg-background font-bold text-[10px] tracking-widest uppercase text-[#FF0000] hover:bg-[#FF0000] hover:text-white hover:-translate-y-1 active:translate-y-1 shadow-[0_4px_0_0_rgba(255,0,0,0.3)] hover:shadow-[0_4px_0_0_rgba(255,0,0,1)] active:shadow-none transition-all duration-200 cursor-pointer whitespace-nowrap"
                >
                  <YoutubeIcon className="w-3.5 h-3.5" />
                  <span>Watch on YouTube</span>
                </a>

                {/* Spotify */}
                {readingEpisode.spotifyUrl && (
                  <a
                    href={readingEpisode.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl border-2 border-[#1DB954] bg-background font-bold text-[10px] tracking-widest uppercase text-[#1DB954] hover:bg-[#1DB954] hover:text-black hover:-translate-y-1 active:translate-y-1 shadow-[0_4px_0_0_rgba(29,185,84,0.3)] hover:shadow-[0_4px_0_0_rgba(29,185,84,1)] active:shadow-none transition-all duration-200 cursor-pointer whitespace-nowrap"
                  >
                    <Headphones className="w-3.5 h-3.5" />
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
