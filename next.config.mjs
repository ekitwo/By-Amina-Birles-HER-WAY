const repoName = "By-Amina-Birles";
// GITHUB_ACTIONS is set automatically by GitHub Actions runners — locally
// (npm run dev / build) the app still serves from "/".
const onGithubActions = process.env.GITHUB_ACTIONS === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true },
  basePath: onGithubActions ? `/${repoName}` : "",
  assetPrefix: onGithubActions ? `/${repoName}/` : "",
};

export default nextConfig;
