/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    mongodburl: process.env.MONGODB_URI,
    jwtsecret: process.env.JWTSECRET,
    public_url: 'https://advice-api-smoky.vercel.app/'
}
}

module.exports = nextConfig
