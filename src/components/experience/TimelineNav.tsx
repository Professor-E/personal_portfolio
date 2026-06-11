"use client";

import { motion } from "framer-motion";
import type { ExperienceEntry } from "@/types";

interface TimelineNavProps {
  entries: ExperienceEntry[];
  activeIndex: number;
  onDotClick: (index: number) => void;
}

/**
 * Left-side timeline navigation — redesigned per spec
 *
 * Fixed, vertically centered, left: 24px on desktop.
 * Inactive dot: 8×8px unfilled ring (border 1.5px, muted)
 * Active dot: 12×12px filled circle, brandColor
 * Connecting line: thin 1px; progress segment fills with active brandColor
 * Gap: 20px (gap-5) between dots
 * Hidden on mobile (< 768px)
 */
export default function TimelineNav({ entries, activeIndex, onDotClick }: TimelineNavProps) {
  const totalDots = entries.length;
  const fillPercent = totalDots > 1 ? (activeIndex / (totalDots - 1)) * 100 : 0;
  const activeBrandColor = entries[activeIndex]?.brandColor ?? "var(--accent)";

  return (
    <nav
      className="hidden md:flex fixed top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-5"
      style={{ left: "24px" }}
      aria-label="Experience timeline navigation"
    >
      {/* Background connecting line — centered on the dot column.
          left:50% + translateX(-50%) keeps it perfectly aligned with the
          dots regardless of which dot is enlarged (active = 12px, rest = 8px).
          Inset top/bottom 4px so the line runs dot-center to dot-center. */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-px pointer-events-none"
        style={{ top: "4px", bottom: "4px", backgroundColor: "var(--border)" }}
      />

      {/* Progress fill — animates to active dot */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-px origin-top pointer-events-none"
        style={{ top: "4px", maxHeight: "calc(100% - 8px)", backgroundColor: activeBrandColor }}
        animate={{ height: `${fillPercent}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />

      {/* Dots */}
      {entries.map((entry, idx) => {
        const isActive = idx === activeIndex;
        return (
          <motion.button
            key={entry.id}
            onClick={() =>
              document
                .querySelector(`[data-entry-id="${entry.id}"]`)
                ?.closest("section")
                ?.scrollIntoView({ behavior: "smooth", block: "center" })
            }
            aria-label={`Go to ${entry.company}`}
            title={entry.company}
            className="relative z-10 rounded-full cursor-pointer focus:outline-none"
            animate={{
              width: isActive ? 12 : 8,
              height: isActive ? 12 : 8,
              backgroundColor: isActive ? entry.brandColor : "transparent",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              border: isActive ? "none" : "1.5px solid var(--text-secondary)",
              // Soft halo around the active dot for a clearer "you are here"
              boxShadow: isActive ? `0 0 0 4px ${entry.brandColor}33` : "none",
            }}
          />
        );
      })}
    </nav>
  );
}
