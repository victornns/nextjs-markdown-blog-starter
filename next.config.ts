import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/blog",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
