import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export default function GlassPanel({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("glass rounded-3xl", className)} {...rest}>
      {children}
    </div>
  );
}
