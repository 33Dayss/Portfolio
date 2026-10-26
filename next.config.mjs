/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    const cache = [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }];
    return [
      { source: "/models/:path*", headers: cache },
      { source: "/ar/:path*", headers: cache }
    ];
  }
};

export default nextConfig;
