# Portfólio — galeria de projetos em AR

Next.js (App Router) + Tailwind CSS 3 + MindAR/A-Frame (AR) + React Three Fiber (fallback 3D).

## Rodar

```bash
npm install
npm run dev          # http://localhost:3000 (localhost conta como conexão segura)
npm run dev:https    # para testar no celular: a câmera exige HTTPS
```

Na hora de publicar, qualquer host com HTTPS serve (Vercel, Netlify...).

## Adicionar um projeto

1. Coloque o modelo em `public/models/seu-modelo.glb`.
2. Compile a imagem que o visitante vai apontar em https://hiukim.github.io/mind-ar-js-doc/tools/compile
   e salve o `.mind` em `public/ar/`. Se compilar várias imagens juntas, `targetIndex` é a posição de cada uma.
3. Adicione um item em `src/data/projects.ts`.

## Estrutura

- `src/app` — layout, página inicial (`page.tsx`) e estilos globais
- `src/components` — Hero, ProjectGrid, ProjectCard, SiteHeader/Footer
- `src/components/ui` — GlassButton, GlassPanel, TechBadge, ScanCorners
- `src/components/ar` — ARExperience (fluxo), CameraPermission, MindARScene, ModelFallback, ProjectOverlay
- `src/lib` — carregador do runtime AR, componente A-Frame `fit-to-target`, utilitários de câmera
- `src/data` — perfil e projetos (edite aqui)
