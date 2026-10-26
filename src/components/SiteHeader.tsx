import type { Profile } from "@/types/project";

export default function SiteHeader({ profile }: { profile: Profile }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-surface/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
        <a href="#" className="text-sm font-semibold tracking-tight text-neutral-100">
          {profile.name}
        </a>
        <nav className="flex items-center gap-5 text-sm text-neutral-400">
          <a href="#projetos" className="transition hover:text-white">
            Projetos
          </a>
          <a href={`mailto:${profile.email}`} className="transition hover:text-white">
            Contato
          </a>
        </nav>
      </div>
    </header>
  );
}
