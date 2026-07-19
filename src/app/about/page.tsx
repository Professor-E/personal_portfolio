import AboutPage from "@/components/about/AboutPage";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Electrical Engineer, Computer Scientist, Builder, and Problem Solver. MIT EECS '28.",
  alternates: { canonical: "/about" },
};

export default function AboutRoute() {
  return <AboutPage />;
}
