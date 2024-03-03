import { describe, expect, it } from "vitest";
import { cn } from "@/main/presentation/common/styles/class-name.helper";

describe("cn class-name helper", () => {
  it("joins truthy class values together", () => {
    expect.hasAssertions();

    expect(cn("flex", "items-center")).toBe("flex items-center");
  });

  it("drops falsy class values", () => {
    expect.hasAssertions();

    expect(cn("flex", undefined, "gap-2")).toBe("flex gap-2");
  });

  it("merges conflicting tailwind utilities, keeping the last one", () => {
    expect.hasAssertions();

    expect(cn("px-2", "px-4")).toBe("px-4");
  });
});
