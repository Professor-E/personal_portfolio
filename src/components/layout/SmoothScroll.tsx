"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Site-wide smooth scrolling (Lenis) synced to GSAP ScrollTrigger.
 *
 * - Skipped entirely under `prefers-reduced-motion` — native scrolling stays,
 *   matching the site-wide reduced-motion contract in globals.css.
 * - Existing overlays (IntroAnimation, Lightbox) lock scroll by setting
 *   `body { overflow: hidden }`. A MutationObserver mirrors that lock into
 *   `lenis.stop()/start()`, so those components keep working unchanged and
 *   never need to know Lenis exists.
 * - Lenis is driven from the GSAP ticker (one shared RAF) per the Lenis docs,
 *   so ScrollTrigger animations and the smoothed scroll position never drift.
 * - `anchors` handles same-page links (the hero's "View my work" →
 *   #recent-work) with the 70px fixed navbar accounted for.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      anchors: { offset: -84 },
    });

    const syncScrollTrigger = () => ScrollTrigger.update();
    lenis.on("scroll", syncScrollTrigger);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Mirror body scroll locks (intro overlay, lightboxes) into Lenis.
    const syncLock = () => {
      if (document.body.style.overflow === "hidden") lenis.stop();
      else lenis.start();
    };
    syncLock();
    const observer = new MutationObserver(syncLock);
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });

    return () => {
      observer.disconnect();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
