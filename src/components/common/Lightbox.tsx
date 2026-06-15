"use client";

import { useEffect } from "react";
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop — grays everything out, click closes ──────────────── */}
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

          {/* ── Centered stage (click-outside the box also closes) ─────────── */}
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            onClick={onClose}
          >
            {/* The enlarging box — shares layoutId with the originating card so
                it grows smoothly from its previous size to 90% of the viewport. */}
            <motion.div
              layoutId={layoutId}
              onClick={(e) => e.stopPropagation()}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="relative overflow-hidden rounded-3xl bg-[var(--surface)] shadow-2xl"
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
                className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/10 text-[var(--text-primary)] backdrop-blur transition-colors hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20"
              >
                <X size={18} />
              </button>

              {/* Scrollable content area — slides on prev/next navigation */}
              <div className="h-full w-full overflow-y-auto overflow-x-hidden">
                <AnimatePresence mode="wait" custom={direction} initial={false}>
                  <motion.div
                    key={contentKey}
                    custom={direction}
                    variants={contentVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="min-h-full"
                  >
                    {children}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* ── Top / bottom navigation arrows ─────────────────────────────
              Centered horizontally, floating just inside the top and bottom
              edges of the box — exactly like the Experience page's vertical
              scroll-nudge pills (chevron + label + gentle bob). Top = previous,
              bottom = next. Keeping them vertical frees the horizontal space so
              the enlarged box can be wider. ──────────────────────────────── */}
          {showArrows && (
            <>
              <div
                className="fixed left-1/2 z-[110] -translate-x-1/2"
                style={{ top: "calc(5vh + 12px)" }}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onPrev}
                      style={arrowPillStyle(accentColor)}
                      aria-label={prevLabel ? `Previous: ${prevLabel}` : "Previous"}
                    >
                      <ChevronUp
                        style={{ width: 16, height: 16, flexShrink: 0, color: accentColor }}
                      />
                      {prevLabel && <span className="truncate">{prevLabel}</span>}
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>

              <div
                className="fixed left-1/2 z-[110] -translate-x-1/2"
                style={{ bottom: "calc(5vh + 12px)" }}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onNext}
                      style={arrowPillStyle(accentColor)}
                      aria-label={nextLabel ? `Next: ${nextLabel}` : "Next"}
                    >
                      {nextLabel && <span className="truncate">{nextLabel}</span>}
                      <ChevronDown
                        style={{ width: 16, height: 16, flexShrink: 0, color: accentColor }}
                      />
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>
            </>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
