"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";

/**
 * Hero section — Figma node 616:505
 * Layout: flex-col items-center justify-center, min-h-492px
 * Horizontal padding: px-8 md:px-16 lg:px-24 — sitewide standard (Projects page
 * reference), matching FeaturedGrid directly below on this same page.
 */
export default function HeroSection() {
  return (
    <section
      className="flex flex-col items-center justify-center gap-7 pt-12 pb-4 min-h-[492px]"
      aria-label="Hero"
    >
      {/* ── Display headline — locked to two lines on desktop ──────────── */}
      {/* Inter Medium, text-primary, text-center. The font scale is nudged
          down slightly from the original 64px cap so the line breaks cleanly
          into exactly two balanced lines ("…and practice." on line two). */}
      <h1
        className="font-medium text-[var(--text-primary)] text-center leading-[1.05] max-w-[1250px] px-8 md:px-16 lg:px-24"
        style={{
          fontSize: "clamp(30px, 5vw, 58px)",
          textWrap: "balance",
          letterSpacing: "var(--tracking-display)",
        }}
      >
        Hello, I&apos;m Dominik — I build things{" "}
        <br className="hidden md:block" />
        that bridge theory and practice.
      </h1>

      {/* ── Subtitle ──────────────────────────────────────────────────── */}
      {/* Body-large: regular weight, relaxed leading for a calm, minimal feel */}
      <p
        className="font-normal text-[var(--text-secondary)] text-center max-w-[620px] px-8 md:px-16 lg:px-24"
        style={{ fontSize: "clamp(16px, 1.6vw, 20px)", lineHeight: 1.6 }}
      >
        Electronics, software, and a constant quench for knowledge. Here&apos;s
        a look at the work I&apos;m most proud of.
      </p>

      {/* ── CTA row — primary button + quiet secondary link ───────────── */}
      {/* Both CTAs get a gentle magnetic pull toward the pointer (desktop
          only — see ui/Magnetic.tsx). The wrapper moves; the buttons' own
          hover lift still composes on top. */}
      <div className="mt-1 flex flex-col sm:flex-row items-center gap-5 sm:gap-7">
        <Magnetic>
        <Link
          href="/contact"
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
          Get in touch
          <ArrowRight
            size={18}
            strokeWidth={2.5}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
        </Magnetic>

        {/* Secondary — solid black (inverts in dark mode) button that scrolls
            to the Recent Work grid. Same size/lift as the primary CTA, but a
            neutral fill so the accent button stays the loudest element. */}
        <Magnetic>
        <a
          href="#recent-work"
          className="group inline-flex items-center justify-center gap-2 font-bold text-[var(--background)] transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 active:translate-y-0 active:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          style={{
            backgroundColor: "var(--text-primary)",
            borderRadius: "12px",
            height: "52px",
            padding: "0 28px",
            fontSize: "16px",
            lineHeight: 1,
            boxShadow: "0 8px 20px -8px rgba(0, 0, 0, 0.35)",
          }}
        >
          View my work
        </a>
        </Magnetic>
      </div>
    </section>
  );
}
