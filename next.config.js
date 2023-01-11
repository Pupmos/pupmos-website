// const withTM = require("next-transpile-modules")([
//   "@pupmos/react",
//   "@pupmos/core",
// ]);

const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.js",
});

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    esmExternals: "loose",
    newNextLinkBehavior: false
  },
  webpack: function (config) {
    config.experiments = { asyncWebAssembly: true, syncWebAssembly: true };
    return config;
  },
};

// module.exports = withNextra(withTM(config));
module.exports = withNextra(config);
