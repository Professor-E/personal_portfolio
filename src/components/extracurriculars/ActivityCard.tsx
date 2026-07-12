"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EXTRACURRICULAR_CATEGORY_COLORS, type Extracurricular } from "@/lib/constants";
import { fadeUp } from "@/lib/motion";

interface ActivityCardProps {
  activity: Extracurricular;
  /** Open the enlarged detail lightbox for this activity. */
  onOpen: () => void;
}

// Same fade+rise shape used for every entrance animation on the site (see
// `headingVariants` in the page header). Rows already on screen when the
// page loads (even partially cut off) fade in immediately; rows further
// down fade in — all together, no stagger — the moment they're scrolled
// into view (see `whileInView` below).
const entryVariants = fadeUp;

export default function ActivityCard({ activity, onOpen }: ActivityCardProps) {
  // Category tag color is fixed per category (Leadership/Competition/
  // Community & Volunteering), independent of this activity's own
  // individual accentColor (which still drives its role pills/stat chips).
  const categoryColor =
    EXTRACURRICULAR_CATEGORY_COLORS[activity.category] ?? activity.accentColor;

  return (
    <motion.div
      // Shared layout id — the lightbox box grows out of this exact card.
      layoutId={`activity-${activity.id}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: "some" }}
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
        "shadow-[var(--shadow-md)]",
        "hover:shadow-[var(--shadow-lg)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
      )}
      style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--border-strong)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
      }}
      aria-label={`See more about ${activity.name}`}
    >
      {/* ── Left: icon block — real logo when available, monogram fallback ──
          Boolean() wrapping keeps the fallback typed (not narrowed to
          `never`) even now that every entry happens to have an image, so a
          future image-less entry still degrades gracefully. */}
      <div
        className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl transition-[filter] duration-200 group-hover:brightness-105"
        style={{
          backgroundColor: Boolean(activity.imagePath) ? "#ffffff" : activity.accentColor,
          border: Boolean(activity.imagePath) ? "1px solid var(--border)" : undefined,
        }}
        aria-hidden="true"
      >
        {Boolean(activity.imagePath) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={activity.imagePath}
            alt=""
            className="h-full w-full object-contain select-none"
            style={{ padding: "6px" }}
            draggable={false}
          />
        ) : (
          <span className="select-none text-base font-medium text-white">
            {activity.monogram}
          </span>
        )}
      </div>

      {/* ── Center: main content ─────────────────────────────────────────── */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header row — name + date range */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-[16px] font-semibold leading-snug text-[var(--text-primary)]">
            {activity.name}
          </h3>
          <span
            className="mt-0.5 flex-shrink-0 text-[11px] leading-none"
            style={{ color: "var(--text-tertiary)" }}
          >
            {activity.dateRange}
          </span>
        </div>

        {/* Category tag (fixed per-category color) */}
        <div className="mb-3 mt-2 flex flex-wrap gap-1.5">
          <span
            className="rounded-full px-2.5 py-0.5 text-[11px] font-medium leading-none"
            style={{
              backgroundColor: `${categoryColor}18`,
              color: categoryColor,
            }}
          >
            {activity.category}
          </span>
        </div>

        {/* Animated accent underline — grows on hover */}
        <div
          className="mb-3 h-[1.5px] w-0 transition-[width] duration-[250ms] ease-out group-hover:w-full"
          style={{ backgroundColor: `${categoryColor}99` }}
          aria-hidden="true"
        />

        {/* Description — always the short preview; full text lives in the lightbox. */}
        <p className="line-clamp-2 text-[13px] leading-relaxed text-[var(--text-secondary)] transition-colors duration-200 group-hover:text-[var(--text-primary)]">
          {activity.shortDescription}
        </p>

        {/* Role + stat chips — the headline "who I was" and "what I achieved"
            info, bordered and tinted so it pops and reads at a glance
            without opening the lightbox. */}
        {(activity.roles.length > 0 || activity.stats.length > 0) && (
          <div className="mt-3 flex flex-wrap items-stretch gap-2">
            {activity.roles.map((role) => (
              <span
                key={role}
                className="inline-flex items-center rounded-lg border px-3 py-1.5 text-[12px] font-semibold leading-none"
                style={{
                  backgroundColor: `${categoryColor}1f`,
                  borderColor: `${categoryColor}40`,
                  color: categoryColor,
                }}
              >
                {role}
              </span>
            ))}
            {activity.stats.map((stat) => (
              <div
                key={`${stat.value}-${stat.label}`}
                className="flex flex-col gap-0.5 rounded-lg border px-3 py-1.5"
                style={{
                  backgroundColor: `${categoryColor}1f`,
                  borderColor: `${categoryColor}40`,
                }}
              >
                <span
                  className="font-bold leading-none"
                  style={{ fontSize: "14px", color: categoryColor }}
                >
                  {stat.value}
                </span>
                <span
                  className="font-medium leading-none text-[var(--text-secondary)]"
                  style={{ fontSize: "10.5px" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Footer row — see more, pinned bottom-right (category now shown as
            a tag above, so it isn't repeated here) */}
        <div
          className="mt-4 flex items-center justify-end border-t pt-3"
          style={{ borderColor: "var(--border)" }}
        >
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
