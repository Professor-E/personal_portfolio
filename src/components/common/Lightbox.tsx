"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, X } from "lucide-react";

interface LightboxProps {
  /** Whether the lightbox is open. */
  isOpen: boolean;
  /**
   * Fully-formed shared-layout id that MUST match the `layoutId` on the
   * originating card (e.g. `project-jam-it`). This is what makes the box
   * smoothly enlarge from its previous size to the 90% viewport modal.
   */
  layoutId: string;
  /** Active item id — drives the inner content slide on prev/next. */
  contentKey: string;
  /** Brand / accent color used to tint the navigation arrows. */
  accentColor?: string;
  /** Slide direction for content swap: 1 = next, -1 = prev. */
  direction?: number;
  /** Label shown on the top (previous) arrow pill. */
  prevLabel?: string;
  /** Label shown on the bottom (next) arrow pill. */
  nextLabel?: string;
  /** Show the navigation arrows (hidden when there is only one item). */
  showArrows?: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  children: React.ReactNode;
}

// Inner-content slide variants (used when navigating with the arrows). The
// open/close *enlarge* is handled separately by the shared `layoutId`.
// Navigation is vertical (top = previous, bottom = next) so the content slides
// vertically to match the arrow direction.
const contentVariants = {
  enter: (dir: number) => ({ opacity: 0, y: dir > 0 ? 48 : -48 }),
  center: { opacity: 1, y: 0 },
  exit: (dir: number) => ({ opacity: 0, y: dir > 0 ? -48 : 48 }),
};

// Pill style mirrored from the Experience page's vertical scroll-nudge arrows.
function arrowPillStyle(brandColor: string): React.CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 18px",
    maxWidth: "min(320px, 70vw)",
    borderRadius: "9999px",
    background: "var(--surface)",
    border: `1.5px solid ${brandColor}66`,
    boxShadow: `0 4px 18px ${brandColor}30, 0 2px 8px rgba(0,0,0,0.12)`,
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    color: "var(--text-primary)",
  };
}

export default function Lightbox({
  isOpen,
  layoutId,
  contentKey,
  accentColor = "var(--accent)",
  direction = 0,
  prevLabel,
  nextLabel,
  showArrows = true,
  onClose,
  onPrev,
  onNext,
  children,
}: LightboxProps) {
  // ── Shared-layout attachment ──────────────────────────────────────────────
  // framer-motion captures `layoutId` at mount, so the box stays attached to
  // the card it opened from for its whole session — even if the user arrow-
  // navigates to another item, closing morphs back into the ORIGINAL card.
  // That's a small visual compromise, made deliberately: the previous design
  // "detached" the box on navigation by remounting it under a different React
  // key, and a key swap on a mounted AnimatePresence child spawns a zombie
  // exiting child whose exit never completes — which blocks AnimatePresence
  // from ever unmounting ANYTHING afterwards. The invisible overlay then
  // swallowed every click on the page (the "site freezes after closing" bug).
  const wasOpenRef = useRef(false);
  const openLayoutIdRef = useRef(layoutId);

  // Render-phase capture on the opening render (before first paint), so the
  // open morph starts from the correct card.
  if (isOpen && !wasOpenRef.current) {
    openLayoutIdRef.current = layoutId;
  }

  useEffect(() => {
    wasOpenRef.current = isOpen;
  }, [isOpen]);

  // ── Failsafe: hard-reset the presence tree shortly after close ───────────
  // Belt and braces for the bug above: 800ms after closing (longer than any
  // exit animation), remount AnimatePresence by bumping its key. If some code
  // path ever leaves an invisible zombie overlay behind again, this sweeps it
  // out of the DOM instead of letting it block clicks forever. Reopening
  // cancels the pending reset, so a live session is never interrupted.
  const [presenceEpoch, setPresenceEpoch] = useState(0);
  useEffect(() => {
    if (isOpen) return;
    const timer = setTimeout(() => setPresenceEpoch((n) => n + 1), 800);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // ── Keyboard: Escape closes, ← / → navigate ──────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      // Top = previous, bottom = next — map both vertical and horizontal keys.
      if ((e.key === "ArrowUp" || e.key === "ArrowLeft") && showArrows) onPrev();
      if ((e.key === "ArrowDown" || e.key === "ArrowRight") && showArrows) onNext();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, showArrows, onClose, onPrev, onNext]);

  // ── Lock background scroll while open ─────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // Each overlay layer is a SEPARATE keyed child of AnimatePresence (never a
  // single fragment). With a fragment, one stalled exit animation anywhere in
  // the subtree kept the whole overlay — including the invisible full-screen
  // stage — mounted forever, silently blocking every click on the page (navbar
  // tabs included). As independent children, each layer unmounts on its own,
  // and the stage is pointer-events-none so it can never swallow clicks.
  return (
    <AnimatePresence key={presenceEpoch}>
      {/* ── Backdrop — grays everything out, click closes ──────────────── */}
      {isOpen && (
        <motion.div
          key="lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={onClose}
          className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm"
          aria-hidden="true"
        />
      )}

      {/* ── Centered stage — pointer-events-none, so clicks in the padding
          around the box fall through to the backdrop (which closes). ────── */}
      {isOpen && (
        <motion.div
          key="lightbox-stage"
          className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        >
          {/* The enlarging box — shares layoutId with the card it opened from,
              so it grows smoothly from that card to 90% of the viewport and
              morphs back into it on close. The key is stable for the whole
              open/close session; it is NEVER swapped while mounted (see the
              zombie-exit note above). */}
          <motion.div
            key="lightbox-box"
            layoutId={openLayoutIdRef.current}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="pointer-events-auto relative overflow-hidden rounded-3xl bg-[var(--surface)] shadow-2xl"
            style={{
              // Arrows now live on the top/bottom, freeing the horizontal
              // space so the enlarged box can be much wider.
              width: "90vw",
              height: "90vh",
              maxWidth: "1500px",
            }}
            role="dialog"
            aria-modal="true"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/10 text-[var(--text-primary)] backdrop-blur transition-colors hover:bg-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 dark:bg-white/10 dark:hover:bg-white/20"
            >
              <X size={18} />
            </button>

            {/* Scrollable content area — slides in on prev/next navigation.
                Deliberately NOT a nested AnimatePresence: a mode="wait"
                presence inside the closing overlay deadlocked the outer
                AnimatePresence's exit bookkeeping, leaving the invisible
                backdrop mounted forever and freezing all interactivity.
                A key remount with an enter-only slide keeps the directional
                cue without registering any nested exit animations.

                data-lenis-prevent: while the lightbox is open the body
                scroll-lock puts Lenis in stop(), and a STOPPED Lenis
                preventDefaults every wheel/touch event on the page — which
                silently killed two-finger scrolling inside this pane (only
                scrollbar drag worked). The attribute excludes events that
                originate here from Lenis' virtual scroll, so the pane
                scrolls natively. */}
            <div
              className="h-full w-full overflow-y-auto overflow-x-hidden"
              data-lenis-prevent
            >
              <motion.div
                key={contentKey}
                custom={direction}
                variants={contentVariants}
                initial={direction === 0 ? false : "enter"}
                animate="center"
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="min-h-full"
              >
                {children}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ── Top / bottom navigation arrows ─────────────────────────────
          Centered horizontally, floating just inside the top and bottom
          edges of the box — exactly like the Experience page's vertical
          scroll-nudge pills (chevron + label + gentle bob). Top = previous,
          bottom = next. Keeping them vertical frees the horizontal space so
          the enlarged box can be wider. ──────────────────────────────── */}
      {isOpen && showArrows && (
        <motion.div
          key="lightbox-arrow-prev"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed left-1/2 z-[110]"
          style={{ top: "calc(5vh + 12px)", x: "-50%" }}
        >
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPrev}
            style={arrowPillStyle(accentColor)}
            aria-label={prevLabel ? `Previous: ${prevLabel}` : "Previous"}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
          >
            <ChevronUp
              style={{ width: 16, height: 16, flexShrink: 0, color: accentColor }}
            />
            {prevLabel && <span className="truncate">{prevLabel}</span>}
          </motion.button>
        </motion.div>
      )}

      {isOpen && showArrows && (
        <motion.div
          key="lightbox-arrow-next"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed left-1/2 z-[110]"
          style={{ bottom: "calc(5vh + 12px)", x: "-50%" }}
        >
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            style={arrowPillStyle(accentColor)}
            aria-label={nextLabel ? `Next: ${nextLabel}` : "Next"}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
          >
            {nextLabel && <span className="truncate">{nextLabel}</span>}
            <ChevronDown
              style={{ width: 16, height: 16, flexShrink: 0, color: accentColor }}
            />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
