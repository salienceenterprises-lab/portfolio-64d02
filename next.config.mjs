
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/portfolio-64d02', // This ensures CSS/JS paths include the repo name
};
export default nextConfig;
