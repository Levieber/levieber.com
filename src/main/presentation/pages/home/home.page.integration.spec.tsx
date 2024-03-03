import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { HomePage } from "@/main/presentation/pages/home/home.page";
import { m } from "@/main/presentation/common/i18n";

describe("home page", () => {
  afterEach(cleanup);

  it("renders the hero, work and contact sections", () => {
    expect.hasAssertions();

    render(<HomePage />);

    expect(screen.getByText(m.heroSubtitle())).toBeInstanceOf(HTMLElement);
    expect(screen.getByRole("heading", { name: m.workHeaderTitle() })).toBeInstanceOf(HTMLElement);
    expect(screen.getByText(m.contactEmail())).toBeInstanceOf(HTMLElement);
    expect(screen.getByText(m.project1Title())).toBeInstanceOf(HTMLElement);
    expect(screen.getByRole("link", { name: m.socialLinkedinLabel() })).toBeInstanceOf(HTMLElement);
  });
});
