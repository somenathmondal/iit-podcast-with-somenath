"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2, Check, Play, BookOpen, Headphones } from "lucide-react";
import Header from "../../../components/Header";
import { blogs, BlogArticle } from "../../../data/blogs";
import { episodes, Episode } from "../../../data/episodes";
import { usePlayerStore } from "../../../lib/store";

interface PageParams {
  id: string;
}

export default function BlogReadingPage({ params }: { params: React.Usable<PageParams> }) {
  const { id } = React.use(params);
  const { setActiveEpisode, setIsPlaying } = usePlayerStore();

  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll reading progress calculator
  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentScroll = window.scrollY;
        setScrollProgress((currentScroll / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 1. Check if ID belongs to custom long-form editorials
  const editorial = blogs.find((b) => b.id === id);

  // 2. Check if ID belongs to episode digests
  const episode = episodes.find((ep) => ep.id === id);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0F0606] text-white flex items-center justify-center font-mono">
        <span className="text-stone-500 uppercase tracking-widest text-xs animate-pulse">Loading Journal...</span>
      </div>
    );
  }

  // Handle case where article is not found
  if (!editorial && !episode) {
    return (
      <div className="min-h-screen bg-[#0F0606] text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-serif italic mb-4">Journal Entry Not Found</h2>
        <p className="text-sm text-stone-400 mb-8 max-w-sm">The notebook ID does not match any current files.</p>
        <Link href="/blog" className="px-6 py-3 rounded-full bg-accent-orange text-white text-xs font-mono uppercase tracking-widest font-bold">
          Return to Journal
        </Link>
      </div>
    );
  }

  // Derive standardized values based on whether it is an editorial or episode digest
  const title = editorial ? editorial.title : episode!.title;
  const description = editorial ? editorial.description : episode!.description;
  const author = editorial ? editorial.author : episode!.guestName;
  const authorTitle = editorial ? "IIT PODCAST EDITORIAL" : episode!.guestTitle;
  const category = editorial ? editorial.category : episode!.category;
  const releaseDate = editorial ? editorial.releaseDate : (episode!.releaseDate || "JUNE 2025");
  const readTime = editorial 
    ? editorial.readTime 
    : `${Math.round(parseInt(episode!.duration.split(":")[0]) / 5)} min read`;
  const coverImage = editorial ? editorial.coverImage : (episode!.coverImage || "/thumbnails/Ep00-ProfSuman.png");
  const tags = editorial ? editorial.tags : episode!.tags;

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };

  const handlePlayPodcast = () => {
    if (episode) {
      setActiveEpisode(episode);
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0606] text-white flex flex-col font-sans selection:bg-accent-orange selection:text-white relative">
      
      {/* Dynamic Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-accent-orange z-50 transition-all duration-100" 
        style={{ width: `${scrollProgress}%` }}
      />

      <Header />

      <main className="flex-grow w-full max-w-4xl mx-auto px-6 md:px-8 py-10 md:py-16 text-left relative">
        
        {/* Back Link */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-stone-400 hover:text-white text-xs font-mono uppercase tracking-wider mb-8 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Journal</span>
        </Link>

        {/* Categories Row */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className={`px-2.5 py-1 rounded bg-[#0F0606]/85 border text-[8px] font-mono tracking-widest uppercase font-bold ${
            editorial 
              ? "text-accent-gold border-accent-gold/20 bg-accent-gold/5" 
              : "text-accent-copper border-accent-copper/20 bg-accent-copper/5"
          }`}>
            {editorial ? "Long-form Editorial" : "Episode Digest"}
          </span>
          <span className="text-stone-700 text-xs font-mono">•</span>
          <span className="px-2 py-0.5 rounded bg-[#2D1212] border border-accent-orange/15 text-[8px] font-mono tracking-widest text-accent-orange uppercase font-bold">
            {category}
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif italic leading-[1.1] text-white font-medium mb-6">
          {title}
        </h1>

        {/* Metas and Share Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/[0.04] pb-8 mb-10">
          
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-stone-400 font-mono text-[10px] uppercase font-bold">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-accent-orange" />
              <span>Released {releaseDate}</span>
            </div>
            <span className="text-stone-700">•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-accent-gold" />
              <span>{readTime}</span>
            </div>
            <span className="text-stone-700">•</span>
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-accent-copper" />
              <span>By {author}</span>
            </div>
          </div>

          {/* Share */}
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-stone-850 hover:border-accent-orange/40 bg-white/[0.01] hover:bg-accent-orange/10 font-bold text-[9px] tracking-widest uppercase text-stone-300 hover:text-white transition-all duration-300 cursor-pointer self-start sm:self-center"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#1DB954]" />
                <span className="text-[#1DB954]">Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-accent-orange" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>

        {/* Feature Cover Image Banner */}
        <div className="w-full aspect-video rounded-3xl overflow-hidden border border-white/[0.05] shadow-2xl mb-12 relative">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0606]/30 to-transparent" />
        </div>

        {/* MAIN ARTICLE BODY CONTAINER */}
        <div className="prose prose-invert prose-stone max-w-none prose-headings:font-serif prose-headings:italic prose-blockquote:font-serif prose-blockquote:italic text-left">
          
          {editorial ? (
            /* A. Long-Form Editorial Renderer (Supports rich markdown styling) */
            <div className="font-serif italic text-stone-200 text-base md:text-lg leading-relaxed whitespace-pre-line prose-p:mb-6">
              {editorial.contentMarkdown}
            </div>
          ) : (
            /* B. Dynamic Short-Form Episode Digest Renderer */
            <div className="flex flex-col gap-10">
              
              {/* Embedded On-site Player */}
              <div className="flex flex-col gap-4">
                <h4 className="text-[10px] tracking-[0.2em] font-mono text-accent-gold uppercase font-bold">
                  WATCH CONVERSATION SEGMENTS DIRECTLY
                </h4>
                <div className="w-full aspect-video rounded-3xl overflow-hidden bg-black border border-white/[0.05] shadow-2xl relative">
                  <iframe
                    src={`https://www.youtube.com/embed/${episode!.youtubeId}`}
                    title={title}
                    className="absolute inset-0 w-full h-full border-0"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                
                {/* On-Site Audio Player Trigger */}
                <div className="flex flex-wrap gap-3 mt-2">
                  <button
                    onClick={handlePlayPodcast}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-accent-orange text-white font-bold text-[9px] tracking-widest uppercase hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg shadow-accent-orange/10"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    <span>Play Audio Podcast</span>
                  </button>
                  <a
                    href="https://open.spotify.com/show/2OkRCNNTbwaAB2CElTDdYH"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-stone-800 hover:border-[#1DB954] bg-black/40 text-stone-300 hover:text-white font-bold text-[9px] tracking-widest uppercase hover:scale-105 active:scale-95 transition-all"
                  >
                    <Headphones className="w-3.5 h-3.5 text-[#1DB954]" />
                    <span>Listen on Spotify</span>
                  </a>
                </div>
              </div>

              {/* Stitched Takeaways Cards Grid */}
              <div className="border-t border-white/[0.03] pt-8">
                <h4 className="text-[10px] tracking-[0.2em] font-mono text-accent-gold uppercase font-bold mb-4">
                  CORE DIGEST KEY TAKEAWAYS
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {episode!.takeaways.map((takeaway, idx) => (
                    <div
                      key={idx}
                      className="bg-card-bg/25 border border-white/[0.04] p-5 rounded-2xl text-left"
                    >
                      <div className="flex justify-between items-center mb-2 font-mono text-[9px]">
                        <span className="text-accent-copper font-bold uppercase">TAKEAWAY 0{idx + 1}</span>
                        <span className="px-2 py-0.5 bg-[#2D1212] border border-accent-orange/10 rounded text-accent-orange font-bold">
                          {takeaway.time}
                        </span>
                      </div>
                      <h5 className="text-base font-serif italic font-medium text-white mb-2">{takeaway.title}</h5>
                      <p className="text-xs text-stone-400 leading-relaxed font-serif">"{takeaway.text}"</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Transcript Commentary Narrative */}
              <div className="border-t border-white/[0.03] pt-8 text-left">
                <h4 className="text-[10px] tracking-[0.2em] font-mono text-stone-500 uppercase block mb-4">
                  THE CHRONICLE JOURNAL
                </h4>
                <p className="font-serif italic text-stone-200 text-base md:text-lg leading-relaxed whitespace-pre-line prose-p:mb-6">
                  {episode!.fullStoryMarkdown}
                </p>
              </div>

            </div>
          )}

        </div>

        {/* Footer Tags */}
        <div className="mt-12 pt-8 border-t border-white/[0.03] flex flex-wrap gap-2 text-left">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full border border-stone-850 bg-white/[0.01] text-[10px] font-mono text-stone-400 uppercase font-bold"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Author Bio Card */}
        <div className="mt-12 bg-card-bg/10 border border-white/[0.03] p-6 rounded-2xl flex items-center gap-4 text-left">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent-orange to-accent-gold flex items-center justify-center text-white font-serif italic text-sm font-bold flex-shrink-0">
            {author.substring(0, 2).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">WRITTEN BY</span>
            <h4 className="text-sm font-bold text-white mt-0.5">{author}</h4>
            <span className="text-[9px] font-mono text-accent-copper uppercase font-bold">{authorTitle}</span>
          </div>
        </div>

      </main>
    </div>
  );
}
