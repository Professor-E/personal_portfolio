"use client";

import HeroSection from "./HeroSection";
import AcademicsSection from "./AcademicsSection";
import SkillsSection from "./SkillsSection";
import MemoriesSection from "./MemoriesSection";

/**
 * AboutPage — main container.
 *
 * Content locked to Figma node 616:669; Skills & Tools added here after being
 * moved off the Experience page. Section order:
 *   1. Hero (Figma) → 2. Academics (Figma) → 3. Skills & Tools (moved)
 *   → 4. Memories (Figma)
 *
 * Each section animates itself (hero on load, the rest via whileInView).
 */
export default function AboutPage() {
  return (
    // Container normalized to match Projects page: max-w-5xl px-8 md:px-16 lg:px-24
    <main className="max-w-5xl mx-auto px-8 md:px-16 lg:px-24 pt-16 pb-24 space-y-24 bg-[var(--background)]">
      <HeroSection />
      <AcademicsSection />
      <SkillsSection />
      <MemoriesSection />
    </main>
  );
}
