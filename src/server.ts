import handler from "@tanstack/react-start/server-entry";
import { i18nMiddleware } from "@/main/presentation/common/i18n/i18n-middleware";
import { resolveDomainRedirect } from "@/main/presentation/common/i18n/domain-redirect";

const PERMANENT_REDIRECT_STATUS = 301;

export default {
  fetch(request: Request): Promise<Response> {
    const redirectUrl = resolveDomainRedirect(request);

    if (redirectUrl !== undefined) {
      return Promise.resolve(
        new Response(undefined, {
          headers: { Location: redirectUrl },
          status: PERMANENT_REDIRECT_STATUS,
        }),
      );
    }

    return i18nMiddleware(request, () => handler.fetch(request));
  },
};
