"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Custom cursor follower — a small blend-mode dot that trails the pointer and
 * grows over interactive elements. The native cursor stays visible (the dot is
 * an accent, not a replacement), so usability never regresses.
 *
 * Desktop-only: mounts inert unless the device has a fine pointer, and skips
 * entirely under `prefers-reduced-motion`. The dot uses
 * `mix-blend-mode: difference`, so it stays visible on light and dark themes
 * and over any brand color without referencing a specific token.
 */
const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], input, select, textarea, label, [data-cursor='grow']";

export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const xTo = gsap.quickTo(dot, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.35, ease: "power3.out" });
    const scaleTo = gsap.quickTo(dot, "scale", { duration: 0.3, ease: "power3.out" });

    let visible = false;
    let overInteractive = false;

    const onMove = (e: PointerEvent) => {
      if (!visible) {
        // First movement: appear in place instead of flying in from (0, 0).
        visible = true;
        gsap.set(dot, { x: e.clientX, y: e.clientY });
        gsap.to(dot, { opacity: 1, duration: 0.25, ease: "power2.out" });
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      overInteractive = !!target?.closest(INTERACTIVE_SELECTOR);
      scaleTo(overInteractive ? 3 : 1);
    };

    const onDown = () => scaleTo(overInteractive ? 2.4 : 0.7);
    const onUp = () => scaleTo(overInteractive ? 3 : 1);

    const onLeaveDoc = () => {
      visible = false;
      gsap.to(dot, { opacity: 0, duration: 0.2, ease: "power2.out" });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeaveDoc);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeaveDoc);
    };
  }, []);

  return <div ref={dotRef} aria-hidden="true" className="cursor-dot" />;
}
