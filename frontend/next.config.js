/** @type {import('next').NextConfig} */

require('dotenv').config();

const nextConfig = {
  env: {
    CHAT_ENGINE_PROJECT_ID: process.env.CHAT_ENGINE_PROJECT_ID,
  },
};

module.exports = nextConfig;
