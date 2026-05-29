"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2, Check, BookOpen, Headphones } from "lucide-react";
import Header from "../../../components/Header";
import { blogs, BlogArticle } from "../../../data/blogs";
import { episodes, Episode } from "../../../data/episodes";

// Parse inline markdown elements: bold (**), italic (*), inline code (`)
const parseInlineElements = (text: string) => {
  if (!text) return "";
  
  // 1. Process inline code segments first
  const tokens = text.split(/(`.*?`)/g);
  
  return tokens.flatMap((token, idx) => {
    if (token.startsWith("`") && token.endsWith("`")) {
      return (
        <code key={`code-${idx}`} className="font-mono text-[11px] px-1.5 py-0.5 bg-[#2D1212]/50 border border-accent-orange/15 text-accent-orange rounded mx-0.5">
          {token.slice(1, -1)}
        </code>
      );
    }
    
    // 2. Process bold (**) and italics (*) inside standard text parts
    const subTokens = token.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return subTokens.map((subToken, subIdx) => {
      if (subToken.startsWith("**") && subToken.endsWith("**")) {
        return (
          <strong key={`bold-${idx}-${subIdx}`} className="font-sans font-bold text-white tracking-wide">
            {subToken.slice(2, -2)}
          </strong>
        );
      }
      if (subToken.startsWith("*") && subToken.endsWith("*")) {
        return (
          <em key={`em-${idx}-${subIdx}`} className="font-serif italic text-stone-200">
            {subToken.slice(1, -1)}
          </em>
        );
      }
      return subToken;
    });
  });
};

// Render full markdown content with proper structured JSX elements
const renderMarkdown = (markdown: string) => {
  if (!markdown) return null;
  const lines = markdown.split("\n");
  const elements: React.ReactNode[] = [];
  let currentList: React.ReactNode[] = [];
  let listType: "ul" | "ol" | null = null;

  const pushList = (key: string | number) => {
    if (currentList.length > 0) {
      if (listType === "ul") {
        elements.push(
          <ul key={`ul-${key}`} className="list-disc pl-6 my-4 space-y-3 text-stone-200/90 font-sans text-base md:text-[19px] lg:text-[20px] leading-[1.8] text-left">
            {currentList}
          </ul>
        );
      } else if (listType === "ol") {
        elements.push(
          <ol key={`ol-${key}`} className="list-decimal pl-6 my-4 space-y-3 text-stone-200/90 font-sans text-base md:text-[19px] lg:text-[20px] leading-[1.8] text-left">
            {currentList}
          </ol>
        );
      }
      currentList = [];
      listType = null;
    }
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    
    // Empty line
    if (!trimmed) {
      pushList(idx);
      return;
    }

    // Divider
    if (trimmed === "---") {
      pushList(idx);
      elements.push(<hr key={`hr-${idx}`} className="my-8 border-t border-white/[0.08]" />);
      return;
    }

    // Heading 4 (Check this first to prevent H3 prefix mismatch)
    if (trimmed.startsWith("####")) {
      pushList(idx);
      const headingText = trimmed.replace(/^####\s+/, "");
      elements.push(
        <h4 key={`h4-${idx}`} className="text-xl md:text-2xl font-serif text-accent-gold font-semibold mt-8 mb-4 border-l-2 border-accent-gold/40 pl-4 text-left">
          {parseInlineElements(headingText)}
        </h4>
      );
      return;
    }

    // Heading 3
    if (trimmed.startsWith("###")) {
      pushList(idx);
      const headingText = trimmed.replace(/^###\s+/, "");
      elements.push(
        <h3 key={`h3-${idx}`} className="text-2xl md:text-3xl font-serif text-white font-semibold mt-10 mb-5 border-l-2 border-accent-orange pl-4 text-left">
          {parseInlineElements(headingText)}
        </h3>
      );
      return;
    }

    // Unordered list item
    if (trimmed.startsWith("*") || trimmed.startsWith("-")) {
      if (listType !== "ul") {
        pushList(idx);
        listType = "ul";
      }
      const itemText = trimmed.replace(/^[\*\-]\s+/, "");
      currentList.push(<li key={`li-${idx}`}>{parseInlineElements(itemText)}</li>);
      return;
    }

    // Ordered list item
    if (/^\d+\.\s+/.test(trimmed)) {
      if (listType !== "ol") {
        pushList(idx);
        listType = "ol";
      }
      const itemText = trimmed.replace(/^\d+\.\s+/, "");
      currentList.push(<li key={`li-${idx}`}>{parseInlineElements(itemText)}</li>);
      return;
    }

    // Regular paragraph
    pushList(idx);
    elements.push(
      <p key={`p-${idx}`} className="text-stone-200/90 font-sans text-base md:text-[19px] lg:text-[20px] leading-[1.8] mb-6 text-left">
        {parseInlineElements(trimmed)}
      </p>
    );
  });

  pushList("final");
  return elements;
};

interface BlogReadingClientProps {
  id: string;
}

export default function BlogReadingClient({ id }: BlogReadingClientProps) {

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
  const author = "Somenath Mondal";
  const authorTitle = editorial ? "IIT PODCAST EDITORIAL" : episode!.guestTitle;
  const category = editorial ? editorial.category : episode!.category;
  const releaseDate = editorial ? editorial.releaseDate : (episode!.releaseDate || "JUNE 2025");
  const readTime = editorial 
    ? editorial.readTime 
    : `${Math.round(parseInt(episode!.duration.split(":")[0]) / 5)} min read`;
  const youtubeId = editorial 
    ? (editorial.youtubeId || "wGoU_5GjRro") 
    : episode!.youtubeId;
  const coverImage = editorial 
    ? editorial.coverImage 
    : `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
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



  return (
    <div className="min-h-screen bg-[#0F0606] text-white flex flex-col font-sans selection:bg-accent-orange selection:text-white relative">
      
      {/* Dynamic Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-accent-orange z-50 transition-all duration-100" 
        style={{ width: `${scrollProgress}%` }}
      />

      <Header />

      <main className="flex-grow w-full max-w-3xl mx-auto px-6 md:px-8 pt-3 pb-10 md:pt-8 md:pb-16 text-left relative">
        
        {/* Back Link */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-stone-400 hover:text-white text-xs font-mono uppercase tracking-wider mb-2 md:mb-4 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Journal</span>
        </Link>

        {/* Categories Row */}
        <div className="flex flex-wrap items-center gap-3 mb-2 md:mb-6">
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
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-sans font-extrabold tracking-tight leading-[1.2] bg-gradient-to-r from-white via-[#FFF5F2] to-accent-orange bg-clip-text text-transparent mb-3 md:mb-6">
          {title}
        </h1>

        {/* Metas and Share Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.04] pb-2.5 mb-4 sm:pb-8 sm:mb-10">
          
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-stone-400 font-mono text-xs uppercase font-bold">
            <div className="hidden sm:flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-accent-orange" />
              <span>Released {releaseDate}</span>
            </div>
            <span className="hidden sm:inline text-stone-700">•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-accent-gold" />
              <span>{readTime}</span>
            </div>
            <span className="text-stone-700">•</span>
            <a 
              href="https://www.linkedin.com/in/somenath-mondal-xr-tech/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-accent-copper" />
              <span>By {author}</span>
            </a>
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

        {/* Dynamic YouTube Video Embed Banner - ALWAYS rendered at the top of the blog page */}
        <div className="w-full aspect-video rounded-3xl overflow-hidden bg-black border border-white/[0.05] shadow-2xl mb-5 md:mb-10 relative">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={title}
            className="absolute inset-0 w-full h-full border-0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* MAIN ARTICLE BODY CONTAINER */}
        <div className="prose prose-invert prose-stone max-w-none prose-headings:font-serif prose-blockquote:font-serif text-left">
          
          {editorial ? (
            /* A. Long-Form Editorial Renderer (Supports rich markdown styling) */
            <div className="text-stone-200 text-left">
              {renderMarkdown(editorial.contentMarkdown)}
            </div>
          ) : (
            /* B. Dynamic Short-Form Episode Digest Renderer */
            <div className="flex flex-col gap-8">
              
              {/* Spotify Player Trigger */}
              <div className="flex flex-wrap gap-3">
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

              {/* Main Dynamic Transcript Commentary Narrative */}
              <div className="border-t border-white/[0.03] pt-8 text-left">
                <h4 className="text-xs tracking-[0.2em] font-mono text-stone-500 uppercase block mb-6">
                  THE CHRONICLE JOURNAL
                </h4>
                
                {/* Dynamically Expanded Editorial Content */}
                <div className="space-y-10 text-stone-200/90 font-sans text-base md:text-[19px] lg:text-[20px] leading-[1.8]">
                  
                  {/* Part 1: Detailed Overview */}
                  <p>
                    Welcome to the official chronicle digest of our conversation with <strong className="text-white font-semibold">{episode!.guestName}</strong>, who serves as the <span className="text-accent-gold font-mono text-xs font-bold uppercase">{episode!.guestTitle}</span>. In this high-leverage episode, we dive deep behind-the-scenes to deconstruct career paths, survival tactics, and personal blueprints. 
                  </p>
                  
                  <p>
                    Specifically, {episode!.guestName} shares: <strong className="text-white font-sans font-medium text-lg md:text-xl lg:text-2xl leading-relaxed">"{episode!.description}"</strong>
                  </p>
 
                  <hr className="border-t border-white/[0.05]" />
 
                  {/* Part 3: Dynamic Chronicle Conclusion */}
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-serif text-white font-semibold border-l-2 border-accent-orange pl-4">
                      Chronicle Summary & Reflections
                    </h3>
                    <div className="text-stone-200/90 text-left">
                      {renderMarkdown(episode!.fullStoryMarkdown)}
                    </div>
                  </div>

                </div>
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
        <a 
          href="https://www.linkedin.com/in/somenath-mondal-xr-tech/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="mt-12 bg-card-bg/10 border border-white/[0.03] hover:border-accent-orange/20 hover:bg-card-bg/20 p-6 rounded-2xl flex items-center gap-4 text-left transition-all group block"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent-orange to-accent-gold flex items-center justify-center text-white font-serif italic text-sm font-bold flex-shrink-0">
            SM
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">WRITTEN BY</span>
            <h4 className="text-sm font-bold text-white mt-0.5 group-hover:text-accent-orange transition-colors">Somenath Mondal</h4>
            <span className="text-[9px] font-mono text-accent-copper uppercase font-bold">CREATOR & HOST, IIT PODCAST</span>
          </div>
        </a>

      </main>
    </div>
  );
}
