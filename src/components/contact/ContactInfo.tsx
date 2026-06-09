"use client";

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
      className="flex flex-col h-full w-full"
      style={{
        backgroundColor: "var(--accent)",
        padding: "32px",
        gap: "12px",
      }}
    >
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
              {/* Value — 13px SemiBold, white */}
              <p
                className="font-semibold text-white break-words"
                style={{ fontSize: "13px", lineHeight: 1.3 }}
              >
                {item.value}
              </p>
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
        <div className="flex items-center gap-5">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-white/70 hover:text-white transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-white/70 hover:text-white transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="mailto:dominikgrzeszczak28@gmail.com"
            aria-label="Email"
            className="text-white/70 hover:text-white transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
