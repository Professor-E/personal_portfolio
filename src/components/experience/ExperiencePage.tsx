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
  "akamai", "yc-jam-it", "handshake", "hamilton-broadcast", "mit-splash",
  "argonne", "northwestern-ctd", "gbs",
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
  visible,
}: {
  entries: ExperienceEntryType[];
  activeIndex: number;
  onDotClick: (i: number) => void;
  visible: boolean;
}) {
  return (
    <div
      className="flex md:hidden items-center justify-center gap-3 py-3 sticky top-[70px] z-20 bg-[var(--background)] transition-opacity duration-500 ease-out"
      style={{ opacity: visible ? 1 : 0 }}
    >
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
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

// ─────────────────────────────────────────────────────────────────────────────
export default function ExperiencePage() {
  const entries = getOrderedEntries();
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  // Intro: false → only the background "EXPERIENCE" watermark shows. Flips true
  // shortly after mount, at which point the heading / timeline fade in and the
  // first (Akamai) card slides up from the bottom.
  const [revealCards, setRevealCards] = useState(false);
  // Distance (px) the first card slides up during the intro. Set on mount to
  // the exact scroll-to-center distance (+ a little extra) so the single
  // fade + slide carries the Akamai card from the bottom straight to the
  // optical centre — no stop-and-then-re-center.
  const [introY, setIntroY] = useState(64);
  // refs point at the wrapping <section> elements used for centering math.
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  // Holds the active requestAnimationFrame id for our custom smooth-scroll.
  const scrollRafRef = useRef<number | null>(null);
  // Flips true once the intro slide settles. Until then the scroll-driven
  // active-index + auto-center logic is suppressed: during the intro the cards
  // carry a transform (introY), so getBoundingClientRect would read shifted
  // positions and "recenter" the page to a wrong spot — which used to fling the
  // first card up to the top instead of letting it land in the middle.
  const introDoneRef = useRef(false);

  // ── Disable native CSS smooth-scroll while on this page ───────────────────
  // globals.css sets `html { scroll-behavior: smooth }`. That makes the browser
  // re-smooth every `window.scrollTo` we issue from our rAF loop, so the two
  // easing curves fight each other and the scroll feels laggy / "slaggy". We
  // own the easing here, so switch the document to instant jumps and restore it
  // on unmount.
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    return () => {
      html.style.scrollBehavior = prev;
    };
  }, []);

  // ── Kick off the intro reveal ─────────────────────────────────────────────
  // Quick: just long enough to register the empty stage + watermark, then the
  // cards come in so the page never reads as "no experience".
  useEffect(() => {
    const t = setTimeout(() => setRevealCards(true), 360);
    return () => clearTimeout(t);
  }, []);

  // ── Pre-center the first card so the intro is ONE motion ──────────────────
  // The first section is taller than the viewport, so at scrollY=0 the Akamai
  // card naturally rests *below* the optical centre. Previously the intro slid
  // the card to that low rest spot, paused, then a programmatic scroll dragged
  // it up to centre — two visible motions. Instead we snap the page to the
  // centred scroll position up-front (while everything is still opacity:0, so
  // it's invisible) and feed that distance into the card's slide. Now the
  // single fade + translate carries the card from the bottom straight to the
  // centre, landing exactly as the fade hits 100%.
  useEffect(() => {
    const el = sectionRefs.current[0];
    if (!el) return;
    // offsetTop walk → untransformed document Y (ignores the framer transforms
    // on the wrapping motion.div, which would otherwise corrupt the math).
    let docTop = 0;
    let node: HTMLElement | null = el;
    while (node) {
      docTop += node.offsetTop;
      node = node.offsetParent as HTMLElement | null;
    }
    const centerDoc = docTop + el.offsetHeight / 2;
    const target = Math.max(0, centerDoc - window.innerHeight / 2);
    window.scrollTo(0, target);
    // Start the slide from the same "rising from the bottom" spot as before
    // (the centre-distance plus a little extra) and let it travel all the way in.
    setIntroY(target + 64);
  }, []);

  // ── Custom smooth scroll (easeInOutCubic) ─────────────────────────────────
  // We drive the scroll ourselves (instead of CSS scroll-snap / scrollIntoView)
  // so auto-centering follows a single slow → fast → slow bezier and can be
  // cancelled the instant the user takes over. Native smooth-scroll is disabled
  // above so the browser never re-smooths these per-frame jumps.
  const smoothScrollTo = useCallback((targetY: number, duration = 520) => {
    if (scrollRafRef.current !== null) cancelAnimationFrame(scrollRafRef.current);
    const startY = window.scrollY;
    const diff = targetY - startY;
    if (Math.abs(diff) < 1) return;
    const startTime = performance.now();
    // easeInOutCubic — starts slow, accelerates, eases out at the end.
    const ease = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const step = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      window.scrollTo(0, startY + diff * ease(t));
      if (t < 1) scrollRafRef.current = requestAnimationFrame(step);
      else scrollRafRef.current = null;
    };
    scrollRafRef.current = requestAnimationFrame(step);
  }, []);

  // Cancel an in-flight programmatic scroll the moment the user takes over.
  useEffect(() => {
    function cancel() {
      if (scrollRafRef.current !== null) {
        cancelAnimationFrame(scrollRafRef.current);
        scrollRafRef.current = null;
      }
    }
    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchmove", cancel, { passive: true });
    return () => {
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchmove", cancel);
    };
  }, []);

  // ── Active entry = the section whose center is nearest the viewport center ──
  // Computed live on every scroll frame (rAF-throttled) instead of via an
  // IntersectionObserver. This keeps the *active* (scaled-up) card and the
  // *centered* card perfectly in sync — even mid-flight during a programmatic
  // scroll — so the focus never lags behind where you actually are.
  useEffect(() => {
    let raf: number | null = null;
    const nearestToCenter = () => {
      const viewportCenter = window.innerHeight / 2;
      let nearest = 0;
      let nearestDist = Infinity;
      sectionRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top + rect.height / 2 - viewportCenter);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearest = idx;
        }
      });
      return nearest;
    };
    const update = () => {
      raf = null;
      // During the intro the cards are transformed; trust the fixed first entry.
      if (!introDoneRef.current) return;
      const nearest = nearestToCenter();
      setActiveIndex((cur) => (cur !== nearest ? nearest : cur));
    };
    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [entries.length]);

  // ── Scroll to a specific entry ─────────────────────────────────────────────
  // block: "center" — the section (and the card flex-centered inside it)
  // lands in the middle of the viewport, matching the snap alignment.
  const scrollToEntry = useCallback(
    (idx: number) => {
      const el = sectionRefs.current[idx];
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerDoc = rect.top + window.scrollY + rect.height / 2;
      // Center the section's border-box in the viewport (its inner paddingTop
      // already offsets the card into the optical centre below the navbar).
      smoothScrollTo(centerDoc - window.innerHeight / 2);
    },
    [smoothScrollTo]
  );

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

  // ── Auto-center the nearest entry after the user stops scrolling ──────────
  // Gives every settle a clean, centered card without trapping the footer.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    function onScroll() {
      // Don't fight the intro: the pre-center scroll fires a scroll event while
      // the cards are still transformed, which would otherwise recenter to a
      // bogus (transform-corrupted) position and yank the first card off-centre.
      if (!introDoneRef.current) return;
      // Ignore scroll events generated by our own animation.
      if (scrollRafRef.current !== null) return;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        const viewportCenter = window.innerHeight / 2;
        let nearest = -1;
        let nearestDist = Infinity;
        sectionRefs.current.forEach((el, idx) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const center = rect.top + rect.height / 2;
          const dist = Math.abs(center - viewportCenter);
          if (dist < nearestDist) {
            nearestDist = dist;
            nearest = idx;
          }
        });
        // Recenter whenever the nearest card is even slightly off AND reasonably
        // close, so it locks crisply to center without yanking back the user who
        // is scrolling all the way down to the footer.
        if (
          nearest >= 0 &&
          nearestDist > 2 &&
          nearestDist < window.innerHeight * 0.5
        ) {
          scrollToEntry(nearest);
        }
      }, 90);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timer) clearTimeout(timer);
    };
  }, [scrollToEntry]);

  const activeEntry = entries[activeIndex];

  // ── Collapse an expanded card once it scrolls out of focus ────────────────
  // When the active card changes, any previously-expanded dropdown resets so it
  // is never left open behind the scenes.
  const activeEntryId = activeEntry?.id;
  useEffect(() => {
    setExpandedId((cur) => (cur && cur !== activeEntryId ? null : cur));
  }, [activeEntryId]);

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
      {/* Fade wrapper animates only opacity (never transform) so the inner
          fixed-positioned watermark stays anchored to the viewport while it
          fades in alongside the cards / heading. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: revealCards ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      >
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
        >
          EXPERIENCE
        </p>
      </motion.div>

      {/* ── Fixed left timeline nav (desktop only) ───────────────────────── */}
      <TimelineNav
        entries={entries}
        activeIndex={activeIndex}
        onDotClick={scrollToEntry}
        visible={revealCards}
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
        animate={revealCards ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
        visible={revealCards}
      />

      {/* ── Experience entry sections ────────────────────────────────────────
          Each section: min-height 100vh, flex-centered card. The whole stack is
          held hidden + nudged down (introY) during the intro. introY is the
          exact scroll-to-center distance (set on mount, see effect above) plus a
          little extra, and the page is pre-scrolled to centre while hidden — so
          the single fade + slide carries the Akamai card from the bottom
          straight to the optical centre, arriving as the fade reaches 100%.
      ────────────────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: introY }}
        animate={revealCards ? { opacity: 1, y: 0 } : { opacity: 0, y: introY }}
        transition={
          revealCards
            ? { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
            : { duration: 0 }
        }
        onAnimationComplete={() => {
          // The slide has landed the card in the centre. Hand control back to
          // the scroll-driven active-index + auto-center logic.
          if (revealCards) introDoneRef.current = true;
        }}
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
              // Centering is handled by the JS auto-center effect (easeInOutCubic)
              // rather than CSS scroll-snap, so the two never fight.
              paddingTop: "var(--exp-navbar)",
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
      </motion.div>


      {/* ── Scroll nudge indicators (up / down chevrons) ─────────────────── */}
      {revealCards && (
        <ScrollNudge
          entries={entries}
          activeIndex={activeIndex}
          onScrollUp={() => scrollToEntry(Math.max(activeIndex - 1, 0))}
          onScrollDown={() => scrollToEntry(Math.min(activeIndex + 1, entries.length - 1))}
        />
      )}
    </motion.div>
  );
}
