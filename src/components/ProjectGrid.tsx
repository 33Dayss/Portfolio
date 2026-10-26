"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/types/project";

// O visualizador (câmera, A-Frame, Three.js) só entra no bundle quando alguém abre um projeto.
const ARExperience = dynamic(() => import("@/components/ar/ARExperience"), { ssr: false });

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <section id="projetos" className="mx-auto max-w-5xl scroll-mt-20 px-5 pb-24 sm:pb-32">
      <div className="mb-8 max-w-xl">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-50 sm:text-3xl">Projetos</h2>
        <p className="mt-2 text-neutral-400">
          Toque em Visualizar em AR e aponte a câmera para a imagem do projeto. Sem câmera, você vê o modelo em 3D.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} featured={index === 0} onOpenAR={setActive} />
        ))}
      </div>

      {active && <ARExperience project={active} onClose={close} />}
    </section>
  );
}
