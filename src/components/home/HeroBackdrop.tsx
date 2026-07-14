"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { readToken, companionColor, useWebGLMode } from "@/lib/webgl";

/**
 * WebGL hero backdrop — the homepage's signature moment (escalation plan D2).
 *
 * A full-bleed shader plane behind the hero text: domain-warped simplex noise
 * washes the accent color across the page background like a slow liquid
 * aurora, drifting on its own and gently dragged by the pointer. The real
 * headline/CTAs render on top, untouched.
 *
 * Colors are read from the CSS tokens (--background / --accent) at mount and
 * re-read when the theme class flips, so light/dark both stay on-token. The
 * only derived value is a companion hue rotated from the accent (documented
 * below) — no hardcoded hex.
 *
 * Performance / hygiene:
 * - Lazy-loaded client-only by the home page (matching IntroAnimation).
 * - DPR capped at 1.5, antialias off (the shader dithers itself).
 * - Rendering pauses when the hero scrolls offscreen (IntersectionObserver →
 *   frameloop "never").
 * - Static token-based CSS gradient fallback for prefers-reduced-motion,
 *   coarse pointers (mobile), and missing WebGL support.
 */

// ── Shader ────────────────────────────────────────────────────────────────────

const VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// 2D simplex noise — Ian McEwan / Ashima Arts (MIT), the standard GLSL port.
const FRAGMENT = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform vec2  uMouse;     // normalized 0..1, lerped on the JS side
  uniform float uScroll;    // 0..1 progress out of the first viewport, eased
  uniform vec3  uBg;
  uniform vec3  uAccent;
  uniform vec3  uAccent2;
  uniform float uIntensity;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 10.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * snoise(p);
      p = p * 2.0 + 17.3;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = vec2(uv.x * 1.15, uv.y);
    float t = uTime * 0.045;

    // Scrolling away slides the whole field upward (a soft parallax) and
    // the wash eases off — the aurora visibly *responds* to the scroll.
    p.y += uScroll * 0.45;

    // Domain warp — this is what makes it read "liquid" instead of "clouds".
    // Low frequencies on purpose: the forms should be bigger than the
    // viewport so the wash reads as a slow gradient, never as smoke.
    vec2 warp = vec2(
      fbm(p * 0.8 + vec2(t, -t * 0.6)),
      fbm(p * 0.8 + vec2(-t * 0.7, t * 0.5) + 4.7)
    );

    // The pointer gently drags the whole field.
    vec2 m = (uMouse - 0.5) * 0.18;

    float n  = fbm(p * 0.65 + warp * 0.45 + m + vec2(0.0, t * 0.3));
    float n2 = fbm(p * 0.55 - warp * 0.35 - m * 0.6 + vec2(t * 0.4, 2.1));

    // Threshold above the noise midpoint so MOST of the field stays pure
    // background and the tint gathers in soft pools — an accent, not a fog.
    // Ramps stay long so pool edges are feathered. (Thresholds sit lower
    // than the original pass — the user asked for a more pronounced wash.)
    float washA = smoothstep(0.46, 1.02, n * 0.5 + 0.5);
    float washB = smoothstep(0.54, 1.06, n2 * 0.5 + 0.5) * 0.8;

    // Vertical bias — the hue should read strongest across the TOP of the
    // viewport (user request; the noise pools were gathering down by the
    // marquee). uv.y runs 0 at the bottom → 1 at the top.
    float topBias = mix(0.55, 1.5, smoothstep(0.0, 1.0, uv.y));

    float strength = uIntensity * (1.0 - uScroll * 0.45) * topBias;
    vec3 col = uBg;
    col = mix(col, uAccent,  washA * strength);
    col = mix(col, uAccent2, washB * strength * 0.7);

    // Guaranteed ceiling glow — a soft accent wash anchored to the top edge,
    // so the top always carries the hue no matter where the noise wanders.
    // The noise term keeps its lower edge organic instead of a flat band.
    float ceiling = smoothstep(0.62, 1.08, uv.y + n * 0.14);
    col = mix(col, uAccent, ceiling * uIntensity * (1.0 - uScroll * 0.45) * 0.6);

    // Keep the center — where the headline sits — calmer than the edges.
    float d = distance(uv, vec2(0.5, 0.55));
    float centerCalm = smoothstep(0.08, 0.6, d);
    col = mix(uBg, col, 0.25 + 0.75 * centerCalm);

    // Ordered dithering — kills banding in the very subtle gradients.
    float dither = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    col += (dither - 0.5) * (1.5 / 255.0);

    gl_FragColor = vec4(col, 1.0);
  }
`;

// ── Token helpers (shared with the other WebGL moments — see lib/webgl.ts) ───

interface ThemeColors {
  bg: THREE.Color;
  accent: THREE.Color;
  accent2: THREE.Color;
  intensity: number;
}

function readThemeColors(): ThemeColors {
  const accentHex = readToken("--accent");
  const dark = document.documentElement.classList.contains("dark");
  return {
    bg: new THREE.Color(readToken("--background")),
    accent: new THREE.Color(accentHex),
    accent2: companionColor(accentHex),
    // Dark mode can carry a slightly stronger wash before it competes with
    // text. Raised from 0.22 / 0.15 — the center-calm zone still protects
    // the headline while the edges get to glow. (0.24 light read as smoke
    // in verification screenshots; 0.19 is the pronounced-but-clean spot.)
    intensity: dark ? 0.3 : 0.19,
  };
}

// ── Scene ─────────────────────────────────────────────────────────────────────

function AuroraPlane({ mouseTarget }: { mouseTarget: React.MutableRefObject<{ x: number; y: number }> }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(() => {
    const theme = readThemeColors();
    return {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uScroll: { value: 0 },
      uBg: { value: theme.bg },
      uAccent: { value: theme.accent },
      uAccent2: { value: theme.accent2 },
      uIntensity: { value: theme.intensity },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-read token colors whenever next-themes flips the `dark` class.
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const theme = readThemeColors();
      uniforms.uBg.value.copy(theme.bg);
      uniforms.uAccent.value.copy(theme.accent);
      uniforms.uAccent2.value.copy(theme.accent2);
      uniforms.uIntensity.value = theme.intensity;
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [uniforms]);

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.elapsedTime;
    // Ease the pointer uniform toward the live pointer — a soft trailing drag.
    const m = uniforms.uMouse.value;
    m.x += (mouseTarget.current.x - m.x) * 0.05;
    m.y += (mouseTarget.current.y - m.y) * 0.05;
    // Ease scroll progress the same way (Lenis already smooths scrollY, the
    // extra lerp just keeps the shader response silky at scroll-jump moments).
    const target = Math.min(window.scrollY / window.innerHeight, 1);
    uniforms.uScroll.value += (target - uniforms.uScroll.value) * 0.08;
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

// ── Static fallback (reduced motion / mobile / no WebGL) ─────────────────────

function StaticBackdrop() {
  return (
    <div
      className="absolute inset-0"
      style={{
        // Top-weighted to match the WebGL field's vertical bias.
        background: `
          linear-gradient(to bottom, color-mix(in srgb, var(--accent) 10%, transparent), transparent 38%),
          radial-gradient(55% 45% at 22% 12%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 70%),
          radial-gradient(50% 40% at 80% 70%, color-mix(in srgb, var(--accent) 6%, transparent), transparent 70%)
        `,
      }}
    />
  );
}

// ── Export ────────────────────────────────────────────────────────────────────

export default function HeroBackdrop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseTarget = useRef({ x: 0.5, y: 0.5 });
  const [inView, setInView] = useState(true);

  // Decided once, on mount (client-only component) — see lib/webgl.ts.
  const mode = useWebGLMode();

  // Pause the render loop while the hero is scrolled out of view.
  useEffect(() => {
    if (mode !== "webgl") return;
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [mode]);

  // Track the pointer over the whole window — the field drags subtly with it.
  useEffect(() => {
    if (mode !== "webgl") return;
    const onMove = (e: PointerEvent) => {
      mouseTarget.current = {
        x: e.clientX / window.innerWidth,
        // GL uv-space runs bottom-up; flip to match.
        y: 1 - e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mode]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {mode === "webgl" ? (
        <Canvas
          // `linear flat` disables three's sRGB→linear color management and
          // tone mapping. The raw shader writes CSS token values straight to
          // the framebuffer, so the plane's base EXACTLY matches
          // --background — without this the whole hero renders a shade
          // darker/cooler than the rest of the page.
          linear
          flat
          dpr={[1, 1.5]}
          frameloop={inView ? "always" : "never"}
          gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
          style={{ position: "absolute", inset: 0 }}
        >
          <AuroraPlane mouseTarget={mouseTarget} />
        </Canvas>
      ) : (
        <StaticBackdrop />
      )}
    </div>
  );
}
