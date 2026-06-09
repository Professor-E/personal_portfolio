"use client";

import { forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ExperienceEntry as ExperienceEntryType } from "@/types";

interface ExperienceEntryProps {
  entry: ExperienceEntryType;
  index: number;
  isActive: boolean;
  /** |thisIndex - activeIndex| */
  distance: number;
  isExpanded: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

// ── Distance-based visual helpers ─────────────────────────────────────────────

function scaleForDistance(d: number): number {
  if (d === 0) return 1.0;
  if (d === 1) return 0.82;
  if (d === 2) return 0.68;
  return 0.58;
}

function opacityForDistance(d: number): number {
  if (d === 0) return 1.0;
  if (d === 1) return 0.55;
  if (d === 2) return 0.3;
  return 0.15;
}

function blurForDistance(d: number): number {
  if (d === 0) return 0;
  if (d === 1) return 0;
  if (d === 2) return 1;
  return 2;
}

function zIndexForDistance(d: number): number {
  if (d === 0) return 20;
  if (d === 1) return 10;
  if (d === 2) return 5;
  return 1;
}

// ─────────────────────────────────────────────────────────────────────────────

const ExperienceEntryComponent = forwardRef<HTMLDivElement, ExperienceEntryProps>(
  function ExperienceEntry(
    { entry, distance, isActive, isExpanded, onExpand, onCollapse },
    ref
  ) {
    const borderOpacity = isActive ? "99" : "4D"; // 60% vs 30% hex

    return (
      <motion.div
        ref={ref}
        layout
        animate={{
          scale: scaleForDistance(distance),
          opacity: opacityForDistance(distance),
          filter: `blur(${blurForDistance(distance)}px)`,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        style={{ zIndex: zIndexForDistance(distance) }}
        className="relative w-full max-w-[860px]"
        data-entry-id={entry.id}
      >
        {/* ── Card ──────────────────────────────────────────────────────────── */}
        <div
          className="relative overflow-hidden rounded-2xl transition-shadow"
          style={{
            minHeight: isActive ? "340px" : undefined,
            backgroundColor: isActive
              ? "rgba(250,250,247,0.85)"
              : "rgba(250,250,247,0.35)",
            backdropFilter: isActive ? "blur(12px)" : "none",
            WebkitBackdropFilter: isActive ? "blur(12px)" : "none",
            border: `1px solid ${entry.brandColor}${borderOpacity}`,
            boxShadow: isActive ? "0 8px 40px rgba(0,0,0,0.12)" : "none",
          }}
        >
          {/* Left accent bar (active only) */}
          {isActive && (
            <div
              className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
              style={{ backgroundColor: entry.brandColor }}
            />
          )}

          <AnimatePresence mode="wait">
            {isActive ? (
              /* ── ACTIVE card content ──────────────────────────────────── */
              <motion.div
                key="active"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col sm:flex-row gap-5 p-6 pl-7 items-start"
              >
                {/* Logo — 200×200 */}
                <div
                  className="shrink-0 rounded-2xl flex items-center justify-center"
                  style={{
                    width: "clamp(120px, 14vw, 200px)",
                    height: "clamp(120px, 14vw, 200px)",
                    backgroundColor: entry.brandColor,
                  }}
                  aria-hidden="true"
                >
                  <span
                    className="text-4xl font-bold text-white select-none"
                    style={{ fontSize: "clamp(28px, 4vw, 56px)" }}
                  >
                    {entry.company.charAt(0)}
                  </span>
                </div>

                {/* Content right of logo */}
                <div className="flex flex-col flex-1 min-w-0 gap-2 justify-between" style={{ minHeight: "clamp(120px, 14vw, 200px)" }}>
                  <div className="flex flex-col gap-1.5">
                    {/* Company name — H2 size */}
                    <h2
                      className="font-semibold text-[var(--text-primary)] leading-tight"
                      style={{ fontSize: "clamp(18px, 2.2vw, 28px)" }}
                    >
                      {entry.company}
                    </h2>

                    {/* Role — brand color, body-large (18px) */}
                    <p
                      className="font-semibold leading-none"
                      style={{ fontSize: "18px", color: entry.brandColor }}
                    >
                      {entry.role}
                    </p>

                    {/* Date + location — muted, body (14px) */}
                    <p
                      className="font-medium text-[var(--text-secondary)] leading-none"
                      style={{ fontSize: "14px" }}
                    >
                      {entry.startDate} – {entry.endDate} · {entry.location}
                    </p>

                    {/* First 2 bullets */}
                    <ul className="flex flex-col gap-1.5 mt-1">
                      {entry.description.slice(0, 2).map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span
                            className="mt-[7px] shrink-0 rounded-full"
                            style={{
                              width: "5px",
                              height: "5px",
                              backgroundColor: entry.brandColor,
                            }}
                          />
                          <span
                            className="font-normal text-[var(--text-secondary)]"
                            style={{ fontSize: "14px", lineHeight: 1.6 }}
                          >
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* "See more →" — bottom right */}
                  <div className="flex justify-end mt-auto">
                    <button
                      onClick={isExpanded ? onCollapse : onExpand}
                      className="font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                      style={{ fontSize: "16px" }}
                    >
                      {isExpanded ? "Show Less ↑" : "See more →"}
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* ── INACTIVE card content ────────────────────────────────── */
              <motion.div
                key="inactive"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex gap-4 p-4 items-center"
              >
                {/* Logo — 80×80 */}
                <div
                  className="shrink-0 rounded-xl flex items-center justify-center"
                  style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: entry.brandColor,
                  }}
                  aria-hidden="true"
                >
                  <span className="text-xl font-bold text-white select-none">
                    {entry.company.charAt(0)}
                  </span>
                </div>

                {/* Minimal content */}
                <div className="flex flex-col gap-1 min-w-0">
                  <h3
                    className="font-semibold text-[var(--text-primary)] leading-tight overflow-hidden text-ellipsis whitespace-nowrap"
                    style={{ fontSize: "clamp(15px, 1.8vw, 20px)" }}
                  >
                    {entry.company}
                  </h3>
                  <p
                    className="font-medium text-[var(--text-secondary)] leading-none"
                    style={{ fontSize: "14px" }}
                  >
                    {entry.role}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Expanded bullets (active card only) ───────────────────────────── */}
        {isActive && (
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                key="expanded"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div
                  className="mt-2 rounded-2xl p-6"
                  style={{
                    backgroundColor: "rgba(250,250,247,0.85)",
                    border: `1px solid ${entry.brandColor}99`,
                  }}
                >
                  <ul className="flex flex-col gap-3">
                    {entry.description.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className="mt-[7px] shrink-0 rounded-full"
                          style={{
                            width: "6px",
                            height: "6px",
                            backgroundColor: entry.brandColor,
                          }}
                        />
                        <span
                          className="font-normal text-[var(--text-secondary)]"
                          style={{ fontSize: "16px", lineHeight: 1.6 }}
                        >
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={onCollapse}
                    className="mt-4 font-bold text-[16px] text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                  >
                    Show Less ↑
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </motion.div>
    );
  }
);

ExperienceEntryComponent.displayName = "ExperienceEntry";
export default ExperienceEntryComponent;
