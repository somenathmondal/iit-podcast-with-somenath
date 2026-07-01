"use client";

import React, { useState, useEffect } from "react";
import { BarChart3, X, Trash2, Activity, Play, FileText, Share2, Moon } from "lucide-react";
import { useAnalyticsStore } from "../lib/store";

export default function AnalyticsVisualizer() {
  const { events, eventCounts, clearEvents } = useAnalyticsStore();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"log" | "cards">("log");
  const [mounted, setMounted] = useState(false);
  const [isDebug, setIsDebug] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkHash = () => {
      setIsDebug(window.location.hash === "#debug");
    };

    // Check initially
    checkHash();

    // Listen to hash shifts
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  if (!mounted || !isDebug) {
    return null;
  }

  // Sum up all events to show total count on floating badge
  const totalEvents = Object.values(eventCounts).reduce((a, b) => a + b, 0);

  // Group card clicks from the counts map
  const cardClicks = Object.entries(eventCounts)
    .filter(([key]) => key.startsWith("card:"))
    .map(([key, count]) => {
      const cardId = key.replace("card:", "");
      return { cardId, count };
    });

  // Extract other general event types
  const generalEvents = Object.entries(eventCounts)
    .filter(([key]) => !key.startsWith("card:"))
    .map(([key, count]) => ({ eventName: key, count }));

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full border border-[#FF6B00]/40 bg-[#3B1E1E]/95 hover:bg-[#4D2727] text-white shadow-[0_4px_20px_rgba(255,107,0,0.25)] hover:shadow-[0_4px_25px_rgba(255,107,0,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        title="Open Analytics Debugger"
      >
        <div className="relative flex items-center justify-center">
          <BarChart3 className="w-4 h-4 text-[#FFB800] animate-pulse" />
          {totalEvents > 0 && (
            <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent-orange text-[8px] font-bold text-white">
              {totalEvents}
            </span>
          )}
        </div>
        <span className="text-[10px] font-mono tracking-wider font-bold uppercase hidden sm:inline">
          Analytics Console
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 w-[380px] max-h-[500px] flex flex-col rounded-3xl border border-[#FF6B00]/30 bg-[#3B1E1E]/95 text-white shadow-[0_12px_40px_rgba(0,0,0,0.7)] backdrop-blur-md overflow-hidden animate-in slide-in-from-bottom duration-300 font-sans">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/[0.08] flex justify-between items-center bg-[#2B1616]">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-accent-orange" />
          <h3 className="text-xs font-mono font-bold tracking-widest uppercase">
            IIT Podcast Analytics
          </h3>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={clearEvents}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer"
            title="Clear Log"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer"
            title="Close Drawer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-white/[0.04] text-[10px] font-mono font-bold tracking-wider">
        <button
          onClick={() => setActiveTab("log")}
          className={`flex-1 py-3 text-center border-b-2 transition-colors duration-200 cursor-pointer ${
            activeTab === "log"
              ? "border-accent-orange text-white bg-white/[0.02]"
              : "border-transparent text-stone-400 hover:text-stone-200"
          }`}
        >
          LIVE ACTIVITY LOG
        </button>
        <button
          onClick={() => setActiveTab("cards")}
          className={`flex-1 py-3 text-center border-b-2 transition-colors duration-200 cursor-pointer ${
            activeTab === "cards"
              ? "border-accent-orange text-white bg-white/[0.02]"
              : "border-transparent text-stone-400 hover:text-stone-200"
          }`}
        >
          CARD CLICKS COUNTER
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-grow p-4 overflow-y-auto custom-scroll text-left">
        {activeTab === "log" ? (
          <div className="space-y-3">
            {events.length === 0 ? (
              <div className="py-12 text-center text-stone-400 text-xs font-mono">
                No click activity tracked yet.
                <br />
                Try clicking cards or player buttons!
              </div>
            ) : (
              events.map((ev) => (
                <div
                  key={ev.id}
                  className="p-3 rounded-xl bg-black/35 border border-white/[0.03] flex flex-col gap-1.5 hover:border-[#FF6B00]/20 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <span className="px-2 py-0.5 rounded bg-accent-orange/15 text-accent-orange border border-accent-orange/10 font-mono text-[9px] font-bold">
                      {ev.name}
                    </span>
                    <span className="text-[8px] text-stone-500 font-mono">{ev.timestamp}</span>
                  </div>
                  {ev.params && Object.keys(ev.params).length > 0 && (
                    <div className="mt-1 font-mono text-[9px] text-[#FFAE19] bg-[#2B1616]/40 p-2 rounded border border-white/[0.02] overflow-x-auto whitespace-pre-wrap break-all leading-tight">
                      {JSON.stringify(ev.params, null, 2)}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Card clicks breakdown */}
            <div>
              <h4 className="text-[9px] font-mono text-accent-gold uppercase font-bold tracking-wider mb-2">
                Card Item Breakdown
              </h4>
              {cardClicks.length === 0 ? (
                <div className="py-4 text-center text-stone-500 text-xs font-mono border border-white/[0.02] rounded-xl">
                  No cards clicked yet.
                </div>
              ) : (
                <div className="space-y-1.5">
                  {cardClicks.map((item) => (
                    <div
                      key={item.cardId}
                      className="flex justify-between items-center px-3 py-2 rounded-xl bg-black/20 border border-white/[0.02] text-xs"
                    >
                      <span className="font-mono text-stone-300 truncate max-w-[280px]">
                        📄 {item.cardId}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-accent-gold/15 text-accent-gold border border-accent-gold/20 font-mono text-[10px] font-bold">
                        {item.count} click{item.count > 1 ? "s" : ""}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* General actions breakdown */}
            <div>
              <h4 className="text-[9px] font-mono text-accent-gold uppercase font-bold tracking-wider mb-2">
                General Clicks & Interactions
              </h4>
              {generalEvents.length === 0 ? (
                <div className="py-4 text-center text-stone-500 text-xs font-mono border border-white/[0.02] rounded-xl">
                  No events logged yet.
                </div>
              ) : (
                <div className="space-y-1.5">
                  {generalEvents.map((item) => (
                    <div
                      key={item.eventName}
                      className="flex justify-between items-center px-3 py-2 rounded-xl bg-black/20 border border-white/[0.02] text-xs font-mono"
                    >
                      <span className="text-stone-300 truncate max-w-[280px]">
                        ⚡ {item.eventName}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-accent-orange/15 text-accent-orange border border-accent-orange/20 text-[10px] font-bold">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-white/[0.06] bg-[#2B1616] text-[8px] font-mono text-stone-500 flex justify-between items-center">
        <span>RED SANDS THEME CONNECTED</span>
        <span>VERCEL & GA ACTIVE</span>
      </div>
    </div>
  );
}
