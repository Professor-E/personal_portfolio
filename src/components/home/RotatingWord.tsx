"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Typewriter verb rotator for the home hero headline — deliberately echoes
 * the intro animation's typewriter: types a word with a blinking accent
 * caret, holds, deletes it in reverse, then types the next synonym.
 *
 * Layout stability: an invisible sizer reserves the widest word's width, so
 * the centered headline never reflows while letters are typed/deleted — the
 * live word renders left-aligned on top of the reserved space.
 *
 * Accessibility: the parent <h1> carries a static aria-label; everything
 * here is aria-hidden so screen readers never hear the churn.
 * Reduced motion: the first word renders statically — no caret, no cycling.
 */

const TYPE_MS = 90; // per-character typing cadence (matches the intro's feel)
const DELETE_MS = 45; // reverse-typewriter is snappier than typing
const HOLD_FULL_MS = 2000; // dwell on the completed word
const HOLD_EMPTY_MS = 400; // beat before the next word starts

export default function RotatingWord({ words }: { words: readonly string[] }) {
  const reduceMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  // Starts at full length so SSR/first paint shows the complete first word.
  const [length, setLength] = useState(words[0].length);
  const [deleting, setDeleting] = useState(false);

  const word = words[wordIndex];
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a));

  useEffect(() => {
    if (reduceMotion) return;
    let timer: ReturnType<typeof setTimeout>;
    if (!deleting) {
      if (length < word.length) {
        timer = setTimeout(() => setLength(length + 1), TYPE_MS);
      } else {
        timer = setTimeout(() => setDeleting(true), HOLD_FULL_MS);
      }
    } else {
      if (length > 0) {
        timer = setTimeout(() => setLength(length - 1), DELETE_MS);
      } else {
        timer = setTimeout(() => {
          setWordIndex((wordIndex + 1) % words.length);
          setDeleting(false);
        }, HOLD_EMPTY_MS);
      }
    }
    return () => clearTimeout(timer);
  }, [length, deleting, wordIndex, word, words, reduceMotion]);

  if (reduceMotion) {
    return <span style={{ color: "var(--accent)" }}>{words[0]}</span>;
  }

  return (
    <span className="relative inline-block text-left" aria-hidden="true">
      {/* Invisible sizer — reserves the widest word so the line never shifts */}
      <span className="invisible">{longest}</span>
      <span
        className="absolute inset-y-0 left-0 whitespace-nowrap"
        style={{ color: "var(--accent)" }}
      >
        {word.slice(0, length)}
        <span className="rotating-caret" aria-hidden="true" />
      </span>
    </span>
  );
}
