"use client";

import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

/**
 * Route template — remounts on EVERY client navigation (unlike layout), so
 * each incoming page plays a short, quiet fade-in.
 *
 * Transform-safety: the wrapper animates opacity ONLY — a transform,
 * clip-path, or filter on it would turn it into the containing block for the
 * pages' `position: fixed` overlays (lightboxes, nav pills) and break their
 * positioning.
 *
 * The homepage is bypassed: it manages its own cold-open intro splash
 * (see RootLayout) and typewriter reveal. Reduced-motion renders the page
 * plainly with no fade.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const isHome = pathname === "/" || pathname === "/home" || pathname === "/home/";

  if (isHome || reduceMotion) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
