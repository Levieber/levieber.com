import type { Locale } from "./translate";

/**
 * Production domain that owns each locale. Mirrors the domain-based
 * `urlPatterns` in `paraglide.config.ts` and is the single source of truth
 * for SEO tags (canonical/hreflang) and the levieber.com/pt-BR redirect.
 */
export const localeDomains: Record<Locale, string> = {
  en: "https://levieber.com",
  "pt-BR": "https://levieber.com.br",
};
