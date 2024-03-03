import { describe, expect, it, vi } from "vitest";

const PERMANENT_REDIRECT_STATUS = 301;

vi.mock(import("@tanstack/react-start/server-entry"), () => ({
  default: {
    fetch: vi.fn<(request: Request) => Promise<Response>>(() =>
      Promise.resolve(new Response("handled", { status: 200 })),
    ),
  },
}));

// oxlint-disable-next-line vitest/prefer-import-in-mock -- paraglideMiddleware's generic <T> resolver signature can't be expressed through the module-typed `vi.mock(import(...))` overload.
vi.mock("@/main/presentation/common/i18n/i18n-middleware", () => ({
  i18nMiddleware: vi.fn<(request: Request, next: () => Promise<Response>) => Promise<Response>>(
    (_request, next) => next(),
  ),
}));

describe("server entry", () => {
  it("delegates the request through the i18n middleware to the start handler", async () => {
    expect.hasAssertions();

    const { default: serverHandler } = await import("@/server");
    const response = await serverHandler.fetch(new Request("https://levieber.com.br/"));

    await expect(response.text()).resolves.toBe("handled");
  });

  it("redirects levieber.com/pt-BR to levieber.com.br without invoking the i18n middleware", async () => {
    expect.hasAssertions();

    const { i18nMiddleware } = await import("@/main/presentation/common/i18n/i18n-middleware");
    vi.mocked(i18nMiddleware).mockClear();
    const { default: serverHandler } = await import("@/server");
    const response = await serverHandler.fetch(new Request("https://levieber.com/pt-BR/work"));

    expect(response.status).toBe(PERMANENT_REDIRECT_STATUS);
    expect(response.headers.get("Location")).toBe("https://levieber.com.br/work");
    expect(i18nMiddleware).not.toHaveBeenCalled();
  });
});
