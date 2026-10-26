import { cn } from "@/lib/cn";

const CORNERS = [
  "left-0 top-0 border-l-2 border-t-2 rounded-tl-xl",
  "right-0 top-0 border-r-2 border-t-2 rounded-tr-xl",
  "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-xl",
  "bottom-0 right-0 border-b-2 border-r-2 rounded-br-xl"
];

/** Quatro cantos de mira, o mesmo gesto do scanner de AR. Posicione com `className`. */
export default function ScanCorners({
  className,
  cornerClassName = "h-6 w-6 border-white/80"
}: {
  className?: string;
  cornerClassName?: string;
}) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute", className)}>
      {CORNERS.map((corner) => (
        <span key={corner} className={cn("absolute", corner, cornerClassName)} />
      ))}
    </div>
  );
}
