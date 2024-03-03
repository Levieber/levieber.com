import { describe, expect, it } from "vitest";
import { resolveDomainRedirect } from "@/main/presentation/common/i18n/domain-redirect";

describe("domain redirect: levieber.com/pt-BR", () => {
  it("redirects the bare prefix to the levieber.com.br root", () => {
    expect.hasAssertions();

    const redirectUrl = resolveDomainRedirect(new Request("https://levieber.com/pt-BR"));

    expect(redirectUrl).toBe("https://levieber.com.br/");
  });

  it("redirects a sub-path to the same path on levieber.com.br", () => {
    expect.hasAssertions();

    const redirectUrl = resolveDomainRedirect(new Request("https://levieber.com/pt-BR/work"));

    expect(redirectUrl).toBe("https://levieber.com.br/work");
  });

  it("preserves the query string when redirecting", () => {
    expect.hasAssertions();

    const redirectUrl = resolveDomainRedirect(
      new Request("https://levieber.com/pt-BR/work?ref=newsletter"),
    );

    expect(redirectUrl).toBe("https://levieber.com.br/work?ref=newsletter");
  });

  it("matches the pt-BR prefix case-insensitively", () => {
    expect.hasAssertions();

    const redirectUrl = resolveDomainRedirect(new Request("https://levieber.com/PT-br/work"));

    expect(redirectUrl).toBe("https://levieber.com.br/work");
  });
});

describe("domain redirect: requests that should pass through", () => {
  it("does not redirect other paths on levieber.com", () => {
    expect.hasAssertions();

    const redirectUrl = resolveDomainRedirect(new Request("https://levieber.com/work"));

    expect(redirectUrl).toBeUndefined();
  });

  it("does not redirect paths that merely start with the pt-BR segment", () => {
    expect.hasAssertions();

    const redirectUrl = resolveDomainRedirect(new Request("https://levieber.com/pt-BRother"));

    expect(redirectUrl).toBeUndefined();
  });

  it("does not redirect requests already on levieber.com.br", () => {
    expect.hasAssertions();

    const redirectUrl = resolveDomainRedirect(new Request("https://levieber.com.br/pt-BR"));

    expect(redirectUrl).toBeUndefined();
  });
});
