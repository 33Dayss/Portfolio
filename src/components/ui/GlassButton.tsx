import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "glass" | "solid";
}

export default function GlassButton({ variant = "glass", className, children, ...rest }: GlassButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "pointer-events-auto inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-medium transition duration-200 active:scale-95 disabled:opacity-50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
        variant === "glass" ? "glass hover:bg-white/15" : "bg-white text-neutral-950 hover:bg-neutral-200",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
