"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { EASE_OUT } from "@/lib/motion";

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
        transition={{ duration: 0.8, ease: EASE_OUT }}
      >
        {/* Layered soft glow behind the image */}
        <div
          className="rounded-full"
          style={{
            boxShadow:
              "0 0 0 12px color-mix(in srgb, var(--accent) 6%, transparent), 0 0 0 24px color-mix(in srgb, var(--accent) 3%, transparent)",
          }}
        >
          {/* Gradient ring border */}
          <div
            className="rounded-full"
            style={{
              border: "3px solid transparent",
              background:
                "linear-gradient(var(--surface), var(--surface)) padding-box, linear-gradient(135deg, var(--accent), var(--accent-hover)) border-box",
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
          transition={{ delay: 0.15, duration: 0.7, ease: EASE_OUT }}
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
          transition={{ delay: 0.4, duration: 0.75, ease: EASE_OUT }}
          className="my-4 rounded-full"
          style={{ height: "2px", backgroundColor: "var(--accent)" }}
          aria-hidden="true"
        />

        {/* Bio — Figma node 616:674, verbatim */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease: EASE_OUT }}
          className="font-normal text-[var(--text-secondary)] max-w-[597px]"
          style={{ fontSize: "18px", lineHeight: 1.6 }}
        >
          I am a sophomore at MIT studying electrical engineering and computer
          science. I enjoy building hardware and software that solves
          real-world problems. My interests include PCB design, software
          engineering, and entrepreneurship.
        </motion.p>

        {/* CTA — Figma nodes 616:676/677, verbatim. Styled to match the
            homepage "Get in touch" button: same size, weight, accent glow,
            lift-on-hover, and an arrow that nudges (down, since it downloads).
            The entrance animation lives on the wrapper so framer-motion's
            inline transform never fights the CSS hover lift on the <a>. */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7, ease: EASE_OUT }}
          className="mt-6"
        >
          <a
            href="/resume.pdf"
            download="Resume - Dominik Grzeszczak.pdf"
            className="group inline-flex items-center justify-center gap-2 font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:opacity-95 active:translate-y-0 active:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            style={{
              backgroundColor: "var(--accent)",
              borderRadius: "12px",
              height: "52px",
              padding: "0 28px",
              fontSize: "16px",
              lineHeight: 1,
              boxShadow:
                "0 8px 20px -8px color-mix(in srgb, var(--accent) 55%, transparent)",
            }}
          >
            Download Resume
            {/* No extra transform — the icon rides the button's
                -translate-y-0.5 hover lift so text and icon float up together. */}
            <Download
              size={18}
              strokeWidth={2.5}
              aria-hidden="true"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
