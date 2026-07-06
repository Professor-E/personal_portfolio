"use client";

import { motion } from "framer-motion";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import { EASE_OUT } from "@/lib/motion";

/**
 * Contact Me page — viewport layout
 *
 * Two distinct scroll sections:
 *
 * SECTION 1 — above the fold (exactly calc(100vh - 70px)):
 *   • flex-col items-center justify-center
 *   • px-8 md:px-16 lg:px-24 — white side margins
 *   • Contains: heading + subheading + two-panel card
 *   • Card: max-h-[calc(100vh-70px-140px)] overflow-hidden as safety valve
 *     (140px = heading h1 64px + gap 12px + subtitle ~25px + mb-8 32px ≈ 133px, rounded up)
 *   • Footer is NOT in this section — guaranteed below the fold
 *
 * The global Footer (rendered by RootLayout, not here) sits directly after
 * this page and is only visible once the user scrolls past 100vh.
 *
 * Page root: flex-col, NO overflow:hidden — scroll to the footer is allowed.
 */

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

export default function ContactPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1 — Above the fold
          min-h-[calc(100vh-70px)]: fills the visible viewport exactly.
          (globals.css sets main { padding-top: 70px }, so this is correct.)
          flex-col items-center justify-center: heading + card are centered.
      ════════════════════════════════════════════════════════════════════ */}
      <div
        className="flex flex-col items-center justify-center px-8 md:px-16 lg:px-24"
        style={{ minHeight: "calc(100vh - 70px)" }}
      >
        {/* ── Heading block ────────────────────────────────────────────── */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center text-center mb-8 w-full"
          style={{ gap: "12px" }}
        >
          {/* Display token: clamp(36px → 64px) */}
          <h1
            className="font-medium leading-none"
            style={{
              fontSize: "clamp(36px, 5vw, 64px)",
              color: "var(--text-primary)",
              letterSpacing: "var(--tracking-display)",
            }}
          >
            Get in touch
          </h1>
          {/* Body Large: 18px */}
          <p
            className="font-medium"
            style={{
              fontSize: "18px",
              lineHeight: 1.4,
              color: "var(--text-secondary)",
            }}
          >
            Have questions, feedback, or requests? I&apos;d love to hear from you!
          </p>
        </motion.div>

        {/* ── Two-panel card ───────────────────────────────────────────── */}
        {/*   max-h is the safety valve: if the form somehow grows past the  */}
        {/*   available height it clips inside the card, not below the fold.  */}
        {/*   overflow-hidden also clips both panels to the rounded corners.  */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row items-stretch w-full max-w-[1100px] mx-auto rounded-[20px] overflow-hidden border border-[var(--border)]"
          style={{
            boxShadow: "var(--shadow-lg)",
            maxHeight: "calc(100vh - 70px - 140px)",
          }}
        >
          {/* Left — ContactInfo: 280px on desktop, full-width on mobile */}
          <div className="w-full md:w-[280px] md:min-w-[280px] shrink-0">
            <ContactInfo />
          </div>

          {/* Right — form panel: fills remaining width, p-8 (32px) */}
          <div
            className="flex-1 min-w-0 flex flex-col"
            style={{
              backgroundColor: "var(--surface)",
              padding: "32px",
            }}
          >
            <ContactForm />
          </div>
        </motion.div>
      </div>

    </motion.div>
  );
}

