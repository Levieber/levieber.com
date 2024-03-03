import { ArrowUpRightIcon } from "lucide-react";
import { ExternalLink } from "@/main/presentation/components/ui";
import { m } from "@/main/presentation/common/i18n";

export function ContactSection() {
  return (
    <section className="border-t border-border px-6 py-10 sm:px-8" id="contact">
      <div className="mx-auto flex max-w-3xl flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <p className="max-w-sm text-sm text-muted-foreground">{m.contactDescription()}</p>
        <ExternalLink
          className="inline-flex w-fit items-center gap-1.5 font-mono text-sm text-foreground transition-colors hover:text-accent"
          href={`mailto:${m.contactEmail()}`}
        >
          {m.contactEmail()}
          <ArrowUpRightIcon className="size-4" />
        </ExternalLink>
      </div>
      <div className="mx-auto mt-8 max-w-3xl font-mono text-xs text-muted-foreground">
        © {new Date().getFullYear()} Levi Eber
      </div>
    </section>
  );
}
