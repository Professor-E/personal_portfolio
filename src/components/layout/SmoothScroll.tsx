"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
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
 * - On route change, scroll is forced to the top immediately: Next.js resets
 *   the native scroll position, but Lenis keeps lerping toward its previous
 *   target and drags the new page partway back down. `scrollTo(0, immediate)`
 *   resets Lenis' internal target too. Browser back/forward is exempt so the
 *   browser's own scroll restoration still works.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const isPopNavRef = useRef(false);
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      anchors: { offset: -84 },
    });
    lenisRef.current = lenis;

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
      lenisRef.current = null;
    };
  }, []);

  // Back/forward navigations restore the browser's saved scroll position —
  // flag them so the route-change effect below leaves that position alone.
  useEffect(() => {
    const onPop = () => {
      isPopNavRef.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Force-scroll to the top on every forward route change (nav tabs, footer
  // links). Skipped on: initial mount (reloads restore scroll natively),
  // back/forward, and hash targets (Lenis' `anchors` handles those).
  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }
    if (isPopNavRef.current) {
      isPopNavRef.current = false;
      return;
    }
    if (window.location.hash) return;

    // `force` overrides the stopped state; `immediate` skips the lerp so the
    // new page is at its top before its entrance animations play.
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0); // reduced-motion path (no Lenis instance)
  }, [pathname]);

  return <>{children}</>;
}
