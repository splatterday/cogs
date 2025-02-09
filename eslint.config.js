import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import next from "eslint-plugin-next"; // ✅ Import Next.js ESLint rules

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      js: pluginJs,
      react: pluginReact,
      typescript: tseslint,
      next: next // ✅ Add Next.js ESLint plugin
    },
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: { next },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...pluginReact.configs.flat.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...next.configs["core-web-vitals"].rules, // ✅ Apply Next.js "core-web-vitals" rules
    },
  },
];
