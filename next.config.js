/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    mongodburl: process.env.MONGODB_URI,
    jwtsecret: process.env.JWTSECRET,
    public_url: process.env.NEXT_PUBLIC_URL
}
}

module.exports = nextConfig
