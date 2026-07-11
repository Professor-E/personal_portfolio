import { ImageResponse } from "next/og";
import { colors } from "@/lib/tokens";

/**
 * Open Graph share card — code-generated from the design tokens (ambient
 * media pass). Dark-panel look echoing the intro animation: name in white,
 * accent caret, role line beneath. No external assets or fonts, so it renders
 * fully self-contained at the edge.
 */

export const runtime = "edge";
export const alt = "Dominik Grzeszczak — MIT EECS. Portfolio.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const { dark } = colors;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "96px",
          backgroundColor: dark.background,
          backgroundImage: `radial-gradient(90% 90% at 85% 10%, ${dark.accent}26, transparent 60%), radial-gradient(70% 70% at 10% 95%, ${dark.accent}1f, transparent 55%)`,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 84,
            fontWeight: 700,
            color: dark.textPrimary,
            letterSpacing: "-2px",
          }}
        >
          Dominik Grzeszczak
          <div
            style={{
              width: 10,
              height: 76,
              marginLeft: 18,
              backgroundColor: dark.accent,
            }}
          />
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 34,
            color: dark.textSecondary,
          }}
        >
          Electrical Engineering &amp; Computer Science @ MIT
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 28,
            color: dark.accent,
          }}
        >
          Building things that bridge theory and practice.
        </div>
      </div>
    ),
    size
  );
}
