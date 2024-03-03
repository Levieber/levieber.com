import { defineConfig } from "oxfmt";

export default defineConfig({
  ignorePatterns: ["**/*.gen.ts", ".local/**"],
  sortTailwindcss: {
    functions: ["clsx", "cn", "cva"],
    stylesheet: "src/pages/globals.css",
  },
});
