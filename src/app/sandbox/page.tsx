"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, BookOpen, Clock, Heart, Award, ArrowRight } from "lucide-react";

interface MotivationQuote {
  quote: string;
  author: string;
  source: string;
  context: string;
}

const quotes: MotivationQuote[] = [
  {
    quote: "Solve 100 LeetCode or JEE problems deeply instead of memorizing 500 shallowly. The JEE Advanced cracks on patterns, not volume.",
    author: "Anjali",
    source: "EP. 12 (Instagram Engineer)",
    context: "On DSA and JEE Math Mindset"
  },
  {
    quote: "Your grade is a passport, but your curiosities define your engine. A 5-point student who has spent nights building deep learning pipelines is highly valuable.",
    author: "Prof. Suman Chakraborty",
    source: "EP. 08 (Director, IIT KGP)",
    context: "On Deconstructing Grade Pressure"
  },
  {
    quote: "We didn't have desks, books, or clean walls. We solved math problems on dirt floors at Super 30. Hard work in a single direction always cracks the target.",
    author: "Rajeev",
    source: "EP. 18 (SolarTech CEO)",
    context: "On Super 30 Coaching Resilience"
  },
  {
    quote: "The biggest JEE mistake is ignoring your mistakes. Maintain a physical 'Mistake Diary' and write down exactly why you failed a question.",
    author: "Somenath Mondal",
    source: "Host's Chronicle",
    context: "On Strategy for Mock Exams"
  }
];

export default function Sandbox() {
  const [activeQuoteIdx, setActiveQuoteIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Countdown timer for next JEE (e.g. Target Date: April 10, 2027)
  useEffect(() => {
    const targetDate = new Date("2027-04-10T00:00:00").getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNextQuote = () => {
    setIsFlipped(true);
    setTimeout(() => {
      setActiveQuoteIdx((activeQuoteIdx + 1) % quotes.length);
      setIsFlipped(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#0F0606] text-white flex flex-col font-sans select-none relative overflow-x-hidden selection:bg-accent-gold selection:text-black">
      
      {/* Background circular glowing sunset orb */}
      <div className="absolute top-[-20%] left-[20%] w-[80%] h-[60%] rounded-full bg-gradient-to-br from-accent-gold/15 via-accent-orange/5 to-transparent blur-[120px] pointer-events-none" />

      {/* Header Bar */}
      <header className="w-full p-6 md:p-8 flex items-center justify-between border-b border-white/[0.03] backdrop-blur-md sticky top-0 z-40 bg-background/50">
        <Link href="/" className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors duration-300">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-[10px] tracking-widest font-mono uppercase font-bold">BACK TO HOME</span>
        </Link>
        <div className="flex flex-col text-center">
          <h2 className="text-sm font-serif italic text-accent-gold">JEE Aspirants Sandbox</h2>
          <span className="text-[6px] tracking-[0.4em] font-mono text-stone-500 uppercase mt-0.5">PREPARATION ECOSYSTEM</span>
        </div>
        <div className="w-20" /> {/* Spacer */}
      </header>

      {/* MAIN CONTAINER */}
      <main className="w-full max-w-5xl mx-auto px-6 py-10 md:py-16 flex-grow flex flex-col gap-16">
        
        {/* SECTION 1: THE COUNTDOWN CLOCK */}
        <section className="w-full backdrop-blur-md bg-card-bg/25 border border-white/[0.04] p-8 rounded-[32px] text-center shadow-xl">
          <span className="text-[9px] tracking-[0.4em] font-mono text-accent-gold uppercase font-bold mb-4 block">
            JEE ADVANCED 2027 TARGET
          </span>
          <h3 className="text-3xl font-serif italic mb-8">Countdown to the Crucible</h3>
          
          <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { val: timeLeft.days, label: "DAYS" },
              { val: timeLeft.hours, label: "HOURS" },
              { val: timeLeft.minutes, label: "MINUTES" },
              { val: timeLeft.seconds, label: "SECONDS" }
            ].map((cell, idx) => (
              <div key={idx} className="bg-[#1A0D0D]/60 border border-white/[0.03] p-4 md:p-6 rounded-2xl flex flex-col items-center">
                <span className="text-2xl md:text-5xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-accent-copper leading-none">
                  {cell.val.toString().padStart(2, "0")}
                </span>
                <span className="text-[7px] md:text-[9px] tracking-widest font-mono text-stone-500 uppercase mt-2">
                  {cell.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: THE SWIPEABLE/CLICKABLE MOTIVATION CARDS */}
        <section className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent-orange" />
            <span className="text-[10px] tracking-[0.3em] font-mono text-accent-orange uppercase font-bold">
              GUEST ADVICE DIALS
            </span>
          </div>
          
          {/* Flipped card */}
          <div className="w-full max-w-xl h-64 md:h-56 relative perspective-1000">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeQuoteIdx}
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -90, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={handleNextQuote}
                className="cursor-pointer absolute inset-0 w-full h-full backdrop-blur-md bg-gradient-to-tr from-card-bg/50 to-[#221010]/30 border border-accent-gold/15 p-8 rounded-3xl flex flex-col justify-between shadow-2xl hover:border-accent-orange/40 text-left"
              >
                <div className="font-serif italic text-base md:text-lg leading-relaxed text-white">
                  "{quotes[activeQuoteIdx].quote}"
                </div>

                <div className="flex justify-between items-end border-t border-white/[0.03] pt-4 font-mono text-[9px]">
                  <div className="flex flex-col text-left">
                    <span className="text-accent-gold font-bold uppercase">{quotes[activeQuoteIdx].author}</span>
                    <span className="text-stone-500 uppercase mt-0.5">{quotes[activeQuoteIdx].context}</span>
                  </div>
                  <span className="px-2 py-1 rounded bg-[#2D1212] border border-accent-orange/10 text-accent-orange font-bold uppercase">
                    {quotes[activeQuoteIdx].source}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={handleNextQuote}
            className="text-[9px] tracking-widest font-mono text-stone-400 hover:text-white uppercase flex items-center gap-1.5 cursor-pointer mt-4"
          >
            <span>Dial Next Takeaway</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </section>

        {/* SECTION 3: THE IIT SURVIVAL PLAYBOOK */}
        <section className="text-left">
          <div className="flex items-center gap-2 mb-8 border-b border-white/[0.03] pb-4">
            <BookOpen className="w-4 h-4 text-accent-copper" />
            <span className="text-[10px] tracking-[0.4em] font-mono text-stone-400 uppercase font-bold">
              IIT SURVIVAL BLUEPRINTS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Topper Strategy vs. 5-Pointer Ingenuity",
                desc: "Which one holds the keys to corporate tech breakouts? We analyze the differences in how high-graders and tinkering coders navigate the placement matrix. (Anjali's Blueprint)",
                bullets: ["CGPA thresholds do not gatekeep off-campus recruiters.", "Open-source scaling projects demonstrate real execution.", "Data structures require pattern mastery over volume."]
              },
              {
                title: "Resilience Under Exam Stress",
                desc: "Severe pressures can easily detail JEE prep cycles. Somenath and guests deconstruct Anand Kumar's Super 30 emotional control methods.",
                bullets: ["Maintain a written 'Mistake Diary' for mock testing feedback.", "Break study periods into highly structured 90-minute blocks.", "Dismantle grading obsessions: grades are a single, narrow index."]
              }
            ].map((playbook, idx) => (
              <div key={idx} className="backdrop-blur-md bg-card-bg/15 border border-white/[0.03] p-6 rounded-2xl">
                <h4 className="text-lg font-serif italic text-white mb-3">
                  {playbook.title}
                </h4>
                <p className="text-xs text-stone-400 leading-relaxed font-serif mb-5">
                  {playbook.desc}
                </p>
                <ul className="flex flex-col gap-2 font-mono text-[9px] text-accent-copper">
                  {playbook.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-orange mt-1 flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full p-8 border-t border-white/[0.02] text-center text-[8px] font-mono tracking-widest text-stone-500 uppercase">
        © 2026 IIT PODCAST DIGITAL HUB • DESIGNED FOR IMMERSIVE EDUCATION
      </footer>

    </div>
  );
}
