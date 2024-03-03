import { ProjectGrid } from "@/main/presentation/components/features/home/work/project-grid";
import { WorkHeader } from "@/main/presentation/components/features/home/work/header";

export function WorkSection() {
  return (
    <section className="px-6 py-16 sm:px-8 sm:py-20" id="work">
      <div className="mx-auto max-w-3xl">
        <WorkHeader />
        <ProjectGrid />
      </div>
    </section>
  );
}
