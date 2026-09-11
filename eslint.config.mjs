import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

// eslint-config-next 16.x ships native ESLint 9 flat configs — no
// FlatCompat bridging needed.
const eslintConfig = [
  ...nextCoreWebVitals,
  {
    ignores: [".next/**", "node_modules/**"],
  },
];

export default eslintConfig;
