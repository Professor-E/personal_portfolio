"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

/**
 * Route template — remounts on EVERY client navigation (unlike layout), so the
 * incoming page always starts fully transparent and fades in. This masks the
 * occasional glitch where a page's content painted at full opacity for a frame
 * before its own entrance animations reset it to hidden and replayed.
 *
 * Opacity only — no transform. A transform on this wrapper would turn it into
 * the containing block for the pages' `position: fixed` overlays (lightboxes,
 * nav pills) and break their positioning.
 *
 * The homepage is bypassed entirely: it manages its own cold-open intro splash
 * (see RootLayout) and is protected from side effects.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/home" || pathname === "/home/";

  if (isHome) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
