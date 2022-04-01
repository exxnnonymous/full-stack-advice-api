/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    mongodburl: process.env.MONGODB_URI,
    jwtsecret: process.env.JWTSECRET,
    public_url: 'http://localhost:3000'
}
}

module.exports = nextConfig
