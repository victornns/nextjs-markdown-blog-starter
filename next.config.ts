import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dummyimage.com',
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/blog',
        permanent: true,
      }
    ];
  },
};

export default nextConfig;
