import type { Profile } from "@/types/project";

export default function SiteFooter({ profile }: { profile: Profile }) {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-5 py-8 text-sm text-neutral-500 sm:flex-row sm:justify-between">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <a href={`mailto:${profile.email}`} className="transition hover:text-neutral-200">
          {profile.email}
        </a>
      </div>
    </footer>
  );
}
