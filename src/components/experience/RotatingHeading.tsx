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

      {/* Animated company name — text-3xl mobile, text-5xl desktop.
          overflow: visible + break-word so long names ("Hamilton Broadcast
          Engineering, LLC") wrap to a second line and are never clipped. */}
      <div style={{ overflow: "visible" }} className="w-full">
        <AnimatePresence mode="wait">
          <motion.p
            key={companyName}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="font-display text-3xl md:text-[clamp(28px,2.9vw,42px)] font-bold leading-tight"
            style={{
              color: brandColor,
              display: "block",
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {companyName}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
