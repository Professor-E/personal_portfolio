"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderOpen } from "lucide-react";
import { PROJECTS } from "@/lib/constants";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectDetail from "@/components/projects/ProjectDetail";
import FilterPills from "@/components/projects/FilterPills";
import Lightbox from "@/components/common/Lightbox";

const FILTER_OPTIONS = ["All", "Hardware", "Software", "Research"];

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [direction, setDirection] = useState<number>(0);

  const filtered = PROJECTS.filter(
    (project) => activeFilter === "All" || project.category === activeFilter
  );

  function handleFilterChange(next: string) {
    setActiveFilter(next);
    // A card hidden by the new filter shouldn't stay logically "open".
    setActiveId(null);
  }

  const activeIndex = filtered.findIndex((p) => p.id === activeId);
  const activeProject = activeIndex >= 0 ? filtered[activeIndex] : null;

  function navigate(step: number) {
    if (activeIndex < 0 || filtered.length === 0) return;
    const nextIndex = (activeIndex + step + filtered.length) % filtered.length;
    setDirection(step);
    setActiveId(filtered[nextIndex].id);
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
            style={{ fontSize: "12px", color: "var(--text-tertiary)" }}
          >
            What I&apos;ve built
          </p>

          <h1
            className="mt-3 font-medium leading-none text-[var(--text-primary)]"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            Projects
          </h1>

          <p
            className="mt-4 max-w-xl font-medium text-[var(--text-secondary)]"
            style={{ fontSize: "18px", lineHeight: 1.4 }}
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
            className="grid grid-cols-1 gap-6 pb-16 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpen={() => {
                    setDirection(0);
                    setActiveId(project.id);
                  }}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* ── Enlarged detail lightbox ──────────────────────────────────────── */}
      <Lightbox
        isOpen={activeProject !== null}
        layoutId={`project-${activeId}`}
        contentKey={activeId ?? ""}
        accentColor={activeProject?.accentColor}
        direction={direction}
        showArrows={filtered.length > 1}
        prevLabel={
          activeIndex >= 0
            ? filtered[(activeIndex - 1 + filtered.length) % filtered.length].title
            : undefined
        }
        nextLabel={
          activeIndex >= 0
            ? filtered[(activeIndex + 1) % filtered.length].title
            : undefined
        }
        onClose={() => setActiveId(null)}
        onPrev={() => navigate(-1)}
        onNext={() => navigate(1)}
      >
        {activeProject && <ProjectDetail project={activeProject} />}
      </Lightbox>
    </div>
  );
}
