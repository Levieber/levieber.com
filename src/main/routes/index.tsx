import { HomePage } from "@/main/presentation/pages/home/home.page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});
