"use client";

import { motion } from "framer-motion";
import HeroSection from "./HeroSection";
import AcademicsSection from "./AcademicsSection";
import MemoriesSection from "./MemoriesSection";

/**
 * AboutPage — main container — Figma node 616:669
 *
 * Page layout (Figma exact):
 *   bg-[var(--background)], flex-col, gap-16px, items-center, px-24px
 *
 * Section order (only what Figma shows):
 *   1. Hero  (node 616:671) — text left, headshot right
 *   2. Academics (node 616:680) — High School + College cards
 *   3. Memories (node 616:699) — heading + empty photos frame
 *
 * Page entry animation: opacity 0→1, y 20→0, 0.5s ease-out
 */

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function AboutPage() {
  return (
    <motion.main
      className="flex flex-col items-center gap-[16px] px-[24px] bg-[var(--background)] min-h-screen"
      variants={pageVariants}
      initial="hidden"
      animate="show"
    >
      <HeroSection />
      <AcademicsSection />
      <MemoriesSection />
    </motion.main>
  );
}
