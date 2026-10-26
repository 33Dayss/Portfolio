"use client";

import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { cameraErrorMessage, probeCamera } from "@/lib/camera";
import type { Project } from "@/types/project";
import CameraPermission from "./CameraPermission";
import MindARScene from "./MindARScene";
import ModelFallback from "./ModelFallback";
import ProjectOverlay from "./ProjectOverlay";

type Phase = "permission" | "ar" | "fallback";
type ModelStatus = "loading" | "ready" | "error";

interface ARExperienceProps {
  project: Project;
  onClose: () => void;
}

/**
 * Orquestra o fluxo: pedido de permissão amigável -> AR (MindAR) -> fallback 3D
 * se a câmera for negada, não existir, ou o rastreamento não iniciar.
 */
export default function ARExperience({ project, onClose }: ARExperienceProps) {
  const [phase, setPhase] = useState<Phase>("permission");
  const [probing, setProbing] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [arReady, setArReady] = useState(false);
  const [targetFound, setTargetFound] = useState(false);
  const [modelStatus, setModelStatus] = useState<ModelStatus>("loading");

  // Trava o scroll da página enquanto o visualizador está aberto.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const requestCamera = useCallback(async () => {
    setProbing(true);
    const result = await probeCamera();
    setProbing(false);

    if (result.ok) {
      setArReady(false);
      setTargetFound(false);
      setModelStatus("loading");
      setNotice(null);
      setPhase("ar");
    } else {
      setNotice(result.message);
      setPhase("fallback");
    }
  }, []);

  const use3D = useCallback(() => {
    setNotice(null);
    setPhase("fallback");
  }, []);

  const handleARError = useCallback((error: unknown) => {
    console.error("Falha ao iniciar o AR:", error);
    setNotice(cameraErrorMessage(error));
    setPhase("fallback");
  }, []);

  const switchMode = useCallback(() => {
    if (phase === "ar") use3D();
    else setPhase("permission");
  }, [phase, use3D]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Visualizador: ${project.title}`}
      className="fixed inset-0 z-50 animate-fade-in bg-surface"
    >
      {phase === "ar" && (
        <>
          <MindARScene
            project={project}
            onReady={() => setArReady(true)}
            onTargetChange={setTargetFound}
            onModelStatus={setModelStatus}
            onError={handleARError}
          />
          {!arReady && (
            <div className="glass absolute inset-0 z-20 grid place-items-center rounded-none border-0 bg-black/40 backdrop-blur-3xl">
              <div className="flex flex-col items-center gap-4 text-sm text-white/85">
                <Loader2 className="h-7 w-7 animate-spin" aria-hidden />
                Iniciando a câmera
              </div>
            </div>
          )}
        </>
      )}

      {phase === "fallback" && <ModelFallback modelUrl={project.ar.model} />}

      {phase === "permission" ? (
        <CameraPermission project={project} probing={probing} onAllow={requestCamera} onUse3D={use3D} onClose={onClose} />
      ) : (
        <ProjectOverlay
          project={project}
          mode={phase === "ar" ? "ar" : "3d"}
          arReady={arReady}
          targetFound={targetFound}
          modelStatus={modelStatus}
          notice={notice}
          onClose={onClose}
          onSwitchMode={switchMode}
        />
      )}
    </div>
  );
}
