/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'imguploads3.s3.ap-northeast-2.amazonaws.com',
    ],
  },
};

module.exports = nextConfig;
