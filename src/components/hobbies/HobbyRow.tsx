"use client";

import { motion } from "framer-motion";
import type { Hobby } from "@/lib/constants";

interface HobbyRowProps {
  hobby: Hobby;
  index: number;
  isLast: boolean;
}

// Bottom-up overlay so the white label/name read clearly over the photo.
const IMAGE_GRADIENT =
  "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.2) 45%, transparent 100%)";

// White-on-image label tint (intentional, sits over the dark gradient).
const LABEL_WHITE = "rgba(255,255,255,0.7)";

// The site has a single --border token; nudge it toward text-secondary so the
// chip outlines read as slightly stronger than the divider rules.
const CHIP_BORDER = "color-mix(in srgb, var(--text-secondary) 30%, var(--border))";

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function HobbyRow({ hobby, index, isLast }: HobbyRowProps) {
  // Odd-indexed entries flip the image to the right (desktop only).
  const imageRight = index % 2 === 1;

  return (
    <motion.div variants={rowVariants}>
      <div
        className={`mb-8 flex flex-col gap-6 sm:flex-row ${
          imageRight ? "sm:flex-row-reverse" : ""
        }`}
      >
        {/* ── Image card ─────────────────────────────────────────────────── */}
        <div
          className="relative h-[320px] w-full overflow-hidden rounded-2xl sm:w-[52%]"
          style={{ backgroundColor: hobby.accentColor }}
        >
          {/* Inner content scales on hover; the container clips it (no layout
              shift). Drop a real photo in here later, e.g.:
              <Image src={hobby.imagePath} alt={hobby.name} fill className="object-cover" /> */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: hobby.accentColor }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <span className="select-none text-5xl font-medium text-white opacity-50">
              {hobby.monogram}
            </span>
          </motion.div>

          {/* Gradient overlay — stays fixed while the block beneath zooms */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: IMAGE_GRADIENT }}
            aria-hidden="true"
          />

          {/* Bottom overlay text */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p
              className="mb-1 font-medium uppercase tracking-widest"
              style={{ fontSize: "11px", color: LABEL_WHITE }}
            >
              {hobby.category}
            </p>
            <p
              className="font-medium leading-tight text-white"
              style={{ fontSize: "24px" }}
            >
              {hobby.name}
            </p>
          </div>
        </div>

        {/* ── Text panel ─────────────────────────────────────────────────── */}
        <div className="flex flex-1 flex-col justify-center">
          {/* Accent line ties the panel to the card's color identity */}
          <div
            className="mb-4 h-[2px] w-8"
            style={{ backgroundColor: hobby.accentColor }}
            aria-hidden="true"
          />

          <h2
            className="mb-2 font-medium leading-snug text-[var(--text-primary)]"
            style={{ fontSize: "22px" }}
          >
            {hobby.name}
          </h2>

          <p
            className="mb-4 italic leading-relaxed text-[var(--text-secondary)]"
            style={{ fontSize: "14px" }}
          >
            {hobby.tagline}
          </p>

          <p
            className="mb-5 leading-relaxed text-[var(--text-secondary)]"
            style={{ fontSize: "14px" }}
          >
            {hobby.description}
          </p>

          {hobby.chips.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {hobby.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border px-3 py-1 text-[var(--text-secondary)]"
                  style={{ fontSize: "11px", borderColor: CHIP_BORDER }}
                >
                  {chip}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {!isLast && (
        <hr className="my-8 border-t" style={{ borderColor: "var(--border)" }} />
      )}
    </motion.div>
  );
}
