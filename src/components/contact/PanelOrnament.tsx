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
  );
}
