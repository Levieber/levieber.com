import { m } from "@/main/presentation/common/i18n";

export function WorkHeader() {
  return (
    <div className="mb-9 flex flex-col justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-end">
      <div>
        <div className="mb-3 font-mono text-xs tracking-[0.08em] text-accent uppercase">
          ~/selected-work
        </div>
        <h2 className="max-w-xl font-heading text-2xl font-semibold text-foreground sm:text-3xl">
          {m.workHeaderTitle()}
        </h2>
      </div>
      <a
        className="inline-flex w-fit shrink-0 items-center rounded-sm border border-border px-4 py-2.5 font-mono text-sm text-foreground transition-colors hover:border-accent"
        href={`mailto:${m.contactEmail()}`}
      >
        {m.workHeaderCta()}
      </a>
    </div>
  );
}
