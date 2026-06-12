"use client";

import { useState, useEffect } from "react";
import { Sparkles, Copy, Check, Lightbulb } from "lucide-react";

export interface DailyBlueprint {
  day: number;
  title: string;
  category: "placement" | "academic" | "startup" | "global";
  author: string;
  text: string;
}

const tips: DailyBlueprint[] = [
  {
    day: 1,
    title: "Mastering Concurrency",
    category: "placement",
    author: "Arpit (Systems Engineer)",
    text: "Building a multi-threaded web server from scratch teaches you more about threads, sockets, and race conditions than solving 100 array challenges."
  },
  {
    day: 2,
    title: "Grades vs. Projects",
    category: "academic",
    author: "Prof. Suman Chakraborty (Director)",
    text: "Academic performance is a single metric in a multi-dimensional life. Focus on building real-world projects that demonstrate practical engineering depth."
  },
  {
    day: 3,
    title: "The Dummy School Strategy",
    category: "academic",
    author: "Shashwat (McKinsey Analyst)",
    text: "To maximize focus during intense JEE preparation, bypass school attendance overheads by choosing a non-attending school to dedicate 100% of hours to problem-solving."
  },
  {
    day: 4,
    title: "Validating EdTech Startups",
    category: "startup",
    author: "Imbesat (CEO of Filo)",
    text: "Resources don't determine educational outcomes—sheer focus, instant doubt resolution, and structured repetition do."
  },
  {
    day: 5,
    title: "Clean Design Philosophy",
    category: "global",
    author: "Peter Boeckel (Designer)",
    text: "Design is not about superficial aesthetics; it is about how it works. A simple, highly functional system always beats decorative complexity."
  },
  {
    day: 6,
    title: "Collaborative Learning",
    category: "academic",
    author: "Shashwat (McKinsey Analyst)",
    text: "Make collaborators out of your competitors. Solving complex equations together builds deep lifelong bonds that standard lecture hall seating can never replicate."
  },
  {
    day: 7,
    title: "The Consulting Case Secret",
    category: "placement",
    author: "IIT Podcast Editorial",
    text: "In consulting interviews, structured thinking beats correct calculations. Lay out your MECE framework out loud before performing any arithmetic."
  },
  {
    day: 8,
    title: "System Design Approach",
    category: "placement",
    author: "Arpit (Systems Engineer)",
    text: "In architecture rounds, never declare 'I will use Redis.' Explain why: 'I will introduce an in-memory cache using Redis because our read-to-write ratio is 95:5.'"
  },
  {
    day: 9,
    title: "Mental Health Strength",
    category: "academic",
    author: "Prof. Suman Chakraborty (Director)",
    text: "We are actively redesigning support networks. Asking for counseling is a sign of immense strength, not weakness."
  },
  {
    day: 10,
    title: "Alternative Storytelling",
    category: "startup",
    author: "Samarth (Founder)",
    text: "Real human stories are found on the margins. Alternative journalism captures lives that corporate media pipelines completely bypass."
  },
  {
    day: 11,
    title: "Long-Term Prep Vision",
    category: "placement",
    author: "Arpit (Systems Engineer)",
    text: "Understanding operating systems and databases deeply beats solving 500 duplicate LeetCode challenges."
  },
  {
    day: 12,
    title: "Hypothesis Testing",
    category: "placement",
    author: "IIT Podcast Editorial",
    text: "Consulting demands bottom-line recommendations first. Start with a hypothesis, outline your pillars, and present the conclusion immediately."
  },
  {
    day: 13,
    title: "Solving Loop Closures",
    category: "global",
    author: "IIT Podcast Editorial",
    text: "Local refinements on tangent planes always overcome global errors. Focus on solving local problems before tackling massive structural loops."
  },
  {
    day: 14,
    title: "The Sports Mindset",
    category: "global",
    author: "Shashwat (McKinsey Analyst)",
    text: "Approaching academic studies like a competitive sport shifts the perspective from result-oriented anxiety to process-oriented enjoyment."
  },
  {
    day: 15,
    title: "Practical OS Building",
    category: "placement",
    author: "Arpit (Systems Engineer)",
    text: "Never treat processes and threads as pure theory. Experiment with mutexes, locks, and condition variables in C or Rust."
  },
  {
    day: 16,
    title: "Focus on Process",
    category: "academic",
    author: "Prof. Suman Chakraborty (Director)",
    text: "A 10-pointer or a 5-pointer does not define your creative potential. Focus on deep understanding, not cramming for exams."
  },
  {
    day: 17,
    title: "Building Kashmir's Future",
    category: "startup",
    author: "Imbesat (CEO of Filo)",
    text: "Students in conflict-affected regions lack basic counseling access. Leverage digital networks to close this counseling gap."
  },
  {
    day: 18,
    title: "Minimalist Interface",
    category: "global",
    author: "Peter Boeckel (Designer)",
    text: "A interface that feels alive and responsive encourages organic interaction. Achieving this with modern typography beats complex graphics."
  },
  {
    day: 19,
    title: "Over-Communication",
    category: "placement",
    author: "IIT Podcast Editorial",
    text: "In high-stakes corporate roles, manage client expectations proactively. If a critical slide or feature is late, raise the red flag early."
  },
  {
    day: 20,
    title: "Database Index Mastery",
    category: "placement",
    author: "Arpit (Systems Engineer)",
    text: "Never Blackbox your database. Understand index differences (B-Trees vs. LSM Trees) and transaction isolation levels deeply."
  },
  {
    day: 21,
    title: "Scale writes early",
    category: "placement",
    author: "IIT Podcast Tech Desk",
    text: "Designing for scaling writes to handle high loads is far more critical in actual tech roles than reversing trees."
  },
  {
    day: 22,
    title: "LSM Trees vs B-Trees",
    category: "placement",
    author: "Arpit (Systems Engineer)",
    text: "LSM Trees excel at write throughput, while B-Trees are optimized for reads. Align your storage choices with your actual read/write workload ratio."
  },
  {
    day: 23,
    title: "Minto Pyramid Principle",
    category: "placement",
    author: "IIT Podcast Editorial",
    text: "Structure your business messages using the Minto Principle: state the core recommendation first, then support it with structured pillars."
  },
  {
    day: 24,
    title: "The Power of Grit",
    category: "startup",
    author: "Imbesat (CEO of Filo)",
    text: "Coming from severe poverty to heading a massive educational startup proves that raw grit and focus always beat initial resource constraints."
  },
  {
    day: 25,
    title: "Universal Basic Income",
    category: "global",
    author: "Peter Boeckel (Designer)",
    text: "As AI automates safe standard jobs, universal basic income will shift human focus from basic survival to creative design and arts."
  },
  {
    day: 26,
    title: "The Unreserved Narrative",
    category: "startup",
    author: "Samarth (Founder)",
    text: "Capturing the stories of marginalized voices on borders requires intense empathy and alternative, immersive journalistic styles."
  },
  {
    day: 27,
    title: "Kota Survival Blueprint",
    category: "academic",
    author: "Arpit (Systems Engineer)",
    text: "Do not let exam anxiety freeze your capability. Break long study hours with high-leverage physical breaks and sports."
  },
  {
    day: 28,
    title: "Bypassing Attendance",
    category: "academic",
    author: "Shashwat (McKinsey Analyst)",
    text: "If your target is a highly competitive exam, administrative attendance overheads are your enemy. Optimize your calendar."
  },
  {
    day: 29,
    title: "Tactile Sound Design",
    category: "global",
    author: "Peter Boeckel (Designer)",
    text: "Adding subtle micro-animations and analog clicks to audio player interactions creates an immediate premium feel."
  },
  {
    day: 30,
    title: "Real Research Funding",
    category: "academic",
    author: "Prof. Suman Chakraborty (Director)",
    text: "Indian campuses need systemic administrative reforms and steady institutional backing to foster world-class research."
  },
  {
    day: 31,
    title: "Long-Tail Keywords",
    category: "startup",
    author: "IIT Podcast Tech Desk",
    text: "Publishing written editorial takeaways and highlights is the single best long-term strategy to boost SEO search index rankings."
  }
];

export default function DailyTip() {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTip, setActiveTip] = useState<DailyBlueprint | null>(null);

  useEffect(() => {
    setMounted(true);
    // Deterministic selection based on current day of month
    const day = new Date().getDate();
    // Fallback if day is out of range, though we have 31 tips
    const selected = tips.find(t => t.day === day) || tips[0];
    setActiveTip(selected);
  }, []);

  const handleShare = async () => {
    if (!activeTip) return;
    try {
      const textToCopy = `💡 "${activeTip.title}" - Daily Blueprint by ${activeTip.author}:\n\n"${activeTip.text}"\n\nExplore untold IIT alumni diaries at https://iit-podcast.vercel.app`;
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text", err);
    }
  };

  if (!mounted || !activeTip) {
    return (
      <div className="w-full h-40 rounded-[32px] bg-card-bg/20 border border-border-light animate-pulse flex items-center justify-center">
        <span className="text-stone-500 font-mono text-xs uppercase tracking-widest">Loading Daily Blueprint...</span>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-[32px] border border-border-light bg-card-bg/30 p-6 md:p-8 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-accent-orange/30 group">
      {/* Dynamic Projector Light Leak glow overlay */}
      <div className="absolute -right-20 -top-20 w-44 h-44 bg-accent-orange/5 rounded-full blur-3xl group-hover:bg-accent-orange/10 transition-colors pointer-events-none" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        
        {/* Top/Left Section: Tactile Slide negative styling */}
        <div className="flex items-start gap-4 text-left">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-tr from-accent-orange/20 to-accent-gold/20 border border-accent-orange/20 flex items-center justify-center flex-shrink-0 animate-shine">
            <Lightbulb className="w-5 h-5 md:w-6 md:h-6 text-accent-gold" />
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-2 py-0.5 rounded bg-pill-orange border border-accent-orange/15 text-[8px] font-mono tracking-widest text-accent-orange uppercase font-bold flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-accent-gold" />
                Blueprint of the Day
              </span>
              <span className="text-stone-700 text-xs font-mono">•</span>
              <span className="px-2 py-0.5 rounded bg-pill-copper border border-accent-copper/10 text-[8px] font-mono tracking-widest text-accent-copper uppercase font-bold">
                {activeTip.category}
              </span>
            </div>
            
            <h3 className="text-xl md:text-2xl font-serif italic text-foreground font-medium leading-tight">
              {activeTip.title}
            </h3>
            <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider mt-1 block">
              Source: {activeTip.author}
            </span>
          </div>
        </div>

        {/* Right Section: Copy / Share button */}
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-5 py-3 rounded-full border border-stone-850 hover:border-accent-orange/40 bg-white/[0.01] hover:bg-accent-orange/10 font-bold text-[9px] tracking-widest uppercase text-stone-300 hover:text-white transition-all duration-300 self-start md:self-center cursor-pointer active:scale-95 shadow-md hover:shadow-accent-orange/5"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#1DB954]" />
              <span className="text-[#1DB954]">Blueprint Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-accent-orange" />
              <span>Share Blueprint</span>
            </>
          )}
        </button>
      </div>

      {/* Main Quote Frame - Serif Comfortable Block */}
      <div className="mt-6 pt-6 border-t border-border-light text-left">
        <p className="text-base md:text-lg text-stone-200 leading-relaxed font-serif italic relative pl-4 border-l-2 border-accent-orange/40">
          "{activeTip.text}"
        </p>
      </div>
    </div>
  );
}
