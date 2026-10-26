"use client";

import { ArrowLeft, Box, ChevronDown, ChevronUp, ScanLine } from "lucide-react";
import { useState } from "react";
import GlassButton from "@/components/ui/GlassButton";
import GlassPanel from "@/components/ui/GlassPanel";
import ScanCorners from "@/components/ui/ScanCorners";
import TechBadge from "@/components/ui/TechBadge";
import { cn } from "@/lib/cn";
import type { Project } from "@/types/project";

interface ProjectOverlayProps {
  project: Project;
  mode: "ar" | "3d";
  arReady: boolean;
  targetFound: boolean;
  modelStatus: "loading" | "ready" | "error";
  notice: string | null;
  onClose: () => void;
  onSwitchMode: () => void;
}

function describeStatus({ mode, arReady, targetFound, modelStatus }: ProjectOverlayProps) {
  if (mode === "3d") return { label: "Arraste para girar o modelo", tone: "idle" as const };
  if (!arReady) return { label: "Iniciando a câmera", tone: "idle" as const };
  if (!targetFound) return { label: "Procurando a imagem do projeto", tone: "idle" as const };
  if (modelStatus === "error") return { label: "Erro ao carregar o modelo", tone: "error" as const };
  if (modelStatus === "loading") return { label: "Carregando o modelo 3D", tone: "idle" as const };
  return { label: "Projeto detectado", tone: "ok" as const };
}

/** Interface de vidro por cima da câmera (ou do modelo 3D): voltar, estado, trocar de modo e ficha do projeto. */
export default function ProjectOverlay(props: ProjectOverlayProps) {
  const { project, mode, arReady, targetFound, notice, onClose, onSwitchMode } = props;
  const [open, setOpen] = useState(true);
  const status = describeStatus(props);

  return (
    <div className="pointer-events-none absolute inset-0 z-30">
      {mode === "ar" && arReady && !targetFound && (
        <ScanCorners className="left-1/2 top-1/2 h-[min(64vw,320px)] w-[min(64vw,320px)] -translate-x-1/2 -translate-y-1/2" />
      )}

      <header className="absolute inset-x-0 top-0 flex flex-col gap-3 px-4 pb-4 pt-[max(1rem,env(safe-area-inset-top))]">
        <div className="flex items-center justify-between gap-3">
          <GlassButton onClick={onClose} aria-label="Voltar">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">Voltar</span>
          </GlassButton>

          <div
            role="status"
            className="glass pointer-events-auto flex min-w-0 items-center gap-2.5 rounded-full px-4 py-2.5 text-xs font-medium sm:text-sm"
          >
            <span
              aria-hidden
              className={cn(
                "h-2 w-2 shrink-0 rounded-full",
                status.tone === "ok" && "bg-emerald-400",
                status.tone === "error" && "bg-red-400",
                status.tone === "idle" && "animate-pulse bg-neutral-300"
              )}
            />
            <span className="truncate">{status.label}</span>
          </div>

          <GlassButton
            onClick={onSwitchMode}
            aria-label={mode === "ar" ? "Ver em 3D" : "Tentar em AR"}
            className="px-3 sm:px-4"
          >
            {mode === "ar" ? <Box className="h-4 w-4" aria-hidden /> : <ScanLine className="h-4 w-4" aria-hidden />}
            <span className="hidden sm:inline">{mode === "ar" ? "Ver em 3D" : "Tentar em AR"}</span>
          </GlassButton>
        </div>

        {notice && (
          <GlassPanel className="pointer-events-auto mx-auto max-w-md rounded-2xl px-4 py-3 text-center text-sm text-white/90">
            {notice} Mostrando o modelo em 3D.
          </GlassPanel>
        )}
      </header>

      <section className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-xl px-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <GlassPanel className="pointer-events-auto relative animate-sheet-up overflow-hidden rounded-[28px] p-5">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.12] to-transparent"
          />

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Recolher informações" : "Expandir informações"}
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white transition active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            {open ? <ChevronDown className="h-4 w-4" aria-hidden /> : <ChevronUp className="h-4 w-4" aria-hidden />}
          </button>

          <div className="relative pr-11">
            <p className="text-xs text-white/60">{project.year}</p>
            <h2 className="mt-1 text-xl font-semibold leading-tight tracking-tight text-white">{project.title}</h2>
          </div>

          {open && (
            <div className="relative mt-3 border-t border-white/15 pt-3">
              <p className="text-sm leading-relaxed text-white/75">{project.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tecnologias usadas">
                {project.tech.map((tech) => (
                  <TechBadge key={tech} onGlass>
                    {tech}
                  </TechBadge>
                ))}
              </ul>
            </div>
          )}
        </GlassPanel>
      </section>
    </div>
  );
}
