/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    env : {
        BE_URL : process.env.BE_URL,
    }
}

module.exports = nextConfig
