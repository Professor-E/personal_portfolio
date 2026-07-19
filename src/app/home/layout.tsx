import type { Metadata } from "next";

// Metadata-only wrapper — page.tsx is a client component and can't export
// metadata itself. Renders nothing extra.
export const metadata: Metadata = {
  alternates: { canonical: "/home" },
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
