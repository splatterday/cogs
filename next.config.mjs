/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  env: {
    DISCOGS_PERSONAL_TOKEN: process.env.DISCOGS_PERSONAL_TOKEN,
  },
  images: {
    domains: ["i.discogs.com", "st.discogs.com"],
  },
};

export default nextConfig;
