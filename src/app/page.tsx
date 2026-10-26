import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

export default function HomePage() {
  return (
    <>
      <SiteHeader profile={profile} />
      <main>
        <Hero profile={profile} />
        <ProjectGrid projects={projects} />
      </main>
      <SiteFooter profile={profile} />
    </>
  );
}
