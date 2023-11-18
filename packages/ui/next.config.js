/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
  transpilePackages: ['@vapor/p2p'],
};

module.exports = nextConfig;
