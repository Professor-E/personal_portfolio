"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import type { ExperienceEntry } from "@/types";

interface ScrollNudgeProps {
  entries: ExperienceEntry[];
  activeIndex: number;
  onScrollUp: () => void;
  onScrollDown: () => void;
}

/**
 * Fixed scroll nudge indicators — top-center and bottom-center of the viewport.
 *
 * Up chevron:   visible when activeIndex > 0 (entry above exists)
 * Down chevron: visible when activeIndex < entries.length - 1 (entry below exists)
 *
 * After 3 seconds of no scroll activity both fade to 40% opacity.
 * Any scroll or pointer activity near the edge restores full opacity.
 */
export default function ScrollNudge({
  entries,
  activeIndex,
  onScrollUp,
  onScrollDown,
}: ScrollNudgeProps) {
  const [dimmed, setDimmed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showAbove = activeIndex > 0;
  const showBelow = activeIndex < entries.length - 1;

  const prevName = entries[activeIndex - 1]?.company ?? "";
  const nextName = entries[activeIndex + 1]?.company ?? "";

  // ── Auto-dim after 3 s of inactivity ─────────────────────────────────────
  const resetTimer = () => {
    setDimmed(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setDimmed(true), 3000);
  };

  useEffect(() => {
    resetTimer();
    window.addEventListener("scroll", resetTimer, { passive: true });
    window.addEventListener("pointermove", resetTimer, { passive: true });
    return () => {
      window.removeEventListener("scroll", resetTimer);
      window.removeEventListener("pointermove", resetTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Also reset when active index changes (user navigated)
  useEffect(() => {
    resetTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  return (
    <>
      {/* ── UP chevron ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showAbove && (
          <motion.div
            key="nudge-up"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: dimmed ? 0.4 : 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed left-1/2 -translate-x-1/2 z-30"
            style={{ top: "calc(70px + 16px)" }}
          >
            {/* Floating bob wrapper */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <motion.button
                onClick={onScrollUp}
                whileHover={{ scale: 1.05, opacity: 1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 rounded-full cursor-pointer"
                style={{
                  padding: "var(--nudge-py, 8px) var(--nudge-px, 16px)",
                  background: "rgba(0,0,0,0.06)",
                  border: "1px solid rgba(0,0,0,0.10)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
                aria-label={`Scroll up to ${prevName}`}
              >
                <ChevronUp className="w-4 h-4 text-[var(--text-secondary)] shrink-0" />
                {/* Company name — hidden on mobile */}
                {prevName && (
                  <span className="hidden md:block text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap max-w-[120px] overflow-hidden text-ellipsis">
                    {prevName}
                  </span>
                )}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── DOWN chevron ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showBelow && (
          <motion.div
            key="nudge-down"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: dimmed ? 0.4 : 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed left-1/2 -translate-x-1/2 z-30"
            style={{ bottom: "24px" }}
          >
            {/* Floating bob wrapper */}
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <motion.button
                onClick={onScrollDown}
                whileHover={{ scale: 1.05, opacity: 1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 rounded-full cursor-pointer"
                style={{
                  padding: "var(--nudge-py, 8px) var(--nudge-px, 16px)",
                  background: "rgba(0,0,0,0.06)",
                  border: "1px solid rgba(0,0,0,0.10)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
                aria-label={`Scroll down to ${nextName}`}
              >
                {nextName && (
                  <span className="hidden md:block text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap max-w-[120px] overflow-hidden text-ellipsis">
                    {nextName}
                  </span>
                )}
                <ChevronDown className="w-4 h-4 text-[var(--text-secondary)] shrink-0" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dark-mode pill overrides via CSS — scoped so they don't leak */}
      <style>{`
        .dark [aria-label^="Scroll"] {
          background: rgba(255,255,255,0.08) !important;
          border-color: rgba(255,255,255,0.12) !important;
        }
        @media (max-width: 767px) {
          [aria-label^="Scroll"] {
            --nudge-py: 6px;
            --nudge-px: 12px;
          }
        }
      `}</style>
    </>
  );
}
