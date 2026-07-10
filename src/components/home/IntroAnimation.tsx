"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

interface IntroAnimationProps {
  /** Fires the moment the corner-transition begins — mount + fade in the
   *  homepage beneath the overlay so it is ready the instant the overlay
   *  clears. */
  onReveal: () => void;
  /** Fires once the corner-transition has fully landed and the overlay
   *  unmounts. */
  onComplete: () => void;
}

const FULL_NAME = "Dominik Grzeszczak";
const START_DELAY_MS = 350; // beat before typing begins (dark screen shows first)
const TYPE_SPEED_MS = 85; // per-character typing cadence
const HOLD_AFTER_TYPE_MS = 650; // pause on the finished name before the transition
const TRANSITION_DURATION_S = 0.9; // duration for the slow shrink/travel to the corner
const COLOR_TRANSITION_DURATION_S = 0.4; // quick, early fade for bg + name color — resolves well before the travel finishes, not synced to it
const TRANSITION_EASE = [0.42, 0, 0.58, 1] as const; // CSS ease-in-out cubic-bezier
const NAME_FONT_SIZE = "clamp(32px, 5vw, 64px)";

interface TransitionTarget {
  x: number;
  y: number;
  scale: number;
  bg: string;
  color: string;
}

/**
 * Full-screen intro overlay (first visit / fresh load only).
 *
 * Sequence:
 *   1. Dark panel on screen immediately. Name types out inside a fixed-height
 *      row with a blinking caret — only the row's *width* changes as
 *      characters are added, never its height/vertical position.
 *   2. Short hold once typing finishes; caret fades out.
 *   3. The dark backdrop panel (a separate layer from the name) quickly
 *      fades away, revealing the real homepage content underneath — which
 *      started fading in the moment this step began — while the name
 *      simultaneously flips to the nav's text color, both fast. The name
 *      lives in its own layer, independent of the backdrop, so it stays
 *      fully visible on top the whole time. Independently (same start,
 *      longer duration), the name shrinks and travels from its centered
 *      spot to land exactly on the real navbar logo (`#nav-logo-name`,
 *      which is mounted the entire time — just visually covered by the
 *      name layer). It's the same element the whole time (never fades out
 *      into a second, separately-positioned name) — once its transform
 *      finishes it's already sitting pixel-exact on the real nav link, so
 *      unmounting it right then is an invisible handoff, not a crossfade.
 *   4. Overlay unmounts; `intro_played` is set so this never replays this
 *      session.
 *
 * Respects `prefers-reduced-motion`: skips straight to the end state with no
 * typewriter or transition animation.
 */
export default function IntroAnimation({ onReveal, onComplete }: IntroAnimationProps) {
  const reduceMotion = useReducedMotion();
  const [typed, setTyped] = useState("");
  const [doneTyping, setDoneTyping] = useState(false);
  const [target, setTarget] = useState<TransitionTarget | null>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const finishedRef = useRef(false);

  // `onReveal` is passed as a fresh inline arrow function from the parent on
  // every render (it's not wrapped in useCallback). Calling it triggers a
  // parent re-render, which recreates that reference — if it were a
  // dependency of the measurement effect below, that effect would re-fire
  // *while the corner transition is already in flight* and re-measure
  // `nameEl` mid-animation (its rect now reflects the partially-applied
  // transform, not its original centered position), corrupting the target.
  // Routing the call through a ref sidesteps that entirely.
  const onRevealRef = useRef(onReveal);
  useEffect(() => {
    onRevealRef.current = onReveal;
  }, [onReveal]);

  // Resolve concrete starting colors once, at mount, so Framer Motion always
  // has a real color value to interpolate from — animating a CSS var
  // reference string (e.g. "var(--text-primary)") doesn't tween, it snaps.
  const [initialBg] = useState(() =>
    typeof window !== "undefined"
      ? getComputedStyle(document.documentElement).getPropertyValue("--text-primary").trim()
      : "#1a1a1a"
  );
  const [initialNameColor] = useState(() =>
    typeof window !== "undefined"
      ? getComputedStyle(document.documentElement).getPropertyValue("--surface").trim()
      : "#ffffff"
  );

  function finish() {
    if (finishedRef.current) return;
    finishedRef.current = true;
    if (typeof window !== "undefined") {
      document.body.style.overflow = "";
      // Remove the scrollbar-width compensation (see mount effect below) in
      // the same instant scroll unlocks, so the real scrollbar reappearing
      // and this padding disappearing cancel out — otherwise the page's
      // content width net-changes right as the name lands, visibly
      // shifting the centered layout sideways at that exact moment.
      document.body.style.paddingRight = "";
      // Reveal the real nav logo at the exact instant the traveling name
      // lands pixel-exact on top of it — see the `.intro-playing` rule in
      // globals.css, which hides #nav-logo-name for as long as this class
      // is present. Without this, the real (always-mounted) nav text is
      // visible the whole time the backdrop is cleared, while the
      // traveling name is still mid-flight elsewhere on screen — i.e. two
      // names on screen at once.
      document.documentElement.classList.remove("intro-playing");
      sessionStorage.setItem("intro_played", "true");
    }
    onComplete();
  }

  // Lock scroll while the overlay is up so nothing peeks below it. Also drop
  // the cold-open splash (set pre-paint in RootLayout): this real overlay is
  // the same dark color and now covers the screen, so the handoff is
  // seamless and the splash is no longer needed. Runs regardless of reduced
  // motion so the splash always clears promptly. Also hides the real nav
  // logo (see `finish()`/globals.css) so only the traveling typewriter name
  // is ever visible until it lands.
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Measure the real scrollbar width (0 on OSes/browsers that overlay
      // scrollbars, e.g. macOS trackpads) via the classic offscreen
      // overflow:scroll probe, and reserve that same width as body padding
      // while scroll is locked. Locking scroll hides the scrollbar, which
      // would otherwise narrow the viewport by its width; without this
      // compensation, unlocking scroll later (in `finish()`) makes the
      // scrollbar reappear and the centered layout jump left at that exact
      // moment. Padding now + removing it exactly when scroll unlocks keeps
      // total occupied width constant throughout, so there's no shift.
      const outer = document.createElement("div");
      outer.style.visibility = "hidden";
      outer.style.overflow = "scroll";
      document.body.appendChild(outer);
      const inner = document.createElement("div");
      outer.appendChild(inner);
      const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
      outer.remove();

      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      document.documentElement.classList.remove("intro-pending");
      document.documentElement.classList.add("intro-playing");
    }
    return () => {
      if (typeof window !== "undefined") {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        document.documentElement.classList.remove("intro-playing");
      }
    };
  }, []);

  // Reduced motion: skip the whole sequence and resolve to the end state
  // immediately — no typewriter, no corner transition, overlay never paints.
  useEffect(() => {
    if (!reduceMotion) return;
    onRevealRef.current();
    finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  // Typewriter — reveal one character at a time after a short initial beat.
  useEffect(() => {
    if (reduceMotion) return;
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const startTimer = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setTyped(FULL_NAME.slice(0, i));
        if (i >= FULL_NAME.length) {
          if (interval) clearInterval(interval);
          setDoneTyping(true);
        }
      }, TYPE_SPEED_MS);
    }, START_DELAY_MS);

    return () => {
      clearTimeout(startTimer);
      if (interval) clearInterval(interval);
    };
  }, [reduceMotion]);

  // Once typing is done, hold briefly, then measure the intro text and the
  // real navbar logo and kick off the corner transition.
  useEffect(() => {
    if (reduceMotion || !doneTyping) return;
    const timer = setTimeout(() => {
      const nameEl = nameRef.current;
      const navEl = document.getElementById("nav-logo-name");

      if (!nameEl || !navEl) {
        // Target missing for some reason — reveal and finish rather than
        // getting stuck on an overlay that can never transition.
        onRevealRef.current();
        finish();
        return;
      }

      const nameRect = nameEl.getBoundingClientRect();
      const navRect = navEl.getBoundingClientRect();
      const currentFontSize = parseFloat(getComputedStyle(nameEl).fontSize);
      const targetFontSize = parseFloat(getComputedStyle(navEl).fontSize);

      // Resolve actual color values (not raw `var(--x)` strings) so Framer
      // Motion can tween them — it cannot interpolate a CSS var reference,
      // only concrete color values, and correctly reflects light/dark theme.
      const bg = getComputedStyle(document.documentElement)
        .getPropertyValue("--background")
        .trim();
      const color = getComputedStyle(navEl).color;

      setTarget({
        x: navRect.left - nameRect.left,
        y: navRect.top - nameRect.top,
        scale: targetFontSize / currentFontSize,
        bg,
        color,
      });
      onRevealRef.current();
    }, HOLD_AFTER_TYPE_MS);
    return () => clearTimeout(timer);
    // `finish`/`onReveal` intentionally omitted: routed through refs above so
    // this effect never re-fires mid-transition and re-measures a
    // partially-transformed nameEl.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doneTyping, reduceMotion]);

  if (reduceMotion) return null;

  return (
    <>
      {/* Backdrop — a layer of its own, separate from the name below. Fades
          away quickly (bg color + opacity) the moment the transition
          starts, revealing the real homepage content underneath (already
          fading in via onReveal, fired on this same trigger) while the name
          keeps traveling on its own independent layer above it. Because the
          name isn't a child of this element, fading the backdrop's opacity
          to 0 doesn't affect the name's visibility. */}
      <motion.div
        key="intro-backdrop"
        initial={{ backgroundColor: initialBg, opacity: 1 }}
        animate={{
          backgroundColor: target ? target.bg : initialBg,
          opacity: target ? 0 : 1,
        }}
        transition={{ duration: COLOR_TRANSITION_DURATION_S, ease: TRANSITION_EASE }}
        className="fixed inset-0 z-[9998] pointer-events-none"
      />

      {/* Name layer — sits above the backdrop (and, once it clears, above
          the real page) the entire time, so it stays fully visible while it
          types, holds, and travels. */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center px-6 pointer-events-none">
        {/* Fixed-height row — height and line-height are set once, from the
            resolved font size, and never depend on the typed content's
            length. Only this row's width (via the caret's position after
            the text) changes while typing; its height and vertical
            position are constant from the first character onward. */}
        <div className="flex items-center justify-center" style={{ height: NAME_FONT_SIZE, lineHeight: 1 }}>
          <motion.span
            ref={nameRef}
            className="whitespace-nowrap font-semibold leading-none inline-block"
            style={{
              fontSize: NAME_FONT_SIZE,
              transformOrigin: "0 0",
            }}
            initial={{ x: 0, y: 0, scale: 1, color: initialNameColor }}
            animate={
              target
                ? { x: target.x, y: target.y, scale: target.scale, color: target.color }
                : { x: 0, y: 0, scale: 1, color: initialNameColor }
            }
            transition={{
              // Position/scale: the slow travel to the corner. EASE_OUT
              // (fast start, long smooth tail) reads more naturally landing
              // on a shrinking target than ease-in-out, which — combined
              // with a large multiplicative scale-down — made the very end
              // of the travel look like an abrupt snap/lock into place.
              default: { duration: TRANSITION_DURATION_S, ease: EASE_OUT },
              // Color: quick and early — flips to the nav's black almost as
              // soon as the backdrop starts clearing, well before the
              // travel ends, so nothing changes right as it lands. This is
              // the same span the whole time (never fades out/hands off to
              // a second element), so once its transform finishes it's
              // already sitting pixel-exact on the real nav link with the
              // right color — no crossfade needed.
              color: { duration: COLOR_TRANSITION_DURATION_S, ease: TRANSITION_EASE },
            }}
            onAnimationComplete={() => {
              if (target) finish();
            }}
          >
            {typed}
          </motion.span>

          {/* Blinking caret — only shown while actively typing; fades out
              the instant typing finishes, before the corner transition
              starts, so it never factors into the measured rect or the
              handoff. */}
          <AnimatePresence>
            {!doneTyping && (
              <motion.span
                key="caret"
                aria-hidden="true"
                className="inline-block"
                style={{
                  width: "0.06em",
                  marginLeft: "0.06em",
                  height: "0.95em",
                  fontSize: NAME_FONT_SIZE,
                  verticalAlign: "text-bottom",
                  backgroundColor: "var(--accent)",
                }}
                animate={{ opacity: [1, 1, 0, 0] }}
                exit={{ opacity: 0, transition: { duration: 0.15, ease: "easeOut" } }}
                transition={{
                  opacity: { duration: 1, repeat: Infinity, ease: "linear", times: [0, 0.5, 0.5, 1] },
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
