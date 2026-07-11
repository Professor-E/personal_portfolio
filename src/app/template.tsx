"use client";

import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

/**
 * Route template — remounts on EVERY client navigation (unlike layout), so
 * each incoming page plays a short curtain reveal: a surface-colored panel
 * covers the viewport and slides down off-screen (echoing the intro
 * animation's slide-down exit) while the page content fades in beneath it.
 *
 * Transform-safety: the CONTENT wrapper animates opacity only — a transform,
 * clip-path, or filter on it would turn it into the containing block for the
 * pages' `position: fixed` overlays (lightboxes, nav pills) and break their
 * positioning. The curtain is a separate fixed element animating its own
 * transform, which is safe.
 *
 * The homepage is bypassed: it manages its own cold-open intro splash
 * (see RootLayout) and typewriter reveal. Reduced-motion renders the page
 * plainly with no curtain and no fade.
 */

// Slightly-accelerating in, long smooth landing — the classic curtain ease.
const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const;

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const isHome = pathname === "/" || pathname === "/home" || pathname === "/home/";

  if (isHome || reduceMotion) return <>{children}</>;

  return (
    <>
      {/* Content — opacity only (see transform-safety note above). */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.08, ease: EASE_OUT }}
      >
        {children}
      </motion.div>

      {/* Curtain — covers the viewport at mount, slides down and away. Its
          top (leading) edge carries a hairline accent sweep. 101% overshoot
          guarantees the hairline fully clears the bottom edge. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[80]"
        style={{ backgroundColor: "var(--surface)" }}
        initial={{ y: 0 }}
        animate={{ y: "101%" }}
        transition={{ duration: 0.55, ease: CURTAIN_EASE }}
      >
        <div
          className="absolute left-0 right-0 top-0"
          style={{
            height: "2px",
            background:
              "linear-gradient(90deg, transparent, var(--accent), transparent)",
          }}
        />
      </motion.div>
    </>
  );
}
