/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "localhost",
            "image.civitai.com"
        ]
    }
};

module.exports = nextConfig
