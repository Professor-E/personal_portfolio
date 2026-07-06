"use client";

import HeroSection from "./HeroSection";
import AcademicsSection from "./AcademicsSection";
import SkillsSection from "./SkillsSection";

/**
 * AboutPage — main container.
 *
 * Content locked to Figma node 616:669; Skills & Tools added here after being
 * moved off the Experience page. Section order:
 *   1. Hero (Figma) → 2. Skills & Tools (moved) → 3. Academics (Figma)
 *
 * Each section animates itself (hero on load, the rest via whileInView).
 * No page-level title header — the hero heading leads the page directly.
 */
export default function AboutPage() {
  return (
    // Wider gutters than other pages so the About content doesn't feel scrunched
    <main className="max-w-6xl mx-auto px-12 md:px-24 lg:px-36 pt-24 pb-32 space-y-24 bg-[var(--background)]">
      <HeroSection />
      <SkillsSection />
      <AcademicsSection />
    </main>
  );
}
