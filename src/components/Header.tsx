"use client";

import Link from "next/link";
import { Rss, BookOpen } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full px-4 py-3 md:px-8 md:py-4 flex justify-between items-center border-b border-white/[0.03] bg-background/50 backdrop-blur-md sticky top-0 z-40">

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
      <nav className="hidden md:flex items-center gap-1">
        {["Episodes", "About"].map((link) => (
          <Link
            key={link}
            href={`/#${link.toLowerCase().replace(" ", "-")}`}
            className="px-3.5 py-1.5 rounded-full text-[10px] tracking-widest font-mono font-bold text-stone-400 hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] transition-all duration-200 uppercase"
          >
            {link}
          </Link>
        ))}
        <Link
          href="/blog"
          className="px-3.5 py-1.5 rounded-full text-[10px] tracking-widest font-mono font-bold text-stone-400 hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] transition-all duration-200 uppercase"
        >
          Journal
        </Link>
      </nav>

      {/* CTA buttons */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Mobile Journal Link */}
        <Link
          href="/blog"
          className="flex md:hidden items-center gap-1.5 px-3 py-1.5 rounded-full border border-accent-copper/20 bg-accent-copper/5 text-accent-copper font-bold text-[8px] tracking-widest uppercase hover:bg-accent-copper/15 active:scale-95 transition-all duration-300"
        >
          <BookOpen className="w-3 h-3 text-accent-copper" />
          <span>Journal</span>
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
