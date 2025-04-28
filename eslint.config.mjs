import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // 1) Skip linting for Sanity's dist folder + config
  {
    ignores: ["src/sanity/dist/**", "src/sanity/eslint.config.mjs"],
    rules: {
      // 2) Turn off that rule globally
      "@typescript-eslint/no-unused-expressions": "off",
    },
  },
  // Load Next.js recommended configs
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];
