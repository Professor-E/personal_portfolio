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
 * Fixed scroll nudge indicators — perfectly centered above and below viewport.
 *
 * Centering: outer plain div uses `position:fixed; left:50%;
 * transform:translateX(-50%)` — never animated so centering never breaks.
 * Bob animation + enter/exit live on inner motion.divs only.
 *
 * Up pill:   visible when activeIndex > 0
 * Down pill: visible when activeIndex < entries.length - 1
 *
 * After 3 s of no scroll/pointer activity, pills dim to 40% opacity.
 * Any activity restores full opacity.
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

  // ── Auto-dim after 3 s of inactivity ───────────────────────────────────────
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

  // Reset whenever active index changes (user navigated)
  useEffect(() => {
    resetTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  // ── Shared pill style ───────────────────────────────────────────────────────
  const pillStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 16px",
    borderRadius: "9999px",
    background: "rgba(0,0,0,0.06)",
    border: "1px solid rgba(0,0,0,0.10)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    whiteSpace: "nowrap",
    width: "fit-content",
    fontSize: "12px",
    fontWeight: 500,
    cursor: "pointer",
    color: "var(--text-secondary)",
  };

  return (
    <>
      {/* ── UP pill ────────────────────────────────────────────────────────
          Outer div: fixed position — NEVER animated so centering is stable.
          left:50% + translateX(-50%) guarantees horizontal center at all widths.
      ──────────────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: "fixed",
          left: "50%",
          transform: "translateX(-50%)",
          top: "calc(70px + 16px)",
          zIndex: 30,
        }}
      >
        <AnimatePresence>
          {showAbove && (
            /* Enter/exit + opacity dim — on this motion.div only */
            <motion.div
              key="nudge-up"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: dimmed ? 0.4 : 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Floating bob — vertical only, never touches centering */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <motion.button
                  onClick={onScrollUp}
                  whileHover={{ scale: 1.05, opacity: 1 }}
                  whileTap={{ scale: 0.95 }}
                  style={pillStyle}
                  aria-label={`Scroll up to ${prevName}`}
                >
                  <ChevronUp
                    style={{ width: 14, height: 14, flexShrink: 0 }}
                  />
                  {prevName && (
                    <span>{prevName}</span>
                  )}
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── DOWN pill ──────────────────────────────────────────────────────
          Same structure — outer fixed div never animates.
      ──────────────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: "fixed",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: "24px",
          zIndex: 30,
        }}
      >
        <AnimatePresence>
          {showBelow && (
            <motion.div
              key="nudge-down"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: dimmed ? 0.4 : 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <motion.button
                  onClick={onScrollDown}
                  whileHover={{ scale: 1.05, opacity: 1 }}
                  whileTap={{ scale: 0.95 }}
                  style={pillStyle}
                  aria-label={`Scroll down to ${nextName}`}
                >
                  {nextName && (
                    <span>{nextName}</span>
                  )}
                  <ChevronDown
                    style={{ width: 14, height: 14, flexShrink: 0 }}
                  />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dark-mode pill style — scoped so it doesn't leak */}
      <style>{`
        .dark [aria-label^="Scroll"] {
          background: rgba(255,255,255,0.08) !important;
          border-color: rgba(255,255,255,0.12) !important;
        }
      `}</style>
    </>
  );
}
