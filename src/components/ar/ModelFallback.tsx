"use client";

import { Bounds, Center, OrbitControls, useGLTF, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Loader2 } from "lucide-react";
import { Component, Suspense, useMemo } from "react";
import type { ReactNode } from "react";
import { supportsWebGL } from "@/lib/camera";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

function LoadingIndicator() {
  const { progress } = useProgress();
  if (progress >= 100) return null;
  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center">
      <div className="flex flex-col items-center gap-3 text-sm text-neutral-400">
        <Loader2 className="h-6 w-6 animate-spin" aria-hidden />
        Carregando modelo {Math.round(progress)}%
      </div>
    </div>
  );
}

function Message({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-0 grid place-items-center p-8 text-center text-sm leading-relaxed text-neutral-400">
      <p className="max-w-xs">{children}</p>
    </div>
  );
}

class ModelErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.error("Falha ao carregar o modelo 3D:", error);
  }
  render() {
    if (this.state.failed) {
      return <Message>Não foi possível carregar o modelo 3D. Confira se o arquivo .glb existe em /public/models.</Message>;
    }
    return this.props.children;
  }
}

/** Fallback: o mesmo .glb num Canvas normal, com giro por mouse ou toque e zoom por scroll ou pinça. */
export default function ModelFallback({ modelUrl }: { modelUrl: string }) {
  const webgl = useMemo(() => supportsWebGL(), []);

  if (!webgl) {
    return <Message>Este dispositivo não suporta gráficos 3D no navegador.</Message>;
  }

  return (
    <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_45%,#262626,#121212)]">
      <ModelErrorBoundary>
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0.4, 3], fov: 40 }} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={1.2} />
          <directionalLight position={[3, 5, 4]} intensity={2} />
          <directionalLight position={[-4, 2, -3]} intensity={0.8} />
          <Suspense fallback={null}>
            <Bounds fit observe margin={1.3}>
              <Center>
                <Model url={modelUrl} />
              </Center>
            </Bounds>
          </Suspense>
          <OrbitControls makeDefault enablePan={false} enableDamping dampingFactor={0.08} autoRotate autoRotateSpeed={0.8} />
        </Canvas>
        <LoadingIndicator />
      </ModelErrorBoundary>
    </div>
  );
}
