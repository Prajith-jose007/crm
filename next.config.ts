import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/dashboard.html',
      },
      {
        source: '/opportunities',
        destination: '/dashboard.html?page=opportunities',
      },
      {
        source: '/visits',
        destination: '/dashboard.html?page=visits',
      },
      {
        source: '/contacts',
        destination: '/dashboard.html?page=contacts',
      },
      {
        source: '/companies',
        destination: '/dashboard.html?page=companies',
      },
      {
        source: '/users',
        destination: '/dashboard.html?page=users',
      },
    ];
  },
};

export default nextConfig;
