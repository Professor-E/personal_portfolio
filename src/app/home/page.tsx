"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/home/HeroSection";
import FeaturedGrid from "@/components/home/FeaturedGrid";

// Load IntroAnimation client-only (uses sessionStorage + Framer Motion)
const IntroAnimation = dynamic(
  () => import("@/components/home/IntroAnimation"),
  { ssr: false }
);

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("intro_played")) {
        // Already played this session — skip straight to content
        setIntroComplete(true);
      } else {
        setShowIntro(true);
      }
    }
  }, []);

  function handleIntroComplete() {
    setIntroComplete(true);
    setShowIntro(false);
  }

  return (
    <>
      {/* ── Intro overlay (first visit only) ──────────────────────────── */}
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}

      {/* ── Page content — stagger-fades in after intro ─────────────── */}
      <AnimatePresence>
        {introComplete && (
          <motion.div
            key="home-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col bg-[var(--background)]"
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

            {/* Featured grid — delay 0.15s */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.15,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <FeaturedGrid />
            </motion.div>

            {/* ── Inline footer (Figma node 616:467) ─────────────────────
                bg: var(--border, #e8e7e2)  h-214px
                Only on home page — rendered here so it uses the Figma design.
                The root layout Footer is a separate, simpler component.       */}
            <motion.footer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="w-full mt-4"
              style={{ backgroundColor: "var(--border)" }}
            >
              {/* Top section */}
              <div className="flex flex-col md:flex-row items-start justify-between gap-6 px-6 py-4 max-w-[1440px] mx-auto">
                {/* Brand + socials */}
                <div className="flex flex-col gap-3">
                  <p className="font-bold text-[14px] text-[var(--text-primary)] leading-none">
                    Dominik Grzeszczak
                  </p>
                  <p className="font-medium text-[12px] text-[var(--text-secondary)] leading-none">
                    Electrical Engineering &amp; Computer Science @ MIT
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <a
                      href="https://github.com"
                      aria-label="GitHub"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                    <a
                      href="https://linkedin.com"
                      aria-label="LinkedIn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a
                      href="mailto:dominikgrzeszczak28@gmail.com"
                      aria-label="Email"
                      className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2"/>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Navigate */}
                <div className="flex flex-col gap-2.5">
                  <p className="font-bold text-[14px] text-[var(--text-primary)] leading-none">
                    Navigate
                  </p>
                  {["Experience", "Projects", "Extracurriculars", "Hobbies", "About Me"].map((label) => (
                    <p key={label} className="font-medium text-[12px] text-[var(--text-secondary)] leading-none">
                      {label}
                    </p>
                  ))}
                </div>

                {/* Get in touch */}
                <div className="flex flex-col gap-2.5">
                  <p className="font-bold text-[14px] text-[var(--text-primary)] leading-none">
                    Get in touch
                  </p>
                  <p className="font-medium text-[12px] text-[var(--text-secondary)] leading-none">
                    Feel free to reach out!
                  </p>
                  <a
                    href="mailto:dominikgrzeszczak28@gmail.com"
                    className="font-medium text-[12px] text-[var(--accent)] hover:underline leading-none"
                  >
                    dominikgrzeszczak28@gmail.com
                  </a>
                </div>
              </div>

              {/* Bottom bar */}
              <div
                className="flex items-center justify-between px-6 py-2.5 max-w-[1440px] mx-auto border-t"
                style={{ borderColor: "rgba(0,0,0,0.08)" }}
              >
                <p className="font-medium text-[12px] text-[var(--text-secondary)] leading-none">
                  © 2026 Dominik Grzeszczak · Built with React, TypeScript &amp; Tailwind
                </p>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="flex items-center gap-1 font-medium text-[12px] text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors leading-none"
                >
                  Back to top
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m18 15-6-6-6 6"/>
                  </svg>
                </button>
              </div>
            </motion.footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
