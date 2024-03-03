import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import { buildHeadLinks, buildHeadMeta } from "@/main/routes/seo-head";
import { getLocale, localeDomains } from "@/main/presentation/common/i18n";
import { LocaleSwitcher } from "@/main/presentation/components/ui/locale-switcher";

const LAST_MATCH_INDEX = -1;

export const Route = createRootRoute({
  component: RootLayout,
  head: ({ matches }) => {
    const locale = getLocale();

    const match = matches.at(LAST_MATCH_INDEX);

    if (!match) {
      throw new Error("No pathname found for the last match");
    }

    const { pathname } = match;

    const canonicalUrl = `${localeDomains[locale]}${pathname}`;

    return {
      links: buildHeadLinks(pathname, canonicalUrl),
      meta: buildHeadMeta(locale, canonicalUrl),
    };
  },
});

function RootLayout() {
  return (
    <html lang={getLocale()}>
      <head>
        <HeadContent />
      </head>
      <body className="dark bg-background text-foreground antialiased">
        <LocaleSwitcher />
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
