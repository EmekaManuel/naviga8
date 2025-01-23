/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  // reactStrictMode: false,
  output: 'export',
  images: {
    unoptimized: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
