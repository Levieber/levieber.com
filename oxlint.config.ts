import { geralRules, testRules } from "./oxlint.rules.ts";
import { defineConfig } from "oxlint";

export default defineConfig({
  categories: {
    correctness: "error",
    nursery: "error",
    pedantic: "error",
    perf: "error",
    style: "error",
    suspicious: "error",
  },
  env: { browser: true },
  ignorePatterns: ["**/*.gen.ts", ".local/**"],
  jsPlugins: [
    {
      name: "react-hooks-js",
      specifier: "eslint-plugin-react-hooks",
    },
    {
      name: "react-doctor",
      specifier: "oxlint-plugin-react-doctor",
    },
  ],
  options: {
    maxWarnings: 5,
    typeAware: true,
    typeCheck: true,
  },
  overrides: [
    {
      files: ["src/**/*.spec.ts", "src/**/*.spec.tsx", "test/**/*.spec.ts", "test/**/*.spec.tsx"],
      rules: testRules,
    },
  ],
  plugins: ["eslint", "typescript", "unicorn", "oxc", "react", "react-perf", "jsx-a11y", "vitest"],
  rules: geralRules,
});
