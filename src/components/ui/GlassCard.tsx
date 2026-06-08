import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

// TODO: Implement frosted glass effect with backdrop-blur and transparency
interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
