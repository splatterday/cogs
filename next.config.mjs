import { hostname } from 'os';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  env: {
    DISCOGS_PERSONAL_TOKEN: process.env.DISCOGS_PERSONAL_TOKEN,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.discogs.com', 
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'st.discogs.com', 
        pathname: '**'
      }
  ]},
};

export default nextConfig;
