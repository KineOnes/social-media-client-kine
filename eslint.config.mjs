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
        ...Object.fromEntries(Object.keys(globals.browser).map(key => [key, "readonly"])),
        ...Object.fromEntries(Object.keys(globals.node).map(key => [key, "readonly"])),
        ...Object.fromEntries(Object.keys(jest.environments.globals).map(key => [key, "readonly"])),
      },
    },
    plugins: {
      jest,
    },
    rules: {
      ...jest.configs.recommended.rules,
    },
  },
  {
    files: ["**/*.cy.js"],
    plugins: {
      cypress,
    },
    languageOptions: {
      globals: {
        ...Object.fromEntries(Object.keys(globals.browser).map(key => [key, "readonly"])),
        ...Object.fromEntries(Object.keys(globals.node).map(key => [key, "readonly"])),
        ...Object.fromEntries(Object.keys(cypress.environments.globals).map(key => [key, "readonly"])),
      },
    },
    rules: {
      ...cypress.configs.recommended.rules,
    },
  },
  {
    files: ["cypress.config.js"],
    languageOptions: {
      globals: Object.fromEntries(Object.keys(globals.node).map(key => [key, "readonly"])),
    },
    parserOptions: {
      sourceType: "commonjs",
    },
  },
];
