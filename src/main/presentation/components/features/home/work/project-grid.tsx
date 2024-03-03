import { m } from "@/main/presentation/common/i18n";

const projects = [
  {
    code: "01",
    description: m.project1Description(),
    stack: m.project1Stack(),
    title: m.project1Title(),
  },
  {
    code: "02",
    description: m.project2Description(),
    stack: m.project2Stack(),
    title: m.project2Title(),
  },
  {
    code: "03",
    description: m.project3Description(),
    stack: m.project3Stack(),
    title: m.project3Title(),
  },
];

export function ProjectGrid() {
  return (
    <div className="flex flex-col">
      {projects.map((project) => (
        <article className="border-b border-border py-7 first:border-t" key={project.code}>
          <div className="mb-3 flex items-baseline justify-between gap-6">
            <h3 className="font-heading text-lg font-semibold text-foreground sm:text-xl">
              {project.title}
            </h3>
            <span className="shrink-0 font-mono text-xs text-accent">{project.code}</span>
          </div>
          <p className="mb-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {project.description}
          </p>
          <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
            {project.stack}
          </p>
        </article>
      ))}
    </div>
  );
}
