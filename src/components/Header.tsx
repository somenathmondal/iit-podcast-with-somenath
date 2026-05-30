"use client";

import { Link } from "next-view-transitions";
import { Rss, BookOpen } from "lucide-react";

export default function Header() {
  return (
    <header className="relative w-full px-4 py-3 md:px-8 md:py-4 flex justify-between items-center border-b border-white/[0.03] bg-background/50 backdrop-blur-md sticky top-0 z-40">

      {/* Brand logo */}
      <Link href="/" className="flex flex-col text-left group">
        <h1 className="text-xl md:text-2xl font-sans font-black tracking-tight text-white group-hover:text-accent-copper transition-colors duration-300 leading-none">
          IIT Podcast
        </h1>
        <span className="text-[7px] md:text-[8px] tracking-[0.35em] font-mono text-accent-orange font-bold uppercase mt-1">
          WITH SOMENATH
        </span>
      </Link>

      {/* Navigation center links */}
      <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
        {["Episodes", "About"].map((link) => (
          <Link
            key={link}
            href={`/#${link.toLowerCase().replace(" ", "-")}`}
            className="px-4 py-1.5 rounded-full text-[10px] tracking-[0.2em] font-mono font-bold text-stone-400 uppercase transition-all duration-300 border border-transparent hover:border-accent-orange/30 hover:bg-accent-orange/10 hover:text-accent-orange hover:shadow-[0_0_15px_rgba(255,107,0,0.2)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
          >
            {link}
          </Link>
        ))}
      </nav>

      {/* CTA buttons */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Animated Journal CTA */}
        <Link
          href="/blog"
          className="relative group inline-flex items-center justify-center p-[2px] rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(234,88,12,0.15)] hover:shadow-[0_0_25px_rgba(234,88,12,0.3)]"
        >
          {/* Animated gradient rotating border */}
          <span className="absolute inset-0 w-[200%] h-[200%] -left-[50%] -top-[50%] bg-[conic-gradient(from_0deg,transparent_0_300deg,#EA580C_360deg)] animate-[spin_2s_linear_infinite]" />
          
          {/* Inner Button Cover */}
          <div className="relative flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-[#0F0606] group-hover:bg-[#130707] transition-colors duration-300 z-10 border border-white/5">
            <BookOpen className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent-orange group-hover:-rotate-12 transition-transform duration-300" />
            <span className="text-[10px] md:text-xs tracking-[0.2em] font-mono font-bold text-stone-200 group-hover:text-white uppercase whitespace-nowrap">
              Journal
            </span>
          </div>
        </Link>

        {/* JEE Sandbox — hidden for now */}
        {/* <Link
          href="/sandbox"
          className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-accent-gold/20 bg-accent-gold/5 text-accent-gold font-bold text-[8px] md:text-[9px] tracking-widest uppercase hover:bg-accent-gold/15 active:scale-95 transition-all duration-300"
        >
          <Sparkles className="w-3 h-3 animate-pulse" />
          <span>JEE Sandbox</span>
        </Link> */}

        {/* Subscribe RSS */}
        <button
          className="hidden md:flex p-2 rounded-full border border-stone-800 text-stone-400 hover:text-white hover:border-stone-600 hover:bg-white/[0.04] transition-all duration-200"
          title="Subscribe Feed"
        >
          <Rss className="w-3.5 h-3.5" />
        </button>
      </div>

    </header>
  );
}
