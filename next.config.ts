import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/rank.html',
        destination: '/?overlay=rank',
      },
      {
        source: '/goal.html',
        destination: '/?overlay=goal',
      },
      {
        source: '/queue.html',
        destination: '/?overlay=queue',
      },
      {
        source: '/nowplaying.html',
        destination: '/?overlay=nowplaying',
      },
    ];
  },
};

export default nextConfig;