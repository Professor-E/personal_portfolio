"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ExpandedViewProps {
  bullets: string[];
  isExpanded: boolean;
  brandColor: string;
  onCollapse: () => void;
}

/**
 * Expandable detail area beneath an ExperienceEntry.
 * Animates height from 0 → auto and opacity 0 → 1 when expanded.
 * Shows all bullet points from the description array.
 */
export default function ExpandedView({
  bullets,
  isExpanded,
  brandColor,
  onCollapse,
}: ExpandedViewProps) {
  return (
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          key="expanded"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="pt-4 pb-2 px-[10px]">
            {/* Bullet list */}
            <ul className="flex flex-col gap-3">
              {bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3"
                >
                  {/* Brand color bullet dot */}
                  <span
                    className="mt-[7px] shrink-0 rounded-full"
                    style={{
                      width: "6px",
                      height: "6px",
                      backgroundColor: brandColor,
                    }}
                  />
                  <span
                    className="font-normal text-[var(--text-secondary)]"
                    style={{ fontSize: "18px", lineHeight: 1.6 }}
                  >
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>

            {/* Show Less button */}
            <button
              onClick={onCollapse}
              className="mt-4 font-bold text-[16px] text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
            >
              Show Less ↑
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
