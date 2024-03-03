import { localeDomains } from "./locale-domains";

const PT_BR_PREFIX = /^\/pt-BR(?:\/|$)/iu;

/**
 * Legacy redirect: levieber.com/pt-BR predates locales being split by
 * domain. Requests to it are sent to the equivalent path on levieber.com.br,
 * which owns the pt-BR locale going forward.
 *
 * This mirrors the redirect rule configured at the edge so the correct redirect still happens if a request reaches the
 * origin directly.
 */
export function resolveDomainRedirect(request: Request): string | undefined {
  const url = new URL(request.url);

  if (url.hostname !== "levieber.com" || !PT_BR_PREFIX.test(url.pathname)) {
    return undefined;
  }

  const target = new URL(url.pathname.replace(PT_BR_PREFIX, "/"), localeDomains["pt-BR"]);
  target.search = url.search;

  return target.href;
}
