import { describe, expect, it } from "vitest";
import { i18nMiddleware } from "@/main/presentation/common/i18n/i18n-middleware";

describe("i18n middleware module", () => {
  it("re-exports the generated paraglide middleware", () => {
    expect.hasAssertions();

    expect(i18nMiddleware).toBeTypeOf("function");
  });
});
