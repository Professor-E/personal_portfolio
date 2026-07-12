"use client";

import { useLayoutEffect, useRef } from "react";

/**
 * Infinite horizontal marquee of company names.
 * Figma node 616:510 — "Companies (Scroll Anim)"
 * Inter Medium 32px, text-primary, w-full
 * The list is doubled so the CSS animation loops seamlessly.
 *
 * On load the loop is phase-shifted (negative animation-delay, measured in a
 * layout effect) so Akamai — the first entry — sits centered in the viewport
 * instead of cut off at the left edge. Because it's only a time offset into
 * the same seamless loop, coverage/looping are unaffected. The track paints
 * at opacity 0 until measured (`.is-ready`), so the unshifted position never
 * flashes; reduced-motion gets the same centering via a static transform.
 */

// Companies and institutions worked at — colors are 1:1 with the Experience
// page's brandColor values in constants.ts (user request: the marquee must
// match that tab exactly in light mode).
//
// `darkColor` — dark-theme override for brands whose color is too dark to read
// on the #111110 background (contrast < 2.2:1). Each is a lighter tint of the
// SAME brand hue, targeting ≥ 4.5:1; bright brands (Akamai, YC, Handshake)
// already clear that bar and keep one color for both themes. Light mode always
// uses `color`, matching the Experience page exactly.
const COMPANIES = [
  { name: "Akamai Technologies",          color: "#009BDE" },
  { name: "Y Combinator / Jam It!",       color: "#FF6600" },
  { name: "Handshake AI Fellowship",      color: "#7FA000" },
  { name: "Hamilton Broadcast Eng.",      color: "#1A1A2E", darkColor: "#9BA3C9" },
  { name: "MIT",                          color: "#A31F34", darkColor: "#E25F6C" },
  { name: "Argonne National Laboratory",  color: "#004B87", darkColor: "#58A0DC" },
  { name: "Northwestern University",      color: "#4E2A84", darkColor: "#A493D6" },
  { name: "Glenbrook South High School",  color: "#002147", darkColor: "#7FA3D1" },
] as const;

export default function CompanyScroll() {
  // Double the list for seamless infinite loop
  const doubled = [...COMPANIES, ...COMPANIES];

  const maskRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mask = maskRef.current;
    const track = trackRef.current;
    if (!mask || !track) return;

    const center = () => {
      const first = track.querySelector<HTMLElement>(".marquee-name");
      if (!first) return;
      const trackRect = track.getBoundingClientRect();
      const copyWidth = trackRect.width / 2; // the track holds the list twice
      if (copyWidth <= 0) return;
      const firstRect = first.getBoundingClientRect();
      // Akamai's center within one copy — both rects carry the track's
      // current transform, so the delta is transform-invariant.
      const itemCenter = firstRect.left - trackRect.left + firstRect.width / 2;
      // Phase (px of leftward travel) at which the SECOND copy's Akamai sits
      // at the mask's center; modulo keeps it in [0, copyWidth) on any width.
      const phase =
        (((copyWidth + itemCenter - mask.clientWidth / 2) % copyWidth) +
          copyWidth) %
        copyWidth;
      track.style.setProperty("--marquee-offset", `${-phase}px`);
      const duration = parseFloat(getComputedStyle(track).animationDuration);
      if (duration > 0) {
        track.style.setProperty(
          "--marquee-delay",
          `${(-duration * phase) / copyWidth}s`
        );
      }
      track.classList.add("is-ready");
    };

    center();
    // Re-center when the viewport or the track's own width changes (resize,
    // display-font swap-in).
    const observer = new ResizeObserver(center);
    observer.observe(mask);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={maskRef}
      className="marquee-mask w-full overflow-hidden py-4"
      aria-hidden="true"
    >
      <div ref={trackRef} className="marquee-track">
        {doubled.map((company, i) => (
          <div
            key={`${company.name}-${i}`}
            className="flex items-center shrink-0"
          >
            {/* Theme-conditional color is resolved in CSS (.marquee-name in
                globals.css) so the flip is instant with next-themes' class
                toggle — no client re-render or theme hook needed here. */}
            <span
              className="marquee-name font-display font-semibold whitespace-nowrap px-10"
              style={
                {
                  fontSize: "clamp(18px, 2.5vw, 32px)",
                  // Full-opacity brand color — matches the Experience page
                  // exactly (no dimming), rather than blending toward the
                  // background.
                  "--marquee-color": company.color,
                  "--marquee-color-dark":
                    "darkColor" in company ? company.darkColor : company.color,
                } as React.CSSProperties
              }
            >
              {company.name}
            </span>
            {/* Dot separator */}
            <span
              className="shrink-0 w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "var(--border)" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
