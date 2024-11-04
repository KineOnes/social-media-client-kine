import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { globals: globals.browser },
    extends: "eslint:recommended",
    overrides: [
      {
        files: ["**/*.test.js"],
        env: { jest: true },
        plugins: ["jest"],
        extends: ["plugin:jest/recommended"],
        rules: { "jest/prefer-expect-assertions": "off" }
      }
    ],
  },
  pluginJs.configs.recommended,
];