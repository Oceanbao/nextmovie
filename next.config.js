// @ts-check
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = withBundleAnalyzer({
  reactStrictMode: true,
  // Styled Component upgrade to SWC compiler
  // ssr and displayName are configured by default
  styledComponents: true,
  swcMinify: true,
})
module.exports = nextConfig
