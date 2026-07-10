"use client";

import Image from "next/image";
import { PROJECT_CATEGORY_COLORS, type Project } from "@/lib/constants";

/**
 * Full project detail rendered inside the enlarged lightbox.
 *
 * When the project has a real photo, the header shows it full-bleed
 * (object-cover, so it always fills the band — no letterboxing) over a
 * neutral surface background, so no accent color flashes while the photo
 * loads. Projects without a photo fall back to the flat accent band.
 */
export default function ProjectDetail({ project }: { project: Project }) {
  const imagePath = "imagePath" in project ? project.imagePath : undefined;
  const categoryColor = PROJECT_CATEGORY_COLORS[project.category] ?? project.accentColor;

  return (
    <div className="flex flex-col">
      {/* Media header — real photo when available, accent band otherwise */}
      <div
        className="relative flex items-end overflow-hidden px-6 py-8 sm:px-10 sm:py-12"
        style={{
          backgroundColor: imagePath ? "var(--surface)" : "var(--accent)",
          minHeight: imagePath ? "260px" : "180px",
        }}
      >
        {imagePath && (
          <Image
            src={imagePath}
            alt={project.title}
            fill
            sizes="90vw"
            className="object-cover"
            priority
          />
        )}

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
      </div>
    </div>
  );
}
