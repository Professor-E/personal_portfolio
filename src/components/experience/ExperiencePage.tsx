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

      {/* ── Footer — Figma node 616:654 ───────────────────────────────────── */}
      <footer
        className="relative z-10 w-full"
        style={{ scrollSnapAlign: "start" }}
      >
        <div
          style={{ backgroundColor: "var(--border)" }}
        >
          <div className="flex flex-col md:flex-row items-start justify-between gap-6 px-6 py-4">
            {/* Brand + socials */}
            <div className="flex flex-col gap-3">
              <p className="font-bold text-[14px] text-[var(--text-primary)] leading-none">
                Dominik Grzeszczak
              </p>
              <p className="font-medium text-[12px] text-[var(--text-secondary)] leading-none">
                Electrical Engineering &amp; Computer Science @ MIT
              </p>
              <div className="flex items-center gap-3 mt-1">
                <a href="https://github.com" aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="mailto:dominikgrzeszczak28@gmail.com" aria-label="Email" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </a>
              </div>
            </div>
            {/* Navigate */}
            <div className="flex flex-col gap-2.5">
              <p className="font-bold text-[14px] text-[var(--text-primary)] leading-none">Navigate</p>
              {["Experience", "Projects", "Extracurriculars", "Hobbies", "About Me"].map((l) => (
                <p key={l} className="font-medium text-[12px] text-[var(--text-secondary)] leading-none">{l}</p>
              ))}
            </div>
            {/* Get in touch */}
            <div className="flex flex-col gap-2.5">
              <p className="font-bold text-[14px] text-[var(--text-primary)] leading-none">Get in touch</p>
              <p className="font-medium text-[12px] text-[var(--text-secondary)] leading-none">Feel free to reach out!</p>
              <a href="mailto:dominikgrzeszczak28@gmail.com" className="font-medium text-[12px] text-[var(--accent)] hover:underline leading-none">
                dominikgrzeszczak28@gmail.com
              </a>
            </div>
          </div>
          {/* Bottom bar */}
          <div className="flex items-center justify-between px-6 py-2.5 border-t" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
            <p className="font-medium text-[12px] text-[var(--text-secondary)] leading-none">
              © 2026 Dominik Grzeszczak · Built with React, TypeScript &amp; Tailwind
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-1 font-medium text-[12px] text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors leading-none"
            >
              Back to top
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
            </button>
          </div>
        </div>
      </footer>

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
