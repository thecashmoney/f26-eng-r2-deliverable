/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true, // Ignores config files in parent directories
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "prettier",
  ], // an array of strings where each additional configuration extends the preceding configurations
  // Reference for typescript-eslint: https://typescript-eslint.io/linting/configs
  // prettier/@typescript-eslint extension is no longer needed. https://stackoverflow.com/questions/65675771/eslint-couldnt-find-the-config-prettier-typescript-eslint-after-relocating
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      // https://typescript-eslint.io/rules/consistent-type-imports/
      "error", // https://eslint.org/docs/latest/use/configure/rules
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }], // https://typescript-eslint.io/rules/no-unused-vars/
    // The supabase client types as `any` under this version pairing, so these fire on every query.
    // Warnings instead of errors so they don't fail the production build.
    "@typescript-eslint/no-unsafe-assignment": "warn",
    "@typescript-eslint/no-unsafe-call": "warn",
    "@typescript-eslint/no-unsafe-member-access": "warn",
    "@typescript-eslint/no-unsafe-argument": "warn",
    "@typescript-eslint/no-unsafe-return": "warn",
  },
};
