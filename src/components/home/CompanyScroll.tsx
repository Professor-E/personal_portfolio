"use client";

/**
 * Infinite horizontal marquee of company names.
 * Figma node 616:510 — "Companies (Scroll Anim)"
 * Inter Medium 32px, text-primary, w-full
 * The list is doubled so the CSS animation loops seamlessly.
 */

// Companies and institutions worked at — names + brand colors from constants.ts
const COMPANIES = [
  { name: "Akamai Technologies",          color: "#009BDE" },
  { name: "Y Combinator / Jam It!",       color: "#FF6600" },
  { name: "Hamilton Broadcast Eng.",      color: "#1A1A2E" },
  { name: "MIT",                          color: "#A31F34" },
  { name: "Argonne National Laboratory",  color: "#004B87" },
  { name: "Northwestern University",      color: "#4E2A84" },
  { name: "Glenbrook South High School",  color: "#002147" },
] as const;

export default function CompanyScroll() {
  // Double the list for seamless infinite loop
  const doubled = [...COMPANIES, ...COMPANIES];

  return (
    <div className="marquee-mask w-full overflow-hidden py-4" aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((company, i) => (
          <div
            key={`${company.name}-${i}`}
            className="flex items-center shrink-0"
          >
            <span
              className="font-medium whitespace-nowrap px-10"
              style={{
                fontSize: "clamp(18px, 2.5vw, 32px)",
                color: company.color,
                opacity: 0.85,
              }}
            >
              {company.name}
            </span>
            {/* Dot separator */}
            <span
              className="shrink-0 w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "var(--border)" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
