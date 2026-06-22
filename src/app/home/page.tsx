"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/home/HeroSection";
import CompanyScroll from "@/components/home/CompanyScroll";
import FeaturedGrid from "@/components/home/FeaturedGrid";

// Load IntroAnimation client-only (uses sessionStorage + Framer Motion)
const IntroAnimation = dynamic(
  () => import("@/components/home/IntroAnimation"),
  { ssr: false }
); 

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(false);
  // `revealContent` mounts + fades in the homepage. It flips the moment the
  // intro panel STARTS sliding down, so the content is revealed *as* it slides.
  const [revealContent, setRevealContent] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("intro_played")) {
        // Already played this session — skip straight to content
        setRevealContent(true);
      } else {
        setShowIntro(true);
      }
    }
  }, []);

  return (
    <>
      {/* ── Intro overlay (first visit only) ──────────────────────────── */}
      {showIntro && (
        <IntroAnimation
          onReveal={() => setRevealContent(true)}
          onComplete={() => setShowIntro(false)}
        />
      )}

      {/* ── Page content ─────────────────────────────────────────────── */}
      {revealContent ? (
        <AnimatePresence>
          <motion.div
            key="home-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col bg-[var(--background)] pb-8"
          >
            {/* Hero — delay 0 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <HeroSection />
            </motion.div>

            {/* Company / institution marquee — delay 0.15s, above featured work */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.15,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <CompanyScroll />
            </motion.div>

            {/* Featured grid — delay 0.3s */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <FeaturedGrid />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      ) : (
        /*
         * Placeholder — fills the viewport while the intro plays or before
         * hydration completes. This keeps the footer below the fold so it
         * is never visible through / around the intro overlay.
         */
        <div
          aria-hidden="true"
          style={{
            minHeight: "calc(100vh - 70px)",
            backgroundColor: "var(--background)",
          }}
        />
      )}
    </>
  );
}
