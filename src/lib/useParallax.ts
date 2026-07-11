"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Scroll-scrubbed parallax for an element inside an `overflow-hidden` frame.
 *
 * The referenced element drifts from -strength → +strength px vertically as
 * its parent travels through the viewport, scrubbed to scroll position (via
 * ScrollTrigger, which SmoothScroll keeps in sync with Lenis). Pair with a
 * slight over-scale on the element (e.g. `scale(1.12)`) so the drift never
 * exposes the frame's edges — GSAP preserves that scale while animating `y`.
 *
 * No-op under `prefers-reduced-motion`.
 */
export function useParallax<T extends HTMLElement>(strength = 24) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -strength },
        {
          y: strength,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, [strength]);

  return ref;
}

export { ScrollTrigger };
