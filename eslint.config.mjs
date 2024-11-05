import globals from "globals";
import pluginJs from "@eslint/js";
import jest from "eslint-plugin-jest";
import cypress from "eslint-plugin-cypress";

export default [
  pluginJs.configs.recommended,
  {
    files: ["**/*.test.js", "**/*.spec.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...jest.environments.globals,
      },
    },
  },
  {
    files: ["**/*.cy.js"],
    plugins: [cypress],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...cypress.environments.globals,
      },
    },
  },
  {
    files: ["cypress.config.js"],
    env: {
      node: true,
    },
    parserOptions: {
      sourceType: "commonjs",
    },
  },
];