"use client";

import dynamic from "next/dynamic";
import SocialLinks from "./SocialLinks";

// Wireframe 3D ornament — lazy client-only (three.js); renders nothing for
// reduced-motion / coarse-pointer / no-WebGL visitors.
const PanelOrnament = dynamic(() => import("./PanelOrnament"), { ssr: false });

/**
 * Left blue panel — Figma node 616:709
 * No border-radius here — the card wrapper in ContactPage handles it
 * via rounded-[20px] overflow-hidden, which clips this panel cleanly.
 * h-full ensures the panel always matches the right form panel's height.
 */

interface ContactInfoItem {
  label: string;
  value: string;
  icon: React.ReactNode;
}

const EmailIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LocationIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const INFO_ITEMS: ContactInfoItem[] = [
  {
    label: "Email",
    value: "dominikgrzeszczak28@gmail.com",
    icon: <EmailIcon />,
  },
  {
    label: "Location",
    value: "Cambridge, MA",
    icon: <LocationIcon />,
  },
];

export default function ContactInfo() {
  return (
    <div
      // mesh-accent (globals.css): token-derived mesh gradient over the old
      // flat accent fill — part of the ambient media pass. `relative` +
      // `overflow-hidden` contain the PanelOrnament canvas, which bleeds
      // past the bottom-right corner by design.
      className="mesh-accent relative overflow-hidden flex flex-col h-full w-full"
      style={{
        padding: "32px",
        gap: "12px",
      }}
    >
      {/* Slow wireframe icosahedron, bottom-right — pointer-events-none */}
      <PanelOrnament />
      {/* "CONTACT INFORMATION" — 12px Medium, white, tracking-[2px] */}
      <p
        className="font-medium text-white shrink-0"
        style={{ fontSize: "12px", letterSpacing: "2px" }}
      >
        CONTACT INFORMATION
      </p>

      {/* Info items — gap-4 (16px) between rows */}
      <div className="flex flex-col" style={{ gap: "16px" }}>
        {INFO_ITEMS.map((item) => (
          <div
            key={item.label}
            className="flex items-start"
            style={{ gap: "10px" }}
          >
            {/* Icon circle — 26×26px */}
            <div
              className="shrink-0 flex items-center justify-center rounded-full text-white"
              style={{
                width: "26px",
                height: "26px",
                backgroundColor: "rgba(255,255,255,0.2)",
              }}
            >
              {item.icon}
            </div>

            {/* Label + Value */}
            <div className="flex flex-col min-w-0">
              {/* Dimmed label — 13px, rgba(250,250,247,0.56) */}
              <p
                className="font-normal shrink-0"
                style={{
                  fontSize: "13px",
                  color: "rgba(250,250,247,0.56)",
                  lineHeight: 1.2,
                }}
              >
                {item.label}
              </p>
              {/* Value — 13px SemiBold, white. Email is a real mailto: link. */}
              {item.label === "Email" ? (
                <a
                  href={`mailto:${item.value}`}
                  className="font-semibold text-white break-words underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-sm"
                  style={{ fontSize: "13px", lineHeight: 1.3 }}
                >
                  {item.value}
                </a>
              ) : (
                <p
                  className="font-semibold text-white break-words"
                  style={{ fontSize: "13px", lineHeight: 1.3 }}
                >
                  {item.value}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Social links — pushed to bottom with mt-auto */}
      <div className="mt-auto pt-4">
        <p
          className="font-medium text-white mb-3"
          style={{ fontSize: "11px", letterSpacing: "2px" }}
        >
          FIND ME ON
        </p>
        <SocialLinks
          gap={20}
          linkClassName="text-white/70 hover:text-white focus-visible:ring-offset-[var(--accent)] [&_svg]:w-6 [&_svg]:h-6"
        />
      </div>
    </div>
  );
}
