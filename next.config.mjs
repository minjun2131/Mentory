/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'baclhxsaaveunollpgxj.supabase.co',
      },
    ],
  },
};

export default nextConfig;
