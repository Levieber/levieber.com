import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Button } from "@/main/presentation/components/ui/button/button";

describe("button component", () => {
  afterEach(cleanup);

  it("renders its children and the default variant", () => {
    expect.hasAssertions();

    render(<Button>Click me</Button>);

    expect(screen.getByRole("button", { name: "Click me" }).className).toContain("bg-primary");
  });

  it("applies the requested variant and size", () => {
    expect.hasAssertions();

    render(
      <Button size="lg" variant="destructive">
        Delete
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Delete" });

    expect(button.className).toContain("bg-destructive/10");
  });
});
