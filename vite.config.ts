import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { defineConfig } from "vite";
import { nitro } from "nitro/vite";
import paraglideConfig from "./paraglide.config";
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  envPrefix: ["PUBLIC_", "VITE_"],
  plugins: [
    tailwindcss(),
    paraglideVitePlugin(paraglideConfig),
    tanstackStart({
      router: {
        generatedRouteTree: "infrastructure/generated/routeTree.gen.ts",
        routeFileIgnorePattern: ".*\\.test|spec\\.tsx?",
        routesDirectory: "main/routes",
      },
      srcDirectory: "src",
    }),
    viteReact(),
    babel({
      presets: [reactCompilerPreset()],
    }),
    nitro(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    port: 3000,
  },
});
