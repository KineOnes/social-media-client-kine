import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module", // Enables ES module syntax (import/export)
      ecmaVersion: 2020, // Sets ECMAScript version to 2020 for modern features
      globals: globals.browser, // Adds browser globals (like window, document, etc.)
    },
  },
  pluginJs.configs.recommended,
];
