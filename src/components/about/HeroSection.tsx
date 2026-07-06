"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Hero section — content locked to Figma node 616:671 (text verbatim).
 * Visual redesign: headshot LEFT with gradient ring + layered glow,
 * text RIGHT with animated accent line. Staggered page-load animation.
 *
 * Figma text strings (verbatim):
 *   H1  (616:673): "Electrical Engineer, Computer Scientist, Builder, and Problem Solver."
 *   Bio (616:674): "I am a sophomore at MIT studying electrical engineering..."
 *   CTA (616:677): "Download Resume"
 * Headshot (616:679): 355×355px circle.
 */
export default function HeroSection() {
  return (
    <section
      className="flex flex-col md:flex-row items-center gap-12 md:gap-[60px] w-full"
      aria-label="About Me hero"
    >
      {/* ── Headshot — LEFT, slides in from the left ─────────────────────── */}
      <motion.div
        className="shrink-0"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Layered soft glow behind the image */}
        <div
          className="rounded-full"
          style={{
            boxShadow:
              "0 0 0 12px rgba(59,130,246,0.06), 0 0 0 24px rgba(99,102,241,0.03)",
          }}
        >
          {/* Gradient ring border */}
          <div
            className="rounded-full"
            style={{
              border: "3px solid transparent",
              background:
                "linear-gradient(var(--surface), var(--surface)) padding-box, linear-gradient(135deg, #3B82F6, #6366F1) border-box",
            }}
          >
            <Image
              src="/images/headshot.png"
              alt="Dominik Grzeszczak"
              width={355}
              height={355}
              priority
              className="rounded-full block"
              style={{
                /* Exact Figma size (355px); shrinks only on very narrow
                   viewports to avoid overflow at 375px. */
                width: "min(355px, calc(100vw - 96px))",
                height: "auto",
                aspectRatio: "1 / 1",
                objectFit: "cover",
                objectPosition: "center top",
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* ── Text block — RIGHT ───────────────────────────────────────────── */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 min-w-0">
        {/* Heading — Figma node 616:673, verbatim */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-medium text-[var(--text-primary)]"
          style={{ fontSize: "clamp(28px, 3.5vw, 48px)", lineHeight: "normal" }}
        >
          Electrical Engineer, Computer Scientist, Builder, and Problem
          Solver.
        </motion.h1>

        {/* Accent line — width animates 0 → 48px */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 48 }}
          transition={{ delay: 0.4, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="my-4 rounded-full"
          style={{ height: "2px", backgroundColor: "var(--accent)" }}
          aria-hidden="true"
        />

        {/* Bio — Figma node 616:674, verbatim */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-normal text-[var(--text-secondary)] max-w-[597px]"
          style={{ fontSize: "18px", lineHeight: 1.6 }}
        >
          I am a sophomore at MIT studying electrical engineering and computer
          science. I enjoy building hardware and software that solves
          real-world problems. My interests include PCB design, software
          engineering, and entrepreneurship.
        </motion.p>

        {/* CTA — Figma nodes 616:676/677, verbatim */}
        {/* TODO: point href at the actual resume file when available */}
        <motion.a
          href="/resume.pdf"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center font-medium text-white transition-opacity hover:opacity-85 active:opacity-75 mt-6"
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
        </motion.a>
      </div>
    </section>
  );
}
