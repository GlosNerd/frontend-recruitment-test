import type { NextConfig } from "next";

//Domain whitelisten damit next/image sie akzeptiert
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imgs.cyberport.de",
        pathname: "/content/images/**",
      },
    ],
  },
};

export default nextConfig;
