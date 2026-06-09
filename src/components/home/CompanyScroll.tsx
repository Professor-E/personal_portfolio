"use client";

/**
 * Infinite horizontal marquee of company names.
 * Figma node 616:510 — "Companies (Scroll Anim)"
 * Inter Medium 32px, text-primary, w-full
 * The list is doubled so the CSS animation loops seamlessly.
 */

// From Figma + constants.ts brand colors
const COMPANIES = [
  { name: "Argonne National Laboratory", color: "#004B87" },
  { name: "Y-Combinator",                color: "#FF6600" },
  { name: "Akamai",                       color: "#009BDE" },
  { name: "MIT",                          color: "#A31F34" },
  { name: "Northwestern",                 color: "#4E2A84" },
  { name: "Habitat for Humanity",         color: "#009BDE" },
  { name: "Hamilton Broadcast Eng.",      color: "#1A1A2E" },
] as const;

export default function CompanyScroll() {
  // Double the list for seamless infinite loop
  const doubled = [...COMPANIES, ...COMPANIES];

  return (
    <div className="w-full overflow-hidden py-4" aria-hidden="true">
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
