"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Inbox } from "lucide-react";
import { EXTRACURRICULARS } from "@/lib/constants";
import ActivityCard from "@/components/extracurriculars/ActivityCard";
import FilterPills from "@/components/extracurriculars/FilterPills";

const FILTER_OPTIONS = [
  "All",
  "Leadership",
  "Competition",
  "Community & Volunteering",
];

// No dedicated --text-tertiary token exists; derive a muted tone from the
// secondary token so it still tracks light/dark mode.
const TEXT_TERTIARY = "color-mix(in srgb, var(--text-secondary) 70%, transparent)";

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const listVariants = {
  hidden: {},
  show: { transition: { delayChildren: 0.2, staggerChildren: 0.06 } },
};

export default function ExtracurricularsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = EXTRACURRICULARS.filter(
    (activity) => activeFilter === "All" || activity.category === activeFilter
  );

  function handleFilterChange(next: string) {
    setActiveFilter(next);
    // A card hidden by the new filter shouldn't stay logically "open".
    setExpandedId(null);
  }

  function handleToggle(id: string) {
    setExpandedId((current) => (current === id ? null : id));
  }

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
            style={{ fontSize: "12px", color: TEXT_TERTIARY }}
          >
            Beyond the classroom
          </p>

          <h1
            className="mt-3 font-medium text-[var(--text-primary)]"
            style={{ fontSize: "48px", lineHeight: 1.05 }}
          >
            Extracurriculars
          </h1>

          <p
            className="mt-4 max-w-lg leading-relaxed text-[var(--text-secondary)]"
            style={{ fontSize: "15px" }}
          >
            Leadership, competition, and community — four years of building
            things beyond the classroom.
          </p>

          <hr className="mb-8 mt-6 border-t" style={{ borderColor: "var(--border)" }} />
        </motion.header>

        {/* ── Filter pills ──────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={headingVariants}
          className="mb-10"
        >
          <FilterPills
            active={activeFilter}
            onChange={handleFilterChange}
            options={FILTER_OPTIONS}
          />
        </motion.div>

        {/* ── Activity list ─────────────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-24 pb-16 text-center">
            <Inbox
              size={32}
              className="text-[var(--text-secondary)] opacity-40"
              aria-hidden="true"
            />
            <p className="text-[var(--text-secondary)]" style={{ fontSize: "16px" }}>
              No activities in this category yet.
            </p>
          </div>
        ) : (
          <motion.div
            layout
            variants={listVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-4 pb-16"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  isExpanded={expandedId === activity.id}
                  onToggle={() => handleToggle(activity.id)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
