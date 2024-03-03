import { HighlightGrid } from "@/main/presentation/components/features/home/hero/highlight-grid";
import { SocialActions } from "@/main/presentation/components/features/home/hero/social-actions";
import { m } from "@/main/presentation/common/i18n";

export function HeroCopy() {
  return (
    <div>
      <div className="mb-7 font-mono text-sm text-muted-foreground">~/levi-eber $ whoami</div>

      <h1 className="mb-6 font-heading text-[clamp(2.75rem,9vw,5.5rem)] leading-[0.98] font-semibold tracking-tight text-foreground">
        Levi Eber
        <span className="text-accent animate-[blink_1.2s_step-end_infinite]">_</span>
      </h1>

      <p className="mb-5 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
        {m.heroSubtitle()}
      </p>

      <div className="mb-9 font-mono text-sm text-muted-foreground">{m.heroTagline()}</div>

      <SocialActions />

      <HighlightGrid />
    </div>
  );
}
