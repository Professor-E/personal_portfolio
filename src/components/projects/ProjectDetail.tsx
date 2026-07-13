"use client";

import { PROJECT_CATEGORY_COLORS, type Project } from "@/lib/constants";
import LiveSitePreview from "@/components/common/LiveSitePreview";

/**
 * Full project detail rendered inside the enlarged lightbox.
 *
 * The header band is always the site's trademark accent blue (user request,
 * July 2026) — project photos live only on the grid cards; the enlarged view
 * deliberately does NOT show the photo. This replaced an earlier full-bleed
 * parallaxing photo header.
 */
export default function ProjectDetail({ project }: { project: Project }) {
  const categoryColor = PROJECT_CATEGORY_COLORS[project.category] ?? project.accentColor;

  return (
    <div className="flex flex-col">
      {/* Media header — flat trademark accent band */}
      <div
        className="relative flex items-end overflow-hidden px-6 py-8 sm:px-10 sm:py-12"
        style={{
          backgroundColor: "var(--accent)",
          minHeight: "180px",
        }}
      >
        {project.badge && (
          <div className="absolute right-5 top-5 rounded-md bg-black/25 px-3 py-1.5 backdrop-blur-sm">
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
              backgroundColor: `${categoryColor}18`,
              color: categoryColor,
            }}
          >
            {project.category}
          </span>
          <span className="font-medium leading-none" style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>
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
          style={{ backgroundColor: `${categoryColor}99` }}
          aria-hidden="true"
        />

        <p
          className="font-normal text-[var(--text-secondary)]"
          style={{ fontSize: "clamp(15px, 1.6vw, 18px)", lineHeight: 1.7 }}
        >
          {project.fullDescription}
        </p>

        {/* Live-site preview — a clickable mini browser window deep-linking
            to the deployed site (Jam It!). */}
        {"website" in project && (
          <div className="mt-2 flex flex-col gap-3">
            <p
              className="font-medium uppercase tracking-widest"
              style={{ fontSize: "12px", color: "var(--text-tertiary)" }}
            >
              Live site
            </p>
            <LiveSitePreview
              url={project.website}
              image={project.websiteImage}
              label={`the ${project.title} website`}
              accentColor={categoryColor}
              className="max-w-[620px]"
            />
          </div>
        )}
      </div>
    </div>
  );
}
