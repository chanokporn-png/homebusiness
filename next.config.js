/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',       // ทำ static export
  experimental: {
    appDir: true           // ถ้าใช้ app/ directory
  }
}

export default nextConfig
