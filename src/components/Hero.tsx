import { ArrowDown, Mail } from "lucide-react";
import ScanCorners from "@/components/ui/ScanCorners";
import type { Profile } from "@/types/project";

export default function Hero({ profile }: { profile: Profile }) {
  return (
    <section className="mx-auto max-w-5xl px-5 pb-16 pt-10 sm:pb-24 sm:pt-20">
      <div className="relative px-5 py-12 sm:px-12 sm:py-20">
        <ScanCorners className="inset-0" cornerClassName="h-5 w-5 border-white/20 sm:h-7 sm:w-7" />

        <h1 className="text-5xl font-semibold leading-[1.02] tracking-tighter text-neutral-50 sm:text-7xl">
          {profile.name}
        </h1>
        <p className="mt-4 text-xl font-medium tracking-tight text-neutral-300 sm:text-2xl">{profile.role}</p>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-400 sm:text-lg">{profile.intro}</p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#projetos"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-neutral-950 transition hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            Ver projetos
            <ArrowDown className="h-4 w-4" aria-hidden />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-medium text-neutral-200 transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <Mail className="h-4 w-4" aria-hidden />
            Enviar e-mail
          </a>
        </div>
      </div>
    </section>
  );
}
