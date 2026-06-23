"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useTime, useTransform } from "framer-motion";
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

  const prevEntry = entries[activeIndex - 1];
  const nextEntry = entries[activeIndex + 1];
  const prevName = prevEntry?.company ?? "";
  const nextName = nextEntry?.company ?? "";

  // Shared clock so both pills bob in sync but in opposite directions.
  const time = useTime();
  const bobUpY = useTransform(time, (t) => -5 * Math.sin(((t % 1800) / 1800) * Math.PI));
  const bobDownY = useTransform(time, (t) => 5 * Math.sin(((t % 1800) / 1800) * Math.PI));

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
  // Brand-tinted border + glow per target entry so the pills clearly read as
  // "there's more to see" and visually connect to the entry they lead to.
  const pillStyle = (brandColor: string): React.CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "9px",
    padding: "12px 22px",
    borderRadius: "9999px",
    background: "var(--surface)",
    border: `1.75px solid ${brandColor}66`,
    boxShadow: `0 5px 21px ${brandColor}30, 0 2px 9px rgba(0,0,0,0.08)`,
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    whiteSpace: "nowrap",
    width: "fit-content",
    fontSize: "14.5px",
    fontWeight: 600,
    cursor: "pointer",
    color: "var(--text-primary)",
  });

  return (
    <>
      {/* ── UP pill ────────────────────────────────────────────────────────
          Outer div: fixed position — NEVER animated so centering is stable.
          Mobile: centered on the viewport. Desktop (md+): centered on the
          CARD column (viewport center + half the reserved left column),
          so the pill always sits directly above the active card.
      ──────────────────────────────────────────────────────────────────── */}
      <div
        className="fixed left-1/2 md:left-[calc(50%+var(--exp-card-shift)/2)] -translate-x-1/2 z-30"
        style={{ top: "calc(70px + 16px)" }}
      >
        <AnimatePresence>
          {showAbove && (
            /* Enter/exit + opacity dim — on this motion.div only */
            <motion.div
              key="nudge-up"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: dimmed ? 0.6 : 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Floating bob — driven by shared clock, opposite to down pill */}
              <motion.div style={{ y: bobUpY }}>
                <motion.button
                  onClick={onScrollUp}
                  whileHover={{ scale: 1.06, opacity: 1 }}
                  whileTap={{ scale: 0.95 }}
                  style={pillStyle(prevEntry?.brandColor ?? "var(--accent)")}
                  aria-label={`Scroll up to ${prevName}`}
                >
                  <ChevronUp
                    style={{
                      width: 18,
                      height: 18,
                      flexShrink: 0,
                      color: prevEntry?.brandColor,
                    }}
                  />
                  {prevName && <span>{prevName}</span>}
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
        className="fixed left-1/2 md:left-[calc(50%+var(--exp-card-shift)/2)] -translate-x-1/2 z-30"
        style={{ bottom: "24px" }}
      >
        <AnimatePresence>
          {showBelow && (
            <motion.div
              key="nudge-down"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: dimmed ? 0.6 : 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <motion.div style={{ y: bobDownY }}>
                <motion.button
                  onClick={onScrollDown}
                  whileHover={{ scale: 1.06, opacity: 1 }}
                  whileTap={{ scale: 0.95 }}
                  style={pillStyle(nextEntry?.brandColor ?? "var(--accent)")}
                  aria-label={`Scroll down to ${nextName}`}
                >
                  {nextName && <span>{nextName}</span>}
                  <ChevronDown
                    style={{
                      width: 18,
                      height: 18,
                      flexShrink: 0,
                      color: nextEntry?.brandColor,
                    }}
                  />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
