import type * as I18nModule from "@/main/presentation/common/i18n";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const setLocaleMock = vi.fn<typeof I18nModule.setLocale>();

vi.mock(import("@/main/presentation/common/i18n"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    getLocale: () => "en",
    setLocale: setLocaleMock,
  };
});

const { LocaleSwitcher } =
  await import("@/main/presentation/components/ui/locale-switcher/locale-switcher");

describe("locale switcher", () => {
  afterEach(() => {
    cleanup();
    setLocaleMock.mockClear();
  });

  it("marks the current locale button as pressed", () => {
    expect.hasAssertions();

    render(<LocaleSwitcher />);

    expect(screen.getByRole("button", { name: "EN" }).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByRole("button", { name: "PT" }).getAttribute("aria-pressed")).toBe("false");
  });

  it("switches locale when another locale button is clicked", async () => {
    expect.hasAssertions();

    const user = userEvent.setup();
    render(<LocaleSwitcher />);
    await user.click(screen.getByRole("button", { name: "PT" }));

    expect(setLocaleMock).toHaveBeenCalledWith("pt-BR");
  });

  it("ignores clicks on a button missing a valid locale dataset", async () => {
    expect.hasAssertions();

    const user = userEvent.setup();
    render(<LocaleSwitcher />);
    const button = screen.getByRole("button", { name: "PT" });
    delete button.dataset.locale;
    await user.click(button);

    expect(setLocaleMock).not.toHaveBeenCalled();
  });
});
