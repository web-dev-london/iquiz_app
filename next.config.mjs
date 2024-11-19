/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp3|wav)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          publicPath: '/_next/static/sound',
          outputPath: 'static/sound',
          esModule: false,
        },
      },
    });

    return config;
  },
};

export default nextConfig;
