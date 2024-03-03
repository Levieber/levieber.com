import {
  RouterProvider,
  createMemoryHistory,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Route as RootRoute } from "@/main/routes/__root";

describe("root layout", () => {
  afterEach(cleanup);

  it("renders the locale switcher and the matched child route", async () => {
    expect.hasAssertions();

    const childRoute = createRoute({
      component: () => <p>child route content</p>,
      getParentRoute: () => RootRoute,
      path: "/child",
    });

    const router = createRouter({
      history: createMemoryHistory({ initialEntries: ["/child"] }),
      routeTree: RootRoute.addChildren([childRoute]),
    });

    render(<RouterProvider router={router} />);

    const childContent = await screen.findByText("child route content");
    const englishButton = screen.getByRole("button", { name: "EN" });
    const portugueseButton = screen.getByRole("button", { name: "PT" });

    expect(childContent.textContent).toBe("child route content");
    expect(englishButton.tagName).toBe("BUTTON");
    expect(portugueseButton.tagName).toBe("BUTTON");
  });
});
