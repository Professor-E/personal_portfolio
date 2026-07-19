import type { Metadata } from "next";

// Metadata-only wrapper — page.tsx is a client component and can't export
// metadata itself. Renders nothing extra.
export const metadata: Metadata = {
  description: "What Dominik Grzeszczak is into outside of engineering.",
  alternates: { canonical: "/hobbies" },
};

export default function HobbiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
