import type { Metadata } from "next";

// Metadata-only wrapper — page.tsx is a client component and can't export
// metadata itself. Renders nothing extra.
export const metadata: Metadata = {
  title: "Extracurriculars",
  description:
    "Extracurricular activities and leadership by Dominik Grzeszczak — MIT EECS '28.",
  alternates: { canonical: "/extracurriculars" },
};

export default function ExtracurricularsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
