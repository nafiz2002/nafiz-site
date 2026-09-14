/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Commentary's file backend reads data/commentary.json at runtime; make
    // sure it is bundled with the serverless functions that need it.
    outputFileTracingIncludes: {
      '/commentary': ['./data/**/*'],
      '/commentary/[slug]': ['./data/**/*'],
      '/commentary/write': ['./data/**/*'],
      '/api/commentary': ['./data/**/*'],
    },
  },
};

module.exports = nextConfig;
