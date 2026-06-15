"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { EXPERIENCE } from "@/lib/constants";
import type { ExperienceEntry as ExperienceEntryType } from "@/types";
import RotatingHeading from "./RotatingHeading";
import TimelineNav from "./TimelineNav";
import ExperienceEntry from "./ExperienceEntry";
import ScrollNudge from "./ScrollNudge";

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
  // "proximity" (not "mandatory"): entries still lock in place when the user
  // stops near one, but scrolling past the last entry to the footer is
  // allowed instead of being yanked back up.
  //
  // Vertical centering is handled by each section's own paddingTop (= navbar
  // height) rather than scrollPaddingTop. Because both scroll-snap-align and
  // scrollIntoView({block:"center"}) operate on the section's border box, they
  // agree on the same resting point (no double-jump), while the inner padding
  // shifts the *card* down into the optical centre of the area below the navbar.
  useEffect(() => {
    const html = document.documentElement;
    html.style.scrollSnapType = "y proximity";
    return () => {
      html.style.scrollSnapType = "";
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
  // block: "center" — the section (and the card flex-centered inside it)
  // lands in the middle of the viewport, matching the snap alignment.
  const scrollToEntry = useCallback((idx: number) => {
    sectionRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  // ── Keyboard navigation ────────────────────────────────────────────────────
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      // At the edges, fall through to native scrolling so the user can
      // continue past the last entry (e.g. down to the footer).
      if (e.key === "ArrowDown" && activeIndex < entries.length - 1) {
        e.preventDefault();
        scrollToEntry(activeIndex + 1);
      }
      if (e.key === "ArrowUp" && activeIndex > 0) {
        e.preventDefault();
        scrollToEntry(activeIndex - 1);
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
      style={
        {
          // Fixed navbar height + half of it. Each entry section reserves the
          // full navbar height as top padding so the centred card lands in the
          // optical middle of the *visible* area (below the navbar); fixed
          // overlays (watermark, timeline) shift down by half to match.
          "--exp-navbar": "70px",
          "--exp-center-offset": "35px",
          // Width of the fixed left column (sticky heading + timeline).
          "--exp-left-col": "clamp(210px, 23vw, 340px)",
          // How far the card column shifts right of true viewport center.
          // Zero on wide screens (card self-centers in the viewport) and
          // grows only as much as needed on narrower screens so the card
          // never slides under the heading column.
          // 1004px = card max-width (940px) + section padding (64px).
          // The 0.7 factor pulls the card back toward true center so it reads
          // as centered on the page rather than hugging the heading column.
          "--exp-card-shift":
            "clamp(0px, calc((2 * var(--exp-left-col) + 1004px - 100vw) * 0.7), calc(var(--exp-left-col) * 0.7))",
        } as React.CSSProperties
      }
    >
      {/* ── EXPERIENCE background watermark ──────────────────────────────────
          Fixed, centered in viewport, behind all content.
          text-[13vw] mobile → text-[11vw] desktop so the full word fits
          within the viewport at all standard screen widths without clipping.
      ────────────────────────────────────────────────────────────────────── */}
      <p
        className={[
          "fixed left-1/2 -translate-x-1/2 -translate-y-1/2",
          "pointer-events-none select-none",
          "font-black tracking-widest whitespace-nowrap",
          "text-[13vw] md:text-[11vw]",
          "text-[var(--text-primary)]",
          "opacity-[0.05] dark:opacity-[0.07]",
          "z-0",
        ].join(" ")}
        style={{ top: "calc(50% + var(--exp-center-offset))" }}
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

      {/* ── Sticky heading ───────────────────────────────────────────────────
          Desktop (md+): sticky at navbar(70px) + 24px = 94px, constrained to
          the reserved left column (--exp-left-col) so it can NEVER overlap
          the card column, which is offset to the right by the same amount.
          Mobile: static (scrolls away) — each card already shows the company
          name, and a sticky overlay would collide with centered cards.
          z-index: 10 — above watermark, below scroll nudge pills (z-30)
      ────────────────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
        className="relative md:sticky md:top-[94px] z-10 pointer-events-none"
        style={{ overflow: "visible" }}
      >
        <div
          className="pl-6 md:pl-12 max-w-[500px] md:max-w-none md:w-[var(--exp-left-col)] pointer-events-auto"
          style={{ paddingTop: "8px", paddingBottom: "8px", overflow: "visible" }}
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

      {/* ── Experience entry sections (Changes 3 & 5) ────────────────────────
          Each section: min-height 100vh, flex items-center justify-center
          scroll-snap-align: start (with html scroll-padding-top:70px)
          IntersectionObserver on these sections drives activeIndex
      ────────────────────────────────────────────────────────────────────── */}
      <div
        className="relative z-10 flex flex-col items-center md:pl-[var(--exp-card-shift)]"
        style={{ gap: "16px" }}
      >
        {entries.map((entry, idx) => (
          // Projects page reference padding: px-8 md:px-16 lg:px-24.
          // Intentionally NOT applied here: this section's horizontal padding is
          // load-bearing for the scroll-snap layout. The --exp-card-shift calc
          // above hardcodes "1004px = card max-width (940px) + section padding
          // (64px)", i.e. md:px-8. Increasing it would (a) shrink the centered
          // card at tablet/desktop widths and offset it from the viewport-centered
          // watermark — visual drift — and (b) require editing the non-padding
          // shift calc, which is out of scope. Per the "if matching causes any
          // visual drift, leave it" rule, the existing value is preserved.
          <section
            key={entry.id}
            ref={(el) => { sectionRefs.current[idx] = el; }}
            className="flex items-center justify-center w-full px-4 md:px-8"
            style={{
              minHeight: "100vh",
              // Reserve the navbar height at the top so the flex-centred card
              // sits in the middle of the visible area, not behind the navbar.
              paddingTop: "var(--exp-navbar)",
              scrollSnapAlign: "center",
              // Stop on each entry instead of flying past several on one flick,
              // so every scroll settles with one card centred.
              scrollSnapStop: "always",
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
