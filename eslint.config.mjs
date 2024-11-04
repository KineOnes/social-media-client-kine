import globals from "globals";
import pluginJs from "@eslint/js";
import jestPlugin from "eslint-plugin-jest";
import cypressPlugin from "eslint-plugin-cypress";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    languageOptions: {
      globals: globals.browser // Base browser environment
    },
    ...pluginJs.configs.recommended // Base ESLint recommended rules
  },
  // Jest configuration for unit tests
  {
    files: ["**/*.test.js"],  // Applies to Jest test files (e.g., baseline.test.js)
    languageOptions: {
      globals: {
        ...Object.fromEntries(
          Object.keys(globals.node).map(key => [key, "readonly"])
        ), // Node globals set as readonly
        ...Object.fromEntries(
          Object.keys(jestPlugin.environments.globals).map(key => [key, "readonly"])
        ) // Jest globals (like `test`, `expect`)
      }
    },
    plugins: {
      jest: jestPlugin
    },
    rules: {
      ...jestPlugin.configs.recommended.rules, // Jest recommended rules
      "jest/prefer-expect-assertions": "off"
    }
  },
  // Cypress configuration for e2e tests
  {
    files: ["**/*.cy.js"], // Applies to Cypress test files (e.g., example.cy.js)
    languageOptions: {
      globals: {
        ...Object.fromEntries(
          Object.keys(globals.browser).map(key => [key, "readonly"])
        ), // Browser globals set as readonly
        ...Object.fromEntries(
          Object.keys(cypressPlugin.environments.globals).map(key => [key, "readonly"])
        ) // Cypress globals (like `cy`, `Cypress`)
      }
    },
    plugins: {
      cypress: cypressPlugin
    },
    rules: {
      ...cypressPlugin.configs.recommended.rules, // Cypress recommended rules
      "cypress/no-unnecessary-waiting": "off",
      "no-unused-vars": "off"
    }
  }
];
