"use client";

/**
 * Infinite horizontal marquee of company names.
 * Figma node 616:510 — "Companies (Scroll Anim)"
 * Inter Medium 32px, text-primary, w-full
 * The list is doubled so the CSS animation loops seamlessly.
 */

// Companies and institutions worked at — names + brand colors from constants.ts.
// Handshake is the one deliberate exception: constants.ts / the Experience page
// use #7FA000, but the marquee uses Handshake's actual trademark "Voltage Lime"
// (#D3FB52) since this text is purely on display here.
//
// `darkColor` — dark-theme override for brands whose color is too dark to read
// on the #111110 background (contrast < 2.2:1). Each is a lighter tint of the
// SAME brand hue, targeting ≥ 4.5:1; bright brands (Akamai, YC, Handshake)
// already clear that bar and keep one color for both themes. Light mode always
// uses `color`, matching the Experience page exactly.
const COMPANIES = [
  { name: "Akamai Technologies",          color: "#009BDE" },
  { name: "Y Combinator / Jam It!",       color: "#FF6600" },
  { name: "Handshake AI Fellowship",      color: "#D3FB52" },
  { name: "Hamilton Broadcast Eng.",      color: "#1A1A2E", darkColor: "#9BA3C9" },
  { name: "MIT",                          color: "#A31F34", darkColor: "#E25F6C" },
  { name: "Argonne National Laboratory",  color: "#004B87", darkColor: "#58A0DC" },
  { name: "Northwestern University",      color: "#4E2A84", darkColor: "#A493D6" },
  { name: "Glenbrook South High School",  color: "#002147", darkColor: "#7FA3D1" },
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
            {/* Theme-conditional color is resolved in CSS (.marquee-name in
                globals.css) so the flip is instant with next-themes' class
                toggle — no client re-render or theme hook needed here. */}
            <span
              className="marquee-name font-display font-semibold whitespace-nowrap px-10"
              style={
                {
                  fontSize: "clamp(18px, 2.5vw, 32px)",
                  // Full-opacity brand color — matches the Experience page
                  // exactly (no dimming), rather than blending toward the
                  // background.
                  "--marquee-color": company.color,
                  "--marquee-color-dark":
                    "darkColor" in company ? company.darkColor : company.color,
                } as React.CSSProperties
              }
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
