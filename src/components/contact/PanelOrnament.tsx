"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useWebGLMode } from "@/lib/webgl";

/**
 * Quiet 3D ornament for the Contact page's blue info panel — a wireframe
 * icosahedron (plus a counter-rotating inner shell) drifting slowly in the
 * panel's bottom-right corner, like an engineering wireframe sketched in
 * light. White line-work over the token mesh gradient, matching the panel's
 * existing rgba-white accents.
 *
 * Perf/hygiene: two wireframe meshes, no lights, dpr ≤ 1.5, pointer-events
 * none, frameloop paused off-screen; not mounted at all for reduced-motion /
 * coarse-pointer / no-WebGL visitors (the mesh gradient panel stands alone).
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
      className="pointer-events-none absolute -bottom-8 -right-8"
      style={{ width: "210px", height: "210px" }}
    >
      <Canvas
        flat
        dpr={[1, 1.5]}
        frameloop={inView ? "always" : "never"}
        camera={{ position: [0, 0, 3.2], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        style={{ position: "absolute", inset: 0 }}
      >
        <Wireframes />
      </Canvas>
    </div>
  );
}
