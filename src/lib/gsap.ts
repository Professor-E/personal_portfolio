/**
 * Central GSAP entry point — registers ScrollTrigger exactly once.
 *
 * Every component that needs scroll choreography imports { gsap, ScrollTrigger }
 * from here instead of from "gsap" directly, so plugin registration can never
 * be forgotten or duplicated. Client-side only: registration is skipped during
 * SSR (ScrollTrigger touches window at register time).
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
