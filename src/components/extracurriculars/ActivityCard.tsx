"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Extracurricular } from "@/lib/constants";

interface ActivityCardProps {
  activity: Extracurricular;
  /** Open the enlarged detail lightbox for this activity. */
  onOpen: () => void;
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

export default function ActivityCard({ activity, onOpen }: ActivityCardProps) {
  return (
    <motion.div
      // Shared layout id — the lightbox box grows out of this exact card.
      layoutId={`activity-${activity.id}`}
      variants={entryVariants}
      exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.15, ease: "easeOut" } }}
      whileHover={{ y: -4 }}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      className={cn(
        "group flex w-full cursor-pointer flex-row items-start gap-5 overflow-hidden rounded-2xl border p-5",
        "transition-[border-color,box-shadow] duration-200",
        "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_6px_20px_rgba(0,0,0,0.07)]",
        "hover:shadow-[0_2px_4px_rgba(0,0,0,0.06),0_14px_32px_rgba(0,0,0,0.12)]"
      )}
      style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = BORDER_SECONDARY;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
      }}
      aria-label={`See more about ${activity.name}`}
    >
      {/* ── Left: icon block ───────────────────────────────────────────────── */}
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

        {/* Animated accent underline — grows on hover */}
        <div
          className="mb-3 h-[1.5px] w-0 transition-[width] duration-[250ms] ease-out group-hover:w-full"
          style={{ backgroundColor: `${activity.accentColor}99` }}
          aria-hidden="true"
        />

        {/* Description — always the short preview; full text lives in the lightbox. */}
        <p className="line-clamp-2 text-[13px] leading-relaxed text-[var(--text-secondary)] transition-colors duration-200 group-hover:text-[var(--text-primary)]">
          {activity.shortDescription}
        </p>

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

        {/* Footer row — category tag + see more */}
        <div
          className="mt-4 flex items-center justify-between border-t pt-3"
          style={{ borderColor: "var(--border)" }}
        >
          <span className="text-[11px] leading-none" style={{ color: TEXT_TERTIARY }}>
            {activity.category}
          </span>

          <span className="flex items-center gap-1 text-[12px] font-medium leading-none text-[var(--accent)]">
            See more
            <span
              className="transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              &rarr;
            </span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
