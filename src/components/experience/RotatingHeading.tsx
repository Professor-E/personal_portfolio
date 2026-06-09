"use client";

import { motion, AnimatePresence } from "framer-motion";

interface RotatingHeadingProps {
  companyName: string;
  brandColor: string;
}

/**
 * Sticky page heading — redesigned per spec
 *
 * "My Experience with"  — text-2xl (24px), font-normal, text-secondary
 * "[Company Name]"      — text-5xl desktop (48px) / text-3xl mobile (30px), font-bold, brandColor
 *
 * Positioning (padding-left, max-width, sticky top) is handled by the parent wrapper.
 * This component is purely the text content + animation.
 */
export default function RotatingHeading({ companyName, brandColor }: RotatingHeadingProps) {
  return (
    <div className="flex flex-col items-start">
      {/* Static line — text-2xl, font-normal, secondary color */}
      <p className="text-2xl font-normal text-[var(--text-secondary)] leading-tight whitespace-nowrap">
        My Experience with
      </p>

      {/* Animated company name — text-3xl mobile, text-5xl desktop */}
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={companyName}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-bold leading-tight"
            style={{ color: brandColor }}
          >
            {companyName}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
