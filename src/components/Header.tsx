"use client";

import Link from "next/link";
import { Sparkles, Rss } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full px-4 py-3 md:p-8 flex justify-between items-center border-b border-white/[0.03] bg-background/50 backdrop-blur-md sticky top-0 z-40">
      
      {/* Brand logo */}
      <Link href="/" className="flex flex-col text-left group">
        <h1 className="text-xl font-serif italic font-medium tracking-tight text-white group-hover:text-accent-copper transition-colors duration-300">
          IIT Podcast
        </h1>
        <span className="text-[7px] tracking-[0.3em] font-mono text-accent-orange uppercase mt-0.5">
          WITH SOMENATH
        </span>
      </Link>

      {/* Navigation center links */}
      <nav className="hidden md:flex items-center gap-8">
        {["Episodes", "Alumni Chronicle", "Guests", "About"].map((link) => (
          <Link
            key={link}
            href={`#${link.toLowerCase().replace(" ", "-")}`}
            className="text-xs tracking-wider font-mono text-stone-400 hover:text-white transition-colors duration-300 uppercase"
          >
            {link}
          </Link>
        ))}
      </nav>

      {/* CTA buttons */}
      <div className="flex items-center gap-4">
        {/* JEE Sandbox Link */}
        <Link
          href="/sandbox"
          className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-accent-gold/20 bg-accent-gold/5 text-accent-gold font-bold text-[8px] md:text-[9px] tracking-widest uppercase hover:bg-accent-gold/15 active:scale-95 transition-all duration-300"
        >
          <Sparkles className="w-3 h-3 animate-pulse" />
          <span>JEE Sandbox</span>
        </Link>

        {/* Subscribe RSS */}
        <button
          className="hidden md:flex p-2 rounded-full border border-stone-800 text-stone-400 hover:text-white hover:border-stone-600 transition-colors"
          title="Subscribe Feed"
        >
          <Rss className="w-3.5 h-3.5" />
        </button>
      </div>

    </header>
  );
}
