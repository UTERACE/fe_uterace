/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  i18n,
  images: {
    domains: [
      'localhost',
      'be-uterace.onrender.com',
      'platform-lookaside.fbsbx.com',
    ],
  },
}

module.exports = nextConfig
