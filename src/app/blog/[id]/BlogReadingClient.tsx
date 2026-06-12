"use client";

import React, { useState, useEffect } from "react";
import { Link } from "next-view-transitions";
import { ArrowLeft, ArrowRight, Calendar, Clock, Share2, Check, BookOpen, Headphones } from "lucide-react";
import { track } from "@vercel/analytics";
import Header from "../../../components/Header";
import { blogs, BlogArticle } from "../../../data/blogs";
import { episodes, Episode } from "../../../data/episodes";

// Parse inline markdown elements: links, bold (**), italic (*), inline code (`)
const parseInlineElements = (text: string): React.ReactNode[] | string => {
  if (!text) return "";
  
  // 1. Process inline code segments first
  const tokens = text.split(/(`.*?`)/g);
  
  return tokens.flatMap((token, idx) => {
    if (token.startsWith("`") && token.endsWith("`")) {
      return (
        <code key={`code-${idx}`} className="font-mono text-[11px] px-1.5 py-0.5 bg-pill-orange/50 border border-accent-orange/15 text-accent-orange rounded mx-0.5">
          {token.slice(1, -1)}
        </code>
      );
    }
    
    // 2. Process Links [text](url)
    const linkTokens = token.split(/(\[.*?\]\(.*?\))/g);
    return linkTokens.flatMap((linkToken, linkIdx) => {
      const linkMatch = linkToken.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        return (
          <a 
            key={`link-${idx}-${linkIdx}`} 
            href={linkMatch[2]} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-accent-gold font-bold hover:text-foreground underline decoration-accent-gold/40 hover:decoration-foreground transition-colors underline-offset-4"
          >
            {linkMatch[1]}
          </a>
        );
      }

      // 3. Process bold (**) and italics (*)
      const formatTokens = linkToken.split(/(\*\*.*?\*\*|\*.*?\*)/g);
      return formatTokens.map((formatToken, formatIdx) => {
        if (formatToken.startsWith("**") && formatToken.endsWith("**")) {
          return (
            <strong key={`bold-${idx}-${linkIdx}-${formatIdx}`} className="font-sans font-bold text-foreground tracking-wide">
              {formatToken.slice(2, -2)}
            </strong>
          );
        }
        if (formatToken.startsWith("*") && formatToken.endsWith("*")) {
          return (
            <em key={`em-${idx}-${linkIdx}-${formatIdx}`} className="font-serif italic text-stone-200">
              {formatToken.slice(1, -1)}
            </em>
          );
        }
        return formatToken;
      });
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
          <ul key={`ul-${key}`} className="my-6 space-y-4 text-stone-200/90 font-sans text-base md:text-[19px] lg:text-[20px] leading-[1.8] text-left">
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
      elements.push(<hr key={`hr-${idx}`} className="my-8 border-t border-border-medium" />);
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
        <h3 key={`h3-${idx}`} className="text-2xl md:text-3xl font-serif text-foreground font-semibold mt-10 mb-5 border-l-2 border-accent-orange pl-4 text-left">
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
      currentList.push(
        <li key={`li-${idx}`} className="flex gap-3 items-start">
          <span className="text-accent-orange font-bold mt-0.5">•</span>
          <span>{parseInlineElements(itemText)}</span>
        </li>
      );
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

  // 3. Compute the next entry for continuous swiping navigation
  const allEntries = [...blogs, ...episodes];
  const currentIndex = allEntries.findIndex(e => e.id === id);
  const nextEntry = currentIndex >= 0 && currentIndex < allEntries.length - 1 ? allEntries[currentIndex + 1] : null;

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center font-mono">
        <span className="text-stone-500 uppercase tracking-widest text-xs animate-pulse">Loading Journal...</span>
      </div>
    );
  }

  // Handle case where article is not found
  if (!editorial && !episode) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 text-center">
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
    : (() => {
        const combinedText = `${episode!.description} ${episode!.fullStoryMarkdown}`;
        const wordCount = combinedText.split(/\s+/).filter(w => w.length > 0).length;
        const minutes = Math.max(1, Math.ceil(wordCount / 200));
        return `${minutes} min read`;
      })();
  const youtubeId = editorial 
    ? (editorial.youtubeId || "wGoU_5GjRro") 
    : episode!.youtubeId;
  const spotifyUrl = editorial?.spotifyUrl || episode?.spotifyUrl;
  const guestProfiles = editorial?.guestProfiles || episode?.guestProfiles;
  const coverImage = editorial 
    ? editorial.coverImage 
    : (episode?.coverImage && episode.coverImage !== ""
        ? episode.coverImage
        : `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`);
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
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-accent-orange selection:text-white relative">
      
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
          className="inline-flex items-center gap-2 text-stone-400 hover:text-foreground text-xs font-mono uppercase tracking-wider mb-2 md:mb-4 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Journal</span>
        </Link>

        {/* Categories Row */}
        <div className="flex flex-wrap items-center gap-3 mb-2 md:mb-6">
          <span className={`px-2.5 py-1 rounded bg-background/85 border text-[8px] font-mono tracking-widest uppercase font-bold ${
            editorial 
              ? "text-accent-gold border-accent-gold/20 bg-accent-gold/5" 
              : "text-accent-copper border-accent-copper/20 bg-accent-copper/5"
          }`}>
            {editorial ? "Long-form Editorial" : "Episode Digest"}
          </span>
          <span className="text-stone-700 text-xs font-mono">•</span>
          <span className="px-2 py-0.5 rounded bg-pill-orange border border-accent-orange/15 text-[8px] font-mono tracking-widest text-accent-orange uppercase font-bold">
            {category}
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-sans font-extrabold tracking-tight leading-[1.2] bg-gradient-to-r from-foreground to-accent-orange bg-clip-text text-transparent mb-3 md:mb-6">
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
              onClick={() => track('LinkedIn Click', { location: 'author_meta_top' })}
              className="flex items-center gap-1.5 hover:text-foreground transition-colors group"
            >
              <div className="w-5 h-5 rounded-full overflow-hidden border border-border-medium group-hover:border-accent-orange/40 transition-colors">
                <img src="/somenath_profile.png" alt="Somenath Mondal" className="w-full h-full object-cover" />
              </div>
              <span>By {author}</span>
            </a>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            {/* Share */}
            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl border-2 border-stone-700 bg-background hover:bg-stone-900 font-bold text-[10px] tracking-widest uppercase text-stone-300 hover:text-foreground hover:border-accent-orange hover:-translate-y-1 active:translate-y-1 shadow-[0_4px_0_0_var(--card-shadow)] hover:shadow-[0_4px_0_0_rgba(234,88,12,1)] active:shadow-none transition-all duration-200 cursor-pointer whitespace-nowrap"
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

            {/* Spotify Button */}
            {spotifyUrl && (
              <a
                href={spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('Spotify Click', { location: 'blog_header' })}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl border-2 border-[#1DB954] bg-background font-bold text-[10px] tracking-widest uppercase text-[#1DB954] hover:bg-[#1DB954] hover:text-black hover:-translate-y-1 active:translate-y-1 shadow-[0_4px_0_0_rgba(29,185,84,0.3)] hover:shadow-[0_4px_0_0_rgba(29,185,84,1)] active:shadow-none transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>Listen on Spotify</span>
              </a>
            )}
          </div>
        </div>

        {/* Dynamic YouTube Video Embed Banner - ALWAYS rendered at the top of the blog page */}
        <div className="w-full aspect-video rounded-3xl overflow-hidden bg-black border border-border-light shadow-2xl mb-5 md:mb-10 relative">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={title}
            className="absolute inset-0 w-full h-full border-0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* MAIN ARTICLE BODY CONTAINER */}
        <div className="prose dark:prose-invert prose-stone max-w-none prose-headings:font-serif prose-blockquote:font-serif text-left">
          
          {editorial ? (
            /* A. Long-Form Editorial Renderer (Supports rich markdown styling) */
            <div className="text-stone-200 text-left">
              {renderMarkdown(editorial.contentMarkdown)}
            </div>
          ) : (
            /* B. Dynamic Short-Form Episode Digest Renderer */
            <div className="flex flex-col gap-8">
              
              {/* Main Dynamic Transcript Commentary Narrative */}
              <div className="border-t border-border-light pt-8 text-left">
                <h4 className="text-xs tracking-[0.2em] font-mono text-stone-500 uppercase block mb-6">
                  THE CHRONICLE JOURNAL
                </h4>
                
                {/* Dynamically Expanded Editorial Content */}
                <div className="space-y-10 text-stone-200/90 font-sans text-base md:text-[19px] lg:text-[20px] leading-[1.8]">
                  
                  {/* Part 1: Detailed Overview */}
                  <p>
                    Welcome to the official chronicle digest of our conversation with <strong className="text-foreground font-semibold">{episode!.guestName}</strong>, who serves as the <span className="text-accent-gold font-mono text-xs font-bold uppercase">{episode!.guestTitle}</span>. In this high-leverage episode, we dive deep behind-the-scenes to deconstruct career paths, survival tactics, and personal blueprints. 
                  </p>
                  
                  <p>
                    <strong className="text-foreground font-sans font-medium text-lg md:text-xl lg:text-2xl leading-relaxed">{episode!.description}</strong>
                  </p>
 
                  <hr className="border-t border-border-light" />
 
                  {/* Part 3: Dynamic Chronicle Conclusion */}
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-serif text-foreground font-semibold border-l-2 border-accent-orange pl-4">
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

        {/* Dynamic Guest Connections (Duolingo Style) */}
        {guestProfiles && guestProfiles.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border-light text-left">
            <h3 className="text-xl md:text-2xl font-serif text-foreground mb-6 flex items-center gap-3">
              <span className="text-2xl">🤝</span> <span>Connect with the guests</span>
            </h3>
            <div className="flex flex-wrap gap-4">
              {guestProfiles.map((guest, i) => (
                <a
                  key={i}
                  href={guest.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('LinkedIn Click', { location: 'guest_bottom_button', guest: guest.name })}
                  className="px-6 py-3.5 rounded-2xl border-2 border-stone-700 bg-background text-stone-300 font-bold font-sans hover:-translate-y-1 hover:border-accent-orange hover:text-foreground transition-all shadow-[0_4px_0_0_var(--card-shadow)] hover:shadow-[0_4px_0_0_rgba(234,88,12,1)] active:translate-y-1 active:shadow-none flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-accent-gold" />
                  {guest.name}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio Card */}
        <a 
          href="https://www.linkedin.com/in/somenath-mondal-xr-tech/" 
          target="_blank" 
          rel="noopener noreferrer" 
          onClick={() => track('LinkedIn Click', { location: 'author_bio_card' })}
          className="mt-12 bg-card-bg/10 border border-border-light hover:border-accent-orange/20 hover:bg-card-bg/20 p-6 rounded-2xl flex items-center gap-4 text-left transition-all group block"
        >
          <div className="w-12 h-12 rounded-full overflow-hidden border border-border-medium flex-shrink-0 group-hover:border-accent-orange/40 transition-colors shadow-lg">
            <img src="/somenath_profile.png" alt="Somenath Mondal" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">WRITTEN BY</span>
            <h4 className="text-sm font-bold text-foreground mt-0.5 group-hover:text-accent-orange transition-colors">Somenath Mondal</h4>
            <span className="text-[9px] font-mono text-accent-copper uppercase font-bold">CREATOR & HOST, IIT PODCAST</span>
          </div>
        </a>

        {/* Read Next Navigation Block */}
        {nextEntry && (
          <Link
            href={`/blog/${nextEntry.id}`}
            className="mt-8 group relative bg-card-elevated/80 backdrop-blur-md border-2 border-card-shadow hover:border-accent-orange/80 rounded-[28px] overflow-hidden flex justify-between items-center transition-all duration-200 text-left cursor-pointer shadow-[0_6px_0_0_var(--card-shadow)] hover:shadow-[0_8px_0_0_#FF6B00] hover:-translate-y-1 active:translate-y-[6px] active:shadow-[0_0px_0_0_#FF6B00] p-6 md:p-8"
          >
            <div className="flex flex-col max-w-[80%]">
              <span className="text-[10px] font-mono text-accent-orange tracking-widest uppercase font-bold mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-pulse" />
                Read Next Chronicle
              </span>
              <h4 className="text-lg md:text-xl font-sans font-bold text-foreground group-hover:text-accent-orange transition-colors line-clamp-2">
                {nextEntry.title}
              </h4>
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-border-strong bg-background flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:border-[#FF6B00] transition-colors flex-shrink-0 shadow-inner">
              <ArrowRight className="w-6 h-6 text-stone-500 group-hover:text-white transition-colors" />
            </div>
          </Link>
        )}

      </main>
    </div>
  );
}
