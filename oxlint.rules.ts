import {
  REACT_COMPILER_RULES,
  RECOMMENDED_RULES,
  TANSTACK_QUERY_RULES,
  TANSTACK_START_RULES,
} from "oxlint-plugin-react-doctor";
import type { OxlintConfig } from "oxlint";

type OxlintRules = NonNullable<OxlintConfig["rules"]>;

export const testRules = {
  "typescript/unbound-method": "off",
  "vitest/consistent-test-filename": [
    "error",
    { pattern: String.raw`.*\.(unit|integration)\.spec\.[tj]sx?$` },
  ],
  "vitest/no-hooks": ["error", { allow: ["afterEach"] }],
  // Contradicts the always-on "prefer-importing-vitest-globals" rule, which already enforces this project's convention of importing test globals from "vitest".
  "vitest/no-importing-vitest-globals": "off",
  // Contradicts the always-on "prefer-called-once" rule for the same `toHaveBeenCalledTimes(1)` pattern; "prefer-called-once" wins since it also avoids a magic-number argument.
  "vitest/prefer-called-times": "off",
  // Contradicts the always-on "prefer-to-be-truthy" rule for the same `toBe(true)` pattern; "prefer-strict-boolean-matchers" wins so boolean assertions stay explicit.
  "vitest/prefer-to-be-truthy": "off",
} satisfies OxlintRules;

const reactRules = {
  "react/jsx-max-depth": ["error", { max: 5 }],
  "react/jsx-props-no-spreading": "off",
  "react/react-in-jsx-scope": "off",
} satisfies OxlintRules;

const reactDoctorRules = {
  ...RECOMMENDED_RULES,
  ...REACT_COMPILER_RULES,
  ...TANSTACK_START_RULES,
  ...TANSTACK_QUERY_RULES,
} satisfies OxlintRules;

const eslintRules = {
  "func-style": ["error", "declaration"],
  "id-length": ["error", { exceptions: ["t"] }],
  "no-ternary": "off",
} satisfies OxlintRules;

const typeScriptRules = {
  "typescript/prefer-readonly-parameter-types": "off",
  "typescript/strict-boolean-expressions": [
    "error",
    {
      allowNullableBoolean: true,
    },
  ],
} satisfies OxlintRules;

const unicornRules = {
  "unicorn/text-encoding-identifier-case": [
    "error",
    {
      withDash: true,
    },
  ],
} satisfies OxlintRules;

export const geralRules = {
  ...reactDoctorRules,
  ...eslintRules,
  ...reactRules,
  ...typeScriptRules,
  ...unicornRules,
} satisfies OxlintRules;
