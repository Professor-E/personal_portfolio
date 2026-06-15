"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Hero section — Figma node 616:505
 * Layout: flex-col items-center justify-center, min-h-492px
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
        className="font-medium text-[var(--text-primary)] text-center leading-[1.05] max-w-[1250px] px-6"
        style={{ fontSize: "clamp(30px, 5vw, 58px)", textWrap: "balance" }}
      >
        Hello, I&apos;m Dominik — I build things{" "}
        <br className="hidden md:block" />
        that bridge theory and practice.
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

      {/* ── CTA Button — compact, refined ─────────────────────────────── */}
      <Link
        href="/contact"
        className="group mt-1 inline-flex items-center justify-center gap-2 font-bold text-[var(--surface)] transition-all duration-200 hover:-translate-y-0.5 hover:opacity-95 active:translate-y-0 active:opacity-90"
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
    </section>
  );
}
