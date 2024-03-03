import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    coverage: {
      exclude: [
        "src/**/*.spec.ts",
        "src/**/*.spec.tsx",
        "src/infrastructure/generated/**",
        "node_modules/**",
      ],
      include: ["src/**/*.ts", "src/**/*.tsx"],
      provider: "v8",
      thresholds: {
        branches: 95,
        functions: 95,
        lines: 95,
        statements: 95,
      },
    },
    projects: [
      {
        envPrefix: ["PUBLIC_", "VITE_"],
        resolve: { tsconfigPaths: true },
        test: {
          environment: "jsdom",
          include: ["src/**/*.unit.spec.ts", "src/**/*.unit.spec.tsx"],
          name: "unit",
        },
      },
      {
        envPrefix: ["PUBLIC_", "VITE_"],
        resolve: { tsconfigPaths: true },
        test: {
          environment: "jsdom",
          include: ["src/**/*.integration.spec.ts", "src/**/*.integration.spec.tsx"],
          name: "integration",
        },
      },
    ],
  },
});
