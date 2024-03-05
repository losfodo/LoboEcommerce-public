/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "./base.scss";`,
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   sassOptions: {
//     includePaths: [path.join(__dirname, "styles")],
//     prependData: `@import "./base.scss";`,
//   },
// };

// module.exports = nextConfig;
