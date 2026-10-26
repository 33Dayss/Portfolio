export interface ProjectAR {
  /** Caminho público do modelo .glb (ex.: /models/obra1.glb) */
  model: string;
  /** Caminho público do arquivo .mind compilado (ex.: /ar/targets.mind) */
  mind: string;
  /** Posição da imagem dentro do .mind (mesma ordem em que foi compilado) */
  targetIndex: number;
  /** Tamanho do modelo em relação à largura da imagem (1 = largura inteira). Padrão: 0.6 */
  modelSize?: number;
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  year: string;
  tech: string[];
  ar: ProjectAR;
}

export interface Profile {
  name: string;
  role: string;
  intro: string;
  email: string;
}
