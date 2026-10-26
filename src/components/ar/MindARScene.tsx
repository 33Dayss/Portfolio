"use client";

import { useEffect, useRef } from "react";
import { registerFitToTarget } from "@/lib/aframe-components";
import { loadARRuntime } from "@/lib/ar-runtime";
import type { Project } from "@/types/project";

interface MindARSceneProps {
  project: Project;
  onReady: () => void;
  onTargetChange: (found: boolean) => void;
  onModelStatus: (status: "ready" | "error") => void;
  onError: (error: unknown) => void;
}

function buildSceneHTML({ ar }: Project): string {
  const size = ar.modelSize ?? 0.6;
  return `
<a-scene
  mindar-image="imageTargetSrc: ${ar.mind}; autoStart: false; uiLoading: no; uiScanning: no; uiError: no; filterMinCF: 0.001; filterBeta: 1000; missTolerance: 10;"
  renderer="alpha: true; antialias: true"
  xr-mode-ui="enabled: false"
  device-orientation-permission-ui="enabled: false"
  embedded>
  <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
  <a-light type="ambient" intensity="1.1"></a-light>
  <a-light type="directional" intensity="1.4" position="1 2 2"></a-light>
  <a-entity id="ar-target" mindar-image-target="targetIndex: ${ar.targetIndex}">
    <a-gltf-model
      id="ar-model"
      src="${ar.model}"
      fit-to-target="size: ${size}"
      position="0 0 ${size / 2 + 0.05}"
      animation="property: rotation; to: 0 360 0; loop: true; dur: 14000; easing: linear">
    </a-gltf-model>
  </a-entity>
</a-scene>`;
}

/**
 * A cena do A-Frame é montada de forma imperativa dentro do <div>: o React não controla
 * esse DOM, então não há conflito com o que o A-Frame e o MindAR inserem (canvas e <video>).
 */
export default function MindARScene(props: MindARSceneProps) {
  const { project } = props;
  const containerRef = useRef<HTMLDivElement>(null);

  // Callbacks sempre atualizados, sem reiniciar a câmera a cada render.
  const callbacks = useRef(props);
  useEffect(() => {
    callbacks.current = props;
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let system: any = null;
    let onVisibility: (() => void) | null = null;

    (async () => {
      try {
        await loadARRuntime();
        if (cancelled) return;

        registerFitToTarget();
        container.innerHTML = buildSceneHTML(project);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const scene = container.querySelector("a-scene") as any;
        const target = scene.querySelector("#ar-target");
        const model = scene.querySelector("#ar-model");

        // Listeners antes do "loaded": o modelo pode terminar de carregar antes do evento da cena.
        target.addEventListener("targetFound", () => callbacks.current.onTargetChange(true));
        target.addEventListener("targetLost", () => callbacks.current.onTargetChange(false));
        model.addEventListener("model-loaded", () => callbacks.current.onModelStatus("ready"));
        model.addEventListener("model-error", (event: Event) => {
          console.error("Erro ao carregar o modelo 3D:", (event as CustomEvent).detail);
          callbacks.current.onModelStatus("error");
        });

        if (!scene.hasLoaded) {
          await new Promise<void>((resolve) => scene.addEventListener("loaded", () => resolve(), { once: true }));
        }
        if (cancelled) return;
        if (model.getObject3D?.("mesh")) callbacks.current.onModelStatus("ready");

        system = scene.systems["mindar-image-system"];
        await system.start();

        if (cancelled) {
          // O visitante fechou enquanto a câmera iniciava: garante que ela seja liberada.
          try {
            system.stop();
          } catch {}
          return;
        }

        onVisibility = () => {
          if (document.hidden) system.pause(true);
          else system.unpause();
        };
        document.addEventListener("visibilitychange", onVisibility);

        callbacks.current.onReady();
      } catch (error) {
        if (!cancelled) callbacks.current.onError(error);
      }
    })();

    return () => {
      cancelled = true;
      if (onVisibility) document.removeEventListener("visibilitychange", onVisibility);
      try {
        system?.stop(); // desliga a câmera e remove o <video>
      } catch (error) {
        console.warn("O MindAR já estava parado.", error);
      }
      container.innerHTML = "";
    };
  }, [project]);

  // `isolate` cria um contexto de empilhamento: o <video> do MindAR (z-index negativo)
  // fica visível dentro do container e nunca some atrás do fundo da página.
  return <div ref={containerRef} className="absolute inset-0 isolate overflow-hidden bg-black" />;
}
