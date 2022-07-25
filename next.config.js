// @ts-check
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = withBundleAnalyzer({
  reactStrictMode: true,
  swcMinify: true,
})
module.exports = nextConfig
