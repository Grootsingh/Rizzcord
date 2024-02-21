/** @type {import('next').NextConfig} */
const nextConfig = {
  extends: ["next/babel", "next/core-web-vitals"],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
