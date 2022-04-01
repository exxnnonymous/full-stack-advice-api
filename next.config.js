/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    mongodburl: process.env.MONGODB_URI,
    jwtsecret: process.env.JWTSECRET,
    public_url: process.env.VERCEL_URL
}
}

module.exports = nextConfig
