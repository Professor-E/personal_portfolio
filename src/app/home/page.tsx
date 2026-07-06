"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/home/HeroSection";
import CompanyScroll from "@/components/home/CompanyScroll";
import FeaturedGrid from "@/components/home/FeaturedGrid";
import { EASE_OUT } from "@/lib/motion";

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
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="flex flex-col bg-[var(--background)] pb-8"
          >
            {/* ── First viewport — hero centered, marquee pinned to the very
                bottom of the screen. calc(100vh - 70px) matches the fixed
                navbar offset (see globals.css `main { padding-top: 70px }`)
                so this block occupies exactly one full screen, and the user
                has to scroll to reach "Recent Work" below. ─────────────── */}
            <div className="flex flex-col" style={{ minHeight: "calc(100vh - 70px)" }}>
              {/* Hero — delay 0. flex-1 fills the space above the marquee and
                  centers the hero content vertically within it. Same fade+rise
                  shape (y: 20, 0.6s) used for every page's entrance animation. */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0,
                  duration: 0.6,
                  ease: EASE_OUT,
                }}
                className="flex-1 flex items-center justify-center"
              >
                <HeroSection />
              </motion.div>

              {/* Company / institution marquee — delay 0.15s, pinned to the
                  bottom of the first viewport, full width. */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.15,
                  duration: 0.6,
                  ease: EASE_OUT,
                }}
              >
                <CompanyScroll />
              </motion.div>
            </div>

            {/* Featured grid — no outer wrapper here. FeaturedGrid drives its
                own reveal per row (fades in on load if already on screen,
                fades in on scroll otherwise) so it isn't double-animated. */}
            <FeaturedGrid />
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
