"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PROJECT_CATEGORY_COLORS, type Project } from "@/lib/constants";
import { fadeUp } from "@/lib/motion";

interface ProjectCardProps {
  project: Project;
  /** Open the enlarged detail lightbox for this project. */
  onOpen: () => void;
}

// Same fade+rise shape used for every entrance animation on the site (see
// `headingVariants` in the page header). Cards already on screen when the
// page loads (even partially cut off) fade in immediately; cards further
// down fade in — all together, no stagger — the moment they're scrolled
// into view (see `whileInView` below).
const cardVariants = fadeUp;

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const imagePath = "imagePath" in project ? project.imagePath : undefined;
  // Image cards show the full photo (object-contain) on the site's off-white
  // backdrop; only the monogram fallback keeps the flat accent color.
  const blockBackground = imagePath ? "var(--background)" : project.accentColor;
  // Category tag color is fixed per category (Hardware/Software/Research),
  // independent of this project's own individual accentColor.
  const categoryColor = PROJECT_CATEGORY_COLORS[project.category] ?? project.accentColor;

  return (
    <motion.article
      // Shared layout id — the lightbox box grows out of this exact card.
      layoutId={`project-${project.id}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: "some" }}
      variants={cardVariants}
      exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.15, ease: "easeOut" } }}
      whileHover={{ y: -4 }}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      className={cn(
        "group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border",
        "transition-[border-color,box-shadow] duration-200",
        "border-[var(--border)] hover:border-[color-mix(in_srgb,var(--text-secondary)_55%,var(--border))]",
        "shadow-[var(--shadow-md)]",
        "hover:shadow-[var(--shadow-lg)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
      )}
      style={{ backgroundColor: "var(--surface)" }}
      aria-label={`See more about ${project.title}`}
    >
      {/* ── Media block (project photo, or flat color + monogram) ─────────── */}
      <div
        className="relative flex items-center justify-center overflow-hidden rounded-t-2xl transition-all duration-200 group-hover:brightness-105 dark:opacity-[0.85]"
        style={{ backgroundColor: blockBackground, height: "150px" }}
        aria-hidden="true"
      >
        {imagePath ? (
          <Image
            src={imagePath}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain transition-transform duration-200 group-hover:scale-[1.03]"
          />
        ) : (
          <span className="select-none text-3xl font-medium text-white opacity-70 transition-opacity duration-200 group-hover:opacity-100">
            {project.monogram}
          </span>
        )}

        {project.badge && (
          <div className="absolute right-3 top-3 rounded-md bg-black/50 px-2.5 py-1">
            <span
              className="font-medium leading-none tracking-wide text-white"
              style={{ fontSize: "10px" }}
            >
              {project.badge}
            </span>
          </div>
        )}
      </div>

      {/* ── Card body ─────────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        {/* Category badge — faint accent tint background, accent text */}
        <span
          className="mb-3 inline-flex self-start items-center rounded-full px-2.5 py-0.5 font-medium leading-none"
          style={{
            fontSize: "11px",
            backgroundColor: `${categoryColor}18`,
            color: categoryColor,
          }}
        >
          {project.category}
        </span>

        {/* Title */}
        <h3
          className="font-medium leading-snug text-[var(--text-primary)]"
          style={{ fontSize: "17px" }}
        >
          {project.title}
        </h3>

        {/* Animated accent underline — grows on hover */}
        <div
          className="mb-2.5 mt-1.5 h-[1.5px] w-0 transition-[width] duration-[250ms] ease-out group-hover:w-full"
          style={{ backgroundColor: `${project.accentColor}99` }}
          aria-hidden="true"
        />

        {/* Description — always the short preview; full text lives in the lightbox. */}
        <div className="mb-4">
          <p
            className="line-clamp-2 leading-relaxed text-[var(--text-secondary)] transition-colors duration-200 group-hover:text-[var(--text-primary)]"
            style={{ fontSize: "13px" }}
          >
            {project.shortDescription}
          </p>
        </div>

        {/* Footer row — year + see more, pinned to bottom */}
        <div className="mt-auto flex items-center justify-between">
          <span
            className="font-medium leading-none"
            style={{ fontSize: "11px", color: "var(--text-tertiary)" }}
          >
            {project.year}
          </span>

          <span
            className="flex items-center gap-1 font-medium leading-none text-[var(--accent)]"
            style={{ fontSize: "12px" }}
          >
            See more
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              &rarr;
            </span>
          </span>
        </div>
      </div>
    </motion.article>
  );
}
