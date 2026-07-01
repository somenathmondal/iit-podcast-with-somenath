"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "../lib/analytics";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem("theme") as "light" | "dark") || "dark";
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    trackEvent('theme_toggle', { theme: nextTheme });
  };

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full border border-accent-gold/30 bg-card-bg/40 backdrop-blur-md opacity-20 animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-9 h-9 rounded-full border border-accent-gold/45 bg-card-bg/40 backdrop-blur-md text-foreground hover:border-accent-orange hover:bg-accent-orange/10 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer relative overflow-hidden shadow-md"
      title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle Theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.div
            key="moon"
            initial={{ y: 15, rotate: -45, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            exit={{ y: -15, rotate: 45, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            <Moon className="w-4 h-4 text-accent-gold" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ y: 15, rotate: 45, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            exit={{ y: -15, rotate: -45, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            <Sun className="w-4 h-4 text-accent-orange" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
