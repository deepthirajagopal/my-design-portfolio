/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',           // This creates static files
  trailingSlash: true,
  images: {
    unoptimized: true         // GitHub Pages doesn't support image optimization
  },
  basePath: '',               // Important for root domain
};

export default nextConfig;
