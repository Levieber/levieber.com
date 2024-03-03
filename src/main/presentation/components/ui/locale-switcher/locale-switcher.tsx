import { type Locale, getLocale, locales, m, setLocale } from "@/main/presentation/common/i18n";
import type { MouseEvent } from "react";
import { cn } from "@/main/presentation/common/styles/class-name.helper";

function localeLabel(locale: Locale): string {
  const labels: Record<Locale, string> = {
    en: m.localeEnglish(),
    "pt-BR": m.localePortugueseBrazil(),
  };

  return labels[locale];
}

function isLocale(value: string | undefined): value is Locale {
  if (value === undefined) {
    return false;
  }
  return (locales as readonly string[]).includes(value);
}

function handleLocaleClick(event: MouseEvent<HTMLButtonElement>) {
  const { locale } = event.currentTarget.dataset;
  if (isLocale(locale)) {
    void setLocale(locale);
  }
}

export function LocaleSwitcher() {
  const currentLocale = getLocale();

  return (
    <nav
      aria-label={m.languageSelectorLabel()}
      className="fixed top-4 right-4 z-50 flex items-center gap-1.5 sm:top-6 sm:right-6"
    >
      {locales.map((locale) => (
        <button
          aria-pressed={locale === currentLocale}
          className={cn(
            "rounded-sm border px-2.5 py-1.5 font-mono text-xs transition-colors",
            locale === currentLocale
              ? "border-foreground bg-foreground text-background"
              : "border-border text-muted-foreground hover:border-accent hover:text-foreground",
          )}
          data-locale={locale}
          key={locale}
          onClick={handleLocaleClick}
          type="button"
        >
          {localeLabel(locale)}
        </button>
      ))}
    </nav>
  );
}
