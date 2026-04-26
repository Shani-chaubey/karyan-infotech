import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["jodit-react", "jodit"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "karyaninfratech.co.in",
      },
    ],
  },
};

export default nextConfig;
