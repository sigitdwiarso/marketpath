import type { NextConfig } from "next";

// GitHub Pages static export mode:
// run with EXPORT_MODE=1 to produce a static `out/` directory.
// Local dev / sandbox builds keep the standalone server output untouched.
const isExport = process.env.EXPORT_MODE === "1";

const nextConfig: NextConfig = {
  output: isExport ? "export" : "standalone",
  // GitHub Pages serves the site from a subpath: /<repo-name>
  basePath: isExport ? "/marketpath" : "",
  trailingSlash: isExport,
  images: {
    // Static export cannot run the image optimization server
    unoptimized: isExport,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
