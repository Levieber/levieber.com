import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRouter,
} from "@tanstack/react-router";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { NotFoundPage } from "@/main/presentation/components/features/error/not-found";

describe("not found page", () => {
  afterEach(cleanup);

  it("renders a link back to the home page", async () => {
    expect.hasAssertions();

    const rootRoute = createRootRoute({ component: NotFoundPage });
    const router = createRouter({
      history: createMemoryHistory({ initialEntries: ["/unknown"] }),
      routeTree: rootRoute,
    });

    render(<RouterProvider router={router} />);

    const homeLink = await screen.findByRole("link");

    expect(homeLink.getAttribute("href")).toBe("/");
  });
});
