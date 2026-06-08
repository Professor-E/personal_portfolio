import type { ReactNode } from "react";

// TODO: Implement text animation variants (fade-in, slide-up, typewriter) using framer-motion
interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
}

export default function AnimatedText({ children, className }: AnimatedTextProps) {
  return <span className={className}>{children}</span>;
}
