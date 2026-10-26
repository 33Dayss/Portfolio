import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export default function TechBadge({ children, onGlass = false }: { children: ReactNode; onGlass?: boolean }) {
  return (
    <li
      className={cn(
        "rounded-md px-2.5 py-1 text-xs font-medium",
        onGlass ? "bg-white/15 text-white/90" : "bg-white/[0.06] text-neutral-300"
      )}
    >
      {children}
    </li>
  );
}
