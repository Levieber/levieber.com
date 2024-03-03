import { type Locale, localeDomains, locales, m } from "@/main/presentation/common/i18n";
import appCss from "@/main/presentation/common/styles/globals.css?url";

const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  "pt-BR": "pt_BR",
};

function alternateOpenGraphLocales(locale: Locale) {
  const alternates: { content: string; property: string }[] = [];

  for (const otherLocale of locales) {
    if (otherLocale !== locale) {
      alternates.push({ content: openGraphLocales[otherLocale], property: "og:locale:alternate" });
    }
  }

  return alternates;
}

export function buildHeadLinks(pathname: string, canonicalUrl: string) {
  return [
    { href: appCss, rel: "stylesheet" },
    { href: "/favicon.svg", rel: "icon", type: "image/svg+xml" },
    { href: "/favicon-16.png", rel: "icon", sizes: "16x16", type: "image/png" },
    { href: "/favicon-32.png", rel: "icon", sizes: "32x32", type: "image/png" },
    { href: "/apple-touch-icon.png", rel: "apple-touch-icon" },
    { href: canonicalUrl, rel: "canonical" },
    ...locales.map((alternateLocale) => ({
      href: `${localeDomains[alternateLocale]}${pathname}`,
      hrefLang: alternateLocale,
      rel: "alternate",
    })),
    { href: `${localeDomains.en}${pathname}`, hrefLang: "x-default", rel: "alternate" },
  ];
}

export function buildHeadMeta(locale: Locale, canonicalUrl: string) {
  const imageUrl = `${localeDomains[locale]}/og/${locale}.png`;

  return [
    { title: m.appTitle() },
    { content: m.appDescription(), name: "description" },
    { charSet: "utf-8" },
    { content: "width=device-width, initial-scale=1", name: "viewport" },
    { content: "#0A0A0C", name: "theme-color" },
    { content: "website", property: "og:type" },
    { content: m.appTitle(), property: "og:site_name" },
    { content: m.appTitle(), property: "og:title" },
    { content: m.appDescription(), property: "og:description" },
    { content: canonicalUrl, property: "og:url" },
    { content: openGraphLocales[locale], property: "og:locale" },
    ...alternateOpenGraphLocales(locale),
    { content: imageUrl, property: "og:image" },
    { content: "1200", property: "og:image:width" },
    { content: "630", property: "og:image:height" },
    { content: m.appTitle(), property: "og:image:alt" },
    { content: "summary_large_image", name: "twitter:card" },
    { content: m.appTitle(), name: "twitter:title" },
    { content: m.appDescription(), name: "twitter:description" },
    { content: imageUrl, name: "twitter:image" },
  ];
}
