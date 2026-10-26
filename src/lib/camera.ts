export type CameraProbe = { ok: true } | { ok: false; message: string };

const MENSAGENS: Record<string, string> = {
  NotAllowedError: "A permissão da câmera foi negada.",
  NotFoundError: "Nenhuma câmera foi encontrada neste dispositivo.",
  NotReadableError: "A câmera está em uso por outro app ou aba.",
  OverconstrainedError: "A câmera traseira não está disponível neste dispositivo.",
  SecurityError: "O navegador bloqueou a câmera por segurança."
};

const MENSAGEM_PADRAO = "Não foi possível iniciar a realidade aumentada neste dispositivo.";

export function cameraErrorMessage(error: unknown): string {
  const name = typeof error === "object" && error !== null && "name" in error ? String((error as { name: unknown }).name) : "";
  return MENSAGENS[name] ?? MENSAGEM_PADRAO;
}

/** Pede a câmera uma vez (para disparar o aviso do navegador) e já libera em seguida. */
export async function probeCamera(): Promise<CameraProbe> {
  if (!window.isSecureContext) {
    return { ok: false, message: "A câmera só funciona em conexão segura (HTTPS)." };
  }
  if (!navigator.mediaDevices?.getUserMedia) {
    return { ok: false, message: "Este navegador não permite acessar a câmera." };
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
    stream.getTracks().forEach((track) => track.stop());
    return { ok: true };
  } catch (error) {
    return { ok: false, message: cameraErrorMessage(error) };
  }
}

export function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}
