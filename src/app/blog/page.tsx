"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Calendar, Clock, ArrowRight, Rss } from "lucide-react";
import Header from "../../components/Header";
import DailyTip from "../../components/DailyTip";
import { blogs, BlogArticle } from "../../data/blogs";
import { episodes, Episode } from "../../data/episodes";

type FilterType = "all" | "editorial" | "digest";

export default function BlogHub() {
  const [filter, setFilter] = useState<FilterType>("all");

  // Transform standard episodes into short-form digest cards dynamically to instantly populate content!
  const episodeDigests = episodes.map((ep) => ({
    id: ep.id,
    title: ep.title,
    description: ep.description,
    author: "Somenath Mondal",
    readTime: (() => {
      const combinedText = `${ep.description} ${ep.fullStoryMarkdown}`;
      const wordCount = combinedText.split(/\s+/).filter(w => w.length > 0).length;
      const minutes = Math.max(1, Math.ceil(wordCount / 200));
      return `${minutes} min read`;
    })(),
    category: ep.category,
    releaseDate: ep.releaseDate || "JUNE 2025",
    coverImage: ep.coverImage && ep.coverImage !== ""
      ? ep.coverImage
      : (ep.youtubeId 
          ? `https://img.youtube.com/vi/${ep.youtubeId}/hqdefault.jpg` 
          : "/thumbnails/Ep00-ProfSuman.png"),
    tags: ep.tags,
    isDigest: true,
  }));

  // Combine long-form editorials and short-form digests
  const allEntries = [
    ...blogs.map((b) => ({ ...b, isDigest: false })),
    ...episodeDigests,
  ];

  const [entries, setEntries] = useState<any[]>(allEntries);

  useEffect(() => {
    const today = new Date();
    // Calculate current day of year (0-365) to rotate deterministic daily
    const startOfNewYear = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - startOfNewYear.getTime();
    const oneDayMs = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDayMs);
    
    if (allEntries.length > 0) {
      const startIndex = dayOfYear % allEntries.length;
      const rotated = [
        ...allEntries.slice(startIndex),
        ...allEntries.slice(0, startIndex),
      ];
      setEntries(rotated);
    }
  }, []);

  // Filter entries based on the selected tab and exclude the featured entry
  const featuredEntryId = "saumaric-aditi-harvard-journey";
  const featuredEntry = allEntries.find(e => e.id === featuredEntryId);
  
  const filteredEntries = entries.filter((entry) => {
    if (entry.id === featuredEntryId) return false;
    if (filter === "editorial") return !entry.isDigest;
    if (filter === "digest") return entry.isDigest;
    return true; // "all"
  }).sort((a, b) => {
    // Pin specific episodes to the top of the grid
    const pinnedOrder = [
      "pranali", 
      "prakhar", 
      "arijit", 
      "imbesat", 
      "peter", 
      "suman-chakraborty-2", 
      "sanghamitra", 
      "gupthaji", 
      "charu", 
      "shashwat"
    ];
    const indexA = pinnedOrder.indexOf(a.id);
    const indexB = pinnedOrder.indexOf(b.id);
    
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    
    // Otherwise maintain the dynamically rotated order
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#0F0606] text-white flex flex-col font-sans selection:bg-accent-orange selection:text-white">
      {/* Navigation Header */}
      <Header />

      <main className="flex-grow w-full max-w-7xl mx-auto px-6 md:px-8 py-6 md:py-16 text-left">
        
        {/* Back Link */}
        <Link 
          href="/" 
          className="hidden sm:inline-flex items-center gap-2 text-stone-400 hover:text-white text-xs font-mono uppercase tracking-wider mb-8 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Studio</span>
        </Link>

        {/* Hero Section */}
        <header className="hidden sm:block mb-12 border-b border-white/[0.02] pb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-2 h-2 rounded-full bg-accent-orange animate-pulse" />
              <span className="text-xs tracking-[0.3em] font-mono text-accent-copper uppercase font-bold">
                JOURNAL & BLUEPRINTS
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-sans font-extrabold tracking-tight leading-tight bg-gradient-to-r from-white via-[#FFF8F5] to-accent-orange bg-clip-text text-transparent">
              IIT Alumni Stories
            </h1>
          </div>
          <p className="text-sm md:text-base text-stone-400 max-w-md font-serif italic leading-relaxed">
            Deconstructing campus placements, case preparation checklists, research breakthroughs, and startup paradigms into short digests and combined masterclass guides.
          </p>
        </header>

        {/* Featured Episode Section */}
        {featuredEntry && (
          <section className="mb-10 md:mb-12">
            <Link href={`/blog/${featuredEntry.id}`} className="group relative flex flex-col md:block w-full rounded-[24px] md:rounded-[32px] overflow-hidden border border-white/[0.05] hover:border-accent-orange/40 transition-all duration-500 shadow-2xl bg-[#110808] md:bg-transparent">
              
              {/* Image Container */}
              <div className="relative md:absolute md:inset-0 h-[220px] sm:h-[300px] md:h-auto z-0 overflow-hidden">
                <img src={featuredEntry.coverImage} alt={featuredEntry.title} className="w-full h-full object-cover object-center brightness-90 md:brightness-75 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700" />
                <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#0F0606] via-[#0F0606]/90 to-transparent" />
                <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-[#0F0606] via-transparent to-transparent" />
                {/* Mobile fade gradient */}
                <div className="md:hidden absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#110808] to-transparent" />
              </div>
              
              {/* Content Container */}
              <div className="relative z-10 p-6 md:p-12 lg:p-16 flex flex-col justify-end min-h-auto md:min-h-[400px] max-w-3xl text-left">
                <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
                  <span className="px-3 py-1.5 rounded-full bg-accent-orange/20 border border-accent-orange/40 text-accent-orange text-[10px] font-mono tracking-widest uppercase font-bold backdrop-blur-md">
                    🔥 Most Viewed
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-[#FF0000]/20 border border-[#FF0000]/40 text-[#FF0000] text-[10px] font-mono tracking-widest uppercase font-bold backdrop-blur-md flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000] animate-pulse" />
                    5K on YouTube
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold leading-tight text-white mb-4 group-hover:text-accent-orange transition-colors">
                  {featuredEntry.title}
                </h2>
                <p className="text-sm md:text-base text-stone-300 font-serif line-clamp-3 mb-8">
                  "{featuredEntry.description}"
                </p>
                <div className="flex items-center gap-2 text-xs tracking-widest font-mono text-accent-orange font-bold uppercase group-hover:translate-x-2 transition-transform duration-300">
                  <span>Read Full Chronicle</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </section>
        )}





        {/* Blog Article Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredEntries.map((entry) => (
            <Link
              key={entry.id}
              href={`/blog/${entry.id}`}
              className="group backdrop-blur-md bg-card-bg/25 border border-white/[0.04] hover:border-accent-orange/30 rounded-[28px] overflow-hidden flex flex-col justify-between transition-all duration-500 hover:scale-[1.008] shadow-lg shadow-black/40 text-left cursor-pointer"
            >
              <div>
                {/* Visual Header Image Cover */}
                <div className="w-full aspect-video overflow-hidden border-b border-white/[0.03] relative group-hover:border-accent-orange/20 transition-all duration-500">
                  <img
                    src={entry.coverImage}
                    alt={entry.title}
                    className="w-full h-full object-cover scale-100 group-hover:scale-[1.02] transition-transform duration-700 brightness-95 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0606]/40 to-transparent" />
                  
                  {/* Floating Tag Type Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className={`px-2.5 py-1 rounded bg-[#0F0606]/85 backdrop-blur-md border text-[8px] font-mono tracking-widest uppercase font-bold ${
                      entry.isDigest 
                        ? "text-accent-copper border-accent-copper/20" 
                        : "text-accent-gold border-accent-gold/20"
                    }`}>
                      {entry.tags?.[0] || (entry.isDigest ? "Digest" : "Editorial")}
                    </span>
                  </div>
                </div>

                {/* Article Content Text */}
                <div className="p-6">
                  {/* Metas Row */}
                  <div className="flex items-center gap-3 font-mono text-[9px] text-stone-500 uppercase font-bold mb-3">
                    <div className="hidden sm:flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{entry.releaseDate}</span>
                    </div>
                    <span className="hidden sm:inline text-stone-800">•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{entry.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-lg md:text-xl font-sans font-bold leading-tight text-white group-hover:text-accent-orange transition-colors duration-300 mb-3">
                    {entry.title}
                  </h3>
                  
                  <p className="text-xs md:text-sm text-stone-400 leading-relaxed font-serif line-clamp-3">
                    "{entry.description}"
                  </p>
                </div>
              </div>

              {/* Action Footer */}
              <div className="px-6 pb-6 pt-4 border-t border-white/[0.02] flex items-center justify-between">
                <span className="text-[10px] font-mono text-stone-500 uppercase">
                  By {entry.author}
                </span>
                <div
                  className="text-xs tracking-widest font-mono text-accent-orange font-bold uppercase flex items-center gap-1 group-hover:translate-x-1.5 transition-transform duration-300"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </section>

      </main>
    </div>
  );
}
