import { describe, expect, it } from "vitest";
import { getRouter } from "@/main/composition/router";

function rewriteInboundUrl(url: URL): URL {
  const { rewrite } = getRouter().options;
  const { input } = rewrite ?? {};
  return new URL((typeof input === "function" ? input({ url }) : undefined) ?? url);
}

function rewriteOutboundUrl(url: URL): URL {
  const { rewrite } = getRouter().options;
  const { output } = rewrite ?? {};
  return new URL((typeof output === "function" ? output({ url }) : undefined) ?? url);
}

describe("router entry", () => {
  it("re-exports the composed router factory", () => {
    expect.hasAssertions();

    expect(getRouter).toBeTypeOf("function");
  });

  it("builds a router configured with error components and locale-aware rewrites", () => {
    expect.hasAssertions();

    const router = getRouter();

    expect(router.options.defaultErrorComponent).toBeTypeOf("function");
    expect(router.options.defaultNotFoundComponent).toBeTypeOf("function");
    expect(router.options.scrollRestoration).toBe(true);
  });

  it("de-localizes inbound urls", () => {
    expect.hasAssertions();

    const inboundUrl = new URL("https://levieber.com.br/work");

    expect(rewriteInboundUrl(inboundUrl).pathname).toBe("/work");
  });

  it("localizes outbound urls to the domain that owns the current locale", () => {
    expect.hasAssertions();

    const outboundUrl = new URL("https://levieber.com.br/work");

    expect(rewriteOutboundUrl(outboundUrl).href).toBe("https://levieber.com/work");
  });
});
