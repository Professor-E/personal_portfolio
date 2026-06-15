"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderOpen } from "lucide-react";
import { PROJECTS } from "@/lib/constants";
import ProjectCard from "@/components/projects/ProjectCard";
import FilterPills from "@/components/projects/FilterPills";

const FILTER_OPTIONS = ["All", "Hardware", "Software", "Research"];

// No dedicated --text-tertiary token exists; derive a muted tone from the
// secondary token so it still tracks light/dark mode.
const TEXT_TERTIARY = "color-mix(in srgb, var(--text-secondary) 70%, transparent)";

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const gridVariants = {
  hidden: {},
  show: { transition: { delayChildren: 0.25, staggerChildren: 0.05 } },
};

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = PROJECTS.filter(
    (project) => activeFilter === "All" || project.category === activeFilter
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
            What I&apos;ve built
          </p>

          <h1
            className="mt-3 font-medium text-[var(--text-primary)]"
            style={{ fontSize: "48px", lineHeight: 1.05 }}
          >
            Projects
          </h1>

          <p
            className="mt-4 max-w-lg leading-relaxed text-[var(--text-secondary)]"
            style={{ fontSize: "15px" }}
          >
            A collection of hardware, software, and research builds — each one a
            lesson in applying theory to practice.
          </p>

          <hr
            className="mb-8 mt-6 border-t"
            style={{ borderColor: "var(--border)" }}
          />
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

        {/* ── Project grid ──────────────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-24 pb-16 text-center">
            <FolderOpen
              size={32}
              className="text-[var(--text-secondary)] opacity-40"
              aria-hidden="true"
            />
            <p className="text-[var(--text-secondary)]" style={{ fontSize: "16px" }}>
              No projects in this category yet.
            </p>
          </div>
        ) : (
          <motion.div
            layout
            variants={gridVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 items-start gap-6 pb-16 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isExpanded={expandedId === project.id}
                  onToggle={() => handleToggle(project.id)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
