import type { Project, ProjectAR } from "@/types/project";

// Troque os textos pelos seus projetos reais.
// Cada projeto precisa de: um .glb em /public/models, um .mind em /public/ar
// (compilado com a imagem que o visitante vai apontar) e o índice da imagem dentro do .mind.
// Os exemplos abaixo reaproveitam o mesmo modelo e o mesmo .mind só para você testar.
const demoAR: ProjectAR = {
  model: "/models/obra1.glb",
  mind: "/ar/targets.mind",
  targetIndex: 0
};

export const projects: Project[] = [
  {
    id: "kubernetes-multi-regiao",
    title: "Cluster Kubernetes multi-região",
    summary: "Clusters em duas regiões com failover automático e deploys declarativos.",
    year: "2025",
    tech: ["Kubernetes", "Terraform", "Argo CD", "AWS"],
    ar: demoAR
  },
  {
    id: "pipeline-ci-cd",
    title: "Pipeline CI/CD automatizado",
    summary: "Build, testes e deploy sem intervenção manual, com rollback em um clique.",
    year: "2025",
    tech: ["GitHub Actions", "Docker", "Helm"],
    ar: demoAR
  },
  {
    id: "observabilidade",
    title: "Observabilidade em tempo real",
    summary: "Métricas, logs e alertas em um só painel.",
    year: "2024",
    tech: ["Prometheus", "Grafana", "Loki"],
    ar: demoAR
  },
  {
    id: "backup-dr",
    title: "Backup e recuperação de desastres",
    summary: "Cópias automáticas e restauração testada todo mês.",
    year: "2024",
    tech: ["Velero", "S3", "Ansible"],
    ar: demoAR
  },
  {
    id: "iac",
    title: "Infraestrutura como código",
    summary: "Ambientes inteiros criados e destruídos a partir de um repositório.",
    year: "2023",
    tech: ["Terraform", "Packer", "Linux"],
    ar: demoAR
  }
];
