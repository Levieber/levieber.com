import type { locales } from "@/infrastructure/generated/paraglide/runtime.js";

export { m } from "@/infrastructure/generated/paraglide/messages.js";
export {
  deLocalizeUrl,
  getLocale,
  localizeUrl,
  locales,
  setLocale,
} from "@/infrastructure/generated/paraglide/runtime.js";

export type Locale = (typeof locales)[number];
