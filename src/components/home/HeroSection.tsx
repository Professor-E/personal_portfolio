"use client";

import Link from "next/link";

/**
 * Hero section — Figma node 616:505
 * Layout: flex-col gap-24px items-center justify-center pt-48px min-h-492px
 */
export default function HeroSection() {
  return (
    <section
      className="flex flex-col items-center justify-center gap-6 pt-12 pb-4 min-h-[492px]"
      aria-label="Hero"
    >
      {/* ── Display headline (Figma node 616:506) ─────────────────────── */}
      {/* Inter Medium 64px, text-primary, text-center, max-w ~1030px     */}
      <h1
        className="font-medium text-[var(--text-primary)] text-center leading-none max-w-[1030px] px-6 md:px-12 lg:px-20"
        style={{ fontSize: "clamp(32px, 5.5vw, 64px)" }}
      >
        Hello, I&apos;m Dominik — I build things that bridge theory and practice.
      </h1>

      {/* ── Subtitle ──────────────────────────────────────────────────── */}
      {/* Body-large: regular weight, relaxed leading for a calm, minimal feel */}
      <p
        className="font-normal text-[var(--text-secondary)] text-center max-w-[620px] px-6 md:px-12 lg:px-20"
        style={{ fontSize: "clamp(16px, 1.6vw, 20px)", lineHeight: 1.6 }}
      >
        Electronics, software, and a constant quench for knowledge. Here&apos;s
        a look at the work I&apos;m most proud of.
      </p>

      {/* ── CTA Button (Figma node 616:508) ───────────────────────────── */}
      {/* bg-accent, rounded-20px, h-70px, w-232px, Inter Bold 24px, white */}
      <Link
        href="/contact"
        className="flex items-center justify-center font-bold text-[var(--surface)] transition-opacity hover:opacity-90 active:opacity-80"
        style={{
          backgroundColor: "var(--accent)",
          borderRadius: "20px",
          height: "70px",
          width: "232px",
          fontSize: "24px",
          lineHeight: 1,
        }}
      >
        Get in touch
      </Link>
    </section>
  );
}
