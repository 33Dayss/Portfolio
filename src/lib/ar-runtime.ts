// A-Frame e MindAR só são baixados quando o visitante demonstra intenção de abrir o AR
// (hover/foco no botão ou clique). Assim a página inicial continua leve.
export const AFRAME_SRC = "https://aframe.io/releases/1.5.0/aframe.min.js";
export const MINDAR_SRC = "https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js";

const scripts = new Map<string, Promise<void>>();

function loadScript(src: string): Promise<void> {
  const cached = scripts.get(src);
  if (cached) return cached;

  const promise = new Promise<void>((resolve, reject) => {
    const el = document.createElement("script");
    el.src = src;
    el.async = true;
    el.onload = () => resolve();
    el.onerror = () => {
      scripts.delete(src);
      el.remove();
      reject(new Error(`Não foi possível carregar ${src}`));
    };
    document.head.appendChild(el);
  });

  scripts.set(src, promise);
  return promise;
}

let runtime: Promise<void> | null = null;

/** Carrega A-Frame e, depois, MindAR (a ordem importa). Seguro para chamar várias vezes. */
export function loadARRuntime(): Promise<void> {
  if (!runtime) {
    runtime = (async () => {
      if (!window.AFRAME) await loadScript(AFRAME_SRC);
      if (!window.AFRAME?.systems?.["mindar-image-system"]) await loadScript(MINDAR_SRC);
    })().catch((err) => {
      runtime = null;
      throw err;
    });
  }
  return runtime;
}

export function preloadARRuntime(): void {
  if (typeof window === "undefined") return;
  loadARRuntime().catch(() => {});
}
