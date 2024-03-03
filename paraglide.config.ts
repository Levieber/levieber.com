import type { CompilerOptions } from "@inlang/paraglide-js";

export default {
  cookieName: "PARAGLIDE_LOCALE",
  emitTsDeclarations: true,
  outdir: "./src/infrastructure/generated/paraglide",
  outputStructure: "message-modules",
  project: "./project.inlang",
  strategy: ["url", "cookie", "preferredLanguage", "baseLocale"],
  urlPatterns: [
    // Production: locale is owned by the domain, not a path prefix.
    // Levieber.com serves English; levieber.com.br serves Portuguese.
    {
      localized: [
        ["en", "https://levieber.com/:path(.*)?"],
        ["pt-BR", "https://levieber.com.br/:path(.*)?"],
      ],
      pattern: "https://levieber.com/:path(.*)?",
    },
    // Fallback for non-production hosts (localhost, previews): path prefixes.
    {
      localized: [
        ["pt-BR", "/pt-BR"],
        ["en", "/en"],
      ],
      pattern: "/",
    },
    {
      localized: [
        ["pt-BR", "/pt-BR/:path(.*)?"],
        ["en", "/en/:path(.*)?"],
      ],
      pattern: "/:path(.*)?",
    },
  ],
} as CompilerOptions;
