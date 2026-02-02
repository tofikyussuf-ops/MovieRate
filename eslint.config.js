import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js, react: pluginReact }, // Added react plugin here
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true }, // Tells ESLint to expect JSX
      },
    },
  },
  pluginReact.configs.flat.recommended,

  // --- YOUR CUSTOM RULES GO HERE ---
  {
    rules: {
      "react/prop-types": "off", // 1. Stop forcing prop-types validation
      "no-unused-vars": "warn", // 2. Unused variables are just a warning, not an error
      "react/react-in-jsx-scope": "off", // 3. Not needed in modern React (Vite/Next.js)
    },
  },
]);
