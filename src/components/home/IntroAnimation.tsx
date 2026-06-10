"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroAnimationProps {
  onComplete: () => void;
}

/**
 * Full-screen intro overlay.
 * Sequence (total ~2.9s):
 *   0.0 – 0.4s  — overlay fades in
 *   0.4 – 1.4s  — name reveals upward (y 20→0, opacity 0→1)
 *   1.4 – 1.9s  — subtitle fades in
 *   1.9 – 2.4s  — horizontal accent line expands (scaleX 0→1)
 *   2.4 – 2.9s  — overlay fades out → onComplete fires → component unmounts
 */
export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [visible, setVisible] = useState(true);

  // Lock scroll immediately so the footer cannot be seen below the overlay
  // while the intro is playing. Cleaned up both on unmount and on exit.
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.style.overflow = "hidden";
    }
    return () => {
      if (typeof window !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, []);

  useEffect(() => {
    // Begin exit animation at 2.4s; AnimatePresence exit duration = 0.5s
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  function handleExitComplete() {
    if (typeof window !== "undefined") {
      document.body.style.overflow = "";
      sessionStorage.setItem("intro_played", "true");
    }
    onComplete();
  }

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          key="intro-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: "var(--text-primary)" }}
        >
          {/* ── Name — upward reveal, delay 0.4s ─────────────────────── */}
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.4,
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[var(--surface)] text-center font-medium leading-none"
              style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
            >
              Dominik Grzeszczak
            </motion.p>
          </div>

          {/* ── Subtitle — fade in, delay 1.4s ───────────────────────── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5, ease: "easeOut" }}
            className="mt-4 text-[var(--text-secondary)] text-center font-semibold"
            style={{ fontSize: "clamp(14px, 2vw, 18px)" }}
          >
            Electrical Engineering &amp; Computer Science · MIT &apos;28
          </motion.p>

          {/* ── Accent line — scaleX expand from center, delay 1.9s ───── */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 1.9, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              transformOrigin: "center",
              backgroundColor: "var(--accent)",
              height: "2px",
              width: "clamp(180px, 30vw, 320px)",
              marginTop: "24px",
              borderRadius: "1px",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
