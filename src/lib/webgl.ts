"use client";

import { useState } from "react";
import * as THREE from "three";

/**
 * Shared helpers for the site's WebGL moments (hero aurora, homepage knot,
 * contact ornament). Every scene follows the same contract:
 *
 * - Colors come from CSS tokens at mount (never hardcoded hex) and are
 *   re-read when the theme class flips.
 * - Raw shaders write token values straight to the framebuffer, so their
 *   Canvas MUST use `linear flat` props or tokens render darker/cooler
 *   (three's color management would double-convert them).
 * - WebGL renders only for fine-pointer, motion-OK, WebGL-capable visitors;
 *   everyone else gets the component's static fallback.
 */

export function readToken(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/**
 * Companion accent — the token accent with its hue rotated +45°. Derived from
 * the token (never hardcoded) so it tracks theme changes; gives scenes a
 * second hue (blue → violet family) instead of a flat single-color look.
 */
export function companionColor(hex: string): THREE.Color {
  const c = new THREE.Color(hex);
  const hsl = { h: 0, s: 0, l: 0 };
  c.getHSL(hsl);
  c.setHSL((hsl.h + 45 / 360) % 1, hsl.s, hsl.l);
  return c;
}

/**
 * Decides once, at mount, whether a scene should render real WebGL or its
 * static fallback. Client-only components only (matchMedia at init).
 */
export function useWebGLMode(): "webgl" | "static" {
  const [mode] = useState<"webgl" | "static">(() => {
    if (typeof window === "undefined") return "static";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    let webgl = false;
    try {
      const canvas = document.createElement("canvas");
      webgl = !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
    } catch {
      webgl = false;
    }
    return !reduced && !coarse && webgl ? "webgl" : "static";
  });
  return mode;
}
