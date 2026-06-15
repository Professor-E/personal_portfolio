"use client";

import type { Project } from "@/lib/constants";

const TEXT_TERTIARY = "color-mix(in srgb, var(--text-secondary) 70%, transparent)";

/**
 * Full project detail rendered inside the enlarged lightbox. Mirrors the card's
 * visual language (color header + monogram) so the shared-layout enlarge reads
 * as the same element growing, then reveals the full description.
 */
export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <div className="flex flex-col">
      {/* Color header — matches the card's color block so the enlarge is seamless */}
      <div
        className="relative flex items-end overflow-hidden px-6 py-8 sm:px-10 sm:py-12"
        style={{ backgroundColor: project.accentColor, minHeight: "180px" }}
      >
        <span className="select-none text-6xl font-semibold text-white/85 sm:text-7xl">
          {project.monogram}
        </span>
        {project.badge && (
          <div className="absolute right-5 top-5 rounded-md bg-black/40 px-3 py-1.5">
            <span className="font-medium tracking-wide text-white" style={{ fontSize: "12px" }}>
              {project.badge}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col gap-4 px-6 py-8 sm:px-10 sm:py-10">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="inline-flex items-center rounded-full px-3 py-1 font-medium leading-none"
            style={{
              fontSize: "12px",
              backgroundColor: `${project.accentColor}18`,
              color: project.accentColor,
            }}
          >
            {project.category}
          </span>
          <span className="font-medium leading-none" style={{ fontSize: "13px", color: TEXT_TERTIARY }}>
            {project.year}
          </span>
        </div>

        <h2
          className="font-semibold leading-tight text-[var(--text-primary)]"
          style={{ fontSize: "clamp(26px, 4vw, 40px)" }}
        >
          {project.title}
        </h2>

        <div
          className="h-[2px] w-16 rounded-full"
          style={{ backgroundColor: `${project.accentColor}99` }}
          aria-hidden="true"
        />

        <p
          className="font-normal text-[var(--text-secondary)]"
          style={{ fontSize: "clamp(15px, 1.6vw, 18px)", lineHeight: 1.7 }}
        >
          {project.fullDescription}
        </p>
      </div>
    </div>
  );
}
