export {};

declare global {
  interface Window {
    // A-Frame e MindAR são carregados sob demanda por CDN (ver lib/ar-runtime.ts)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    AFRAME?: any;
  }
}
