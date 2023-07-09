/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.experiments = { ...config.experiments, topLevelAwait: true,  asyncWebAssembly: true };
        config.externals = [...config.externals, 'hnswlib-node'];  // by adding this line, solved the import
        return config;
      }
}

module.exports = nextConfig
