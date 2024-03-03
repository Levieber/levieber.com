import { describe, expect, it } from "vitest";
import { buttonVariants } from "@/main/presentation/components/ui/button/button-variants";

describe("buttonVariants class helper", () => {
  it("applies the default variant and size when none are given", () => {
    expect.hasAssertions();

    expect(buttonVariants()).toContain("bg-primary");
  });

  it("applies the requested variant", () => {
    expect.hasAssertions();

    expect(buttonVariants({ variant: "destructive" })).toContain("bg-destructive/10");
  });

  it("applies the requested size", () => {
    expect.hasAssertions();

    expect(buttonVariants({ size: "icon" })).toContain("size-9");
  });

  it("appends a custom className", () => {
    expect.hasAssertions();

    expect(buttonVariants({ className: "custom-class" })).toContain("custom-class");
  });
});
