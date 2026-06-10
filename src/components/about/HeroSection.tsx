"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Hero / intro section — Figma node 616:671
 *
 * Layout (Figma exact):
 *   flex row, gap: 60px, py: 80px, items-center
 *   LEFT  — text block (node 616:672): flex-col gap-14px, w-910px
 *     – H1 (616:673): Inter SemiBold 48px, text-primary
 *     – Bio (616:674): Inter Medium 18px, line-height 28px, text-secondary, w-597px
 *     – Button (616:676/677): "Download Resume" — bg text-primary,
 *       rounded-10px, h-49px, p-20px, Inter Medium 14px, white
 *   RIGHT — headshot (node 616:679): 355×355px, circular, no ring/shadow
 *
 * Mobile: stacks with headshot above text (flex-col-reverse).
 */
export default function HeroSection() {
  return (
    <motion.section
      className="flex flex-col-reverse md:flex-row items-center gap-[60px] py-[80px] w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      aria-label="About Me hero"
    >
      {/* ── Left: text block (node 616:672) ─────────────────────────────── */}
      <motion.div
        className="flex flex-col gap-[14px] items-start flex-1 min-w-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
      >
        {/* H1 — node 616:673: Inter SemiBold 48px text-primary */}
        <h1
          className="font-semibold text-[var(--text-primary)]"
          style={{ fontSize: "clamp(28px, 3.5vw, 48px)", lineHeight: "normal" }}
        >
          Electrical Engineer, Computer Scientist, Builder, and Problem
          Solver.
        </h1>

        {/* Bio — node 616:674: Inter Medium 18px lh-28px text-secondary w-597px */}
        <p
          className="font-medium text-[var(--text-secondary)] max-w-[597px]"
          style={{ fontSize: "18px", lineHeight: "28px" }}
        >
          I am a sophomore at MIT studying electrical engineering and computer
          science. I enjoy building hardware and software that solves
          real-world problems. My interests include PCB design, software
          engineering, and entrepreneurship.
        </p>

        {/* Button — nodes 616:676/677: bg text-primary, rounded-10px, h-49px,
            p-20px, Inter Medium 14px, white */}
        {/* TODO: point href at the actual resume file when available */}
        <a
          href="/resume.pdf"
          className="flex items-center justify-center font-medium text-white transition-opacity hover:opacity-85 active:opacity-75"
          style={{
            backgroundColor: "var(--text-primary)",
            borderRadius: "10px",
            height: "49px",
            padding: "20px",
            fontSize: "14px",
            lineHeight: 1,
          }}
        >
          Download Resume
        </a>
      </motion.div>

      {/* ── Right: headshot (nodes 616:678/679) — 355×355px circle ──────── */}
      <motion.div
        className="shrink-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
      >
        <Image
          src="/images/headshot.png"
          alt="Dominik Grzeszczak"
          width={355}
          height={355}
          className="rounded-full"
          style={{
            /* Exact Figma size (355×355) on desktop; shrinks only when the
               viewport is too narrow (e.g. 375px mobile) to avoid overflow. */
            width: "min(355px, calc(100vw - 48px))",
            height: "auto",
            aspectRatio: "1 / 1",
            objectFit: "cover",
            objectPosition: "center top",
          }}
          priority
        />
      </motion.div>
    </motion.section>
  );
}
