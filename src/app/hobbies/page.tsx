"use client";

import { motion } from "framer-motion";
import { HOBBIES } from "@/lib/constants";
import HobbyRow from "@/components/hobbies/HobbyRow";

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const listVariants = {
  hidden: {},
  show: { transition: { delayChildren: 0.2, staggerChildren: 0.08 } },
};

export default function HobbiesPage() {
  return (
    <div className="min-h-[calc(100vh-70px)] bg-[var(--background)]">
      {/* Container normalized to match Projects page: max-w-5xl px-8 md:px-16 lg:px-24 */}
      <div className="mx-auto max-w-5xl px-8 md:px-16 lg:px-24">
        {/* ── Header ────────────────────────────────────────────────────── */}
        <motion.header
          initial="hidden"
          animate="show"
          variants={headingVariants}
          className="pb-2 pt-10"
        >
          <p
            className="font-medium uppercase tracking-widest"
            style={{ fontSize: "12px", color: "var(--text-tertiary)" }}
          >
            Outside of work
          </p>

          <h1
            className="mt-3 font-medium leading-none text-[var(--text-primary)]"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            Hobbies
          </h1>

          <p
            className="mt-4 max-w-xl font-medium text-[var(--text-secondary)]"
            style={{ fontSize: "18px", lineHeight: 1.4 }}
          >
            When I&apos;m not building things, you&apos;ll find me on the slopes,
            behind the decks, or in the gym.
          </p>

          <hr
            className="mb-10 mt-6 border-t"
            style={{ borderColor: "var(--border)" }}
          />
        </motion.header>

        {/* ── Hobby rows ────────────────────────────────────────────────── */}
        <motion.div
          variants={listVariants}
          initial="hidden"
          animate="show"
          className="pb-16"
        >
          {HOBBIES.map((hobby, i) => (
            <HobbyRow
              key={hobby.id}
              hobby={hobby}
              index={i}
              isLast={i === HOBBIES.length - 1}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
