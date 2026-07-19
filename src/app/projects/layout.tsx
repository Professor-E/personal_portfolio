import type { Metadata } from "next";

// Metadata-only wrapper — page.tsx is a client component and can't export
// metadata itself. Renders nothing extra.
export const metadata: Metadata = {
  description:
    "Engineering and software projects by Dominik Grzeszczak — MIT EECS '28.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
