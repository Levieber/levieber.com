import { deLocalizeUrl, localizeUrl } from "@/main/presentation/common/i18n";
import { ErrorPage } from "@/main/presentation/components/features/error/error";
import { NotFoundPage } from "@/main/presentation/components/features/error/not-found";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "@/infrastructure/generated/routeTree.gen";

export function getRouter() {
  const router = createRouter({
    defaultErrorComponent: ErrorPage,
    defaultNotFoundComponent: NotFoundPage,
    rewrite: {
      input: ({ url }) => deLocalizeUrl(url),
      output: ({ url }) => localizeUrl(url),
    },
    routeTree,
    scrollRestoration: true,
  });

  return router;
}
