"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Extracurricular } from "@/lib/constants";

interface ActivityCardProps {
  activity: Extracurricular;
  isExpanded: boolean;
  onToggle: () => void;
}

// No dedicated tertiary / border-secondary tokens exist — derive them from the
// secondary tokens exactly like the Projects page so the two pages stay visually
// in sync while still tracking light/dark mode.
const TEXT_TERTIARY = "color-mix(in srgb, var(--text-secondary) 70%, transparent)";
const BORDER_SECONDARY =
  "color-mix(in srgb, var(--text-secondary) 45%, var(--border))";

// Entry / exit variants drive the staggered list-in and filter-out. The parent
// list owns the stagger via staggerChildren.
const entryVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
};

// Parent hover variant — empty container that simply broadcasts rest/hover to
// its variant-aware children (the underline and the arrow).
const cardVariants = {
  rest: {},
  hover: {},
};

const underlineVariants = {
  rest: { width: 0 },
  hover: { width: "100%", transition: { duration: 0.25, ease: "easeOut" } },
};

const arrowVariants = {
  rest: { x: 0 },
  hover: { x: 4, transition: { duration: 0.2 } },
};

export default function ActivityCard({ activity, isExpanded, onToggle }: ActivityCardProps) {
  return (
    <motion.div
      layout
      variants={entryVariants}
      exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.15, ease: "easeOut" } }}
      transition={{ layout: { duration: 0.3, ease: "easeOut" } }}
    >
      {/* Hover host — broadcasts rest/hover; never moves, scales, or lifts. */}
      <motion.div
        initial="rest"
        animate="rest"
        whileHover="hover"
        variants={cardVariants}
        className={cn(
          "group flex w-full flex-row items-start gap-5 overflow-hidden rounded-2xl border-[0.5px] p-5",
          "transition-colors duration-200"
        )}
        style={{
          backgroundColor: "var(--background)",
          borderColor: isExpanded ? BORDER_SECONDARY : "var(--border)",
        }}
        onMouseEnter={(e) => {
          if (!isExpanded) e.currentTarget.style.borderColor = BORDER_SECONDARY;
        }}
        onMouseLeave={(e) => {
          if (!isExpanded) e.currentTarget.style.borderColor = "var(--border)";
        }}
      >
        {/* ── Left: icon block (moves with the card as one unit) ──────────── */}
        <div
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-[filter] duration-200 group-hover:brightness-105"
          style={{ backgroundColor: activity.accentColor }}
          aria-hidden="true"
        >
          <span className="select-none text-base font-medium text-white">
            {activity.monogram}
          </span>
        </div>

        {/* ── Center: main content ─────────────────────────────────────────── */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header row — name + date range */}
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-[16px] font-medium leading-snug text-[var(--text-primary)]">
              {activity.name}
            </h3>
            <span
              className="mt-0.5 flex-shrink-0 text-[11px] leading-none"
              style={{ color: TEXT_TERTIARY }}
            >
              {activity.dateRange}
            </span>
          </div>

          {/* Role badge row */}
          <div className="mb-3 mt-2 flex flex-wrap gap-1.5">
            {activity.roles.map((role) => (
              <span
                key={role}
                className="rounded-full px-2.5 py-0.5 text-[11px] font-medium leading-none"
                style={{
                  backgroundColor: `${activity.accentColor}18`,
                  color: activity.accentColor,
                }}
              >
                {role}
              </span>
            ))}
          </div>

          {/* Animated accent underline — grows on hover, stays open if expanded */}
          <motion.div
            initial="rest"
            variants={underlineVariants}
            animate={isExpanded ? "hover" : undefined}
            className="mb-3 h-[1.5px]"
            style={{ backgroundColor: `${activity.accentColor}99` }}
            aria-hidden="true"
          />

          {/* Description — clamps to 2 lines, expands inline; the parent's
              `layout` prop animates the height change smoothly. Color shifts to
              text-primary on hover for an "in focus" feel. */}
          <motion.p
            layout="position"
            className={cn(
              "text-[13px] leading-relaxed text-[var(--text-secondary)] transition-colors duration-200 group-hover:text-[var(--text-primary)]",
              !isExpanded && "line-clamp-2"
            )}
          >
            {isExpanded ? activity.fullDescription : activity.shortDescription}
          </motion.p>

          {/* Stat pills row — inline text, no borders */}
          {activity.stats.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-3">
              {activity.stats.map((stat) => (
                <span
                  key={`${stat.value}-${stat.label}`}
                  className="text-[11px] leading-none"
                  style={{ color: TEXT_TERTIARY }}
                >
                  <span className="font-medium text-[var(--text-secondary)]">
                    {stat.value}
                  </span>{" "}
                  {stat.label}
                </span>
              ))}
            </div>
          )}

          {/* Footer row — category tag + expand toggle */}
          <div
            className="mt-4 flex items-center justify-between border-t pt-3"
            style={{ borderColor: "var(--border)" }}
          >
            <span className="text-[11px] leading-none" style={{ color: TEXT_TERTIARY }}>
              {activity.category}
            </span>

            {isExpanded ? (
              <button
                type="button"
                onClick={onToggle}
                aria-expanded
                className="flex items-center gap-1 text-[12px] font-medium leading-none text-[var(--text-secondary)]"
              >
                <span aria-hidden="true">&larr;</span>
                Show less
              </button>
            ) : (
              <button
                type="button"
                onClick={onToggle}
                aria-expanded={false}
                className="flex items-center gap-1 text-[12px] font-medium leading-none text-[var(--accent)]"
              >
                See more
                <motion.span variants={arrowVariants} aria-hidden="true">
                  &rarr;
                </motion.span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
