"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
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

// ── Distance-based visual cascade ─────────────────────────────────────────────
// distance 0: scale 1.0,  opacity 1.0,  blur 0
// distance 1: scale 0.80, opacity 0.50, blur 0
// distance 2: scale 0.65, opacity 0.28, blur 1
// distance 3+: scale 0.55, opacity 0.13, blur 2

function scaleForDistance(d: number): number {
  if (d === 0) return 1.0;
  if (d === 1) return 0.8;
  if (d === 2) return 0.65;
  return 0.55;
}

function opacityForDistance(d: number): number {
  if (d === 0) return 1.0;
  if (d === 1) return 0.5;
  if (d === 2) return 0.28;
  return 0.13;
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
// The ENTIRE card animates as ONE unit via the root motion.div below.
// All internal content renders statically — no child motion wrappers, no
// AnimatePresence, no stagger. Active/inactive content switches instantly
// via a plain ternary while the root scale/opacity transition plays.
// ─────────────────────────────────────────────────────────────────────────────

const ExperienceEntryComponent = forwardRef<HTMLDivElement, ExperienceEntryProps>(
  function ExperienceEntry(
    { entry, distance, isActive, isExpanded, onExpand, onCollapse },
    ref
  ) {
    return (
      <motion.div
        ref={ref}
        layout
        animate={{
          scale: scaleForDistance(distance),
          opacity: opacityForDistance(distance),
        }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        style={{
          zIndex: zIndexForDistance(distance),
          // Blur applied statically (not animated) — animating filter forces
          // repaints every frame and causes scroll jank. Only far cards
          // (opacity ≤ 0.28) are blurred, so the instant switch is invisible.
          filter: `blur(${blurForDistance(distance)}px)`,
          willChange: "transform, opacity",
        }}
        className="relative w-full max-w-[940px]"
        data-entry-id={entry.id}
      >
        {/* ── Card (static — root motion.div above is the only animator) ──── */}
        <div
          className="relative overflow-hidden rounded-3xl"
          style={{
            backgroundColor: "var(--surface)",
            border: `1px solid ${entry.brandColor}${isActive ? "80" : "4D"}`,
            boxShadow: isActive ? "0 12px 48px rgba(0,0,0,0.10)" : "none",
          }}
        >
          {/* Left accent bar — 6px, brandColor, active only */}
          {isActive && (
            <div
              className="absolute left-0 top-0 bottom-0"
              style={{
                width: "6px",
                backgroundColor: entry.brandColor,
                borderRadius: "6px 0 0 6px",
              }}
            />
          )}

          {isActive ? (
            /* ── ACTIVE: [accent bar] [logo 160×160] [content flex-1] ─────── */
            <div className="flex flex-col sm:flex-row gap-6 p-8 items-start">
              {/* Logo — 160×160, brandColor bg, white initial */}
              <div
                className="shrink-0 rounded-2xl flex items-center justify-center"
                style={{
                  // Fluid 112–160px: keeps the content column readable on
                  // narrower desktops where the card shares the row with the
                  // sticky heading column.
                  width: "clamp(112px, 12vw, 160px)",
                  height: "clamp(112px, 12vw, 160px)",
                  maxWidth: "100%",
                  backgroundColor: entry.brandColor,
                }}
                aria-hidden="true"
              >
                <span className="text-5xl font-bold text-white select-none">
                  {entry.company.charAt(0)}
                </span>
              </div>

              {/* Content block — sized by its content (no forced min-height so
                  the card never shows empty space), See more pinned
                  bottom-right */}
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex-1 flex flex-col gap-2">
                  {/* Company name — H2, bold */}
                  <h2
                    className="font-bold text-[var(--text-primary)] leading-tight"
                    style={{
                      fontSize: "clamp(20px, 2.4vw, 32px)",
                      wordBreak: "break-word",
                    }}
                  >
                    {entry.company}
                  </h2>

                  {/* Role — brandColor, Body Large, semibold */}
                  <p
                    className="font-semibold leading-snug"
                    style={{ fontSize: "18px", color: entry.brandColor }}
                  >
                    {entry.role}
                  </p>

                  {/* Date + location — muted, Body */}
                  <p
                    className="font-medium text-[var(--text-secondary)] leading-none"
                    style={{ fontSize: "16px" }}
                  >
                    {entry.startDate} – {entry.endDate} · {entry.location}
                  </p>

                  {/* First 2 bullets */}
                  <ul className="flex flex-col gap-2 mt-4">
                    {entry.description.slice(0, 2).map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span
                          className="mt-[8px] shrink-0 rounded-full"
                          style={{
                            width: "5px",
                            height: "5px",
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
                </div>

                {/* See more — bottom-right of the content block */}
                <div className="flex justify-end mt-4">
                  <button
                    onClick={isExpanded ? onCollapse : onExpand}
                    className="text-sm font-semibold flex items-center gap-1 text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                  >
                    {isExpanded ? "Show Less ↑" : "See more →"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ── INACTIVE: compact row — logo 72×72 + name + role ─────────── */
            <div className="flex gap-4 p-6 items-center">
              <div
                className="shrink-0 rounded-xl flex items-center justify-center"
                style={{
                  width: "72px",
                  height: "72px",
                  backgroundColor: entry.brandColor,
                }}
                aria-hidden="true"
              >
                <span className="text-2xl font-bold text-white select-none">
                  {entry.company.charAt(0)}
                </span>
              </div>

              <div className="flex flex-col gap-1 min-w-0 justify-center">
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
            </div>
          )}
        </div>

        {/* ── Expanded bullets (active card, "See more" clicked) ────────────
            Plain conditional render — no AnimatePresence per the unified
            animation rule. */}
        {isActive && isExpanded && (
          <div
            className="mt-2 rounded-3xl p-6"
            style={{
              backgroundColor: "var(--surface)",
              border: `1px solid ${entry.brandColor}80`,
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
        )}
      </motion.div>
    );
  }
);

ExperienceEntryComponent.displayName = "ExperienceEntry";
export default ExperienceEntryComponent;
