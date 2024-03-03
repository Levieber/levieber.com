import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { ErrorPage } from "@/main/presentation/components/features/error/error";
import userEvent from "@testing-library/user-event";

describe("error page component", () => {
  afterEach(cleanup);

  it("shows the error message and calls reset when the retry action is clicked", async () => {
    expect.hasAssertions();

    const reset = vi.fn<() => void>();
    const user = userEvent.setup();
    render(<ErrorPage error={new Error("Something broke")} reset={reset} />);

    expect(screen.getByText("Something broke")).toBeInstanceOf(HTMLElement);

    await user.click(screen.getByRole("button"));

    expect(reset).toHaveBeenCalledOnce();
  });
});
