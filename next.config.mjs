/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["next-mdx-remote"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.discogs.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
