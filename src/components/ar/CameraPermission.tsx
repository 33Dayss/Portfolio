"use client";

import { Box, Camera, Loader2, ShieldCheck, X } from "lucide-react";
import GlassButton from "@/components/ui/GlassButton";
import type { Project } from "@/types/project";

interface CameraPermissionProps {
  project: Project;
  probing: boolean;
  onAllow: () => void;
  onUse3D: () => void;
  onClose: () => void;
}

export default function CameraPermission({ project, probing, onAllow, onUse3D, onClose }: CameraPermissionProps) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(60%_50%_at_50%_0%,rgba(255,255,255,0.07),transparent)] p-5">
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] grid h-11 w-11 place-items-center rounded-full text-neutral-400 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <X className="h-5 w-5" aria-hidden />
      </button>

      <div className="w-full max-w-sm rounded-3xl border border-white/[0.08] bg-surface-raised p-7 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white/[0.07] text-white">
          <Camera className="h-6 w-6" aria-hidden />
        </div>

        <h2 className="mt-6 text-xl font-semibold tracking-tight text-neutral-50">Permitir o uso da câmera</h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-400">
          Para mostrar {project.title} em AR, o navegador vai pedir acesso à câmera. Ela só reconhece a imagem do projeto
          e posiciona o modelo 3D sobre ela.
        </p>

        <p className="mt-4 flex items-center justify-center gap-2 text-xs text-neutral-500">
          <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden />
          O vídeo fica no seu aparelho: nada é gravado nem enviado.
        </p>

        <div className="mt-7 flex flex-col gap-3">
          <GlassButton variant="solid" onClick={onAllow} disabled={probing} className="h-12 w-full">
            {probing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Aguardando permissão
              </>
            ) : (
              "Permitir câmera"
            )}
          </GlassButton>
          <button
            type="button"
            onClick={onUse3D}
            disabled={probing}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/15 text-sm font-medium text-neutral-200 transition hover:bg-white/5 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <Box className="h-4 w-4" aria-hidden />
            Ver só em 3D
          </button>
        </div>
      </div>
    </div>
  );
}
