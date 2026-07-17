"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useWebGLMode } from "@/lib/webgl";

/**
 * Quiet 3D ornament for the Contact page's blue info panel — a wireframe
 * icosahedron (plus a counter-rotating inner shell) drifting slowly, like an
 * engineering wireframe sketched in light. White line-work over the token
 * mesh gradient, matching the panel's existing rgba-white accents.
 *
 * Placement: an IN-FLOW flex child that fills the panel's empty middle
 * region (below the location row, above "FIND ME ON") — it originally
 * floated over the bottom-right corner, where it sat on top of the social
 * icons and swallowed their clicks. In-flow, overlap is impossible; the
 * canvas is also explicitly pointer-events: none, belt and braces.
 *
 * Perf/hygiene: two wireframe meshes, no lights, dpr ≤ 1.5, frameloop
 * paused off-screen; renders nothing at all for reduced-motion /
 * coarse-pointer / no-WebGL visitors (the panel lays out exactly as if the
 * component didn't exist — the social block's mt-auto handles the rest).
 */

function Wireframes() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.14;
      outerRef.current.rotation.x = 0.35 + Math.sin(t * 0.35) * 0.12;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.22;
      innerRef.current.rotation.z = t * 0.1;
    }
  });

  return (
    <>
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.25, 0]} />
        <meshBasicMaterial wireframe color="#ffffff" transparent opacity={0.4} />
      </mesh>
      <mesh ref={innerRef} scale={0.55}>
        <icosahedronGeometry args={[1.25, 0]} />
        <meshBasicMaterial wireframe color="#ffffff" transparent opacity={0.22} />
      </mesh>
    </>
  );
}

export default function PanelOrnament() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const mode = useWebGLMode();

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

  if (mode !== "webgl") return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none relative w-full flex-1"
      style={{ minHeight: "150px" }}
    >
      {/* Fixed square stage, centered in whatever space the flex-1 region
          has. The canvas must NOT fill the region directly: the projection
          scales with canvas height, so when the form panel grows (error
          banner, validation messages) a filling canvas gets taller and the
          wireframe inflates past the panel's 280px width and clips. Capping
          the stage at a 216px square (the panel's inner width: 280 − 2×32
          padding) keeps the ornament the same size no matter how much the
          card stretches; it only shrinks (still square, never clipped) if
          the region is shorter than 216px. */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative"
          style={{ height: "min(100%, 216px)", aspectRatio: "1 / 1" }}
        >
          <Canvas
            flat
            dpr={[1, 1.5]}
            frameloop={inView ? "always" : "never"}
            camera={{ position: [0, 0, 3.4], fov: 45 }}
            gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          >
            <Wireframes />
          </Canvas>
        </div>
      </div>
    </div>
  );
}
