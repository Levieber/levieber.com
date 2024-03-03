import type { KnipConfig } from "knip";

const knipConfig = {
  compilers: {
    css: (text) => [...text.matchAll(/(?<=@)import[^;]+/gu)].join("\n"),
  },
  ignore: ["src/infrastructure/generated/**"],
  ignoreDependencies: [
    // Used in project.inlang/settings.json by the Paraglide compiler
    "@inlang/plugin-message-format",
  ],
} satisfies KnipConfig;

export default knipConfig;
