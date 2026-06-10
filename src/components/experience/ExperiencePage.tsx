"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { EXPERIENCE } from "@/lib/constants";
import type { ExperienceEntry as ExperienceEntryType } from "@/types";
import RotatingHeading from "./RotatingHeading";
import TimelineNav from "./TimelineNav";
import ExperienceEntry from "./ExperienceEntry";
import ScrollNudge from "./ScrollNudge";

// ── Skills — from Figma node 616:567 ──────────────────────────────────────────
const SKILLS = [
  "PCB Design", "Circuit Analysis", "Digital Logic", "Analog Circuits",
  "EasyEDA", "KiCAD", "Fusion", "Python", "C", "Swift", "Prusa Slicer", "Bambu Studio",
] as const;

// ── Display order ──────────────────────────────────────────────────────────────
const DISPLAY_ORDER = [
  "yc-jam-it", "akamai", "hamilton-broadcast", "argonne",
  "northwestern-ctd", "mit-splash", "gbs", "habitat-humanity",
];

function getOrderedEntries(): ExperienceEntryType[] {
  const map = new Map(EXPERIENCE.map((e) => [e.id, e]));
  return DISPLAY_ORDER
    .map((id) => map.get(id))
    .filter((e): e is ExperienceEntryType => e !== undefined);
}

// ── Mobile horizontal dot nav ──────────────────────────────────────────────────
function MobileDotNav({
  entries,
  activeIndex,
  onDotClick,
}: {
  entries: ExperienceEntryType[];
  activeIndex: number;
  onDotClick: (i: number) => void;
}) {
  return (
    <div className="flex md:hidden items-center justify-center gap-3 py-3 sticky top-[70px] z-20 bg-[var(--background)]">
      {entries.map((entry, idx) => (
        <button
          key={entry.id}
          onClick={() => onDotClick(idx)}
          aria-label={`Go to ${entry.company}`}
          className="rounded-full transition-all duration-200"
          style={{
            width: idx === activeIndex ? 14 : 9,
            height: idx === activeIndex ? 14 : 9,
            backgroundColor: idx === activeIndex ? entry.brandColor : "transparent",
            border: idx === activeIndex ? "none" : "1.5px solid var(--text-secondary)",
          }}
        />
      ))}
    </div>
  );
}

// ── Page entry animation ───────────────────────────────────────────────────────
const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// ─────────────────────────────────────────────────────────────────────────────
export default function ExperiencePage() {
  const entries = getOrderedEntries();
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  // refs point at the wrapping <section> elements for IntersectionObserver
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // ── Apply scroll-snap to the page on mount ───────────────────────────────
  useEffect(() => {
    const html = document.documentElement;
    html.style.scrollSnapType = "y mandatory";
    html.style.scrollPaddingTop = "70px";
    return () => {
      html.style.scrollSnapType = "";
      html.style.scrollPaddingTop = "";
    };
  }, []);

  // ── IntersectionObserver — update active entry on scroll ──────────────────
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionRefs.current.forEach((ref, idx) => {
      if (!ref) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(idx);
        },
        { threshold: 0.55, rootMargin: "-70px 0px 0px 0px" }
      );
      obs.observe(ref);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [entries.length]);

  // ── Scroll to a specific entry ─────────────────────────────────────────────
  const scrollToEntry = useCallback((idx: number) => {
    sectionRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // ── Keyboard navigation ────────────────────────────────────────────────────
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        scrollToEntry(Math.min(activeIndex + 1, entries.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        scrollToEntry(Math.max(activeIndex - 1, 0));
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, entries.length, scrollToEntry]);

  const activeEntry = entries[activeIndex];

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="show"
      className="relative bg-[var(--background)]"
    >
      {/* ── EXPERIENCE background watermark ──────────────────────────────────
          Fixed, centered in viewport, behind all content.
          text-[13vw] mobile → text-[11vw] desktop so the full word fits
          within the viewport at all standard screen widths without clipping.
      ────────────────────────────────────────────────────────────────────── */}
      <p
        className={[
          "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          "pointer-events-none select-none",
          "font-black tracking-widest whitespace-nowrap",
          "text-[13vw] md:text-[11vw]",
          "text-[var(--text-primary)]",
          "opacity-[0.05] dark:opacity-[0.07]",
          "z-0",
        ].join(" ")}
        aria-hidden="true"
      >
        EXPERIENCE
      </p>

      {/* ── Fixed left timeline nav (desktop only) ───────────────────────── */}
      <TimelineNav
        entries={entries}
        activeIndex={activeIndex}
        onDotClick={scrollToEntry}
      />

      {/* ── Sticky heading (Change 1) ────────────────────────────────────────
          top: navbar(70px) + 24px gap = 94px
          padding-left: 80px on desktop
          max-width: 520px so it never wraps awkwardly
          z-index: 10 so it sits above scrolling cards
      ────────────────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
        className="sticky z-10 pointer-events-none"
        style={{ top: "94px" }}
      >
        <div
          className="pl-5 md:pl-20 max-w-[520px] pointer-events-auto"
          style={{ paddingTop: "8px", paddingBottom: "8px" }}
        >
          <RotatingHeading
            companyName={activeEntry?.company ?? ""}
            brandColor={activeEntry?.brandColor ?? "var(--accent)"}
          />
        </div>
      </motion.div>

      {/* ── Mobile dots ───────────────────────────────────────────────────── */}
      <MobileDotNav
        entries={entries}
        activeIndex={activeIndex}
        onDotClick={scrollToEntry}
      />

      {/* ── Skills strip — Figma node 616:567 ────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="relative z-10 px-5 md:px-20 pb-4"
      >
        <p
          className="font-semibold mb-2"
          style={{ fontSize: "16px", color: "#5f5e5a" }}
        >
          Skills
        </p>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map((skill) => (
            <span
              key={skill}
              className="flex items-center gap-1 font-medium text-[var(--text-secondary)]"
              style={{
                fontSize: "14px",
                border: "1px solid var(--text-secondary)",
                borderRadius: "10px",
                padding: "6px 8px",
                lineHeight: 1,
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              {skill}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ── Experience entry sections (Changes 3 & 5) ────────────────────────
          Each section: min-height 100vh, flex items-center justify-center
          scroll-snap-align: start (with html scroll-padding-top:70px)
          IntersectionObserver on these sections drives activeIndex
      ────────────────────────────────────────────────────────────────────── */}
      <div
        className="relative z-10 flex flex-col items-center"
        style={{ gap: "16px" }}
      >
        {entries.map((entry, idx) => (
          <section
            key={entry.id}
            ref={(el) => { sectionRefs.current[idx] = el; }}
            className="flex items-center justify-center w-full px-4 md:px-8"
            style={{
              minHeight: "100vh",
              scrollSnapAlign: "start",
            }}
          >
            <ExperienceEntry
              entry={entry}
              index={idx}
              isActive={idx === activeIndex}
              distance={Math.abs(idx - activeIndex)}
              isExpanded={expandedId === entry.id}
              onExpand={() => setExpandedId(entry.id)}
              onCollapse={() => setExpandedId(null)}
            />
          </section>
        ))}
      </div>


      {/* ── Scroll nudge indicators (up / down chevrons) ─────────────────── */}
      <ScrollNudge
        entries={entries}
        activeIndex={activeIndex}
        onScrollUp={() => scrollToEntry(Math.max(activeIndex - 1, 0))}
        onScrollDown={() => scrollToEntry(Math.min(activeIndex + 1, entries.length - 1))}
      />
    </motion.div>
  );
}
