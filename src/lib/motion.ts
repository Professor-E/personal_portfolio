/**
 * Canonical motion values — the single source of truth for the site's
 * entrance animations. Every non-Experience component imports these instead
 * of re-declaring the easing array / variants inline.
 *
 * (The Experience page keeps its own local copies by design — it is frozen.)
 */

/** Site-standard ease-out curve used by every entrance animation. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Standard entrance durations (seconds). */
export const DURATION = {
  fast: 0.3,
  base: 0.6,
  slow: 0.7,
} as const;

/** The canonical fade + rise entrance shape (0.6s). */
export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT },
  },
} as const;
