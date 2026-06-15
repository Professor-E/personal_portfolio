"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroAnimationProps {
  /** Fires the moment the panel begins sliding down — mount + fade in the
   *  homepage beneath the overlay so it is revealed *as* the panel slides. */
  onReveal: () => void;
  /** Fires once the panel has fully slid off-screen and the overlay unmounts. */
  onComplete: () => void;
}

const FULL_NAME = "Dominik Grzeszczak";
const START_DELAY_MS = 350; // beat before typing begins (gray screen shows first)
const TYPE_SPEED_MS = 85; // per-character typing cadence
const HOLD_AFTER_TYPE_MS = 650; // pause on the finished name before the reveal

/**
 * Full-screen intro overlay (first visit / fresh load only).
 *
 * Sequence:
 *   1. Dark-gray panel is on screen immediately.
 *   2. Typewriter types "Dominik Grzeszczak" with a blinking caret.
 *   3. Short hold, then the whole panel slides DOWN off the bottom edge.
 *   4. As it slides, the homepage is revealed and its content fades in.
 */
export default function IntroAnimation({ onReveal, onComplete }: IntroAnimationProps) {
  const [typed, setTyped] = useState("");
  const [visible, setVisible] = useState(true);

  // Lock scroll while the overlay is up so nothing peeks below it.
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

  // Typewriter — reveal one character at a time after a short initial beat.
  useEffect(() => {
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const startTimer = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setTyped(FULL_NAME.slice(0, i));
        if (i >= FULL_NAME.length && interval) clearInterval(interval);
      }, TYPE_SPEED_MS);
    }, START_DELAY_MS);

    return () => {
      clearTimeout(startTimer);
      if (interval) clearInterval(interval);
    };
  }, []);

  // Once the name is fully typed, hold briefly then start the slide-down reveal.
  useEffect(() => {
    if (typed.length !== FULL_NAME.length) return;
    const timer = setTimeout(() => {
      onReveal(); // homepage mounts + fades in beneath the panel
      setVisible(false); // panel begins sliding down over it
    }, HOLD_AFTER_TYPE_MS);
    return () => clearTimeout(timer);
  }, [typed, onReveal]);

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
          initial={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: "var(--text-primary)" }}
        >
          {/* Name typed out — same display typography as the home hero h1 */}
          <p
            className="text-[var(--surface)] text-center font-medium leading-none px-6"
            style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
          >
            {typed}
            {/* Blinking caret */}
            <motion.span
              aria-hidden="true"
              className="inline-block"
              style={{
                width: "0.06em",
                marginLeft: "0.06em",
                height: "0.95em",
                verticalAlign: "text-bottom",
                backgroundColor: "var(--accent)",
              }}
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
                times: [0, 0.5, 0.5, 1],
              }}
            />
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
