import { ScanLine } from "lucide-react";
import TechBadge from "@/components/ui/TechBadge";
import { cn } from "@/lib/cn";
import { preloadARRuntime } from "@/lib/ar-runtime";
import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  onOpenAR: (project: Project) => void;
}

export default function ProjectCard({ project, featured = false, onOpenAR }: ProjectCardProps) {
  return (
    <article
      className={cn(
        "flex flex-col rounded-2xl border border-white/[0.06] bg-surface-raised p-6 transition-colors hover:border-white/15",
        featured && "lg:col-span-2 lg:p-8"
      )}
    >
      <p className="text-sm text-neutral-500">{project.year}</p>

      <h3
        className={cn(
          "mt-6 font-semibold tracking-tight text-neutral-50",
          featured ? "text-2xl sm:text-3xl" : "text-xl"
        )}
      >
        {project.title}
      </h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral-400">{project.summary}</p>

      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tecnologias usadas">
        {project.tech.map((tech) => (
          <TechBadge key={tech}>{tech}</TechBadge>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <button
          type="button"
          onClick={() => onOpenAR(project)}
          onPointerEnter={preloadARRuntime}
          onFocus={preloadARRuntime}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-neutral-950 transition hover:bg-neutral-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-raised sm:w-auto"
        >
          <ScanLine className="h-4 w-4" aria-hidden />
          Visualizar em AR
        </button>
      </div>
    </article>
  );
}
