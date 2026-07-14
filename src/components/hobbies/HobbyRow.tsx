"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Hobby } from "@/lib/constants";
import { fadeUp } from "@/lib/motion";

interface HobbyRowProps {
  hobby: Hobby;
  index: number;
  isLast: boolean;
}

// Bottom-up overlay so the white name reads clearly over the photo.
const IMAGE_GRADIENT =
  "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.2) 45%, transparent 100%)";

// Rows already on screen when the page loads (even partially cut off) fade in
// immediately; rows further down fade in — all together, no stagger — the
// moment they're scrolled into view (see `whileInView` below).
const rowVariants = fadeUp;

export default function HobbyRow({ hobby, index, isLast }: HobbyRowProps) {
  // Odd-indexed entries flip the image to the right (desktop only).
  const imageRight = index % 2 === 1;

  // Contained images (e.g. the book cover) can override the card backdrop so
  // their letterboxed margins read as white instead of the accent color.
  const cardBackground =
    "imageBackground" in hobby && hobby.imageBackground
      ? hobby.imageBackground
      : hobby.accentColor;

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: "some" }}
      variants={rowVariants}
    >
      <div
        className={`flex flex-col gap-6 sm:flex-row sm:gap-10 ${
          imageRight ? "sm:flex-row-reverse" : ""
        }`}
      >
        {/* ── Image card ─────────────────────────────────────────────────── */}
        <div
          className="relative h-[320px] w-full overflow-hidden rounded-2xl sm:w-[52%] shadow-[shadow:var(--shadow-md)]"
          style={{ backgroundColor: cardBackground }}
        >
          {/* Inner content scales on hover; the container clips it (no layout
              shift). Falls back to the monogram when no photo is provided. */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: cardBackground }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Every hobby currently has a real photo, but the check is kept
                (via Boolean(), so TS doesn't narrow the fallback to `never`)
                so a future hobby without an image still degrades gracefully. */}
            {Boolean(hobby.imagePath) ? (
              <Image
                src={hobby.imagePath}
                alt={hobby.name}
                fill
                sizes="(max-width: 640px) 100vw, 52vw"
                className={
                  "imageFit" in hobby && hobby.imageFit === "contain"
                    ? "object-contain"
                    : "object-cover"
                }
              />
            ) : (
              <span className="select-none text-5xl font-medium text-white opacity-50">
                {hobby.monogram}
              </span>
            )}
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
            className="mb-2 font-semibold leading-snug text-[var(--text-primary)]"
            style={{ fontSize: "24px" }}
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
            className="leading-relaxed text-[var(--text-secondary)]"
            style={{ fontSize: "14px" }}
          >
            {hobby.description}
          </p>
        </div>
      </div>

      {!isLast && (
        <hr className="my-10 border-t" style={{ borderColor: "var(--border)" }} />
      )}
    </motion.div>
  );
}
